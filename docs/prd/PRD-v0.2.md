# PRD — Espresso Finder Japan (working name)

Status: Draft v0.2 · Date: 2026-11-19 · Owner: founder (solo) · Previous: [PRD v0.1](PRD-v0.1.md)

> v0.2 applies the founder's rulings on five adversarial reviews (CEO, CPO, CMO, CFO, CTO): 80 points, 53 agreed, 10 partly, 17 disagreed. The change log at the end maps each change to the review point behind it.

---

## 1. Product brief

**One line.** From today, coffee people in Japan can see what coffee a cafe actually makes before they go, instead of searching for 30 minutes like a detective.

**What it is.** A map-and-list web app (installable as a PWA) centered on the cafe, not the map. Each cafe answers one question first: *how is the coffee made?* For each menu base, hot and iced: espresso from a machine, freshly brewed, or pre-made.

**What it is not.** Not a review site, not an ordering app, not a translation tool, and not a guide to pretty interiors or desserts. Google Maps and Tabelog already cover reviews; browsers already translate menus.

**What kind of project this is.** A **non-profit side project**, not a company. There is no business model and no revenue goal. The aim is a useful, accurate dataset that grows slowly. If monetization ever becomes necessary, the reviews' suggestions (tourist funnel, a written neutrality rule) are the starting point; until then they are out of scope.

## 2. Problem

