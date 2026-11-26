// Build-time data checks from docs/architecture/data-validation.md. Pure: takes
// the raw tables and returns every problem at once (it doesn't stop at the first).
//
// Implemented in this plan (docs/plans/01-skeleton.md): the error (E) rules of
// data-validation.md §4.1–§4.8 — columns, required fields, id slugs, codes, number
// and date formats (no future dates), coordinates inside Japan, unique ids,
// references and moved_to cycles, both-language names, http(s) links, duplicate
// methods, espresso status, and chain stores having no method rows of their own.
// Warning (W) rules come in a later plan.

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

const NUMBER_RE = /^-?\d+(\.\d+)?$/;
const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
// Rough bounding box of Japan (V-C05), so swapped lat/lng is caught.
const JAPAN = { latMin: 20, latMax: 46, lngMin: 122, lngMax: 154 };

function isNumber(value: string): boolean {
  return NUMBER_RE.test(value);
}

/** Only http(s) links may reach an href (blocks javascript:, data: and the like). */
export function isWebUrl(value: string): boolean {
  try {
    const u = new URL(value);
    return u.protocol === 'https:' || u.protocol === 'http:';
  } catch {
    return false;
  }
}

const URL_FIELDS: Partial<Record<SheetName, readonly string[]>> = {
  cafes: ['cafe_url', 'social_url'],
  chains: ['site_url'],
  methods: ['source_url', 'source_url_2'],
};

export interface ValidateOptions {
  /** Latest allowed date as YYYY-MM-DD, for the no-future-dates rule. Defaults to tomorrow in UTC. */
  today?: string;
}

export function validate(
  tables: Tables,
  headers?: Partial<Record<SheetName, string[]>>,
  options: ValidateOptions = {},
): Issue[] {
  // Default: tomorrow in UTC, so a date written today in Japan (UTC+9) still passes on a UTC CI runner.
  const today = options.today ?? new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
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
  const checkDate = (sheet: SheetName, i: number, field: string, value: string) => {
    if (!value) return;
    if (!isValidDate(value)) err(sheet, rowNo(i), field, 'date must be YYYY-MM-DD');
    else if (value > today) err(sheet, rowNo(i), field, `date ${value} is in the future`);
  };
  const checkCoords = (sheet: SheetName, row: Record<string, string>, i: number) => {
    for (const f of ['lat', 'lng']) if (row[f] && !isNumber(row[f])) err(sheet, rowNo(i), f, `"${f}" must be a decimal number`);
    if (isNumber(row.lat) && isNumber(row.lng)) {
      const lat = Number(row.lat);
      const lng = Number(row.lng);
      if (lat < JAPAN.latMin || lat > JAPAN.latMax || lng < JAPAN.lngMin || lng > JAPAN.lngMax) {
        err(sheet, rowNo(i), 'lat', `coordinates ${lat}, ${lng} are outside Japan (lat and lng swapped?)`);
      }
    }
  };
  const uniqueIds = (sheet: SheetName) => {
    const seen = new Map<string, number>();
    tables[sheet].forEach((row, i) => {
      const id = row.id;
      if (!id) return;
      if (!SLUG_RE.test(id)) err(sheet, rowNo(i), 'id', `id "${id}" must be lowercase letters, digits and hyphens`);
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
    required('stations', s, i, ['id', 'name_en', 'name_ja', 'lat', 'lng', 'source']);
    checkCoords('stations', s, i);
  });

  // Chains.
  tables.chains.forEach((c, i) => {
    required('chains', c, i, ['id', 'name_en', 'name_ja', 'site_url', 'checked_at']);
    checkDate('chains', i, 'checked_at', c.checked_at);
  });

  // Cafes.
  tables.cafes.forEach((c, i) => {
    required('cafes', c, i, ['id', 'name_en', 'name_ja', 'lat', 'lng', 'coord_source', 'status']);
    if (!c.address_en && !c.address_ja) err('cafes', rowNo(i), 'address_en', 'needs an address in at least one language');
    checkCoords('cafes', c, i);
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
    if (c.moved_to && c.moved_to === c.id) err('cafes', rowNo(i), 'moved_to', "a cafe can't move to itself");
  });

  // moved_to must not loop (V-CA08, V-CA09).
  const movedTo = new Map(tables.cafes.filter((c) => c.id && c.moved_to).map((c) => [c.id, c.moved_to]));
  tables.cafes.forEach((c, i) => {
    if (!c.moved_to || c.moved_to === c.id) return;
    const seen = new Set([c.id]);
    let next: string | undefined = c.moved_to;
    while (next && movedTo.has(next)) {
      if (seen.has(next)) {
        err('cafes', rowNo(i), 'moved_to', `moved_to loops back to "${next}"`);
        break;
      }
      seen.add(next);
      next = movedTo.get(next);
    }
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
    checkDate('methods', i, 'checked_at', m.checked_at);
  });

  // The same method twice for one cafe or chain (V-M09).
  const seenMethods = new Map<string, number>();
  tables.methods.forEach((m, i) => {
    const key = `${m.cafe_id}|${m.chain_id}|${m.method}`;
    if (!m.method) return;
    if (seenMethods.has(key)) err('methods', rowNo(i), 'method', `"${m.method}" is listed twice for the same cafe or chain (first at row ${seenMethods.get(key)})`);
    else seenMethods.set(key, rowNo(i));
  });

  // Links must be http(s) URLs, since they are rendered as hrefs.
  for (const sheet of SHEETS) {
    for (const field of URL_FIELDS[sheet] ?? []) {
      tables[sheet].forEach((row, i) => {
        const value = row[field];
        if (value && !isWebUrl(value)) err(sheet, rowNo(i), field, `"${field}" must be an http(s) URL`);
      });
    }
  }

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
