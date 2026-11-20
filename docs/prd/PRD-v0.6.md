# PRD — Coffee brewing finder, Japan (working name)

Status: Draft v0.6 · Date: 2026-11-20 · Owner: founder (solo, hobby) · Previous: [v0.5](PRD-v0.5.md)

> v0.6 applies the founder's decisions on the v0.5 reviews ([reviews/v0.5](../reviews/v0.5/)), listed in §19: M0 now tests the espresso question; the product records only *whether* a cafe makes espresso on a machine (semi-automatic or fully automatic), not the machine model; chain stores show their chain's information; there is no time budget; and the revenue wording is fixed. Items marked **[verify in M1]** depend on a tool's behaviour that hasn't been checked yet.

---

## 1. Brief

**One line.** Coffee people in Japan can find cafes that make espresso-based coffee on an espresso machine — semi-automatic or fully automatic — before they go.

**What it is.** A bilingual (English / Japanese) list of cafes, by distance or by station, plus a guide to the coffee chains found across Japan. It answers one question first: *does this cafe make espresso on a machine, and is it semi-automatic or fully automatic?* It does not record machine brands or models. Other brewing methods (hand drip, siphon and so on) are recorded too, as secondary information. Every fact shows its source and when it was checked.

**What it is not.** Not a review site, not a "we visited every cafe" guide, not a ratings, ordering, interior, dessert or photo guide.

**Project type.** An undergraduate side project. No monetization for now. If running costs appear later, ads may be considered then. No fixed time budget.

## 2. Problem and evidence

**Where it started:** the founder wants to drink coffee made on an espresso machine, 3–5 times a week. Finding out whether a cafe makes espresso on a machine — and what kind — takes 30+ minutes across maps, Instagram and reviews.

**Evidence:** none yet beyond the founder. The one outside interview (a casual drinker) said it "wasn't a big problem." M0 (§14) decides whether to build.

## 3. Users

Coffee people living in or visiting Japan who want espresso-based coffee made on a machine: espresso regulars first, then cafe hoppers (カフェ巡り) and visitors planning coffee stops. Many Japanese coffee people are used to dark-roast drip; the espresso filter lets them find something different.

**Not for:** people happy with any coffee; people choosing on interior, desserts or photos.

## 4. Goals and non-goals

**Goals (v1)**
- G1. People outside the founder's circle use it to choose a cafe.
- G2. Every listed cafe says whether it makes espresso on a machine, and whether that machine is semi-automatic or fully automatic, with a source and a date. Other brewing methods are added when found.
- G3. Every chain with a store in the launch area has a chain guide entry.

**Non-goals (v1):** monetization · machine brands or models · store-by-store exceptions at chain stores · grades or "verified" labels · iced or seasonal menus · roast level · reviews, ratings, ordering · interiors, desserts · a map · station pages for search.

## 5. Brewing taxonomy

A cafe can have several methods. Each method has a code, used in the data, filters and URLs.

| Group | Code | EN label | JA label |
|---|---|---|---|
| Espresso | `espresso_semi` | Semi-automatic espresso (incl. lever) | セミオート / レバー式エスプレッソ |
| Espresso | `espresso_auto` | Fully automatic espresso | 全自動エスプレッソ |
| Espresso | `espresso_none` | No espresso machine (filter / drip) | エスプレッソマシンなし（フィルター / ドリップ） |
| Hand-brewed | `hand_drip` | Hand drip / pour-over | ハンドドリップ |
| Hand-brewed | `siphon` | Siphon | サイフォン |
| Hand-brewed | `french_press` | French press | フレンチプレス |
| Hand-brewed | `aeropress` | AeroPress | エアロプレス |
| Machine-brewed | `batch_brew` | Drip machine / batch brew | マシンドリップ / バッチブリュー |
| Pre-made | `premade` | Pre-made or packaged | 作り置き / パック |

