# CEO Review — PRD v0.2 (Espresso Finder Japan)

## Verdict
**Do not back the PWA yet.** Run the hand-made list as the whole product for M0 and kill or proceed on numbers you set in advance.

## Top 3 killer objections

**1. The evidence cannot change the decision, so it isn't evidence.**
The only outside data point says the opposite of the thesis: *"It wasn't a big problem, so I didn't try."* The PRD turns that into *"It tells us the problem is real for coffee people."* No. It tells you nothing about coffee people, because you interviewed none. The frequency claim, *"3–5 times a week (the founder's own habit; not yet measured for others)"*, is n=1 and the one is you. Then the PRD shields the bet: *"Interviews inform the product; they are not a hard go/no-go gate,"* and M1 follows M0 no matter what. If no interview result can stop the build, M0 is a ritual, not a test.

**2. Thirty cafes cannot deliver the promise the product makes.**
G1 promises a cafe *"in under 5 minutes"* via *"Cafes near me."* But coverage is *"one launch area, about 30 cafes,"* growing *"slowly,"* and you have no idea how slowly (*"Time the first 10 cafes"*). Outside that one area, "near me" returns nothing. Inside it, the user you designed for, the cafe hopper with a *"recurring need to discover,"* runs through 30 cafes in a few weekends. You picked the persona who most needs breadth and gave them the narrowest dataset. Meanwhile your own M0 deliverable, a *"hand-made list of ~30 cafes (Google My Maps or Notion),"* already does what F1–F4 do. The PRD never says what the PWA adds over that list that justifies 5–6 more weeks of your time.

**3. The project's nature and goals contradict each other.**
It is a *"non-profit side project... no revenue goal,"* aimed at *"a useful, accurate dataset."* Yet it carries growth targets (*"grows month over month"*), SEO pages and a three-community launch. That is a startup's launch plan with the accountability taken out. The stop conditions confirm it. *"No external traffic for 3 consecutive months"* is a bar a single stray visitor clears, so the project can never fail and becomes a zombie. *"Google Maps or Tabelog adds an equivalent filter... the product has done its job"* claims credit for someone else's roadmap. If this is a hobby, drop the growth theatre. If it is a bet, give it a bet's kill criteria. Right now it is neither.

## Other issues

- **Defensibility is zero, and that is fine only if you admit it.** ODbL share-alike, a public `cafes.json` in git and Google Forms intake mean anyone can copy this, Google included. The only moat is freshness bought with founder hours, and the PRD never budgets those hours.
- **The audience is incoherent.** The one-line pitch says *"coffee people in Japan,"* but every distribution channel is for foreigners (*"r/JapanLife... foreign-resident Facebook group... international-student group"*). The site language is never stated, and *"multilingual menus"* is a non-goal. Which language do the station pages (*"Espresso near Shibuya Station"*) rank in?
- **The audit is statistically empty.** 10% of 30 cafes is 3. *"≥ 90% of checked cafes"* really means "3 out of 3," and one wrong cafe reads as 67%.
- **The self-report target has no mechanism.** *"≥ 5 cafes in the first 3 months"* through F6, while the PRD rules out the only way owners would hear of it: *"Not in v1: QR stickers... for cafes."*
- **The metrics have no baselines.** "Grows month over month" from what? Why is *"≥ 30%"* the directions-click target? Without a baseline these numbers can't fail.
- **The taxonomy may answer a question your users already know.** Specialty cafes almost all pull espresso. Pre-made coffee is mostly a chain problem, and chain customers are explicitly *"Not for."* Show that real uncertainty exists among the cafes coffee people actually consider.
- **The change log reads as cover.** *"53 agreed"* sounds rigorous, but the two points that mattered most to me (the interview gate and the Google risk) were the ones you disagreed with.

## What would change my mind

1. **Pre-registered kill criteria for M0, written now.** For example: of 5 coffee people, at least 3 rate the pain ≥ 4 and describe a workaround they keep up. Below that, stop.
2. **The My Maps list is the MVP.** Publish it in one community for 4 weeks with a hard threshold, e.g. ≥ 50 opens from outside your circle and ≥ 5 unprompted requests for more areas. Build the PWA only if it clears that.
3. **A time budget.** State weekly hours, then derive cafes per month and the date the launch area reaches useful density (for example, ≥ 15 cafes within 1 km of one station).
4. **One audience and one language.** Choose foreign residents in English, or Japanese residents in Japanese, and align channels and SEO to that choice.
5. **Honest stop rules.** A traffic floor (e.g. < 20 external weekly visitors at month 3 means stop) and a cap on founder hours, not "zero visitors."
6. **Evidence the uncertainty is real.** Take 30 cafes that coffee people actually shortlist and count how many have a coffee base you can't determine from Google in 2 minutes. If it is under 20%, the product solves a problem that is already mostly solved.
