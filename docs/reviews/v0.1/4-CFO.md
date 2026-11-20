# CFO Review: Espresso Finder Japan PRD v0.1

## Verdict

**Not fundable as written.** It is a free hobby with an expensive manual data pipeline. Nobody in the document pays, and the one "asset" loses value unless the founder keeps paying for it in hours.

## Top 3 killer objections

**1. No customer, only "hypotheses."** Section 11 is titled *"Business model (hypotheses, not v1)"* and says *"revenue is not a v1 goal."* The plan lists three revenue streams, each aimed at a different payer: cafes, brands and data buyers. None has a price, a named target, or a test in the milestones. M0 to M3 measure interviews, cafe counts and clicks. Nothing measures willingness to pay. A plan with no payer and no price is a cost plan.

**2. The paying side and the "verified" claim contradict each other.** *"Featured placement for specialty cafes (clearly labeled)"* means the cafes you verify also pay you. Your value proposition is a neutral answer to *"what coffee does this place actually make?"* Once cafes pay for placement, the dataset becomes advertising. The likely payers are small owner-run cafes, already full of regulars, and they would be paying to reach an audience the PRD sizes at roughly zero. Read the evidence: *"It wasn't a big problem, so I didn't try."*

**3. The "compounding dataset" decays, and it is labor-bound.** *"The dataset is what compounds over time"* is false on the PRD's own terms: *"re-verify each cafe every 6 months."* That is a recurring cost on every row. Section 12 already admits the scaling problem: *"Can one person keep data accurate as the area grows?"* The answer is no. The moat also has an off switch: *"Will Google Maps / Tabelog add a 'coffee type' attribute?"* If Google adds one structured field, licensing revenue goes to zero.

## Back-of-envelope numbers

Assumptions: founder time valued at ¥3,000/hr. Initial verification takes 1.25 hr per cafe (travel, visit, Instagram, phone). Re-verification takes 0.5 hr. Google Maps Platform pricing is roughly at list.

| Item | Launch area (100 cafes) | All of Tokyo (~3,000 relevant cafes) |
|---|---|---|
| Initial curation | 125 hr ≈ ¥375k | 3,750 hr ≈ ¥11.3M (~2 FTE-years) |
| Re-verification (2×/yr) | 100 hr/yr ≈ ¥300k | 3,000 hr/yr ≈ ¥9M/yr (1.5 FTE) |
| Hosting (Supabase Pro + domain) | ~¥5k/mo | ~¥15–30k/mo |
| Maps/Places API | Free tier covers it | ≈ ¥1–3 per session above free tier. *"cached within its terms"*: Google's terms allow little caching, so cost scales with traffic |

Cash burn is trivial at v1, about ¥60k/yr. **Labor is the real cost.** One verified cafe costs about ¥3,750 to create and about ¥3,000/yr to keep.

**Revenue ceiling, best case.** Assume one ward with about 10k foreign residents, 5% of them espresso regulars (500 people), and 20% reached. That is **~100 weekly users**. No cafe pays to reach 100 people. Break-even on a modest founder salary of ¥400k/mo at ¥5,000/cafe/month needs **80 paying cafes**, which is the entire 50–100 listing. Equipment and roaster "partnerships" are one-off sponsorships of perhaps ¥100–500k, not recurring revenue. A licence for a dataset of 100 rows is worth close to nothing.

**Unit economics.** Revenue per user is ¥0. *"No accounts in v1. Anonymous analytics only."* So you are not even building an owned audience you could monetize later. Revenue per cafe is ¥0. Cost per cafe is about ¥3,000/yr.

**Runway.** The PRD does not mention it: no budget, no funding, no salary, no date when money runs out. The kill criteria are product signals only. *"Nobody opens the page for one month"* sets the bar at zero. No financial condition stops this project.

## What a fundable money story would need

1. **One payer, one price, tested before M2.** Example: 10 signed letters of intent from cafes at ¥3,000–5,000/mo, or 3 roasters or equipment distributors committing ¥200k+ each. Add a "willingness to pay" gate to M0.
2. **The payer that actually has volume.** Japan gets tens of millions of foreign visitors a year. The *"visiting coffee tourist"* is the segment with money and traffic, through affiliate links, tour or hotel concierge licensing, or a paid city guide. The resident espresso purist is too small a niche. Model that segment's funnel instead.
3. **Curation cost under ¥1,000 per cafe and falling.** That needs crowdsourced photos plus moderation, or cafe self-reporting with spot checks. The *Later* item "users adding cafes" has to move into v1 economics, or the dataset never scales past one ward.
4. **A neutrality rule.** Paid placement must never affect the coffee-type data or ranking. State this in writing, or drop placement and sell data and affiliate access only.
5. **Financial kill criteria.** Example: "If fewer than X paying commitments by week 12, or curation costs more than ¥Y per cafe, stop."
6. **A defensibility answer to Google.** Explain why a buyer pays you instead of waiting for Google to add the attribute: freshness SLA, machine-level detail, or exclusive cafe relationships.

Until then, this is a worthwhile side project. It is not a company.
