// Done when — Data validation (docs/plans/01-skeleton.md §3), plus the CI line:
// "When a pull request has data that fails validation, its ci check should fail."

import { describe, expect, it } from 'vitest';
import { spawnSync } from 'node:child_process';
import { mkdtempSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { stringify } from 'csv-stringify/sync';
import { COLUMNS, readTables, SHEETS, type Tables } from '../../src/lib/tables.ts';
import { validate } from '../../src/lib/validate.ts';

function sample(): Tables {
  return structuredClone(readTables().tables);
}

function errorsOf(tables: Tables) {
  return validate(tables).filter((i) => i.severity === 'error');
}

describe('data validation', () => {
  it('fails when a required field is empty', () => {
    const cases: Array<(t: Tables) => void> = [
      (t) => { t.cafes[0].id = ''; },
      (t) => { t.cafes[0].lat = ''; },
      (t) => { t.cafes[0].lng = ''; },
      (t) => { t.methods[0].source_type = 'cafe_site'; t.methods[0].source_url = ''; },
    ];
    for (const breakIt of cases) {
      const t = sample();
      breakIt(t);
      expect(errorsOf(t).length).toBeGreaterThan(0);
    }
    // A "visit" source needs no link.
    const visit = sample();
    visit.methods[0].source_type = 'visit';
    visit.methods[0].source_url = '';
    expect(errorsOf(visit)).toEqual([]);
  });

  it('fails when a method, source or status code is unknown', () => {
    for (const breakIt of [
      (t: Tables) => { t.methods[0].method = 'espreso_semi'; },
      (t: Tables) => { t.methods[0].source_type = 'blog'; },
      (t: Tables) => { t.cafes[0].status = 'open'; },
    ]) {
      const t = sample();
      breakIt(t);
      expect(errorsOf(t).some((e) => e.message.startsWith('unknown code'))).toBe(true);
    }
  });

  it('fails when an independent cafe or a chain has no espresso status, or "none" sits with a machine', () => {
    const noStatus = sample();
    noStatus.methods = noStatus.methods.filter((m) => !(m.cafe_id === 'sample-espresso-bar' && m.method.startsWith('espresso')));
    expect(errorsOf(noStatus).some((e) => e.message.includes('no espresso status'))).toBe(true);

    const chainNoStatus = sample();
    chainNoStatus.methods = chainNoStatus.methods.filter((m) => !(m.chain_id === 'tullys' && m.method.startsWith('espresso')));
    expect(errorsOf(chainNoStatus).some((e) => e.message.includes('chain "tullys" has no espresso status'))).toBe(true);

    const mixed = sample();
    mixed.methods.push({ ...mixed.methods[0], method: 'espresso_none' });
    expect(errorsOf(mixed).some((e) => e.message.includes('together with a machine'))).toBe(true);

    // Both machine types together are fine (decided 2026-11-27).
    const both = sample();
    expect(both.methods.filter((m) => m.cafe_id === 'sample-roastery').map((m) => m.method)).toEqual(
      expect.arrayContaining(['espresso_semi', 'espresso_auto']),
    );
    expect(errorsOf(both)).toEqual([]);
  });

  it('fails when an id points to something that does not exist', () => {
    for (const breakIt of [
      (t: Tables) => { t.methods[0].cafe_id = 'no-such-cafe'; },
      (t: Tables) => { t.methods.find((m) => m.chain_id)!.chain_id = 'no-such-chain'; },
      (t: Tables) => { t.cafes[3].chain_id = 'no-such-chain'; },
      (t: Tables) => { t.cafes[0].status = 'moved'; t.cafes[0].moved_to = 'no-such-cafe'; },
      (t: Tables) => { t.cafes[0].station_id = 'no-such-station'; },
    ]) {
      const t = sample();
      breakIt(t);
      expect(errorsOf(t).some((e) => e.message.includes("doesn't exist"))).toBe(true);
    }
  });

  it('fails when a cafe, chain or station is missing its English or Japanese name', () => {
    for (const sheet of ['cafes', 'chains', 'stations'] as const) {
      for (const field of ['name_en', 'name_ja']) {
        const t = sample();
        t[sheet][0][field] = '';
        expect(errorsOf(t).some((e) => e.sheet === sheet && e.field === field)).toBe(true);
      }
    }
  });

  // Added while building (security review): links are rendered as hrefs.
  it('fails when a link is not an http(s) URL', () => {
    for (const breakIt of [
      (t: Tables) => { t.cafes[0].cafe_url = 'javascript:alert(1)'; },
      (t: Tables) => { t.chains[0].site_url = 'data:text/html,hi'; },
      (t: Tables) => { t.methods[0].source_url = 'not a url'; },
    ]) {
      const t = sample();
      breakIt(t);
      expect(errorsOf(t).some((e) => e.message.includes('must be an http(s) URL'))).toBe(true);
    }
  });

  it('passes on the sample data', () => {
    const { tables, headers } = readTables();
    expect(validate(tables, headers).filter((i) => i.severity === 'error')).toEqual([]);
  });

  it('makes the validate script exit with an error on broken data (what fails the PR check)', () => {
    const t = sample();
    t.methods[0].method = 'espreso_semi';
    const dir = mkdtempSync(join(tmpdir(), 'acbc-data-'));
    for (const sheet of SHEETS) {
      writeFileSync(join(dir, `${sheet}.csv`), stringify(t[sheet], { header: true, columns: [...COLUMNS[sheet]] }));
    }
    const broken = spawnSync(process.execPath, ['scripts/validate-data.ts', dir], { encoding: 'utf8' });
    expect(broken.status).toBe(1);
    expect(broken.stdout).toContain('espreso_semi');

    const ok = spawnSync(process.execPath, ['scripts/validate-data.ts'], { encoding: 'utf8' });
    expect(ok.status).toBe(0);
  });
});
