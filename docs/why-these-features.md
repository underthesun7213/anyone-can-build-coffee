# Why these features

Status: **draft by Claude, for the founder to rewrite in their own words.** In the class format this document is the founder's reasoning, so the reasons below are proposals, not decisions.

Source of the features: [PRD v0.6](prd/PRD-v0.6.md) §7 (screens) and §8 (F1–F10).

## How to choose

Pick what a coffee person standing in Shibuya, Omotesando or Harajuku needs first, to decide where to get espresso. Break ties by how much each feature unblocks the next, and by how hard it is to build.

## Done so far

| Feature | Plan | State |
|---|---|---|
| Site skeleton: data, validation, EN/JA pages, CI and deploy | [01-skeleton](plans/01-skeleton.md) | merged (#7) |
| F4 Language | part of 01 | done; keeping the query string on switch comes with F2 |
| F3 Cafe detail, first version | part of 01 | name, methods, chain note, directions. Not yet: sources and dates, closed or moved notices |
| Design basics | [02-design](plans/02-design.md) | merged (#8) |
| F8 Empty states, first version | part of 01 | only the 404 |
| F10 Map | [03-map](plans/03-map.md) | in review (#10) |

## Next, in the order to build them (proposal)

| Order | Feature | Plan (to write when it starts) | Why, for a person using the site |
|---|---|---|---|
| 1 | **F1** Near me / by station (SC-02 station picker) | `plans/near-me-and-stations.md` | The question is "where can I get espresso *near here*". Today the list is just sorted by station id. The map's "my location" also waits for this. |
| 2 | **F3** Sources and dates on the cafe page; closed and moved cafes | `plans/sources-and-dates.md` | The product's promise is that every fact shows where it came from and when. Without that, a coffee person can't tell a guess from a check. |
| 3 | **F2** Filters (espresso first, then methods) | `plans/filters.md` | Once there are 25–30 cafes, "semi-automatic only" is the filter the founder started the project for. It also fixes the language switch keeping the query. |
| 4 | **F8** Empty and error states | `plans/empty-states.md` | Location denied, nothing nearby, everything filtered out: F1 and F2 create these cases, so they come right after. |
| 5 | **F9** Chain guide (SC-06) | `plans/chain-guide.md` | The chain research is done. One page per chain explains many stores at once, which is cheap coverage. |
| 6 | **SC-05** About, privacy and OSM credit | `plans/about-page.md` | Needed before the public launch (M2): the privacy notice, how sources work, attribution. |
| 7 | **Data from the sheet** (fetch script, Google Sheet) | `plans/sheet-to-csv.md` | Replaces the sample CSVs with real cafes. Needed before launch, after the screens are settled. |
| 8 | **F5** Correction form | `plans/correction-form.md` | Lets cafes and visitors fix data. Needs the Google Form, which the founder sets up. |
| 9 | **F6** "Was it as listed?" + GoatCounter | `plans/was-it-as-listed.md` | The accuracy metric. Needs the analytics account. |
| 10 | **F7** Shareable list (SC-04) | `plans/shareable-list.md` | The PRD puts it in M2, with the launch posts. |

Small items with no plan of their own: the light PWA (manifest plus a network-first service worker, without map tiles), the validation warning rules, and `astro check` in CI. Each goes with the nearest feature that needs it.

## Left out, and why

| Feature | Why not now |
|---|---|
| Station pages for search | PRD §4 non-goal for v1. Thin with 25–30 cafes. Revisit at M3. |
| Store-by-store exceptions at chain stores | The founder's rule: a store that differs from its chain is that store's issue (PRD v0.6 §19 #4). |
| Roast level, iced or seasonal menus | PRD §4 non-goals. |
| Machine brands or models | Only the type is recorded (semi-automatic, fully automatic, none). |
| Owner badges, email or LINE updates | PRD §16: not in v1. |
