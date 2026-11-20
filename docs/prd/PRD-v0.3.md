# PRD — Coffee brewing finder, Japan (working name)

Status: Draft v0.3 · Date: 2026-11-20 · Owner: founder (solo, hobby) · Previous: [v0.2](PRD-v0.2.md) · [v0.1](PRD-v0.1.md)

> v0.3 applies the founder's rulings on the second round of reviews (80 points: 62 agreed, 13 partly, 4 disagreed) and eight follow-up decisions. §15 lists what changed, and lists the points the founder disagreed with, in the open.

---

## 1. Brief

**One line.** Coffee people in Japan can see how a cafe makes its coffee — which espresso machine, which brewing method — before they go.

**What it is.** A bilingual (English / Japanese) list of cafes, sorted by distance or station, that answers one question: *what equipment and method does this cafe brew with?* Every fact shows where it came from and when it was checked.

**What it is not.**
- Not a review site and not a "we visited every cafe" guide. It organizes information that already exists but is scattered: cafe websites, menus, the cafe's own posts, owner submissions, and the founder's visits.
- Not a ratings, ordering, interior, dessert or photo guide.

**What kind of project this is.** A **hobby project**. No revenue, now or later. If running costs ever become significant, ads are the only option considered. The founder's time is the real budget: **8 hours a week** (§11).

## 2. Problem

| | |
|---|---|
| What happens | I want coffee made a particular way (especially espresso from a semi-automatic machine), but it is hard to find out how a cafe in Japan actually brews. |
| How often | 3–5 times a week — the founder's own habit |
| What I do now | 30+ minutes across maps, Instagram and reviews; a personal list |
| Who else has it | Unknown yet (see below) |

**Evidence, stated plainly.** There is no evidence yet that anyone but the founder has this problem. The one outside interview was with a casual coffee drinker, who said it "wasn't a big problem." M0 (§10) exists to find out, and it has a rule that can stop the project.

## 3. Users

**Coffee people living in or visiting Japan** who choose a cafe by how the coffee is made. They include espresso regulars, cafe hoppers (カフェ巡り / coffee shop hopping) and visitors planning coffee stops. These are examples, not strict personas.

Note on Japanese coffee people: many are used to dark-roast drip, which is common in Japanese kissaten and in chains. Brewing method and a "chain" flag give them a way to find different coffee without the product tracking roast level.

**Not for:** people happy with any coffee; people choosing mainly on interior, desserts or photos.

## 4. Goals and non-goals

**Goals (v1)**
- G1. People outside the founder's circle use it to choose a cafe (measured in §9).
- G2. Every listed cafe shows its brewing equipment and methods, each with a source and a date.
- G3. It runs within 8 hours a week of founder time.

**Non-goals (v1)**
- Revenue of any kind.
- Grades, badges or "verified" labels.
- Seasonal or iced-menu tracking; roast level.
- Reviews, ratings, ordering, interiors, desserts.
- A map (Later).

## 5. Brewing taxonomy

The unit is the **brewing equipment or method a cafe uses**. A cafe can have several.

| Group | Values |
|---|---|
| Espresso machine | Semi-automatic (incl. manual / lever) · Fully automatic (push-button) |
| Brewed by hand | Hand drip / pour-over (dripper) · Siphon · French press · AeroPress |
| Brewed by machine | Drip machine / batch brew |
| Pre-made | Packaged or pre-brewed coffee — recorded **only when known**, since it usually can't be found without asking |

Rules:
- Fully automatic machines are shown, not hidden. A one-tap filter "Hand-made espresso only" excludes them.
- Batch brew is its own value, so people who don't want it can exclude it. Hold time is not tracked.
- Each cafe also has a `chain` flag (yes / no).

## 6. Data

**Sources.** Every brewing fact carries a **source type, a link and a checked date**. There are no grades.

| Source type | Example |
|---|---|
| Cafe website or menu | Official site, menu page |
| Cafe's own social account | The cafe's Instagram post (linked, never copied) |
| Owner submission | Correction form filled in by the cafe |
| Founder visit | Founder saw it in person |
| Third party | Blog or article (lowest priority; linked) |

**Places.**
- Coordinates come from OpenStreetMap or from geocoding the cafe's published address with OSM tools. **Never from Google Maps**, whose terms forbid storing its data.
- OSM data is credited on the site. OSM-derived fields are kept in their own columns.
- Station data: source to be chosen in M1. Candidates: OSM station data, MLIT 国土数値情報 (railway data), ekidata.jp. Check each one's terms first.
- Closed or moved cafes keep their row with `status: closed | moved`. They are hidden from lists but stay in the data, so they aren't researched again.

