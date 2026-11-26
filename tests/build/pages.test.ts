// Done when — Languages, Pages and the 404 (docs/plans/01-skeleton.md §3).
// These read the built site in dist/, so run `npm run build` first (`npm run check` does both).

import { beforeAll, describe, expect, it } from 'vitest';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { readTables } from '../../src/lib/tables.ts';

const DIST = join(process.cwd(), 'dist');
const BASE = '/anyone-can-build-coffee';
const page = (path: string) => readFileSync(join(DIST, path), 'utf8');
const cafeIdsIn = (html: string) => [...html.matchAll(/data-cafe-id="([^"]+)"/g)].map((m) => m[1]);
const methodsIn = (html: string) => [...html.matchAll(/data-method="([^"]+)"/g)].map((m) => m[1]);

beforeAll(() => {
  if (!existsSync(join(DIST, 'en', 'index.html'))) {
    throw new Error('dist/ is missing. Run `npm run build` before these tests (or `npm run check`).');
  }
});

describe('languages and addresses', () => {
  it('lists the same cafes on /en/ and /ja/, with page text in that language', () => {
    const en = page('en/index.html');
    const ja = page('ja/index.html');
    expect(cafeIdsIn(en).length).toBeGreaterThan(0);
    expect(cafeIdsIn(ja)).toEqual(cafeIdsIn(en));
    expect(en).toContain('<html lang="en"');
    expect(ja).toContain('<html lang="ja"');
    expect(en).toContain('Cafes');
    expect(ja).toContain('カフェ一覧');
    expect(en).toContain('Sample Espresso Bar');
    expect(ja).toContain('サンプル エスプレッソバー');
  });

  it('switches to the same page in the other language', () => {
    const switchTarget = (html: string) => html.match(/href="([^"]+)"[^>]*data-lang-switch=/)?.[1];
    expect(switchTarget(page('en/index.html'))).toBe(`${BASE}/ja/`);
    expect(switchTarget(page('ja/index.html'))).toBe(`${BASE}/en/`);
    expect(switchTarget(page('en/cafe/sample-espresso-bar/index.html'))).toBe(`${BASE}/ja/cafe/sample-espresso-bar/`);
    expect(switchTarget(page('ja/cafe/sample-espresso-bar/index.html'))).toBe(`${BASE}/en/cafe/sample-espresso-bar/`);
  });
});

describe('pages', () => {
  it('shows the espresso status before any other method, on the list and on cafe pages', () => {
    const isEspresso = (m: string) => m.startsWith('espresso_');
    const espressoFirst = (methods: string[]) => {
      const firstOther = methods.findIndex((m) => !isEspresso(m));
      return methods.some(isEspresso) && (firstOther === -1 || methods.slice(firstOther).every((m) => !isEspresso(m)));
    };
    // On the list, check each card separately.
    for (const lang of ['en', 'ja']) {
      const cards = page(`${lang}/index.html`).split('class="cafe-card"').slice(1);
      expect(cards.length).toBeGreaterThan(0);
      for (const card of cards) expect(espressoFirst(methodsIn(card))).toBe(true);
    }
    for (const id of ['sample-espresso-bar', 'sample-drip-house', 'sample-roastery', 'sample-doutor-harajuku']) {
      expect(espressoFirst(methodsIn(page(`en/cafe/${id}/index.html`)))).toBe(true);
    }
  });

  it("shows a chain store's chain methods", () => {
    const { tables } = readTables();
    for (const [store, chain] of [['sample-tullys-shibuya', 'tullys'], ['sample-doutor-harajuku', 'doutor']]) {
      const expected = tables.methods.filter((m) => m.chain_id === chain).map((m) => m.method).sort();
      const html = page(`en/cafe/${store}/index.html`);
      expect(methodsIn(html).sort()).toEqual(expected);
      expect(html).toContain(`data-chain-id="${chain}"`);
    }
  });
});

describe('not found', () => {
  it('shows a 404 in both languages with a link to the list', () => {
    const html = page('404.html');
    expect(html).toContain('Page not found');
    expect(html).toContain('ページが見つかりません');
    expect(html).toContain(`href="${BASE}/en/"`);
    expect(html).toContain(`href="${BASE}/ja/"`);
  });
});
