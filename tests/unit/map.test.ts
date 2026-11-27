// Done when — map (docs/plans/03-map.md §3): the parts decided in src/lib/map.ts.

import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { buildSiteData } from '../../src/lib/load-data.ts';
import { readTables } from '../../src/lib/tables.ts';
import { ICON_NAME } from '../../src/lib/icons.ts';
import {
  ATTRIBUTION,
  boundsOf,
  MARKER_SIZE,
  mapOptions,
  mapPoints,
  markerHtml,
  markerStatus,
  popupHtml,
  TILE_OPTIONS,
  TILE_URL,
} from '../../src/lib/map.ts';

const data = buildSiteData(readTables().tables);
const listed = data.cafes.filter((c) => c.status === 'active');
const points = mapPoints(listed, 'en', (c) => `/anyone-can-build-coffee/en/cafe/${c.id}/`);

describe('map markers', () => {
  it("draws markers whose colour and icon match the cafe's espresso badge", () => {
    for (const status of ['espresso_semi', 'espresso_auto', 'espresso_none'] as const) {
      const html = markerHtml(status);
      expect(html).toContain(`badge-${status}`); // same status class → same tokens as the badge
      expect(html).toContain(`data-icon="${ICON_NAME[status]}"`); // same icon as the badge
    }
    const css = readFileSync('src/styles/map.css', 'utf8');
    for (const s of ['semi', 'auto', 'none']) {
      expect(css).toMatch(new RegExp(`\\.map-marker\\.badge-espresso_${s}\\s*\\{[^}]*var\\(--status-${s}-bg\\)`));
    }
    // A cafe with both machines shows semi, the stronger badge.
    const roastery = listed.find((c) => c.id === 'sample-roastery')!;
    expect(markerStatus(roastery)).toBe('espresso_semi');
  });

  it('opens a popup with the name, the espresso badge and a link to the cafe page in the same language', () => {
    const p = { ...points[0], name: 'Café <b>"Test"</b>' };
    const en = popupHtml(p, 'en', 'Details');
    expect(en).toContain('Café &lt;b&gt;&quot;Test&quot;&lt;/b&gt;'); // escaped, not injected
    expect(en).toContain(`badge-${p.status}`);
    expect(en).toContain(`href="${p.href}"`);
    expect(en).toContain('hreflang="en"');
    const jaPoint = mapPoints(listed, 'ja', (c) => `/anyone-can-build-coffee/ja/cafe/${c.id}/`)[0];
    const ja = popupHtml(jaPoint, 'ja', '詳しく見る');
    expect(ja).toContain('/anyone-can-build-coffee/ja/cafe/');
    expect(ja).toContain('詳しく見る');
  });

  it('starts with every marker in view', () => {
    const b = boundsOf(points)!;
    for (const p of points) {
      expect(p.lat).toBeGreaterThanOrEqual(b[0][0]);
      expect(p.lat).toBeLessThanOrEqual(b[1][0]);
      expect(p.lng).toBeGreaterThanOrEqual(b[0][1]);
      expect(p.lng).toBeLessThanOrEqual(b[1][1]);
    }
    expect(boundsOf([])).toBeNull();
    const client = readFileSync('src/client/map.ts', 'utf8');
    expect(client).toMatch(/map\.fitBounds\(bounds/);
  });
});

describe('OSM tile policy', () => {
  it('always shows the OpenStreetMap attribution', () => {
    expect(TILE_URL).toBe('https://tile.openstreetmap.org/{z}/{x}/{y}.png');
    expect(TILE_OPTIONS.attribution).toBe(ATTRIBUTION);
    expect(ATTRIBUTION).toContain('OpenStreetMap');
    expect(ATTRIBUTION).toContain('contributors');
    // Leaflet's attribution control must not be turned off.
    expect(readFileSync('src/client/map.ts', 'utf8')).not.toMatch(/attributionControl\s*:\s*false/);
    expect(mapOptions(false)).not.toHaveProperty('attributionControl', false);
  });

  it('requests only the tiles in view: no prefetching, offline download or tile caching', () => {
    expect(TILE_OPTIONS).not.toHaveProperty('keepBuffer');
    const client = readFileSync('src/client/map.ts', 'utf8');
    expect(client).not.toMatch(/keepBuffer|serviceWorker|caches\.|prefetch|offline/i);
    // No service worker exists yet that could cache tiles.
    expect(() => readFileSync('public/sw.js')).toThrow();
  });
});

describe('phone and accessibility', () => {
  it('lets one finger scroll the page on touch screens; two fingers move the map', () => {
    expect(mapOptions(true)).toMatchObject({ dragging: false, touchZoom: true, scrollWheelZoom: false });
    expect(mapOptions(false)).toMatchObject({ dragging: true });
  });

  it('makes each marker a tap target of at least 44 × 44 px', () => {
    expect(MARKER_SIZE).toBeGreaterThanOrEqual(44);
    expect(readFileSync('src/client/map.ts', 'utf8')).toMatch(/iconSize:\s*\[MARKER_SIZE,\s*MARKER_SIZE\]/);
    expect(readFileSync('src/styles/map.css', 'utf8')).toMatch(/\.map-marker\s*\{[^}]*width:\s*44px;[^}]*height:\s*44px;/);
  });

  it('lets keyboard users Tab to a marker and open its popup with Enter', () => {
    expect(mapOptions(true).keyboard).toBe(true);
    const client = readFileSync('src/client/map.ts', 'utf8');
    // Leaflet markers with keyboard: true get tabindex=0 and open their popup on Enter.
    expect(client).toMatch(/L\.marker\([^)]*keyboard:\s*true/);
    expect(client).toMatch(/\.bindPopup\(/);
  });
});
