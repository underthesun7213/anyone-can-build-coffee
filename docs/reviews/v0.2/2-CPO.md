# CPO Review — PRD v0.2

## Verdict

**Back to discovery.** Finish M0 with a decision rule before writing any code in M1.

## Top 3 killer objections

**1. The only evidence you have points against you, and you've reworded it as support.**
You write: *"It tells us the problem is real for coffee people and weak for casual coffee drinkers."* One casual drinker said *"It wasn't a big problem."* That tells you nothing about coffee people. The only evidence the problem is real is still the founder: *"3–5 times a week (the founder's own habit; not yet measured for others)."* Then you take away the consequence: *"Interviews inform the product; they are not a hard go/no-go gate."* M0 has no threshold, and the hand-made list is *"a signal, not a verdict."* As written, no result from M0 can stop M1. That isn't discovery. It's a delay before building anyway.

**2. You widened the user, but the product you built is for the old one.**
§3 says the product is *"designed around discovery"* for the cafe hopper, *"resident or tourist."* What v1 actually ships is *"about 30 cafes"* in one unnamed launch area, sorted by *"Cafes near me."* That is the espresso regular's feature. A weekend hopper uses up 30 cafes in a month, and there is nothing in v1 for coming back: favorites are deferred and "new cafes near you" is deferred. A tourist can only use it if they happen to be in the launch area. The UI language isn't specified either. All three growth communities are English-speaking foreign residents (*"r/JapanLife… foreign-resident Facebook group… international-student group"*), yet the problem is described from a Japanese-chain perspective and *"multilingual"* is a non-goal. Choose one user, one area and one language.

**3. None of your metrics can tell whether the goal was met.**
- *"Time to choose a cafe (moderated test, 5 people) < 5 minutes"* runs on a 30-cafe dataset you curated, with tasks you set. It will pass. It shows nothing about real use.
- *"Directions clicks per external visit ≥ 30%"* measures intent. It doesn't tell you whether the person went, or whether the coffee matched the label. The goal is the right coffee, and nothing measures that.
- *"Grows month over month"* has no baseline and no number. Going from 3 visitors to 4 counts as a pass.
- The accuracy audit is 10% of 30, which is 3 cafes. One error gives 67%. *"≥ 90%"* is noise.
- The stop rule *"No external traffic for 3 consecutive months"* can't realistically fire, because one stray visit resets it. The other stop rule, Google adding an equivalent filter, can't be observed. That leaves you with a project nobody can kill.

## Other issues

- **"Official" is not official.** *"Official: Cafe's own website, menu, or self-report."* Anyone can submit an anonymous Google Form, and you list *"promotional"* self-reports as a risk yourself. Self-reports still get the same trust label as the cafe's own menu.
- **Evidence granularity contradicts the data model.** The data is per base, hot and iced (§6), but *"Every cafe shows one evidence level."* You could have visited for hot espresso and only guessed at the iced coffee.
- **The report flow can't work on this stack.** F5: *"a flagged cafe stays visible with a 'being re-checked' note"*. The site has *"No backend"* and the form is Google Forms, so the flag only appears when you edit JSON by hand and rebuild. It also isn't *"rate-limited."* That's a queue that depends on you.
- **Taxonomy edge cases are unresolved.** Is batch brew held in an urn for 4 hours *"Fresh brew"* or *"Pre-made"*? The rule *"within the day"* says it's fresh brew, which contradicts the user's pain. A fully automatic push-button machine counts as "Espresso," which is exactly the chain experience the user wants to avoid. Should hiding fully automatic machines be the default?
- **The data is weakest where the user needs it most.** If the 30 launch cafes are specialty shops, nearly all of them are "Espresso, Visited" and the filter does nothing. The value is in ambiguous chains and kissaten, and the curation plan says nothing about them.
- **The problem and the users disagree.** §2 lists *"people who dislike dark roasts"*, and §6 drops roast level. Either remove that group or serve it.
- **"From today"** in the one-line pitch overpromises for a single area of about 30 cafes.
- **Hours are left to Google Maps,** and a 12-month freshness window leaves room for closed cafes to stay listed. Sending someone to a closed cafe is the worst outcome this product can produce.
- **F6 has no way to reach owners.** QR stickers and outreach are cut, so *"≥ 5 cafe self-reports"* depends on luck.
- **Curation cost:** you time the first 10 cafes, but there's no threshold that changes any decision.
- **F7 station pages** for one area with 30 cafes will be thin and few. That's not much of an SEO bet.
- **Empty states aren't defined:** no cafe within range, a station that isn't covered, or every result filtered out.

## Required changes before build

1. **Give M0 a decision rule.** For example: at least 4 of 5 coffee people rate the pain ≥ 4 *and* already keep a workaround list, and the hand-made list gets at least N saves or clicks from people outside your circle. If it misses, don't start M1.
2. **Pick one primary user,** either the espresso regular or the hopper, and cut the features that don't serve them. Name the launch area and the UI language, and make sure they match the communities you'll post in.
3. **Add a ground-truth metric.** Ask after the visit whether the coffee matched the listing, through a one-tap prompt or a follow-up in the moderated test. Replace *"grows"* with absolute targets for weekly external visitors and returning visitors.
4. **Fix the audit sample.** Audit all cafes, or at least 20, until the dataset is over 200.
5. **Set numeric stop rules.** For example: fewer than X external visitors a week for 3 months, or curation time above Y hours a month.
6. **Split the evidence levels:** Visited / Official (published by the cafe) / Self-reported / Unconfirmed, recorded **per base**, not per cafe.
7. **Close the taxonomy gaps:** set a hold-time limit for batch brew, and decide whether fully automatic machines are hidden by default.
8. **Rewrite F5** to match the static stack, and define the empty states.