**Photos.** None stored in v1. Link to the cafe's own posts instead. If the founder takes photos later: equipment only, no faces.

**Freshness.**
- Each month, re-check the **10 oldest** entries. A website or menu check counts; no visit needed.
- The share of those 10 still correct is the accuracy metric.

**When it grows.** If the number of cafes passes what 8 hours a week can keep fresh (roughly 100–120), the founder stops adding cafes until re-checks are cheaper. Owner submissions with a required source link are the main way to make them cheaper. The verification process is reviewed then, not now.

## 7. Scope — version one

| # | Feature | Description | Priority |
|---|---|---|---|
| F1 | Cafe list | Sorted by distance (computed on the device) or by station. Works without location permission. | P0 |
| F2 | Brewing filters | Espresso (any) · Hand-made espresso only · Hand drip / pour-over · Siphon · French press · AeroPress · Hide batch brew · Hide chains | P0 |
| F3 | Cafe detail | Name (EN / JA), address, station, brewing methods with source, link and date, link to the cafe's website and posts, Google Maps directions link | P0 |
| F4 | English / Japanese UI | Language switch; cafe names in both where available | P0 |
| F5 | Correction form | Google Form with a required source link. Nothing changes on the site until the founder reviews it, updates the sheet and redeploys. No "being re-checked" label. | P0 |
| F6 | "Was it as listed?" | One tap on the detail page after a visit (yes / no). No account. | P1 |
| F7 | Shareable list | Pick cafes and share them as a URL; no sign-up | P1 |
| F8 | Empty states | No cafe nearby → show the nearest covered station. Station not covered → say which stations are. Everything filtered out → offer to clear filters. | P0 |

**Later:** map · station pages for search (after the M2 test) · owner badge · email or LINE updates · favorites · more areas.

## 8. Technical approach

