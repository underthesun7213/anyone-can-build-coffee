// Reading the four sheets (PRD v0.6 §9) as raw string tables. Validation runs on
// these raw tables; the loader only builds pages from tables that passed.

import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { parse } from 'csv-parse/sync';

export type Row = Record<string, string>;

export interface Tables {
  cafes: Row[];
  chains: Row[];
  methods: Row[];
  stations: Row[];
}

export type SheetName = keyof Tables;
export const SHEETS: readonly SheetName[] = ['cafes', 'chains', 'methods', 'stations'];

/** Columns each sheet must have, from PRD v0.6 §9. */
export const COLUMNS: Record<SheetName, readonly string[]> = {
  cafes: [
    'id', 'name_en', 'name_ja', 'address_en', 'address_ja', 'lat', 'lng', 'coord_source', 'osm_id',
    'station_id', 'status', 'moved_to', 'chain_id', 'cafe_url', 'social_url', 'internal_note',
  ],
  chains: ['id', 'name_en', 'name_ja', 'site_url', 'note_en', 'note_ja', 'checked_at'],
  methods: ['cafe_id', 'chain_id', 'method', 'source_type', 'source_url', 'source_url_2', 'checked_at'],
  stations: ['id', 'name_en', 'name_ja', 'lat', 'lng', 'source'],
};

export function parseCsv(text: string): Row[] {
  return parse(text, {
    columns: true,
    skip_empty_lines: true,
    trim: true,
    bom: true,
  }) as Row[];
}

/** Header names of a CSV, for the column check. */
export function parseHeader(text: string): string[] {
  const rows = parse(text, { to_line: 1, trim: true, bom: true }) as string[][];
  return rows[0] ?? [];
}

export const DEFAULT_DATA_DIR = join(process.cwd(), 'data');

export function readTables(dir: string = DEFAULT_DATA_DIR): { tables: Tables; headers: Record<SheetName, string[]> } {
  const tables = {} as Tables;
  const headers = {} as Record<SheetName, string[]>;
  for (const sheet of SHEETS) {
    const text = readFileSync(join(dir, `${sheet}.csv`), 'utf8');
    tables[sheet] = parseCsv(text);
    headers[sheet] = parseHeader(text);
  }
  return { tables, headers };
}
