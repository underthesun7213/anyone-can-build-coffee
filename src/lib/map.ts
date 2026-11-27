// Map logic with no DOM or Leaflet imports, so it can be unit-tested
// (docs/plans/03-map.md, ADR-0007). src/client/map.ts wires it to Leaflet.

import type { Lang } from './codes.ts';
import { iconSvg, STATUS_SHORT, type EspressoStatus } from './icons.ts';
import type { Cafe } from './load-data.ts';

export interface MapPoint {
  id: string;
  name: string;
  lat: number;
  lng: number;
  status: EspressoStatus;
  href: string;
}

/** OpenStreetMap standard tiles (https://operations.osmfoundation.org/policies/tiles/). */
export const TILE_URL = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png';
export const ATTRIBUTION = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

/**
 * Tile layer options. Only tiles in view are requested: no extra keepBuffer, no
 * prefetching, no offline download (OSM tile policy; ADR-0007 §2).
 */
export const TILE_OPTIONS = {
  attribution: ATTRIBUTION,
  maxZoom: 19,
  minZoom: 12,
} as const;

/** Marker size: at least the 44 px tap target (02-design §2.1). */
export const MARKER_SIZE = 44;

/** The marker follows the strongest badge: semi first, then auto, then none (03-map §5.1). */
export function markerStatus(cafe: Cafe): EspressoStatus {
  const codes = cafe.methods.map((m) => m.code);
  if (codes.includes('espresso_semi')) return 'espresso_semi';
  if (codes.includes('espresso_auto')) return 'espresso_auto';
  return 'espresso_none';
}

export function mapPoints(cafes: Cafe[], lang: Lang, hrefOf: (cafe: Cafe) => string): MapPoint[] {
  return cafes.map((cafe) => ({
    id: cafe.id,
    name: cafe.name[lang],
    lat: cafe.lat,
    lng: cafe.lng,
    status: markerStatus(cafe),
    href: hrefOf(cafe),
  }));
}

/**
 * JSON safe to put inside <script type="application/json">: "<", ">", "&" and the
 * U+2028/U+2029 line separators become \uXXXX escapes, so a value like "</script>"
 * can't end the tag. JSON.parse turns them back into the same characters.
 */
const BACKSLASH = String.fromCharCode(92);
const UNSAFE_IN_SCRIPT = new RegExp(`[<>&${String.fromCharCode(0x2028)}${String.fromCharCode(0x2029)}]`, 'g');

export function jsonForScript(value: unknown): string {
  return JSON.stringify(value).replace(
    UNSAFE_IN_SCRIPT,
    (c) => `${BACKSLASH}u${c.charCodeAt(0).toString(16).padStart(4, '0')}`,
  );
}

export function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/** Marker body: the status icon in a status-coloured circle, the same tokens as the badge. */
export function markerHtml(status: EspressoStatus): string {
  return `<span class="map-marker badge-${status}" data-status="${status}">${iconSvg(status, 20, 'marker-icon')}</span>`;
}

/** Popup: name, badge, link to the cafe page in the same language. Text is escaped. */
export function popupHtml(point: MapPoint, lang: Lang, detailsLabel: string): string {
  return (
    `<div class="map-popup" data-cafe-id="${escapeHtml(point.id)}">` +
    `<strong class="map-popup-name">${escapeHtml(point.name)}</strong>` +
    `<span class="badge badge-${point.status}" data-status="${point.status}">` +
    `${iconSvg(point.status)}<span class="badge-text">${escapeHtml(STATUS_SHORT[point.status][lang])}</span></span>` +
    `<a class="map-popup-link" href="${escapeHtml(point.href)}" hreflang="${lang}">${escapeHtml(detailsLabel)}</a>` +
    `</div>`
  );
}

/** South-west and north-east corners that contain every point, for the first view. */
export function boundsOf(points: Pick<MapPoint, 'lat' | 'lng'>[]): [[number, number], [number, number]] | null {
  if (points.length === 0) return null;
  const lats = points.map((p) => p.lat);
  const lngs = points.map((p) => p.lng);
  return [
    [Math.min(...lats), Math.min(...lngs)],
    [Math.max(...lats), Math.max(...lngs)],
  ];
}

/**
 * Leaflet map options. On touch screens one finger scrolls the page and two fingers
 * move or zoom the map. Markers stay keyboard-reachable (Tab, then Enter).
 */
export function mapOptions(isTouch: boolean) {
  return {
    dragging: !isTouch,
    touchZoom: true,
    scrollWheelZoom: false,
    keyboard: true,
    zoomSnap: 0.5,
  };
}