- **Priority:** the Espresso group is primary. Every listed cafe must have its espresso status recorded: `espresso_semi`, `espresso_auto` or `espresso_none`. For a chain store, the chain's status is its status (F9). The other groups are secondary: recorded when found, never required.
- **What is recorded:** only the type (semi-automatic, fully automatic, or none). Brands and models are not recorded. Examples from the founder's research: Tully's Coffee is semi-automatic espresso; Doutor is filter coffee.
- **Curation order:** cafes that make espresso on a machine are researched and added first.
- `premade` is recorded **only when known**. It appears on the detail page and has no filter.
- Batch brew hold time is not tracked.
- **Chain:** a brand with **5 or more shops in Japan**. Chain vs. independent is **not a main axis**: there is no filter for it. A chain store uses its chain's information and links to its chain guide entry (F9).

## 6. Sources

Every method row has one **source type, link and checked date**, plus an optional second link. The link is required for every source type except `visit`. There are no grades.

Any of these sources is enough for the espresso status, including an article or post found by an ordinary web search (`third_party`). That is how the founder learned the Tully's and Doutor examples in §5.

| Code | Source | EN label | JA label |
|---|---|---|---|
| `cafe_site` | Cafe's website or menu | Cafe website | 公式サイト |
| `cafe_social` | Cafe's own social account (linked, never copied) | Cafe's post | 店舗の投稿 |
| `owner` | Owner correction via the form | From the cafe | 店舗からの情報 |
| `visit` | Founder saw it in person | Seen in person | 現地で確認 |
| `third_party` | Blog or article | Article | 記事 |

When a method's `checked_at` is more than 12 months old, the detail page shows "Checked over a year ago" / 「1年以上前の情報」 next to it.

## 7. Screens and routes

Every route starts with a language prefix: `/en/` or `/ja/` (§10).

| ID | Screen | Route | Contains |
|---|---|---|---|
| SC-01 | **Cafe list (home)** | `/{lang}/` | Sort toggle (Near me / By station), filter bar (F2), result count, list cards, select mode (F7), empty states (F8) |
| SC-02 | **Station picker** | `/{lang}/stations` | Covered stations with EN/JA names and cafe counts; tapping one opens SC-01 for that station |
| SC-03 | **Cafe detail** | `/{lang}/cafe/{id}` | F3 content, "Was it as listed?" (F6), "Suggest a correction" (F5), directions |
| SC-04 | **Shared list** | `/{lang}/list?c={ids}` | Read-only list from a share link (F7) |
| SC-05 | **About** | `/{lang}/about` | How sources work, privacy notice (analytics tool, Google Form, APPI), OSM attribution, "add a cafe" form link, data last updated |
| SC-06 | **Chain guide** | `/{lang}/chains` and `/{lang}/chains/{chain_id}` | List of chains; one page per chain (F9) |
| — | **404** | any unknown route | Link back to SC-01 |
| — | **Offline** | shown by the service worker | "You're offline" when nothing is cached |

**Global:** header with the site name and EN / JA switch; footer with "Data last updated {date}" and links to SC-05.

**Global:** the header also links to the chain guide (SC-06).

**List card (SC-01, SC-04):** cafe name, station and distance, the **espresso status first** (semi-automatic / fully automatic / no espresso machine), then up to 2 more method chips, and the chain name if it is a chain store.

## 8. Feature rules

### F1 — Cafe list and sorting
- **First visit:** the site asks for location.
  - Granted → SC-01 sorted by distance from the user.
  - Denied, error or still loading after 5 s → SC-02 station picker.
- **Distance:** straight-line, computed on the device, shown in metres (e.g. "350 m"). Coordinates never leave the device.
- **By station:** each cafe belongs to **one station**: the nearest covered station, computed at build time and stored as `station_id`. Within a station, cafes are sorted by distance from the station.
- Sort choice and selected station are kept in the URL: `?sort=near` or `?st={station_id}`.

