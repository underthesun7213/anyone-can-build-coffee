// Draws the list-page map with Leaflet (docs/plans/03-map.md, ADR-0007).
// All decisions live in src/lib/map.ts; this file only wires them to the DOM.

import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import type { Lang } from '../lib/codes.ts';
import {
  boundsOf,
  MARKER_SIZE,
  mapOptions,
  markerHtml,
  popupHtml,
  TILE_OPTIONS,
  TILE_URL,
  type MapPoint,
} from '../lib/map.ts';

function showFailure(el: HTMLElement) {
  el.dataset.state = 'failed';
}

export function initMap(el: HTMLElement) {
  const dataEl = document.getElementById('map-data');
  if (!dataEl) return showFailure(el);
  const points = JSON.parse(dataEl.textContent ?? '[]') as MapPoint[];
  const lang = (el.dataset.lang ?? 'en') as Lang;
  const detailsLabel = el.dataset.details ?? 'Details';
  const isTouch = window.matchMedia('(pointer: coarse)').matches;

  const map = L.map(el, mapOptions(isTouch));
  const tiles = L.tileLayer(TILE_URL, TILE_OPTIONS).addTo(map);
  tiles.on('tileerror', () => showFailure(el));

  for (const point of points) {
    const icon = L.divIcon({
      html: markerHtml(point.status),
      className: 'map-marker-wrap',
      iconSize: [MARKER_SIZE, MARKER_SIZE],
      iconAnchor: [MARKER_SIZE / 2, MARKER_SIZE / 2],
      popupAnchor: [0, -MARKER_SIZE / 2],
    });
    L.marker([point.lat, point.lng], { icon, keyboard: true, title: point.name, alt: point.name })
      .bindPopup(popupHtml(point, lang, detailsLabel))
      .addTo(map);
  }

  const bounds = boundsOf(points);
  if (bounds) map.fitBounds(bounds, { padding: [MARKER_SIZE, MARKER_SIZE], maxZoom: 16 });
  el.dataset.state = 'ready';
}

const el = document.querySelector<HTMLElement>('[data-map]');
if (el) {
  try {
    initMap(el);
  } catch {
    showFailure(el);
  }
}
