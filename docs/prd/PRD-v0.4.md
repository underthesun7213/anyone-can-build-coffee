# PRD — Coffee brewing finder, Japan (working name)

Status: Draft v0.4 · Date: 2026-11-20 · Owner: founder (solo, hobby) · Previous: [v0.3](PRD-v0.3.md)

> v0.4 keeps v0.3's strategy and fills in what a designer and developer need to start: screens and routes (§7), feature rules (§8), the data layout (§9), language handling (§10) and metrics the chosen tools can record (§12). It answers the six blockers and seven should-fix items from the handoff review ([reviews-v0.3/planner.md](../reviews/v0.3/planner.md)); §17 maps each one. Items marked **[verify in M1]** depend on a tool's behaviour that hasn't been checked yet.

---

## 1. Brief

**One line.** Coffee people in Japan can see how a cafe makes its coffee — which espresso machine, which brewing method — before they go.

**What it is.** A bilingual (English / Japanese) list of cafes, by distance or by station. It answers one question: *what equipment and method does this cafe brew with?* Every fact shows its source and when it was checked.

**What it is not.** Not a review site, not a "we visited every cafe" guide, not a ratings, ordering, interior, dessert or photo guide.

**Project type.** Hobby. No revenue, now or later; ads only if running costs become significant. Budget: **8 founder hours a week**.

## 2. Problem and evidence

The founder wants coffee made a particular way (especially espresso from a semi-automatic machine) 3–5 times a week. Finding out how a cafe brews takes 30+ minutes across maps, Instagram and reviews.

**Evidence:** none yet beyond the founder. The one outside interview (a casual drinker) said it "wasn't a big problem." M0 (§14) decides whether to build.

## 3. Users

Coffee people living in or visiting Japan who choose a cafe by how the coffee is made: espresso regulars, cafe hoppers (カフェ巡り), visitors planning coffee stops. Many Japanese coffee people are used to dark-roast drip; the brewing filter and the chain flag let them find something different.

**Not for:** people happy with any coffee; people choosing on interior, desserts or photos.

## 4. Goals and non-goals

**Goals (v1)**
- G1. People outside the founder's circle use it to choose a cafe.
- G2. Every listed cafe shows its brewing methods, each with a source and a date.
- G3. It runs within 8 founder hours a week.

**Non-goals (v1):** revenue · grades or "verified" labels · iced or seasonal menus · roast level · reviews, ratings, ordering · interiors, desserts · a map · station pages for search.

## 5. Brewing taxonomy

A cafe can have several methods. Each method has a code, used in the data, filters and URLs.

| Group | Code | EN label | JA label |
|---|---|---|---|
| Espresso | `espresso_semi` | Semi-automatic espresso (incl. lever) | セミオート / レバー式エスプレッソ |
| Espresso | `espresso_auto` | Fully automatic espresso | 全自動エスプレッソ |
| Hand-brewed | `hand_drip` | Hand drip / pour-over | ハンドドリップ |
| Hand-brewed | `siphon` | Siphon | サイフォン |
| Hand-brewed | `french_press` | French press | フレンチプレス |
| Hand-brewed | `aeropress` | AeroPress | エアロプレス |
| Machine-brewed | `batch_brew` | Drip machine / batch brew | マシンドリップ / バッチブリュー |
| Pre-made | `premade` | Pre-made or packaged | 作り置き / パック |

- `premade` is recorded **only when known**. It appears on the detail page and has no filter.
- Batch brew hold time is not tracked.
- **Chain:** a brand with **5 or more shops in Japan**. Stored per cafe as yes / no.

## 6. Sources

Every method row has one **source type, link and checked date**, plus an optional second link. There are no grades.

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
| — | **404** | any unknown route | Link back to SC-01 |
| — | **Offline** | shown by the service worker | "You're offline" when nothing is cached |

**Global:** header with the site name and EN / JA switch; footer with "Data last updated {date}" and links to SC-05.

**List card (SC-01, SC-04):** cafe name, station and distance, up to 3 method chips (espresso first, then hand-brewed, then machine), "Chain" marker if yes.

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
- **Exclusions:**
  - "Hide chains" removes cafes with `chain = yes`.
  - "Hide batch-brew-only" removes cafes whose only non-espresso method is `batch_brew`.
