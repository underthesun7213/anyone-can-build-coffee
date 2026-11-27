// Done when — map (docs/plans/03-map.md §3): what the built pages contain.
// Reads dist/, so run `npm run build` first (`npm run check`).

import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { readTables } from '../../src/lib/tables.ts';

const page = (p: string) => readFileSync(join(process.cwd(), 'dist', p), 'utf8');
const cardIds = (html: string) => [...html.matchAll(/class="cafe-card"[^>]*data-cafe-id="([^"]+)"/g)].map((m) => m[1]);
const mapData = (html: string) =>
  JSON.parse(html.match(/<script type="application\/json" id="map-data">([\s\S]*?)<\/script>/)![1]) as Array<{
    id: string;
    lat: number;
    lng: number;
  }>;

describe('map on the list page', () => {
  it('has one marker point per listed cafe, at its coordinates', () => {
    const byId = new Map(readTables().tables.cafes.map((c) => [c.id, c]));
    for (const lang of ['en', 'ja']) {
      const html = page(`${lang}/index.html`);
      const points = mapData(html);
      expect(points.map((p) => p.id).sort()).toEqual(cardIds(html).sort());
      for (const p of points) {
        const row = byId.get(p.id)!;
        expect(p.lat).toBe(Number(row.lat));
        expect(p.lng).toBe(Number(row.lng));
      }
    }
  });

  it('keeps the list working if the map fails, with a message in the map area', () => {
    for (const [lang, failed] of [['en', 'The map could not load'], ['ja', '地図を読み込めませんでした']]) {
      const html = page(`${lang}/index.html`);
      expect(html).toMatch(/<div class="map"[^>]*data-map[^>]*data-state="loading"/);
      expect(html).toContain(failed); // shown when data-state="failed" and in <noscript>
      expect(html).toContain('<noscript>');
      // The list is plain HTML and doesn't depend on the map.
      expect(cardIds(html).length).toBeGreaterThan(0);
    }
    const css = readFileSync('src/styles/map.css', 'utf8');
    expect(css).toMatch(/\.map\[data-state='failed'\] \.map-failed\s*\{\s*display:\s*inline;/);
  });

  it('has no map on cafe pages and does not load the map script there', () => {
    const html = page('en/cafe/sample-roastery/index.html') + page('ja/cafe/sample-doutor-harajuku/index.html');
    expect(html).not.toContain('data-map');
    expect(html).not.toContain('map-data');
    expect(html).not.toMatch(/leaflet/i);
  });

  it('gives the map about 40% of the screen height on a phone, with the list below', () => {
    const css = readFileSync('src/styles/map.css', 'utf8');
    expect(css).toMatch(/\.map\s*\{[^}]*height:\s*40vh;/);
    const html = page('en/index.html');
    expect(html.indexOf('data-map')).toBeLessThan(html.indexOf('class="cafe-list"'));
  });
});
