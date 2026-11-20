# CPO Review: Espresso Finder Japan PRD v0.1

## Verdict

**Back to discovery.** The only evidence in the PRD argues against the product, and the build plan doesn't depend on fixing that.

## Top 3 killer objections

**1. The problem is the founder's, and the only outside data point disagrees.**
The problem table is written in the first person ("I want freshly brewed espresso coffee", "keep a personal list"). The "3–5 times a week" figure is one person's habit, not a market fact. The single interview says "I just drank any coffee" and "It wasn't a big problem." The PRD admits "The problem is not yet validated", but section 4 still commits to G1/G2 and section 13 schedules a prototype right after M0. Worse, kill criterion 1 says to stop if interviewees say "it is not a big problem (as the first interviewee did)". So by the document's own rule, the first kill signal has already fired. Nothing says how many of those signals stop the project.

**2. The primary user is the person who needs this product least.**
"The espresso regular" already "keep[s] a personal list" and "will walk 10–15 minutes further". Within one ward of "50–100 cafes", that user will run out of things to discover within weeks. After that, the product has nothing new to give them. Yet the retention target is "≥ 30% … return in week 2", and the one feature that serves a returning regular, "Saved list / favorites", is deferred to *Later*. The user with a recurring discovery problem is the "visiting coffee tourist", who is listed as secondary and isn't designed for at all. The "Who else has it" row also adds people "who dislike dark roasts", but the data model has no roast field. That segment is claimed but not served.

**3. The core taxonomy doesn't match the stated pain.**
F2 forces each cafe into one of three exclusive tags: "Espresso machine / Drip only / Factory-made". But the problem statement itself says chains serve factory-made coffee "especially for iced drinks". That describes a cafe with a machine that also sells pre-made iced coffee, which one tag can't capture. The primary user is defined as someone who can "tell a semi-automatic machine shot from fully automatic", but F3 filters only on "Espresso". The distinction that defines the persona can't be filtered on. The tag "Drip only" and the filter "Fresh drip" aren't the same concept, and no rule maps one to the other.

## Other issues

- **The metrics measure activity, not the goal.**
  - "Time to choose < 5 minutes (moderated test)" is measured on a hand-picked set of 50 cafes. It isn't comparable to the "~30 minutes" baseline from real-world search.
  - "Directions click-through ≥ 40%" measures a handoff to Google Maps. It doesn't show that the user got the coffee they wanted.
  - "Wrong-info reports < 5% of cafe views" can't tell accurate data from users who didn't bother to report.
  - The interview metric is a discovery gate. It doesn't belong in the 3-month post-launch table.
- **The kill criteria are too loose.** "Nobody opens the page for one month" is almost impossible to trigger, since the founder's own community posts will produce visits.
- **G3 has no definition.** "Prove demand in one area" has no threshold, and none of the section 9 targets is labeled as the demand proof.
- **The user flow covers only the happy path.**
  - It doesn't say what happens if location permission is denied.
  - It doesn't say what happens when the default "Espresso" filter leaves no results nearby.
  - There is no "open now" filter, even though hours are in F5 and the trigger is "I want coffee now".
  - It doesn't say what language the UI is in, though every target user is foreign. Browser translation is cited only for menus.
- **The data operation is unpriced.** Verifying 100 cafes "by visiting… and calling", then re-verifying every 6 months, falls on one founder. The PRD has no time estimate, and M1 gives "4 weeks" while the launch area is still an open question in section 12.
- **G2 promises every cafe is "verified".** F5 makes the machine photo "when available", and `source` can be just "Instagram". The PRD never defines what counts as verified.
- **It cites sources nobody can see.** "an earlier FAQ draft", "The Cut", and the "(3) (4) (7)" numbering under *Later* point to documents that aren't included.
- **Section 1 over-claims.** "Licensing the verified coffee dataset" and "the dataset is what compounds" don't fit a manually curated set of 50–100 cafes in one ward.
- **Distribution is one line.** "Share in foreign-resident and coffee communities" names no channel, owner, or target.

## Required changes before build

1. **Run M0 first and nothing else.** Recruit 8 espresso-focused users who are not the founder, and write the screener into the PRD. Make the go/no-go rule concrete, for example ≥5/8 rate the problem 4+/5 *and* ≥4/8 have their own workaround such as a list or saved pins. Delete M1 and M2 until that gate passes.
2. **Pick one primary user**, either the resident or the tourist, and rebuild the scope and retention metric around them. If it's the resident, either add favorites or drop the week-2 return target.
3. **Redesign the taxonomy.** Make attributes independent rather than exclusive: machine type, hot vs. iced preparation, and drip method. Make sure the filters cover the distinction that defines the persona. Remove the dark-roast claim or add a roast field.
4. **Define "verified"**: the minimum evidence required per field, plus an estimate of the founder's hours for seeding and re-verification.
5. **Replace the metrics.**
   - Measure real-world success, such as a post-visit check-in ("Was the coffee what you expected?").
   - Set an explicit G3 threshold.
   - Make kill criteria numeric, for example fewer than N weekly active users by week 8.
6. **Specify the edge cases in the user flow**: location denied, zero results, open now, and UI language.
7. **Inline or delete the references** to the FAQ, "The Cut", and the numbered *Later* items.