### F2 — Filters
- **All filters are off by default.**
- **Espresso group** (choose one or neither): "Any espresso" (`espresso_semi` or `espresso_auto`) or "Hand-made espresso only" (`espresso_semi`). A cafe with both a semi-automatic and a fully automatic machine passes "Hand-made espresso only".
- **Hand-brewed group** (any number): Hand drip, Siphon, French press, AeroPress. Within the group, **OR**: the cafe needs at least one of the chosen methods.
- A chain store is filtered by its chain's methods.
- The Espresso group is shown first in the filter bar. Other groups sit behind "More methods".
- **Exclusion:** "Hide batch-brew-only" removes cafes whose only non-espresso method is `batch_brew`.
- There is no chain filter.
- **Between groups:** **AND**.
- **Filter state is in the URL**, e.g. `/en/?st=omotesando&f=siphon`. Posts can link straight to a filtered view.

### F3 — Cafe detail
- Name (UI language first, the other below), address in the UI language, station and distance.
- Methods grouped as in §5. Each shows its source label, link, checked date, and the stale note if older than 12 months.
- `premade`, when known, appears as a separate note: "Some drinks are pre-made" / 「一部作り置きあり」.
- **Espresso status first**, then other methods.
- **Chain store:** shows the chain's methods, with sources, and a link "About {chain name}" to its chain guide page. Chain stores have no method rows of their own; if one store differs from its chain, that is not covered (§4).
- Links: cafe website, Instagram (or other social link), **Directions** → `https://www.google.com/maps/dir/?api=1&destination={lat},{lng}`.
- **Closed cafe:** the URL still works and shows "This cafe has closed" / 「閉店しました」 with the last known data greyed out.
- **Moved cafe:** shows "This cafe has moved" with a link to the new entry (`moved_to`).

### F4 — Language
See §10.

### F5 — Correction form
- One **bilingual** Google Form: every label in English and Japanese.
- Fields:
  - Cafe — **prefilled** with id and name via a prefilled form link
  - What's wrong — choice: method missing / method wrong / closed / moved / other
  - Correct information — text
  - **Source link** — required
  - Contact — optional, never published
- **Entry points:** "Suggest a correction" on SC-03; "Add a cafe" on SC-05 (same form, cafe field empty).
- **Workflow:** the founder reviews each response, edits the sheet and redeploys. Nothing changes on the site until then.

### F6 — "Was it as listed?"
- Two buttons on SC-03: **Yes** / **No**.
- Recorded as an analytics custom event: `listed-yes/{cafe_id}` or `listed-no/{cafe_id}` **[verify in M1: GoatCounter custom events]**.
- One answer per cafe per device, remembered in localStorage.
- "No" shows the correction form link (F5).

### F7 — Shareable list
- On SC-01, a "Select" toggle turns on checkboxes on cards. Up to **20 cafes**.
- "Share" creates `/{lang}/list?c=id1,id2,…` in the order selected, and copies it.
- **The recipient (SC-04)** sees a read-only list in that order, with distance if they allow location. Closed or moved cafes are shown with their status. Unknown ids are skipped, with a note "1 cafe is no longer listed."
- No names or accounts in v1.

### F9 — Chain guide
- **Purpose:** one page per coffee chain found across Japan (e.g. Komeda's Coffee, Doutor, Tully's), so people know what to expect at any of its stores.
- **SC-06 list:** chains sorted by number of stores in the launch area, then by name. Each row shows the chain's espresso status.
- **Chain page:**
  - Name (EN / JA) and official website
  - Espresso status: whether espresso-based drinks are made on a machine, and what kind
  - Other typical methods
  - A short note on what the chain is known for (e.g. drip-focused, food-focused)
  - Each fact with a source, link and date, as in §6
  - One line: "This describes the chain as a whole; individual stores are not checked." / 「チェーン全体の情報です。店舗ごとの違いは確認していません。」
  - Stores of that chain in the covered area, linking to SC-03
- **Scope in v1:** chains with at least one store in the launch area. More chains Later.
- Research plan: [research/chains.md](../research/chains.md).

### F8 — Empty and error states

| Situation | Shown |
|---|---|
| No cafe within **1.5 km** of the user (incl. outside Japan) | "No cafes near you yet. Nearest covered station: {name} ({distance})" + link to SC-02 |
| Location denied or failed | SC-02 station picker |
| All results filtered out | "No cafes match these filters" + one **Clear all filters** button |
| Offline, nothing cached | Offline screen |

## 9. Data

