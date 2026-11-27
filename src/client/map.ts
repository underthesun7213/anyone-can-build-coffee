// Draws the list-page map with Leaflet (docs/plans/03-map.md, ADR-0007).
// Decisions live in src/lib/map.ts; this file only wires them to the DOM.
// Gestures follow docs/research/design-references/map-gestures.md: one finger scrolls
// the page (hint: use two fingers), a touch-only "Move map" toggle allows one-finger
// panning, and on desktop Ctrl/⌘ + wheel zooms while the plain wheel scrolls (hint).

import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import type { Lang } from '../lib/codes.ts';
import {
  boundsOf,
  HINT_MS,
  MARKER_SIZE,
  mapOptions,
  markerHtml,
  popupHtml,
  TILE_OPTIONS,
  TILE_URL,
  touchShowsHint,
  wheelAction,
  type MapPoint,
} from '../lib/map.ts';

function showFailure(el: HTMLElement) {
  el.dataset.state = 'failed';
}

function makeHint(el: HTMLElement) {
  const hint = document.createElement('div');
  hint.className = 'map-hint';
  hint.setAttribute('aria-hidden', 'true'); // visual help only; the keyboard help is linked with aria-describedby
  el.appendChild(hint);
  let timer: number | undefined;
  return (text: string) => {
    hint.textContent = text;
    hint.dataset.visible = 'true';
    window.clearTimeout(timer);
    timer = window.setTimeout(() => {
      hint.dataset.visible = 'false';
    }, HINT_MS);
  };
}

function addMoveToggle(map: L.Map, el: HTMLElement, label: string) {
  const Toggle = L.Control.extend({
    onAdd() {
      const button = L.DomUtil.create('button', 'map-toggle button') as HTMLButtonElement;
      button.type = 'button';
      button.textContent = label;
      button.setAttribute('aria-pressed', 'false');
      L.DomEvent.disableClickPropagation(button);
      const set = (on: boolean) => {
        if (on) map.dragging.enable();
        else map.dragging.disable();
        button.setAttribute('aria-pressed', String(on));
        el.dataset.dragging = String(on);
      };
      button.addEventListener('click', () => set(!map.dragging.enabled()));
      // Turn it off again when the user taps anywhere outside the map, so the page can't stay stuck.
      document.addEventListener('pointerdown', (e) => {
        if (map.dragging.enabled() && !el.contains(e.target as Node)) set(false);
      });
      return button;
    },
  });
  new Toggle({ position: 'topright' }).addTo(map);
}

export function initMap(el: HTMLElement) {
  const dataEl = document.getElementById('map-data');
  if (!dataEl) return showFailure(el);
  const points = JSON.parse(dataEl.textContent ?? '[]') as MapPoint[];
  const lang = (el.dataset.lang ?? 'en') as Lang;
  const detailsLabel = el.dataset.details ?? 'Details';
  const isTouch = window.matchMedia('(pointer: coarse)').matches;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isMac = /Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent);

  const map = L.map(el, mapOptions(isTouch, reduceMotion));
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

  const showHint = makeHint(el);
  const wheelHint = (isMac ? el.dataset.hintWheelMac : el.dataset.hintWheel) ?? '';

  // Desktop: plain wheel scrolls the page and shows a hint; Ctrl/⌘ + wheel zooms.
  el.addEventListener(
    'wheel',
    (e) => {
      if (wheelAction(e) === 'zoom') {
        e.preventDefault();
        const step = e.deltaY < 0 ? 0.5 : -0.5;
        map.setZoomAround(map.mouseEventToContainerPoint(e), map.getZoom() + step);
      } else {
        showHint(wheelHint);
      }
    },
    { passive: false },
  );

  // Touch: one finger scrolls the page and shows a hint, unless the toggle is on.
  if (isTouch) {
    el.addEventListener(
      'touchmove',
      (e) => {
        if (touchShowsHint(e.touches.length, map.dragging.enabled())) showHint(el.dataset.hintTouch ?? '');
      },
      { passive: true },
    );
    addMoveToggle(map, el, el.dataset.toggleLabel ?? 'Move map');
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
