// Build-time data checks from docs/architecture/data-validation.md. Pure: takes
// the raw tables and returns every problem at once (it doesn't stop at the first).
//
// Implemented in this plan (docs/plans/01-skeleton.md): columns, required fields,
// codes, number and date formats, unique ids, references, both-language names,
// espresso status, and chain stores having no method rows of their own.

import { COORD_SOURCES, ESPRESSO_CODES, METHOD_CODES, SOURCE_CODES, STATUS_CODES } from './codes.ts';
import { COLUMNS, SHEETS, type SheetName, type Tables } from './tables.ts';

export type Severity = 'error' | 'warning';

export interface Issue {
  severity: Severity;
  sheet: SheetName;
  /** Row number in the sheet, header = 1. 0 means the whole sheet. */
  row: number;
  field?: string;
  message: string;
}

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

function isValidDate(value: string): boolean {
  if (!DATE_RE.test(value)) return false;
  const d = new Date(`${value}T00:00:00Z`);
  return !Number.isNaN(d.getTime()) && d.toISOString().startsWith(value);
}

function isNumber(value: string): boolean {
  return value !== '' && Number.isFinite(Number(value));
}

export function validate(tables: Tables, headers?: Partial<Record<SheetName, string[]>>): Issue[] {
  const issues: Issue[] = [];
  const err = (sheet: SheetName, row: number, field: string | undefined, message: string) =>
    issues.push({ severity: 'error', sheet, row, field, message });

  // Columns (V-F02, V-F05).
  for (const sheet of SHEETS) {
    const have = headers?.[sheet];
    if (have) {
      for (const col of COLUMNS[sheet]) {
        if (!have.includes(col)) err(sheet, 1, col, `missing column "${col}"`);
      }
    }
  }
  if (tables.stations.length === 0) err('stations', 0, undefined, 'needs at least one station');
  if (tables.cafes.length === 0) err('cafes', 0, undefined, 'needs at least one cafe');

  const rowNo = (i: number) => i + 2; // header is row 1
  const required = (sheet: SheetName, row: Record<string, string>, i: number, fields: string[]) => {
    for (const f of fields) {
      if (!row[f]) err(sheet, rowNo(i), f, `"${f}" is required`);
    }
  };
  const oneOf = (sheet: SheetName, i: number, field: string, value: string, allowed: readonly string[]) => {
    if (value && !allowed.includes(value)) {
      err(sheet, rowNo(i), field, `unknown code "${value}" (allowed: ${allowed.join(', ')})`);
    }
  };
  const uniqueIds = (sheet: SheetName) => {
    const seen = new Map<string, number>();
    tables[sheet].forEach((row, i) => {
      const id = row.id;
      if (!id) return;
      if (seen.has(id)) err(sheet, rowNo(i), 'id', `duplicate id "${id}" (first at row ${seen.get(id)})`);
      else seen.set(id, rowNo(i));
    });
    return new Set(seen.keys());
  };

  const stationIds = uniqueIds('stations');
  const chainIds = uniqueIds('chains');
  const cafeIds = uniqueIds('cafes');

  // Stations.
  tables.stations.forEach((s, i) => {
    required('stations', s, i, ['id', 'name_en', 'name_ja', 'lat', 'lng']);
    for (const f of ['lat', 'lng']) if (s[f] && !isNumber(s[f])) err('stations', rowNo(i), f, `"${f}" must be a number`);
  });

  // Chains.
  tables.chains.forEach((c, i) => {
    required('chains', c, i, ['id', 'name_en', 'name_ja']);
    if (c.checked_at && !isValidDate(c.checked_at)) err('chains', rowNo(i), 'checked_at', 'date must be YYYY-MM-DD');
  });

  // Cafes.
  tables.cafes.forEach((c, i) => {
    required('cafes', c, i, ['id', 'name_en', 'name_ja', 'lat', 'lng', 'status']);
    if (!c.address_en && !c.address_ja) err('cafes', rowNo(i), 'address_en', 'needs an address in at least one language');
    for (const f of ['lat', 'lng']) if (c[f] && !isNumber(c[f])) err('cafes', rowNo(i), f, `"${f}" must be a number`);
    oneOf('cafes', i, 'status', c.status, STATUS_CODES);
    oneOf('cafes', i, 'coord_source', c.coord_source, COORD_SOURCES);
    if (c.station_id && !stationIds.has(c.station_id)) {
      err('cafes', rowNo(i), 'station_id', `station "${c.station_id}" doesn't exist`);
    }
    if (c.chain_id && !chainIds.has(c.chain_id)) err('cafes', rowNo(i), 'chain_id', `chain "${c.chain_id}" doesn't exist`);
    if (c.status === 'moved') {
      if (!c.moved_to) err('cafes', rowNo(i), 'moved_to', 'a moved cafe needs "moved_to"');
    }
    if (c.moved_to && !cafeIds.has(c.moved_to)) err('cafes', rowNo(i), 'moved_to', `cafe "${c.moved_to}" doesn't exist`);
  });

  // Methods.
  const chainStoreIds = new Set(tables.cafes.filter((c) => c.chain_id).map((c) => c.id));
  tables.methods.forEach((m, i) => {
    required('methods', m, i, ['method', 'source_type', 'checked_at']);
    const hasCafe = Boolean(m.cafe_id);
    const hasChain = Boolean(m.chain_id);
    if (hasCafe === hasChain) err('methods', rowNo(i), 'cafe_id', 'set exactly one of "cafe_id" and "chain_id"');
    if (hasCafe && !cafeIds.has(m.cafe_id)) err('methods', rowNo(i), 'cafe_id', `cafe "${m.cafe_id}" doesn't exist`);
    if (hasChain && !chainIds.has(m.chain_id)) err('methods', rowNo(i), 'chain_id', `chain "${m.chain_id}" doesn't exist`);
    if (hasCafe && chainStoreIds.has(m.cafe_id)) {
      err('methods', rowNo(i), 'cafe_id', `"${m.cafe_id}" is a chain store; it uses its chain's methods and has no rows of its own`);
    }
    oneOf('methods', i, 'method', m.method, METHOD_CODES);
    oneOf('methods', i, 'source_type', m.source_type, SOURCE_CODES);
    if (m.source_type && m.source_type !== 'visit' && !m.source_url) {
      err('methods', rowNo(i), 'source_url', '"source_url" is required unless source_type is "visit"');
    }
    if (m.checked_at && !isValidDate(m.checked_at)) err('methods', rowNo(i), 'checked_at', 'date must be YYYY-MM-DD');
  });

  // Espresso status (data-validation.md §4.6): every active independent cafe and
  // every chain has one; "none" can't sit with "semi"/"auto"; both machines is fine.
  const espressoOf = (key: 'cafe_id' | 'chain_id', id: string) =>
    tables.methods.filter((m) => m[key] === id && (ESPRESSO_CODES as readonly string[]).includes(m.method)).map((m) => m.method);
  const checkEspresso = (sheet: SheetName, i: number, label: string, codes: string[]) => {
    if (codes.length === 0) {
      err(sheet, rowNo(i), undefined, `${label} has no espresso status (espresso_semi, espresso_auto or espresso_none)`);
    } else if (codes.includes('espresso_none') && codes.some((c) => c !== 'espresso_none')) {
      err(sheet, rowNo(i), undefined, `${label} has "espresso_none" together with a machine`);
    }
  };
  tables.cafes.forEach((c, i) => {
    if (c.status === 'active' && !c.chain_id && c.id) checkEspresso('cafes', i, `cafe "${c.id}"`, espressoOf('cafe_id', c.id));
  });
  tables.chains.forEach((c, i) => {
    if (c.id) checkEspresso('chains', i, `chain "${c.id}"`, espressoOf('chain_id', c.id));
  });

  return issues;
}

export function formatIssue(issue: Issue): string {
  const where = issue.row > 0 ? `${issue.sheet}.csv row ${issue.row}` : `${issue.sheet}.csv`;
  const field = issue.field ? ` [${issue.field}]` : '';
  return `${issue.severity.toUpperCase()} ${where}${field}: ${issue.message}`;
}
