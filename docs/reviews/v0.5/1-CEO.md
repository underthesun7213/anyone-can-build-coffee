# CEO review — PRD v0.5 (Coffee brewing finder, Japan)

## Verdict
Don't approve M1 as written. v0.5 changes the core question, but the evidence and the go/no-go test still belong to the old question. It also adds a second product (the chain guide) to a budget that already couldn't cover the first.

## Top 3 killer objections

**1. The pivot was never tested, and in the launch area the new question may barely be a question.**
§18 #1 says: "The original question is 'I want coffee made on an espresso machine.'" This is a founder decision, not a finding. §2 still reads "Evidence: none yet beyond the founder," and the only outside interview "said it 'wasn't a big problem.'" M0 also didn't follow the pivot. §14 #2 still counts cafes with "a brewing method you cannot find," and #3 still tests a list "with brewing methods." Nothing in the go rule asks whether *espresso status* is unclear. The launch area is Shibuya, Omotesando and Harajuku. That is the area where a specialty cafe without an espresso machine would be unusual. If most of the 30 candidates obviously have a machine, the main field (`espresso_semi` / `espresso_auto` / `espresso_none`) answers a question nobody needs answered. The remaining value is then semi-automatic vs. fully automatic. The document never shows that users care about that split. It also bans the thing that split stands in for: "grades or 'verified' labels" and "roast level" are non-goals. So the product's main claim is a proxy for quality that it isn't allowed to call quality.

**2. The chain guide is a second product, and it weakens the trust promise.**
§1 promises "Every fact shows its source and when it was checked." F3 then lets a chain store with no method rows show "the chain's typical methods... may differ by store." G2 says "Every listed cafe says whether it makes espresso." For chain stores that goal can now be met by inference instead of a check. The headline fact can be a guess with a disclaimer, and that undercuts the product's main selling point. The guide also pulls the project in two directions. §18 #3 says chains are "not a main axis," yet chains get a new goal (G4), a screen (SC-06), a sheet, a research plan and a growth channel (§16 chain articles). The stated scope ("chains found across Japan") is national, and the v1 scope is "at least one store in the launch area." Pick one. No metric in §12 tells you whether the guide is worth its hours.

**3. The hour budget doesn't cover M1.**
§2 says finding out one cafe's method "takes 30+ minutes." M1 is "~4 weeks" at 8 h/week, so 32 hours. 30 cafes × 0.5 h = 15 h of research at minimum, before chains. That leaves about 17 hours to build six bilingual screens, F1–F6, F8, F9, a PWA, a Google Form and the analytics checks, and to translate every string yourself. Then §12 adds a recurring cost: 10 re-checks a month and a review of every correction. G3 ("runs within 8 founder hours a week") will probably fail in M1. The §15 response ("stop adding cafes") then freezes the product at launch size.

## Other issues
- **Nothing here is defensible, and the founder's own need ends early.** The asset is a 25–30 row spreadsheet. A single blog post, or Google Ask Maps, can copy it. Once M0 has researched 30 cafes, the founder's own problem (§2) is solved. The doc doesn't say why they'd keep putting in 8 h/week after that.
- **The stop rule doesn't fit the pivot.** §15 shuts down if Google or Tabelog lets people "filter... by espresso machine type or brewing method." Ask Maps (§14 #5) can already answer free-text questions without any filter. The doc defers that decision to M0 instead of stating the threshold now.
- **§3 assumes something new about users without evidence.** "Many Japanese coffee people are used to dark-roast drip; the espresso filter lets them find something different" is a second audience that M0 doesn't test, and none of the 3 interviews is assigned to it.
- **The interview sample isn't tied to the target user.** "3 coffee people" are not required to be espresso regulars, though they are now the primary user (§3).
- **The "Was it as listed?" metric can't judge espresso accuracy.** `listed-yes` covers the whole page, and the ≥ 80% target is set before any baseline exists.
- **Small inconsistencies make the decision record harder to trust.** Goals are numbered G1, G2, G4, G3. M1 says "4 sheets" while §9 says "Three sheets" and then defines four. F9 sits before F8.

## What would change my mind
- M0 is rewritten for the new question. Count how many of the 30 launch-area cafes have an **espresso status** (machine yes/no, semi vs. auto) you can't find in 2 minutes, Ask Maps included. Go only if at least 20% are unclear.
- All 3 interviewees are espresso regulars, and at least 2 say machine *type* changes where they go. If they only care "is there espresso," cut the semi/auto split and the product shrinks a lot.
- The chain guide moves out of v1. Alternatively, chain stores without their own checked row show "espresso status unknown" instead of the chain's typical methods.
- A time plan for M1 that adds up to 32 hours or less, with research hours measured in M0 and not estimated.
- One sentence on why this keeps going after the founder's own list is done. If the honest answer is "it doesn't need to," then a Google My Maps list (M0 #3) may be the whole product, and the right call is to stop there.
