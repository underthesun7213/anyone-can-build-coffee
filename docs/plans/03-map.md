# Plan: map on the list page

Status: decisions made; section 3 written from the founder's answers (2026-11-27).

*No real person's name or data in a plan or a prompt.*

Basis: [PRD v0.6](../prd/PRD-v0.6.md) §4 (map moved into v1), §8 F10 · [ADR-0007](../adr/0007-map-leaflet-osm.md) · [02-design](02-design.md) §2.3, §2.6 · [ADR-0003](../adr/0003-coordinates-from-osm-not-google.md)

Founder's choices (2026-11-27):
- **Placement:** a map above the list.
- **Marker tap:** opens a small popup with a link to the cafe page.
- **Library and tiles:** Leaflet with OpenStreetMap tiles.
- **Cafe page:** no map. The founder asked whether Directions is needed or useful. Directions opens Google Maps with the route, which a small map can't do, so the button stays and the page gets no map (ADR-0007 §5).

## 1. The idea

- **The problem:** a list sorted by station doesn't show how cafes sit relative to each other or to where you are walking. Visitors especially think in terms of "which of these is near that corner?"
- **What it costs:** people switch to Google Maps to place each cafe. That brings back the scattered search the product exists to replace.
- **The change:** a map of the listed cafes above the list. Each marker shows the espresso status in the same colours and icons as the badges, and tapping a marker opens a popup with a link to the cafe.
- **What gets better:** at a glance you see where the semi-automatic espresso cafes are in Shibuya, Omotesando and Harajuku, then pick one.
- **Checked with a real person:** *not yet.* Ask M0 interviewees whether they used the map or the list to choose.

## 2. Files it touches

| File | Function or section | Add or change |
|---|---|---|
| `package.json` | dependencies | add: `leaflet` 1.9.4 (pinned) |
| `src/lib/icons.ts` | status icon SVGs | add: the three icons as strings, shared by badges and markers |
| `src/components/EspressoBadge.astro` | icon | change: use `icons.ts` |
| `src/lib/map.ts` | `markerStatus`, `mapPoints`, `markerHtml`, `popupHtml`, `boundsOf`, `mapOptions`, `TILE_URL`, `TILE_OPTIONS` | add: pure functions and settings, no DOM, so they can be unit-tested |
| `src/client/map.ts` | `initMap` | add: browser code that reads the embedded points and draws the Leaflet map |
| `src/styles/map.css` | map box, markers, popup | add: tokens only |
| `src/pages/[lang]/index.astro` | map section | change: map container with a fallback message, embedded JSON points, the map script |
| `src/i18n/strings.ts` | map strings | add: map label, fallback, "Details" |
| `tests/unit/map.test.ts`, `tests/build/map.test.ts` | | add |
| `docs/architecture/design-system.md` | components | change: add the map marker and popup |

## 3. Done when

*You write this section yourself.* Written from the founder's answers on 2026-11-27.

**Map and markers**
- When the list page opens, there should be one marker per listed cafe, at that cafe's coordinates.
- When a marker is drawn, its colour and icon should match the cafe's espresso badge. Semi-automatic, fully automatic and none use the same tokens and icons as the badges.
- When a marker is tapped, a popup should show the cafe name, its espresso badge and a link to the cafe page in the same language.
- When the map first opens, every marker should be in view.

**OSM policy and failure**
- When the map is shown, "© OpenStreetMap contributors" should always be visible on it.
- When the map script or the tiles fail, the list should still work, and the map area should say the map could not load.
- When the map runs, it should request only the tiles in view. There is no prefetching, offline download or service-worker caching of tiles.
- When a cafe page opens, it should have no map and should not load the map script.

**Phone and accessibility**
- When the page is 375 px wide, the map should take about 40% of the screen height, with the list below it.
- When someone scrolls the page with one finger over the map on a touch screen, the page should scroll. Moving the map takes two fingers.
- When a marker is tapped, its tap target should be at least 44 × 44 px.
- When someone uses the keyboard, they should be able to Tab to a marker and open its popup with Enter.

**Added while building**
- When a cafe name contains `</script>` or similar, the embedded map data should stay inside its script tag (`cannot be broken out of by a cafe name containing </script>`). Added after an automated security review found the JSON escape did nothing.

**Added after the founder found the map seemed not to move** (from [research/design-references/map-gestures.md](../research/design-references/map-gestures.md), founder approved 2026-11-27)
- When someone drags with one finger on a touch screen, the page should scroll and a "use two fingers" hint should appear without blocking the scroll.
- When the touch-only "Move map / 地図を動かす" toggle is on, one finger should move the map and the button should show `aria-pressed="true"`. A tap outside the map turns it off. Leaflet's zoom buttons are 44 px.
- On desktop, the plain wheel should scroll the page and show a "Ctrl (⌘) + scroll" hint; with Ctrl/⌘ held, the wheel should zoom the map.
- When the user prefers reduced motion, zoom and pan should have no animation or inertia.

Decisions for these: the hint shows on every missed gesture for 1.5 s, and the toggle turns off when the user taps outside the map.

- Test count before: 22 . Test count when done: 39 (12 planned lines, each with an automated test, plus 5 added while building; the phone lines are also checked by hand in the browser pane). If building shows a test is needed that isn't listed, add it, name it here, and update this number. Never drop a listed test to keep the count.

## 4. Not in this plan

- The user's own location on the map, and distance sorting (F1).
- Filters that also filter the map (F2).
- Marker clustering, a dark map style, a full-screen map.
- A map on the cafe page (founder's choice: Directions covers it).
- Another tile provider. Revisit per ADR-0007 if traffic grows.

## 5. Decisions for me

1. **Marker colour for a cafe with both machines?** *Decided: semi-automatic*, the stronger badge, which shows first.
2. **Where the map code lives?** *Decided:* the pure logic goes in `src/lib/map.ts`, which is testable, and only the Leaflet wiring goes in `src/client/map.ts`.
3. **Map height?** *Decided:* `40vh`, at least 220 px and at most 480 px.