| | |
|---|---|
| What happens | I want freshly made coffee, especially espresso, but it is hard to find out which cafes in Japan actually make it. |
| How often | 3–5 times a week (the founder's own habit; not yet measured for others) |
| What I do now | Spend at least 30 minutes on maps, Instagram and reviews; keep a personal list. Many chain cafes serve pre-made coffee, especially for iced drinks. |
| Who else has it | Coffee people: residents and visitors who choose a cafe by its coffee — espresso drinkers, people who go cafe-hopping (カフェ巡り / coffee shop hopping), people who dislike dark roasts. |
| Most painful cost | Digging through store info to find out how a place makes its coffee. For some cafes there is no information at all. |

**Evidence so far, read honestly.** One interview: "I just drank any coffee"; "It wasn't a big problem, so I didn't try." One interviewee cannot decide the project, but the result cannot be ignored either. It tells us the problem is real for coffee people and weak for casual coffee drinkers. The next round tests both groups on purpose (see §12).

## 3. Users

**Primary — "the coffee person."** Lives in or visits a Japanese city and picks cafes by how the coffee is made. Includes:
- the espresso regular, who wants a reliable shot nearby;
- the cafe hopper, resident or tourist, who looks for new places on weekends, trips or dates.

The cafe hopper is the one with a *recurring* need to discover, so the product is designed around discovery, not around a fixed shortlist.

**Not for.**
- People happy with any coffee (convenience store, chain).
- People choosing a cafe mainly for interior, desserts or photos. A tourist who wants a pretty cafe or a dark-roast kissaten experience is served by Instagram and Tabelog, not by this product.
- People who don't drink coffee.

## 4. Goals and non-goals

**Goals (v1)**
- G1. A coffee person finds a cafe that makes the coffee they want in under 5 minutes (vs. ~30 today).
- G2. Every listed cafe shows how each coffee base is made, with an evidence level and a date (§7).
- G3. People outside the founder's circle use it: external visitors and directions clicks grow month over month (§9).

**Non-goals (v1)**
- Revenue, ads, paid placement.
- Reviews and ratings; ordering ahead; multilingual menus.
- Interior, dessert or "photogenic" attributes.
- Seats / takeout-only, store size → *Later*.

## 5. Scope — version one

| # | Feature | Description | Priority |
|---|---|---|---|
| F1 | Cafes near me | List sorted by distance (computed on the device), with an optional map. Works by station when location is denied. | P0 |
| F2 | Coffee base per cafe | For each base, hot and iced: **Espresso**, **Fresh brew**, **Pre-made** (taxonomy in §6). The first line on every card. | P0 |
| F3 | Filters | "Espresso (hot / iced)", "Fresh brew", "Hide pre-made", machine type (semi-automatic / fully automatic), brew method (hand drip, siphon, batch brew). Several at once. | P0 |
| F4 | Cafe detail | Name, address, coffee bases, machine and brew methods, espresso menu, evidence level and date, link to Google Maps for directions, hours and reviews. | P0 |
| F5 | "Report wrong info" | Google Form link. Rate-limited in practice by founder moderation: a flagged cafe stays visible with a "being re-checked" note until reviewed. | P1 |
| F6 | "Add or correct my cafe" | A short self-report form for cafe owners and staff (§7). | P1 |
| F7 | Station pages | One indexable page per station, e.g. "Espresso near Shibuya Station", generated from the same data. | P1 |

### Later
Seats vs. takeout-only · store size · user-submitted cafes · saved list / favorites · optional email or LINE "new cafes near you" (deferred: sign-up adds friction before there is enough data to be worth it) · more cities.

## 6. Coffee base taxonomy

The unit is the **coffee base of the menu**, not the cafe and not each drink. A cafe can have several bases, recorded separately for hot and iced.

| Base | Means | Detail recorded |
|---|---|---|
| **Espresso** | Shot pulled on site, to order | Machine type: semi-automatic / fully automatic |
| **Fresh brew** | Brewed on site from ground beans, within the day | Method: hand drip / siphon / French press / batch brew |
| **Pre-made** | Not made on site, or made in bulk ahead | Factory-made, bottled, concentrate, pre-brewed iced |

Example: a cafe with a semi-automatic machine that sells bottled iced coffee is *hot: Espresso (semi-auto) · iced: Pre-made*.

Roast level is **not** in v1; "people who dislike dark roasts" are served indirectly through espresso and fresh brew. Revisit if interviews ask for it.

## 7. Data

**Base place data.** Name, address and coordinates are entered by the founder or taken from OpenStreetMap (ODbL: credit OpenStreetMap; the derived dataset may need to be shared under the same licence, which fits a non-profit). No Google Places data is stored. Directions use a plain Google Maps URL (`google.com/maps/dir/?api=1&destination=…`), which needs no API key and costs nothing. Hours are left to Google Maps.

**Coffee data** comes from two sources:
- **Founder research:** visits, plus the cafe's own website or menu.
- **Self-report:** cafe owners or staff fill in F6.

**What "verified" means.** Every cafe shows one evidence level and a date:

| Level | Requires |
|---|---|
| Visited | Founder saw the bar and machine in person; own photo |
| Official | Cafe's own website, menu, or self-report |
| Unconfirmed | Anything else, e.g. third-party posts. Shown, but labeled |

Instagram posts by others never count as Visited or Official, and their photos are not reused.

**Coverage.** Not every cafe at once. Start with one launch area, about 30 cafes, and grow slowly.

**Curation cost.** Time the first 10 cafes and use the average as the estimate for planning.

**Freshness.** Visited and Official entries older than 12 months show "may be out of date". Each month, re-check a random 10% of cafes; that audit is the accuracy metric.

## 8. Technical approach (v1)

- Static site plus PWA (installable, works offline for the last list viewed). No backend.
- Data: one `cafes.json` in git: `name, lat, lng, station, bases.hot[], bases.iced[], machine_type, brew_methods[], espresso_menu[], evidence, verified_at, osm_id?`.
- List sorted by distance on the device. Raw coordinates are never sent anywhere. Map: Leaflet with OpenStreetMap tiles, optional.
- Reports and self-reports: Google Forms (free, no backend to build or secure). Move to an own form only if volume demands it.
- Analytics: cookie-less page views and outbound clicks only. No consent banner needed, which also keeps things simple for EU visitors (GDPR) and Japan's APPI.
- Station pages (F7) are generated from `cafes.json` at build time.
- Hosting: free static hosting; cost ≈ ¥0 a month.

## 9. Success metrics

Traffic counts **exclude** the founder and visits from places where the founder promoted it to friends (tracked by tagged links).

| Metric | Target |
|---|---|
| Time to choose a cafe (moderated test, 5 people) | < 5 minutes |
| External weekly visitors | Grows month over month after the community launch |
| Directions clicks per external visit | ≥ 30% |
| Data accuracy (monthly 10% audit) | ≥ 90% of checked cafes still correct |
| Cafe self-reports | ≥ 5 cafes in the first 3 months |

## 10. When to stop

This is a non-profit project, so there is no short deadline and no financial stop condition. It ends when either:
1. **Google Maps or Tabelog adds an equivalent coffee-base filter.** Then the product has done its job and is shut down.
2. **No external traffic for 3 consecutive months** after the community launch. Then the founder pauses and decides whether to go round the problem loop again.

## 11. Growth

- **Positioning:** lead with the outcome, not time saved: *coffee made in front of you, not poured from a bottle.* Speaks to cafe hoppers and dates as well as espresso regulars.
- **Search:** station pages (F7) for people who search before a trip or a weekend out.
- **Three named communities**, posting useful content rather than a bare link. Candidates: r/JapanLife or r/Tokyo, a foreign-resident Facebook group, a university international-student group. Pick the final three in M0.
- **Not in v1:** QR stickers or ready-made posts for cafes. They are hard to arrange and unlikely to work before the product has users.
- **Name:** keep the working name for now; consider a name built around a promise later.

## 12. Discovery: interviews (M0)

Interviews inform the product; they are not a hard go/no-go gate.

- **Who:** 8 people, mixed on purpose: 5 coffee people and 3 casual coffee drinkers, so the result isn't biased toward people who already agree.
- **Where to find them:** online (r/JapanLife, X, Threads, comments on specialty-cafe Instagram accounts, university international groups) and in person at specialty cafes.
- **Ask:** the last time it happened, what they did, whether they tried to fix it, and how they choose cafes when cafe-hopping or on a trip.
- **Record:** a pain rating 1–5 and any workaround they already use (lists, saved pins).
- In parallel, share a hand-made list of ~30 cafes (Google My Maps or Notion) in one community. Responses will be slow, so treat it as a signal, not a verdict.

## 13. Risks and open questions

- The pain may be strong only for a small group; the mixed interview set tests this.
- Self-reports may be inaccurate or promotional. Mitigation: labeled evidence levels and the monthly audit.
- One founder's curation time limits growth; the time of the first 10 cafes sets the pace.
- Tourists may want what this product does not offer (interiors, desserts). The "Not for" line keeps scope fixed.

## 14. Milestones

| Phase | Output |
|---|---|
| M0 (2–3 weeks) | 8 mixed interviews; hand-made list of 30 cafes shared in one community; time the first 10 cafes |
| M1 (3–4 weeks) | `cafes.json` with ~30 cafes; static site + PWA with F1–F4 |
| M2 (2 weeks) | F5–F7; post in three communities |
| M3 (ongoing) | Monthly: audit 10%, add cafes, check §9 and §10 |

---

## Change log v0.1 → v0.2

| Change | Driven by (your ruling) |
|---|---|
| Non-profit side project; business model removed; no company vision | CEO other 3, 5 · CFO top 1, 2 (agreed, "won't monetize") |
| Primary user widened to "coffee person" incl. cafe hoppers and tourists; discovery-first | CEO top 2 · CEO other 1 · CPO top 2 · CPO ask 2 · CMO top 2 |
| Explicit "not for" interiors/desserts/kissaten seekers | Your note on CPO top 2 |
| Taxonomy by coffee base of the menu, hot and iced separately | CPO top 3 · CTO top 3 · CPO ask 3 |
| "Verified" defined by evidence level + date | CPO other 6 · CPO ask 4 · CTO top 3 |
| Data from founder research + cafe self-report; not every cafe at once | CFO ask 3 · CFO top 3 |
| No Google Places storage; OSM + plain Google Maps link | CTO top 2 · your questions on CTO top 2 and CTO ask 4 |
| Static site, but PWA kept | CTO ask 2, 3, 6 · CTO other 9 (disagreed: keep PWA) |
| Report form with moderation; Google Forms; cookie-less analytics | CTO other 3 · CTO ask 5 |
| Traffic metrics exclude founder's circle; accuracy audit replaces report rate | CTO top 1 · CPO other 1, 2 · CTO other 2 |
| Stop conditions: Google adds the feature, or 3 months without external traffic; no 8-week deadline | CFO ask 6 · CMO ask 6 (disagreed with deadline) · CTO top 1 |
| Growth: station pages, three communities; no QR stickers in v1; signup deferred | CMO ask 1, 3 · CMO ask 2 (disagreed) · CMO ask 4 (partly) |
| Interviews mixed (coffee people + casual), recruited online and at cafes; not a hard gate | CPO top 1 · CMO ask 5 · CEO ask 1 (disagreed) · CPO ask 1 (partly) |
| Curation time measured on first 10 cafes | CPO ask 4 (partly: "method unclear") |
| Kept as is: Google may add the attribute → it is a stop condition, not a fatal flaw | CEO top 3 (disagreed) · CEO ask 4 |