- **Between groups:** **AND**.
- **Filter state is in the URL**, e.g. `/en/?st=omotesando&f=siphon`. Posts can link straight to a filtered view.

### F3 — Cafe detail
- Name (UI language first, the other below), address in the UI language, station and distance.
- Methods grouped as in §5. Each shows its source label, link, checked date, and the stale note if older than 12 months.
- `premade`, when known, appears as a separate note: "Some drinks are pre-made" / 「一部作り置きあり」.
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

### F8 — Empty and error states

| Situation | Shown |
|---|---|
| No cafe within **1.5 km** of the user (incl. outside Japan) | "No cafes near you yet. Nearest covered station: {name} ({distance})" + link to SC-02 |
| Location denied or failed | SC-02 station picker |
| All results filtered out | "No cafes match these filters" + one **Clear all filters** button |
| Offline, nothing cached | Offline screen |

## 9. Data

Three sheets in one spreadsheet, each exported to its own CSV.

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
| `chain` | `yes` / `no` (§5) |
| `cafe_url`, `social_url` | Optional |
| `internal_note` | Never published |

**`methods`** — one row per method per cafe

| Field | Notes |
|---|---|
| `cafe_id` | → `cafes.id` |
| `method` | Code from §5 |
| `source_type` | Code from §6 |
| `source_url` | Required |
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

- **Build:** spreadsheet → three CSVs → static site generator → free static hosting on a subdomain of the founder's personal domain.
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
| Accuracy | 10 oldest cafes re-checked each month (website or menu) | ≥ 8 of 10 correct |
| Founder hours | Logged in the monthly review | ≤ 8 a week |

"Returning visitors" from v0.3 is dropped: a cookie-less tool can't identify returning people. "Direct visits" replaces it.

## 13. Launch area

**Shibuya · Omotesando · Meiji-jingumae (Harajuku)** — 3 stations, **8+ cafes each**, so **25–30 cafes** at launch.

## 14. M0 — discovery (4 weeks)

**1. Interviews: 3 coffee people.**
- Recruit through X, Threads, specialty-cafe accounts, and in person at cafes in the launch area.
- Don't recruit in the planned launch communities.
- Record a pain rating (1–5) and any workaround.

**2. Uncertainty test.** For 30 candidate cafes in the launch area, count how many have a brewing method you **cannot** find on Google in 2 minutes.

**3. List test.** A hand-made Google My Maps list of those cafes, with brewing methods, in one community for 4 weeks.

**4. Names.** Test 3 name candidates with the interviewees. The name is fixed before anything public.

**Go rule:** all three must hold, or M1 doesn't start.
- ≥ 2 of 3 interviewees rate the pain ≥ 4.
- ≥ 20% of the 30 cafes are unclear.
- ≥ 50 opens from outside the founder's circle **and** ≥ 5 unprompted requests.

During M0, also choose the station data source and confirm the GoatCounter items marked **[verify in M1]**.

## 15. Limits and when to stop

- **Time:** 8 hours a week. Over it 2 months in a row → stop adding cafes; maintain only.
- **Traffic:** fewer than **20 weekly visits at month 3** after launch → stop.
- **Someone else solves it:** Google Maps or Tabelog lets people filter cafes in Shibuya by espresso machine type or brewing method → shut down. Checked once a quarter.

## 16. Growth and milestones

**Growth**
- English: long articles on Reddit.
- Japanese and English: short weekly posts on X. Each post links to a filtered view (F2 URLs), e.g. "Cafes near Omotesando that brew by siphon".
- Shareable lists (F7) for planning a cafe-hopping day.
- **Not in v1:** owner badges, email or LINE, station pages for search.

**Milestones**

| Phase | Time | Output |
|---|---|---|
| M0 | 4 weeks | Interviews, uncertainty test, list test, name, station source, GoatCounter check → go / stop |
| M1 | ~4 weeks | 3 sheets with 25–30 cafes; SC-01–SC-05, 404, offline; F1–F6, F8; both languages |
| M2 | 6 weeks | F7; launch posts; weekly posts |
| M3 | Month 3 | Check §12 and §15; decide on a map and station pages |

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