- **Data:** one spreadsheet → CSV → static site generator. No backend.
- **Schema (per cafe):** `id, name_en, name_ja, address, lat, lng, station, status, chain, methods[] {method, detail, source_type, source_url, checked_at}, cafe_url, notes`.
- **Light PWA:** web manifest for "add to home screen"; service worker set to **network first**, so people never see stale data when online. No offline map tiles (there is no map).
- **Analytics:** a cookie-less tool (GoatCounter or Cloudflare Web Analytics; pick in M1) that counts daily unique visitors, referrers and outbound clicks. The founder's own browser is excluded with an opt-out flag.
- **Privacy:** a short notice naming the analytics tool and covering the Google Form (Japan's APPI). Distance is computed on the device; coordinates are never sent.
- **Hosting:** free static hosting on a subdomain of the founder's personal domain.
- **Abuse and spam:** at current scale, founder review of every correction is enough. If corrections exceed about 20 a week, add rate limits or a review queue.

## 9. Metrics

All traffic numbers exclude the founder (opt-out flag) and are read from unique daily visitors.

| Metric | Target |
|---|---|
| External weekly visitors | ≥ 100 by month 3 (stop floor: 20, §11) |
| Returning visitors | Recorded from month 1; target set after the first month |
| Directions clicks per visit | Recorded in month 1; target set after the first month |
| "Was it as listed?" — share of yes | ≥ 80% |
| Accuracy (10 oldest re-checked each month) | ≥ 8 of 10 still correct |
| Founder hours | ≤ 8 a week, logged in the monthly review |

## 10. M0 — discovery (4 weeks)

M0 decides whether to build. It has a written rule.

**1. Interviews: 3 coffee people.**
- Recruit through X, Threads, comments on specialty-cafe accounts, and in person at cafes in Shibuya / Omotesando / Harajuku.
- Don't recruit in the communities planned for launch, so the launch audience isn't used up.
- Ask about the last time it happened, what they did, and how they choose cafes; record a pain rating from 1 to 5 and any workaround.

**2. Uncertainty test.** Take 30 cafes in the launch area that coffee people would consider. Count how many have a brewing method you **cannot** find on Google in 2 minutes.

**3. List test.** Publish a hand-made Google My Maps list of those cafes, with brewing methods, in one community for 4 weeks.

**4. Names.** Test 3 name candidates with the interviewees. The name is fixed before anything public goes live.

**Go rule:** all three of these must hold, or M1 doesn't start.
- ≥ 2 of 3 interviewees rate the pain ≥ 4 out of 5.
- The uncertainty test finds ≥ 20% of cafes unclear.
- The list gets ≥ 50 opens from outside the founder's circle **and** ≥ 5 unprompted requests (more cafes, other areas).

If any fails, stop or go round the problem loop again.

## 11. Limits and when to stop

- **Time:** 8 hours a week. If it runs over for 2 months in a row, stop adding cafes and only maintain.
- **Traffic:** fewer than **20 external weekly visitors at month 3** after launch → stop.
- **Someone else solves it:** Google Maps or Tabelog lets people filter cafes in Shibuya by espresso machine type or brewing method → shut down. The founder checks this once a quarter.

## 12. Launch area

**Shibuya · Omotesando · Harajuku.** Specialty cafes, chains and visitors are all present, so the brewing filter has real differences to show. Aim for **8 or more cafes per station** before launch.

## 13. Growth

- **Languages and channels:**
  - English: long articles on Reddit, e.g. "Where to get hand-pulled espresso around Shibuya".
  - Japanese and English: short weekly posts on X.
- **Weekly cadence:** one post a week, each linking to the site, e.g. "N cafes near Omotesando that brew by siphon".
- **Shareable lists (F7)** for people planning a cafe-hopping day.
- **Search:** people often search for a product by name, so the name (chosen in M0) matters. Station pages come after the M2 test.
- **Not in v1:** owner badges, email or LINE updates.

## 14. Milestones

| Phase | Time | Output |
|---|---|---|
| M0 | 4 weeks | Interviews, uncertainty test, list test, name → go / stop |
| M1 | ~4 weeks | Sheet with 25–30 cafes, static site + light PWA, F1–F5, F8 |
| M2 | 6 weeks | Launch posts (Reddit, X), F6–F7, weekly posts |
| M3 | Month 3 | Check §9 and §11; decide on map and station pages |

## 15. What changed from v0.2, and what didn't

**Changed (agreed with the reviews)**

| Change | Review point |
|---|---|
| Hobby project, no revenue now or later; ads only if costs grow | CEO top 3 · CFO top 3, ask 4 |
| Evidence grades removed; every fact has a source type, link and date | CTO top 2 · CPO ask 6 · CFO ask 3 |
| Taxonomy by brewing equipment and method; machine types separated; iced menus dropped | CTO top 1 · CPO other 4 · CPO ask 7 |
| "5 minutes" and "from today" removed | CEO top 2 · CPO other 7 |
| Evidence section says plainly that there is none yet | CPO top 1 · CEO top 1 |
| M0 has a written go rule with numbers | CEO top 1, ask 1, ask 6 · CPO ask 1 |
| 8-hour weekly limit, cafe ceiling, hours logged | CFO top 1–2, asks 1, 2, 5 · CEO ask 3 |
| Stop rules with numbers; quarterly check of Google / Tabelog | CEO ask 5 · CPO ask 5 · CMO other 6 |
| Metrics have absolute targets; founder excluded; analytics that can count visitors | CPO ask 3 · CMO top 3, ask 7 · CTO top 3 |
| Fixed audit of 10 oldest per month | CPO ask 4 · CTO top 1 |
| Coordinates never from Google; OSM credited; station data source to choose | CTO other 1, 3 |
| Closed and moved cafes kept with a status | CPO other 8 · CTO other 5 |
| Correction form with required source; no "re-checked" label on a static site | CTO ask 3 · CPO other 3 |
| Empty states defined | CPO ask 8 |
| Dense launch area: Shibuya / Omotesando / Harajuku, 8+ per station | CMO ask 3 · CEO ask 3 |
| Name chosen in M0, before anything public | CMO top 1, ask 2 |
| Weekly posts plus long articles; shareable list in URL | CMO ask 4, 5 |
| Interviewees not recruited from launch communities | CMO other 5 |
| Self-report target removed | CEO other 4 · CMO other 1 · CPO other 9 |

**Not changed (the founder disagreed or partly disagreed)**

| Review point | Decision and reason |
|---|---|
| One audience, one language (CEO ask 4, CMO ask 1) | Two languages, English and Japanese, for residents and visitors. |
| 5 interviewees for M0 (CPO ask 1) | 3, because 5 coffee people are unlikely to be found in time. |
| ODbL means anyone can copy the data (CFO top 3) | Not a practical concern; anything public can be copied. Revenue is ruled out anyway. |
| No PWA (CTO other 8) | A light PWA is kept: manifest plus network-first caching, which avoids stale data. |
| The My Maps list is the whole MVP (CEO ask 2, partly) | The list is the M0 test; the site is built only if the go rule passes. |
| Owner badge in v1 (CMO ask 6, partly) | Later. |