Four sheets in one spreadsheet — `cafes`, `chains`, `methods`, `stations` — each exported to its own CSV.

**`cafes`** — one row per cafe

| Field | Notes |
|---|---|
| `id` | URL slug, e.g. `about-life-shibuya` |
| `name_en`, `name_ja` | At least one required |
| `address_en`, `address_ja` | At least one required |
| `lat`, `lng` | From OSM or geocoded from the published address; never from Google |
| `coord_source` | `osm` or `geocoded` |
| `osm_id` | Optional |
| `station_id` | Nearest covered station, computed at build |
| `status` | `active`, `closed` or `moved` |
| `moved_to` | `id` of the new entry when `moved` |
| `chain_id` | → `chains.id`; empty for independent cafes |
| `cafe_url`, `social_url` | Optional |
| `internal_note` | Never published |

**`chains`** — one row per chain

| Field | Notes |
|---|---|
| `id` | e.g. `komeda`, `doutor`, `tullys` |
| `name_en`, `name_ja` | |
| `site_url` | Official website |
| `note_en`, `note_ja` | Short note on what the chain is known for |
| `checked_at` | YYYY-MM-DD |

**`methods`** — one row per method per cafe, or per chain for its typical methods

| Field | Notes |
|---|---|
| `cafe_id` | → `cafes.id`, or empty for a chain row |
| `chain_id` | → `chains.id` for a chain's method; empty for a cafe row. Exactly one of `cafe_id` / `chain_id` is set. A cafe with a `chain_id` in `cafes` has no rows of its own. |
| `method` | Code from §5 |
| `source_type` | Code from §6 |
| `source_url` | Required, except when `source_type` is `visit` |
| `source_url_2` | Optional |
| `checked_at` | YYYY-MM-DD |

**`stations`** — covered stations only

| Field | Notes |
|---|---|
| `id` | e.g. `shibuya`, `omotesando`, `meiji-jingumae` |
| `name_en`, `name_ja` | e.g. Meiji-jingumae (Harajuku) / 明治神宮前〈原宿〉 |
| `lat`, `lng` | |
| `source` | Where the coordinates came from |

Station source chosen in M1: OSM, MLIT 国土数値情報, or ekidata.jp, after checking each one's terms.

- **Moved cafe:** if the new location is inside the covered area, add a new row and set the old row to `moved` with `moved_to`. Otherwise mark the old row `closed`.
- **Accuracy unit (§12):** a **cafe**. A cafe counts as correct if every listed method still holds.

## 10. Language and URLs

- **Routes:** `/en/…` and `/ja/…`. The site generator builds both.
- **Root `/`:** goes to the language last chosen (localStorage). If none, `ja` when the browser's language is Japanese, otherwise `en`.
- **Switch:** the header switch keeps the same page and query, e.g. `/en/cafe/x` ↔ `/ja/cafe/x`.
- **Cafe names:** UI language first. If that language is missing, show the other one.
- **Translations:** UI strings, method and source labels and empty states are kept in one strings file with EN and JA, translated by the founder.
- **Also bilingual:** the Google Form and the privacy notice.
- **Per-language page titles and descriptions** on every page.

## 11. Technical approach

- **Build:** spreadsheet → four CSVs → static site generator → free static hosting on a subdomain of the founder's personal domain.
- **Light PWA:** web manifest for "add to home screen". The service worker is **network first**: it serves cached pages only when offline.
- **Analytics:** **GoatCounter** (cookie-less), because it records custom events, used by F6 and directions clicks **[verify in M1]**.
  - Founder's own browser excluded with GoatCounter's opt-out.
  - Outbound "Directions" clicks recorded as events `directions/{cafe_id}`.
- **Privacy:** notice on SC-05 covers GoatCounter, the Google Form and APPI. Distance is computed on the device.
- **Accessibility:** filters and toggles are buttons with a pressed state and visible focus.
- **Abuse:** the founder reviews every correction. If corrections pass about 20 a week, add rate limits or a review queue.

## 12. Metrics

Read from GoatCounter. The founder is excluded by the opt-out. Friends can't be excluded; at this scale that noise is accepted.

