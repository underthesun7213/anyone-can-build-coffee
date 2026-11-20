# CFO review — PRD v0.2

## Verdict

The cash budget really is near zero. The budget that matters is the founder's hours, and the PRD never sets a number for them. Calling it "non-profit" doesn't make the project cheap. It only means nobody is tracking the cost.

## Top 3 killer objections

**1. "Hosting: free static hosting; cost ≈ ¥0 a month" counts the server and ignores the man.**
The real cost is founder labour. The rule *"Visited — Founder saw the bar and machine in person"* means the most trusted data needs a train ride and a coffee every time. The PRD only says *"Time the first 10 cafes and use the average."* That is a way to measure the cost. It is not a budget. The document never says how many hours a month the founder is willing to give, so nothing can be checked against that limit.

**2. Success makes costs go up. Nothing pays for the growth.**
G3 wants *"external visitors… grow month over month"*. More visitors bring more expected coverage, more F5 reports and more F6 self-reports to moderate. The upkeep rules also grow with the dataset. *"re-check a random 10% of cafes"* every month, plus *"older than 12 months show 'may be out of date'"*, means every cafe has to be re-verified once a year, forever. Upkeep grows in a straight line with the number of cafes. Revenue stays at zero by design. The two §10 stop conditions are about Google and about traffic. Neither one is the most likely way this ends: **the founder burns out**. Running out of founder hours is the real financial stop condition, and it isn't written down.

**3. The fallback plan for revenue is blocked by the PRD's own licence choice.**
*"If monetization ever becomes necessary, the reviews' suggestions… are the starting point"*. But §7 also accepts that *"the derived dataset may need to be shared under the same licence"* (ODbL). If the dataset has to be open, anyone can copy it, so there is nothing scarce to charge for. "Revenue later" is not a plan B. It is a plan with no money in it. That's acceptable if the answer is truly "never." If so, say never and drop the hedge.

**Lesser hidden costs:** a domain (about ¥2–3k a year, not mentioned). Map tiles: the public OSM tile servers have a usage policy, so real traffic means a tile provider, which is free at first and paid at scale. Coffee and transit on every visit. Google Forms triage time. The founder's own *"3–5 times a week"* habit pays for part of this, but only for cafes near routes he already takes.

## Back-of-envelope numbers

All the hour figures below are my guesses, because the PRD gives none.
- New cafe at the Visited level: 2.5 h (1.5 h travel and visit, 1 h of data, photo and menu work).
- Re-check: 1.5 h. Founder time valued at ¥3,000/h, a modest side-job rate.
- Cash per visit: about ¥1,000 (¥400 transit + ¥600 drink). I assume half of visits overlap with the founder's habit anyway.
- Growth after launch: 10 cafes a month.

| Year 1 | Hours |
|---|---|
| M0 interviews and recruiting (8 × 1.5 h + 10 h) | ~22 |
| 30 launch cafes × 2.5 h | 75 |
| Build M1–M2 (about 6 weeks at 15 h/wk) | ~90 |
| Ongoing ×9 months: adds 25 h + audits ~12 h + moderation and community 7 h = 44 h/mo | ~400 |
| **Total** | **~590 h ≈ ¥1.8M of time** |

Year-1 cash: about 230 visits (new cafes plus audits) × ¥1,000 × 50% = **about ¥115k**, plus the domain. That is a small amount, but it is not ¥0.

**Year 2, at about 250 cafes.** The 12-month expiry forces about 20 re-verifications a month, and the 10% audit adds about 25. Even if they overlap, that is roughly 25–30 re-checks a month × 1.5 h ≈ **40–45 h a month just to stand still**. Adding 10 new cafes a month brings it to about 70 h a month, or **about 16 h a week**. That is a second part-time job with no pay. At that point the founder either stops adding cafes or lets data go stale. Stale data breaks G2, the one promise that sets the product apart.

## What would make the money story hold

1. **Set a time budget and treat it as a hard limit.** For example, "8 h a week, and if it goes over for 2 months, freeze coverage." Make that a third stop condition in §10.
2. **Cap the dataset to fit the budget.** Under the assumptions above, 8 h a week supports roughly 100–120 cafes at the 12-month freshness rule. Write that ceiling down. Once you reach it, more cafes means dropping old ones or making re-checks cheaper.
3. **Make re-checks cheaper.** Let an Official re-check (website or menu, about 15 minutes) renew a Visited entry. Ask cafes from F6 to re-confirm by form once a year. A drop from 1.5 h to 0.5 h per re-check roughly doubles how many cafes the same budget can carry.
4. **Settle the revenue stance, then pick a way to cover costs that fits it.** If the answer is truly "no revenue ever", add a tip jar or GitHub Sponsors link to cover cash costs (about ¥120k a year), and take out the "if monetization ever becomes necessary" hedge. If revenue is possible, settle the ODbL question now, before 250 cafes are locked under share-alike.
5. **Track hours in the M3 monthly review next to traffic.** Then cost per external directions click is a number, not a feeling.
