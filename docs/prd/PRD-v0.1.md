# PRD — Espresso Finder Japan (working name)

Status: Draft v0.1 · Date: 2026-11-13 · Owner: founder (solo)

---

## 1. Product brief

**One line.** From today, coffee lovers from abroad living in Japan can see what coffee a cafe serves before they go, instead of searching for 30 minutes like a detective.

**What it is.** A map-style web page, built like a lightweight Google Maps, but centered on the cafe rather than the map. Each cafe card answers one question first: *what coffee does this place actually make?* — espresso machine or not, brewing method, and the espresso-based menu.

**What it is not.** Not a review site, not an ordering app, not a translation tool. Google Maps and Tabelog already cover reviews and ratings; browsers already translate menus.

**Company in one paragraph.** A small, data-first company whose asset is a verified dataset of *how* cafes in Japan make coffee — a fact that existing map and review platforms do not record in a structured way. The first product is a free finder for foreign residents and visitors. The dataset is what compounds over time.

## 2. Problem

| | |
|---|---|
| What happens | I want freshly brewed espresso coffee, but it is too hard to find in Japan. |
| How often | 3–5 times a week |
| What I do now | Spend at least 30 minutes searching maps, Instagram and reviews; keep a personal list of cafes that sell fresh coffee. Many chain cafes serve factory-made coffee, especially for iced drinks. |
| Who else has it | Coffee lovers in Japan, especially from countries with a strong espresso culture (Italy, France, Australia, Korea, the UK, China) or who dislike dark roasts. |
| Most painful cost | Digging through store info and reviews to find out what coffee a place serves. For some cafes there is no information at all. |

**Evidence so far.** One interview (Korean exchange student, drinks coffee 3–4×/week): last time it happened was "last week"; "I just drank any coffee"; "It wasn't a big problem, so I didn't try." The problem is not yet validated for the core segment (espresso-focused drinkers). The next interviews must target that segment specifically (recruiting via X / Threads).

## 3. Target users

**Primary — "the espresso regular."** Foreign resident in a Japanese city (student or worker), drinks espresso-based coffee 3+ times a week, can tell a semi-automatic machine shot from fully automatic or drip, will walk 10–15 minutes further for the right cafe.

**Secondary — "the visiting coffee tourist."** Short-stay visitor who plans coffee stops around sightseeing.

**Not for.** People happy with convenience-store or chain coffee; people who don't drink coffee.

## 4. Goals and non-goals

**Goals (v1)**
- G1. A user can find a cafe that serves the coffee they want in under 5 minutes (vs. ~30 today).
- G2. Every listed cafe shows its coffee type and brewing method, verified.
- G3. Prove demand in one area before expanding.

**Non-goals (v1)**
- Reviews and ratings (Google Maps, Tabelog have them).
- Multilingual menus (browser auto-translate covers it).
- Ordering ahead (needs a deal with every cafe; does not help find the right coffee).
- Seats / takeout-only, store size, user-submitted cafes — deferred to *Later*.

> Note: an earlier FAQ draft listed "whether it has seats" in v1. The Cut supersedes it: seats move to *Later*; filter and brewing method are in v1.

## 5. Scope — version one

| # | Feature | Description | Priority |
|---|---|---|---|
| F1 | Map of cafes near me | Map + list view centered on current location or a chosen station. List is the primary view on mobile; map is secondary. | P0 |
| F2 | Coffee type per cafe | Each cafe tagged: **Espresso machine** / **Drip only** / **Factory-made / pre-brewed**. Shown as the first line on the card. | P0 |
| F3 | Filter by coffee type | One-tap filters: "Espresso", "Fresh drip", "Hide factory-made". | P0 |
| F4 | Brewing method | Semi-automatic, fully automatic (super-auto), siphon, hand drip. Multiple allowed. | P0 |
| F5 | Cafe detail | Name, address, hours, coffee type, brewing method, espresso menu items (espresso, americano, latte, flat white…), photo of machine/bar when available, "last verified" date, link out to Google Maps for directions/reviews. | P0 |
| F6 | "Report wrong info" | One button; flags a cafe for re-verification. Not user-generated listings. | P1 |

### Later
- Seats vs. takeout-only (3) · Store size (4) · Users adding cafes (7) · Saved list / favorites · More cities.

## 6. User flow (v1)

1. User opens the link (no install, no sign-up).
2. Page asks for location (or user picks a station).
3. List of nearby cafes, each led by its coffee-type badge; "Espresso" filter on by default for first-time users.
4. Tap a cafe → detail with brewing method, menu, last verified date.
5. Tap "Directions" → hands off to Google Maps.

Success moment: user leaves the page with a destination within 5 minutes.

## 7. Data — where the coffee information comes from

This is the core of the product.

- **Seed (manual curation).** Founder verifies cafes in one launch area (e.g., one ward / around one university) by visiting, checking official sites/Instagram for machine photos, and calling where needed. Target: 50–100 cafes.
- **Fields:** `coffee_type`, `brew_methods[]`, `espresso_menu[]`, `machine_photo_url`, `source` (visit / official site / Instagram / phone), `verified_at`.
- **Freshness:** re-verify each cafe every 6 months, or on "Report wrong info".
- **Base place data** (name, address, hours, coordinates) from a maps/places API; coffee fields stored in our own database.

## 8. Technical approach (v1)

- Mobile-first web app (PWA-capable), no native app.
- Map: Google Maps JS API or Mapbox; places data from a places API, cached within its terms.
- Backend: managed Postgres (e.g., Supabase) with PostGIS for "near me" queries; simple admin form for curation.
- No accounts in v1. Anonymous analytics only.

## 9. Success metrics

| Metric | Target (first 3 months, launch area) |
|---|---|
| Time to choose a cafe (moderated test) | < 5 minutes |
| Weekly returning visitors | ≥ 30% of first-week visitors return in week 2 |
| Directions click-through | ≥ 40% of sessions |
| Wrong-info reports | < 5% of cafe views |
| Interviews with espresso-focused users who rate the problem 4+/5 | ≥ 5 of 8 |

## 10. Kill criteria

Stop building if:
- Espresso-focused interviewees say it is not a big problem (as the first interviewee did), **or**
- Nobody opens the page for one month after launch.

## 11. Business model (hypotheses, not v1)

- Featured placement for specialty cafes (clearly labeled).
- Partnerships with roasters / equipment brands.
- Licensing the verified coffee dataset.
- v1 is free and ad-free; revenue is not a v1 goal.

## 12. Risks and open questions

- Is the core segment large enough, and reachable?
- Can one person keep data accurate as the area grows?
- Will Google Maps / Tabelog add a "coffee type" attribute?
- Which launch area has both enough specialty cafes and enough target users?

## 13. Milestones

| Phase | Output |
|---|---|
| M0 (2 weeks) | 8 interviews with espresso-focused users; go/no-go |
| M1 (4 weeks) | 50 verified cafes in one area; clickable prototype |
| M2 (4 weeks) | Public v1 link; share in foreign-resident and coffee communities |
| M3 | Review metrics vs. kill criteria; decide on *Later* features |
