# CFO review — PRD v0.5 (Coffee brewing finder, Japan)

## Verdict
Cash cost is close to zero. The real cost is founder time, and v0.5 adds work (the chain guide, required espresso status for every cafe) without re-checking whether M1 still fits in 8 hours a week. It doesn't fit: M1 needs about 2–3x the hours it is given.

## Top 3 killer objections

**1. M1 can't be built in "~4 weeks" at 8 hours a week.**
§16 gives M1 "~4 weeks", which is 32 hours. The same row lists "4 sheets with 25–30 cafes and the launch-area chains; SC-01–SC-06, 404, offline; F1–F6, F8, F9; both languages". §2 says finding one cafe's espresso facts takes "30+ minutes". My estimate, with assumptions:
- Cafe research: 30 cafes × 30 min = **15 h**. §5 now requires every cafe to have a sourced espresso status, so none can be skipped.
- Chain guide: under the "5 or more shops in Japan" rule, Shibuya/Omotesando/Harajuku likely has 15–20 chains (Starbucks, Doutor, Excelsior, Tully's, Veloce, Pronto, St. Marc, Komeda, Blue Bottle, %Arabica, Sarutahiko, Streamer and others). At ~1 h each for a sourced bilingual entry, that is **15–20 h**.
- Site: 6 screens, two languages, geolocation, URL filter state, service worker and analytics events. A solo hobbyist needs **40–60 h** for this.
- Translating strings, the form and the privacy notice: **5 h**.

Total is **75–100 h**. At 8 h a week that is **10–12 weeks**, not 4. Either the 8-hour limit breaks (§15 then halts growth from day one), or M1 runs to about 3 months. In that case the "month 3" traffic check in §15 comes before the site has had a fair launch.

**2. The chain guide may multiply the size of the catalogue.**
F9 says each chain page lists "Stores of that chain in the covered area, linking to SC-03". So chain stores are rows in `cafes`. §13 budgets "25–30 cafes" in total. Starbucks alone has well over 10 stores within walking distance of these three stations, and Doutor, Tully's and Excelsior add many more. If every chain store in the area is listed, the catalogue could reach **100–150 rows**, and each one needs an espresso status (§5). F3's fallback ("Typical for this chain") avoids sourcing each store separately. But the rows still need coordinates, addresses, status changes when stores close, and a place in the "10 oldest re-checked" rotation (§12). The PRD never says whether chain stores count toward the 25–30, so nobody can cost it.

**3. The revenue position contradicts itself, and the ads fallback doesn't work.**
§1 says "No revenue, now or later; ads only if running costs become significant." Ads are revenue, so the two halves of the sentence conflict. "Significant" has no number. The rough numbers: 100 visits a week ≈ 430 a month ≈ 650 pageviews. At an assumed RPM of ¥300, that earns **about ¥200 a month**. AdSense pays out at ¥8,000, so the first payment would take **about 40 months**. Ads would also add consent requirements for EU visitors, which undercuts the cookie-less GoatCounter setup and the privacy notice (§11). Ads can't cover any cost this product will have. Drop the clause, or replace it with a real trigger: "if cash costs exceed ¥X a year, cut Y."

## Other issues
- **Correction review has no hour budget.** §11 adds rate limits only after "about 20 a week". At 10–15 min each (review, edit sheet, redeploy), that is **3.3–5 h a week**, or 40–60% of the budget. A "review queue" doesn't reduce that time.
- **The time-limit rule has a gap.** §15 says "stop adding cafes; maintain only." Nothing covers the case where maintenance alone (corrections, monthly re-checks, weekly X posts in two languages, Reddit articles) goes over 8 h. Weekly bilingual posts plus a long Reddit article each month could take **2–3 h a week** on their own.
- **Founder hours aren't measured.** §12 says "Logged in the monthly review". Reconstructing hours at month end will undercount, and this is the only cost metric the project has.
- **The analytics fallback has an unbudgeted cost.** GoatCounter custom events are still "[verify in M1]". If they fail, the likely replacement is a paid tool (e.g. Plausible, about ¥1,400 a month ≈ ¥17k a year). That is the first real cash cost, and the PRD has no line for it.
- **The traffic floor is too low to mean anything.** The stop floor is 20 weekly visits, and §12 says friends "can't be excluded". A few friends can produce 20 visits, so the stop rule protects nothing.
- **The over-budget M0 is 4 weeks = 32 h.** Recruiting and running 3 interviews (6–9 h), building and posting the My Maps list (5–8 h), the Ask Maps test (3–4 h), the chain list, name testing, and checking station terms come to about **25–35 h**. That fits, but only just, and the go rule never checks cost.
- **`visit` source has costs that aren't stated.** Train fares and drinks for in-person checks and recruiting (for example 30 cafes × ¥600–1,000 ≈ ¥20–30k) are small but not zero.

## Back-of-envelope numbers
| Item | Estimate |
|---|---|
| Cash cost per year | ~¥0 (free hosting, existing domain); ¥17k if analytics must be paid |
| Founder time per year | 8 h × 52 = **416 h** |
| M1 real hours | 75–100 h (vs. 32 budgeted) |
| Founder minutes per visit at target (100/wk) | 416 h ÷ 5,200 ≈ **4.8 min** |
| Founder minutes per visit at stop floor (20/wk) | 416 h ÷ 1,040 ≈ **24 min** |
| Ad income at target | ~¥200 a month; first payout after ~40 months |

## What would make the money story hold
1. Re-plan M1 to the real hours (about 10–12 weeks), or cut it down: F1–F3 and F9 list only, EN first, offline screen and SC-04 later.
2. State whether chain stores count toward the 25–30, and cap chain-store rows in v1 (for example, show the chain page only, with no per-store rows).
3. Add a cost check to M0: time the research on the 30 cafes in the uncertainty test, and project M1 hours from that real number per cafe.
4. Give hours a weekly budget split (data, corrections, posts, building), log time weekly, and add a rule for when maintenance alone goes over 8 h.
5. Delete the ads clause, or give it a ¥ trigger and the action it leads to.