| Metric | How it's recorded | Target |
|---|---|---|
| Weekly visits | GoatCounter visits per week (not unique people) | ≥ 100 by month 3; stop floor 20 (§15) |
| Direct visits | Visits with no referrer, a proxy for people coming back or using the home-screen icon | Recorded; target set after month 1 |
| Directions clicks per visit | `directions/*` events ÷ visits | Recorded; target set after month 1 |
| "Was it as listed?" | `listed-yes` ÷ (`listed-yes` + `listed-no`) | ≥ 80%, from M1 launch |
| Accuracy | 10 oldest cafes or chains re-checked each month, using the same kind of source as before | ≥ 8 of 10 correct |

"Returning visitors" from v0.3 is dropped: a cookie-less tool can't identify returning people. "Direct visits" replaces it.

## 13. Launch area

**Shibuya · Omotesando · Meiji-jingumae (Harajuku)** — 3 stations, **8+ independent cafes each**, so **25–30 independent cafes** at launch. Chain stores in the area are listed too, but don't count toward that number: each one only needs a location, because its information comes from the chain guide.

Whether espresso status is a useful question in this area — or whether almost every cafe here has a machine — is decided after the M0 data (§14, test 2), not before.

## 14. M0 — discovery

**1. Interviews: 3 coffee people.**
- Recruit through X, Threads, specialty-cafe accounts, and in person at cafes in the launch area.
- Don't recruit in the planned launch communities.
- Record a pain rating (1–5) and any workaround.

**2. Uncertainty test (espresso).** For 30 candidate cafes in the launch area, record two things:
- how many have an espresso status (semi-automatic / fully automatic / none) you **cannot** find on Google in 2 minutes;
- how many fall into each status.

The second number answers the reviewers' guess that almost every cafe here has a machine. If more than about 80% are the same status, consider a different launch area or making semi vs. fully automatic the main filter.

**3. List test.** A hand-made Google My Maps list of those cafes, labelled with their espresso status, in one community for 4 weeks.

**4. Names.** Test 3 name candidates with the interviewees. The name is fixed before anything public.

**Go rule:** all three must hold, or M1 doesn't start.
- ≥ 2 of 3 interviewees rate the pain of finding espresso made on a machine ≥ 4.
- ≥ 20% of the 30 cafes have an unclear espresso status.
- ≥ 50 opens from outside the founder's circle **and** ≥ 5 unprompted requests.

**5. Google Ask Maps test.** Ask Google Maps' natural-language feature the espresso questions this product answers, check its answers against cafe websites, and record its weaknesses. Use Ask Maps as part of "find on Google" in the uncertainty test. Plan and criteria: [research/google-ask-maps.md](../research/google-ask-maps.md). The result decides whether the product has a real difference and whether the §15 "someone else solves it" condition should cover natural-language answers, not only filters.

**6. Chain list.** List the chains with stores in the launch area and start the chain guide research ([research/chains.md](../research/chains.md)). This doesn't affect the go rule.

During M0, also choose the station data source and confirm the GoatCounter items marked **[verify in M1]**.

## 15. Limits and when to stop

- **Time:** no fixed budget. This is a side project; it moves at whatever pace the founder's schedule allows.
- **Traffic:** fewer than **20 weekly visits at month 3** after launch → stop.
- **Someone else solves it:** Google Maps or Tabelog lets people filter cafes in Shibuya by espresso machine type or brewing method → shut down. Checked once a quarter.

## 16. Growth and milestones

**Growth**
- English: long articles on Reddit.
- Japanese and English: short weekly posts on X. Each post links to a filtered view (F2 URLs), e.g. "Cafes near Omotesando that brew by siphon".
- Shareable lists (F7) for planning a cafe-hopping day.
- Chain guide articles, e.g. "Which Japanese coffee chains make espresso on a machine?" — useful to visitors and easy to share.
- **Not in v1:** owner badges, email or LINE, station pages for search.

**Milestones**

No deadlines; phases happen in order.

