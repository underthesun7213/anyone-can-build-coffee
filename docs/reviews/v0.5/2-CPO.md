# CPO review — PRD v0.5 (Coffee brewing finder, Japan)

## Verdict
Do not build yet. The product question changed, but the validation plan, metrics and data rules still test the old one. The new core field, espresso type, has no defined way to be verified.

## Top 3 killer objections

**1. The pivot moved the question but left M0 testing the old one.**
§1 now says the product answers *"does this cafe make espresso on a machine, and what kind?"* None of the M0 gates test that question:
- The uncertainty test counts cafes with "a brewing method you **cannot** find on Google in 2 minutes."
- The list test is a My Maps list "with brewing methods."
- The interviews recruit generic "coffee people."
- §15's kill switch still triggers on "espresso machine type **or brewing method**."

Here is how this fails. In Shibuya, "does it serve espresso" is usually answerable from a menu photo in well under 2 minutes, so the ≥20% unclear gate passes only because of siphon or AeroPress. M0 then says "go" for a product whose required field is espresso, based on evidence about the secondary fields. The only outside evidence (§2) is one person who said it "wasn't a big problem." Nothing yet shows anyone besides the founder cares about *semi vs. fully automatic*. That distinction is the only one that separates this product from "the cafe has lattes on the menu."

**2. "What kind" of machine has no verifiable source, and `espresso_none` has none at all.**
§6 allows `cafe_site`, `cafe_social`, `owner`, `visit` and `third_party` as sources, and §9 makes `source_url` **required**. Two problems follow:
- Cafe websites and menus almost never say "fully automatic." The type usually comes from seeing the machine, which is a `visit`. A visit has no URL, so the row breaks the schema.
- `espresso_none` is a claim that something is absent. No source in §6 can show that, and a menu without espresso drinks doesn't prove there's no machine.

§12's accuracy check says "re-checked each month (website or menu)." That source can't confirm the field that matters most, so the "≥ 8 of 10 correct" figure would be meaningless for espresso type.

The taxonomy also has gaps on the product's own axis:
- Capsule or pod machines (common in small kissaten and food-first cafes) have no code.
- "Made on a machine" is never contrasted with anything. The founder's 30-minute pain only makes sense if "machine" means something more specific than "has espresso."

**3. Required vs. secondary data makes the filters lie, and chain fallback makes "required" untrue.**
- **Hand-brewed filters.** §5 says secondary methods are "recorded when found, never required." F2 still offers Hand drip, Siphon, French press and AeroPress filters, and §16 says weekly posts will link to views like "Cafes near Omotesando that brew by siphon." Any cafe whose siphon wasn't researched silently drops out of a list that looks complete.
- **"Hide batch-brew-only."** This removes cafes "whose only non-espresso method is `batch_brew`." The data can't tell "only batch brew" from "batch brew is the only one we found."
- **Chain stores.** §5 says "Every listed cafe must have its espresso status recorded." F3 says a chain store with no rows of its own shows "Typical for this chain — may differ by store." So:
  - Does the chain's typical row count as the store's required espresso status?
  - Does it count for filtering?
  - Does it count for the list card, which shows "espresso status first"?

  If it does, G2 ("Every listed cafe says … with a source and a date") is met using a source about a different entity. If it doesn't, chain stores have no status on the card.

## Other issues
- **Data model contradicts itself.** §9 says "Three sheets" and §11 says "three CSVs." Four sheets are defined (`cafes`, `chains`, `methods`, `stations`), and M1 says "4 sheets."
- **The list card shows one status, but the data allows several.** A cafe can have both `espresso_semi` and `espresso_auto` (F2 says so). Nothing says what the card shows then, or what happens if `espresso_none` is entered alongside a machine code. There's no validation rule.
- **G4 scope is unbounded within the time budget.** Brands with 5+ shops in Japan that have a store near Shibuya, Omotesando or Harajuku easily come to 15–25 (Starbucks, Doutor, Tully's, Excelsior, Komeda, St. Marc, Blue Bottle, %Arabica, and others).
  - It's unclear whether chain stores count toward the 25–30 launch cafes. If chain stores are in, Starbucks alone could take up a large share of the launch list.
  - It's unclear whether every store must be listed under "Stores of that chain in the covered area."
  - SC-06 sorts by "number of stores in the launch area," but no field or count source is defined.
- **The chain guide doesn't serve the stated user.** The guide is pitched as "chains found across Japan" in §1 and F9, but v1 scope is launch-area only. That's the wrong unit for visitors, the audience §16 targets with chain articles.
- **The M1 timeline doesn't fit the budget.** M1 is ~4 weeks at 8 h/week, or 32 hours. That has to cover researching 25–30 cafes plus chains, building six screens and two languages, and setting up GoatCounter events. §2 says finding the answer for one cafe takes "30+ minutes." Research alone for 30 cafes and ~15 chains is about 22+ hours, which leaves about 10 hours for the build.
- **No metric measures the new core question.** Filter use (for example, how often "Hand-made espresso only" is chosen) isn't tracked. Without it, the founder can't tell whether espresso type is what users want.
- **The §3 claim is unsupported and off target.** "The espresso filter lets [dark-roast drip people] find something different" adds a second audience with no evidence, and it conflicts with "espresso regulars first."
- **The F6 target date is wrong.** "≥ 80%, from M1 launch" is a target before there's any traffic. There's also no minimum response count, so at 5 answers one "No" moves the rate by 20 points.
- **Numbering is out of order.** Goals run G1, G2, G4, G3, and F9 comes before F8. This is minor, but it signals the edits weren't reconciled. §17 claims S7 inconsistencies were answered.

## Required changes before build
1. **Rewrite M0 around espresso type.**
   - Uncertainty test: the share of 30 cafes where *machine type* (semi/auto/none) can't be found in 2 minutes.
   - Interviews: recruit espresso drinkers, and ask whether semi vs. auto changes where they go.
   - Narrow §15's kill condition to match.
2. **Define verification for espresso type and absence.**
   - Allow `visit` without a URL, or require a photo link.
   - Define what evidence counts for `espresso_none`.
   - Add a capsule/pod code, or explicitly fold it into `espresso_auto`.
   - Change the §12 accuracy check so it can actually confirm machine type.
3. **Make "unknown" explicit for secondary methods.**
   - Either record "not checked" vs. "absent," or label hand-brewed filter results "where known."
   - Drop "Hide batch-brew-only" until the data can support it.
4. **Decide the chain-store rule in one place.**
   - Does a chain typical row satisfy the required espresso status, the filter and the card? If yes, mark it on the card.
   - Do chain stores count toward the 25–30 launch cafes?
5. **Cap G4.** Set a number, for example the top 8 chains by store count, and define where the store count comes from.
6. **Fix the sheet count, the card rule for multiple statuses, and the M1 time budget.** Either cut chains from M1 or extend M1 to about 6 weeks.
7. **Add a filter-use event** so the espresso-first bet can be measured.
