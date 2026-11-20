# CTO review: PRD v0.2

**Verdict:** The stack is now cheap enough, but the trust model and the metrics still don't work. Don't build M1 until the data schema and the measurement plan are fixed.

## Top 3 killer objections

**1. The accuracy claim is self-graded and statistically meaningless.**
"Each month, re-check a random 10% of cafes; that audit is the accuracy metric." With ~30 cafes, that is 3 cafes a month. One error drops you to 67%, so "≥ 90% of checked cafes still correct" is noise. The auditor is also the person who entered the data. The 12-month staleness window ("older than 12 months show 'may be out of date'") misses the thing most likely to change: iced menus are seasonal, and "pre-made iced" is exactly what the product promises to catch. Fix: audit a fixed 10 cafes a month, oldest first. Check each base (hot and iced) separately. Re-check iced bases every season.

**2. The evidence model contradicts the taxonomy, and self-reports skip verification.**
§6 records data "separately for hot and iced", but §7 says "Every cafe shows **one** evidence level and a date", and the schema has a single `evidence, verified_at`. Suppose you saw the hot espresso machine in person but read about the iced coffee on the website. Which label wins? Then: "Official: Cafe's own website, menu, **or self-report**." So anyone who fills in a Google Form claiming to be staff gets the same top-tier label as the cafe's own website, and F6 has no ownership check. §13 admits self-reports "may be inaccurate or promotional" and then gives them that label anyway. Fix: store evidence per base. Make "Self-reported" its own level. Promote it only after a website match or a visit.

**3. §9 cannot be measured with the stack in §8.**
"Cookie-less page views and outbound clicks only" gives you no visitors and no sessions. So "External weekly visitors" and "Directions clicks per external visit ≥ 30%" can't be computed, only clicks per page view. "Exclude… visits from places where the founder promoted it to friends (tracked by tagged links)" fails the moment a friend copies the bare URL or a link gets forwarded. The founder's own visits aren't excluded by any mechanism at all. "Grows month over month" has no baseline. "No external traffic for 3 consecutive months" never triggers, because crawlers alone keep traffic above zero. G1 ("< 5 minutes", 5 moderated users, ~30 cafes in one area) can't fail: of course you can choose among 30 pins in 5 minutes. Fix: write numeric thresholds against daily-hashed visitor counts (GoatCounter/Plausible-style), filter on referrer, and exclude the founder with a localStorage opt-out flag.

## Other issues

- **Licensing, OSM.** "The derived dataset *may* need to be shared under the same licence" is a decision you're dodging. Merging OSM names and coordinates into `cafes.json` creates a Derivative Database under ODbL. Decide now: publish the whole file under ODbL, or keep OSM fields in a separate layer. Also, "entered by the founder" coordinates must not be read off Google Maps. That breaks Google's terms and contaminates any ODbL release.
- **OSM tiles.** The tile.openstreetmap.org usage policy forbids offline prefetching. "Works offline for the last list viewed" must exclude tiles, or you need a tile provider that allows caching.
- **Station data.** "Works by station when location is denied" and F7 need a station dataset. Its source and licence aren't stated.
- **Abuse.** "Rate-limited in practice by founder moderation" is not rate limiting. If one anonymous form submission puts a public "being re-checked" note on a cafe, any competitor can flag every rival. Also, on a static site with no backend, the note only appears when the founder edits the JSON by hand and redeploys. So either it's slow or it's unspecified. Pick one.
- **Under-specified schema.** `machine_type` is a single value, but cafes run more than one machine. There's no `closed`/`moved` state. No hours ("left to Google Maps") means G1 happily sends users to cafes that are closed right now. With 30 cafes, filtering by machine type and brew method returns empty lists.
- **Station pages for SEO.** Station pages built on 30 cafes in one area are a handful of thin pages. Don't count on search traffic in v1.
- **Privacy.** "Own photo" of the bar will capture staff and customers. Set a rule: equipment only, no faces. Google Forms that collect owners' names or emails are personal data under APPI, so add a notice. Cookie-less doesn't mean exempt from GDPR if IPs are processed. Name the vendor and how it handles IPs.
- **PWA.** For a 30-row dataset, a service worker adds cache-invalidation bugs. Stale data defeats the whole "accuracy" pitch.

## Recommended simplest v1 build

The hypothesis is: *strangers will use coffee-base data to pick a cafe and click directions.* M0's hand-made list already tests most of it. Build only this:

1. One spreadsheet → CSV → one static HTML page. A list sorted by distance, with three filter chips (Espresso hot, Espresso iced, Hide pre-made). No map, no PWA, no station pages.
2. Per-base fields: `base, temp, method, evidence (visited / official / self-reported / unconfirmed), checked_at, source_url`.
3. One Google Form for corrections, with a required evidence field (photo or menu URL). Nothing goes public until the founder reviews it.
4. Privacy-light analytics with an outbound-click event. Founder opt-out flag. A referrer breakdown per community post.
5. The test: 6 weeks, 3 community posts. Success = ≥ 100 non-founder visitors and ≥ 20% directions clicks per visit. Otherwise, stop.

Add the map, the PWA and F7 only after that bar is met.
