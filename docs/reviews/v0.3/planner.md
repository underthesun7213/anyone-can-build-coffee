# PRD v0.3 — Handoff readiness review (planner)

Scope: build-readiness only (IA, flows, F1–F8 specs, schema, EN/JA, metrics, consistency). Strategy not reviewed. Source: PRD-v0.3.md only.

**Verdict: Not ready.** The scope is clear and well bounded, but there is no screen list. F1, F2 and F6 lack rules. The schema can't hold what F3 shows. Two of the §9 metrics can't be recorded with the stack in §8.

## Blockers

**B1. No IA or screen list.** §7 lists features, not views. Nobody has decided whether filters, station choice and "pick cafes" (F7) are separate screens or controls on the list, or what the home screen is. There's no route for the privacy notice (§8) or the OSM credit (§6). *Decide:* the screen list and URL routes (see proposal below).

**B2. F1 "sorted … by station" is undefined.** Builders will ask:
- Does the user pick a station from a list, type one, or get a list grouped by station?
- Within a station, what's the order: distance from the station, or name?
- What is the default view when location is denied or still loading ("Works without location permission")?
- Is distance straight-line or walking? Is it shown in m or minutes?

The schema has `station` as a single text field with no station coordinates, so "nearest covered station" (F8) and station-distance sorting can't be computed. Also, "Station data: source to be chosen in M1" means the station list doesn't exist yet. *Decide:* the station model (a stations table with id, name_en, name_ja, lat, lng), whether a cafe can belong to several stations, and the default sort.

**B3. F2 filter logic.** The PRD doesn't say whether "Espresso (any)" plus "Siphon" means OR (either) or AND (both). "Hand-made espresso only" needs a rule too: does a cafe with both a semi-automatic and a fully automatic machine pass? Pre-made (§5) has no filter: is it shown only on the detail page? Should filters persist and appear in the URL so §13 posts like "N cafes near Omotesando that brew by siphon" can link to them? *Decide:* the combination rule, the defaults (all off?), and whether filter state lives in the URL.

**B4. Schema can't flatten to CSV, and it's missing fields.** `methods[] {…}` is nested, but the pipeline is "one spreadsheet → CSV". Is it one row per method, or a second sheet keyed by `id`? Fields features need but the schema lacks:
- F3 "link to the cafe's … posts": there's only `cafe_url`. Social/post URLs need fields.
- F3 address in EN/JA: there's only `address`.
- "OSM-derived fields are kept in their own columns": none are listed (e.g. `osm_id`, `coord_source`).
- `status` values: only `closed | moved`. What value means active? For a moved cafe, is it a new row, and is there a pointer from the old one?
- `method`: a fixed set of codes matching the §5 values.
- `chain`: what counts as a chain (2+ shops? franchise?).

Fields no feature uses: `notes` (public or internal?) and `detail` (shown? in which language?).

**B5. F6 has no storage.** "One tap … No account" on a static site with "No backend": where does the tap go? Options are an analytics custom event (GoatCounter supports these; Cloudflare Web Analytics does, to my knowledge, not, so verify), or a Google Form. What does "no" capture? Which method was wrong? Is there one vote per device (localStorage)? The §9 target "share of yes ≥ 80%" depends on this. It also decides the analytics tool choice that §8 leaves to M1.

**B6. Language and URL handling (F4).** You need to decide:
- URL scheme: `/en/…` and `/ja/…`, or a query string. A static site generator needs this upfront, and F7 share URLs depend on it.
- Default language: browser setting or always one?
- Is the switch remembered?
- Fallback when `name_ja` or `name_en` is missing ("where available").
- Which name shows first in each UI language.
- Are taxonomy labels, source types and the empty-state copy translated, and by whom?
- Do the Google Form (F5) and the privacy notice exist in both languages?

## Should fix

- **S1. F7 shareable list (P1) has no flow.** You need to decide:
  - how cafes are picked (checkbox on cards? on detail?)
  - the URL format (list of ids)
  - a size limit
  - what the recipient sees (a read-only list? sorted how?)
  - what happens with closed/moved or deleted ids
  - whether the list can be named.
- **S2. F8 thresholds.**
  - "No cafe nearby": what radius?
  - "Station not covered": this implies free-text station input that F1 doesn't define.
  - "Clear filters": one button that clears all filters?
  - Missing states: location denied, location error, and outside Japan.
- **S3. F3 detail gaps.**
  - Can one method have several sources? The schema allows one.
  - The directions link: does it use lat/lng or name + address?
  - Method display order.
  - How a stale `checked_at` looks.
  - What a direct URL to a closed cafe returns: 404, or a "closed" page? The cafes are "hidden from lists" but their detail URLs may be shared.
- **S4. F5 entry and prefill.** Where the link lives (the detail page only?), whether the cafe id/name is prefilled, and which fields the form has, beyond the required source link.
- **S5. Metrics vs stack.**
  - "Returning visitors": cookie-less GoatCounter/Cloudflare don't identify returning visitors (verify), so this may be unrecordable. Drop it or define a proxy.
  - "Directions clicks per visit" needs outbound-click events. Confirm the chosen tool records them.
  - "External weekly visitors … read from unique daily visitors": a sum of daily uniques is not weekly uniques. Define the formula.
  - The opt-out only excludes the founder, not the "circle" (G1, §10).
- **S6. Accuracy unit.** "10 oldest entries": is an entry a cafe or a method fact? `checked_at` is per method. What does "still correct" mean when one of three methods changed?
- **S7. Inconsistencies.**
  - §12 needs "8 or more cafes per station" (the station set isn't defined; Harajuku vs Meiji-jingumae?), while §14 says 25–30 cafes.
  - §14 puts F8 in M1 but F7 in M2, though F7's URL design depends on B6.
  - §9's F6 target is tracked from launch, but F6 ships in M2.

## Nice to have

- Loading and offline states for the network-first service worker. What shows when offline with nothing cached?
- A site-wide "data last updated" date.
- Page titles and meta per language. Cheap now, useful for the later station pages.
- Accessibility basics for the filter toggles (labels, focus).
- Card content spec: which fields appear on the list card versus the detail page.

## Proposed screen list (IA)

- **SC-01 Cafe list (home)**: sort toggle (distance / station), filter bar (F2), result count, empty states (F8), select mode (F7).
- **SC-02 Station picker**: covered stations, EN/JA names; feeds SC-01.
- **SC-03 Cafe detail**: F3, the F6 tap, the F5 link (external Google Form), the directions link (external Google Maps).
- **SC-04 Shared list view**: read-only list from the F7 URL; shows a notice for closed ids.
- **SC-05 About / Privacy / Credits**: sources explained, APPI notice, analytics tool, OSM attribution.
- **Global**: EN/JA switch in the header, the language prefix in every route, and a 404 page.