| Phase | Output |
|---|---|
| M0 | Interviews, espresso uncertainty test, list test (4-week window), Ask Maps test, chain list, name, station source, GoatCounter check → go / stop |
| M1 | 4 sheets with 25–30 independent cafes, the launch-area chains and their stores; SC-01–SC-06, 404, offline; F1–F6, F8, F9; both languages |
| M2 | F7; launch posts; weekly posts |
| M3 | 3 months after launch: check §12 and §15; decide on a map and station pages |

## 17. Handoff review: how each item was answered

| Review item | Answered in |
|---|---|
| B1 No screens or routes | §7 |
| B2 "By station" undefined; no station coordinates | §8 F1, §9 `stations` |
| B3 Filter logic | §8 F2 |
| B4 Nested schema; missing and unused fields | §9 (three sheets; `detail` and public `notes` removed) |
| B5 F6 has no storage | §8 F6, §11 (GoatCounter events) |
| B6 Language and URLs | §10 |
| S1 F7 flow | §8 F7 |
| S2 F8 thresholds and missing states | §8 F8 |
| S3 Detail gaps (sources, directions, stale, closed URLs) | §6, §8 F3, §9 `source_url_2` |
| S4 F5 entry and prefill | §8 F5 |
| S5 Metrics vs. stack | §12 (visits not uniques; returning visitors dropped; directions events) |
| S6 Accuracy unit | §9 (a cafe) |
| S7 Inconsistencies | §13 (3 stations × 8 = 25–30); §16 (F6 moved to M1, F7 stays M2 with URLs fixed in §10) |
| Nice to have | Offline screen, last-updated date, page titles, accessibility, card spec: §7, §10, §11 |

## 18. Founder decisions in v0.5

| # | Decision | What changed |
|---|---|---|
| 1 | The original question is "I want coffee made on an espresso machine." | §1 one line and §2 restate it. |
| 2 | Espresso-based coffee comes first. | §5: espresso status is required for every cafe (new code `espresso_none`); other methods are secondary. Cafes with espresso machines are researched first. §7–§8: espresso status leads the list card, the detail page and the filter bar. |
| 3 | Chain vs. independent is not a main axis, but a guide to the chains across Japan would help. | §5, §8: the "Hide chains" filter is removed. New F9 chain guide and SC-06 screen; new `chains` sheet; chain stores can show the chain's typical methods. Research: [research/chains.md](../research/chains.md). |

The v0.4 handoff answers in §17 still apply, except that the chain flag (`chain`) became `chain_id`.

## 19. Founder decisions in v0.6 (on the v0.5 reviews)

| # | Review point | Decision | What changed |
|---|---|---|---|
| 1 | M0 still tests "brewing methods", not the espresso question (CEO, CPO, CMO, CTO) | Change the tests. | §14: the uncertainty test, list test, go rule and Ask Maps test now ask about espresso status. |
| 2 | In the launch area almost every cafe probably has a machine, so the answer is obvious (CEO, CMO) | That is a guess; decide after the data. | §13, §14 test 2: M0 also counts how many cafes fall into each status; a threshold suggests what to do if one status dominates. |
| 3 | The machine type can't be sourced under the PRD's rules (CPO, CTO) | Only the type is recorded (semi-automatic / fully automatic / none), not the model. An ordinary web search is a valid source. | §1, §4, §5, §6: models out of scope; Tully's and Doutor given as examples; `source_url` optional for `visit`; accuracy re-check uses the same kind of source. |
| 4 | Chain stores conflict with the required espresso status (CEO, CPO, CTO) | A store that differs from its chain is that store's issue; the app doesn't cover it. | §4, §5, §8 F2/F3/F9, §9: chain stores use the chain's information, have no method rows of their own, and are filtered by it. §13: chain stores don't count toward the 25–30. |
| 5 | M1 needs 2–3× the hours it was given (CEO, CPO, CFO, CTO) | Drop the time budget; this is an undergraduate side project. | §1, §4 (old G3 removed), §12 (hours metric removed), §15, §16 (no deadlines). |
| 6 | "No revenue" and "ads if costs grow" contradict (CFO) | No monetization for now; consider ads if costs appear later. | §1, §4. |

Also fixed: §9 and §11 now say four sheets; goals renumbered (G1–G3).
