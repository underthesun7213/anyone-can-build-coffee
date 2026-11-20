# CTO review — PRD v0.5 (Coffee brewing finder, Japan)

## Verdict
The stack is fine. The new primary fact (semi vs. fully automatic) mostly can't be sourced the way §6 requires, and the chain fallback leaves the required field empty. As a result, the data model can't hold the product's main promise.

## Top 3 killer objections

**1. The headline fact can't be sourced under the document's own rules.**
§5 says "Every listed cafe must have its espresso status recorded: `espresso_semi`, `espresso_auto` or `espresso_none`", and §9 makes `source_url` "Required" on every method row. Cafe websites and menus list drinks, not machines. A menu saying "latte" doesn't tell you whether the latte comes from a La Marzocco or a super-automatic. The distinction usually shows up only in photos (`cafe_social`, "linked, never copied") or at a `visit`, and a visit has no URL to put in a required `source_url` field. `espresso_none` is worse: it is a negative claim, and no page proves that a machine is absent. Three rules then break:
- §12 Accuracy: "10 oldest cafes re-checked each month (website or menu)". The primary field can't be re-checked that way, so the metric measures the secondary data.
- §15 floor: G2 can't be met for any cafe whose only evidence is an Instagram photo, unless that counts as a source.
- M0 uncertainty test (§14.2): it asks about "a brewing method", not machine type. So the go/no-go test doesn't measure the question v0.5 now leads with.

**2. The chain fallback leaves the required field empty, and filters don't say how to treat it.**
F3 says: "If the store has no method rows of its own, it shows the chain's typical methods." That means a chain store can be listed with zero `methods` rows where `cafe_id` is set, which breaks §5's "every listed cafe must have its espresso status". The document never says whether F2's "Any espresso" / "Hand-made espresso only" evaluates inherited chain rows. If it does, a store gets filtered on a fact the page itself labels "may differ by store". If it doesn't, chain stores drop out of every espresso filter. The list card (§7) puts "espresso status first" but doesn't say whether an inherited status is shown, or how it's marked. Machine type does vary within chains (equipment changes by store age and format), so it can't safely be inherited.

**3. The data model contradicts itself and nothing checks it at build time.**
§9 says "Three sheets in one spreadsheet". §11 says "three CSVs". Then §9 lists four (`cafes`, `chains`, `methods`, `stations`), and M1 says "4 sheets". The document states the integrity rules but never says what enforces them:
- "Exactly one of `cafe_id` / `chain_id` is set"
- exactly one Espresso-group row per cafe (can a cafe have both `espresso_semi` and `espresso_none`?)
- `moved_to` points to an existing active id
- `chain_id` resolves
- `station_id` is "computed at build"

The workflow is that the founder edits the sheet and redeploys (F5), so a single typo publishes a broken detail page or a cafe that silently disappears from filters. The document also never says how the spreadsheet becomes CSV: a manual export of 4 tabs, or an API pull. Manual export of 4 tabs on every correction is the realistic failure mode.

## Other issues
- **"Hide batch-brew-only" is ambiguous** (F2): "removes cafes whose only non-espresso method is `batch_brew`". Read literally, it hides a cafe with `espresso_semi` + `batch_brew`, which is exactly the cafe the product is for. Is `espresso_none` a "non-espresso method"? Undefined.
- **Filter URL encoding** isn't specified for more than one value (`f=siphon,aeropress`? repeated `f=`?), and neither are the values for the espresso choice. Posts will link to these URLs (§16), so they need to be fixed before launch.
- **Chain definition can't be computed.** "5 or more shops in Japan" has no field and no source in `chains`. `note_en/ja` is a "fact" (F9: "Each fact with a source") but has no source column. `chains.checked_at` and method-row `checked_at` are two different dates, and the document doesn't say which one the page shows.
- **OSM licence.** Copying OSM coordinates into your own sheet makes a derived database under ODbL. Attribution on SC-05 alone may not be enough, because share-alike can apply to the CSV. The document doesn't say which geocoder produces "geocoded" (Nominatim limits use; GSI has its own terms).
- **Abuse plan doesn't fit the stack.** "Add rate limits or a review queue" at 20/week: Google Forms has no rate limiting, and a static site has no queue. The only real control is the founder's manual review, which already exists.
- **F6 metric is statistical noise.** At about 100 visits a week, and assuming 2–5% of visitors open a detail page and press a button, you get roughly 1–3 answers a week. "≥ 80%" on that sample means nothing for months. GoatCounter also doesn't dedupe events, and localStorage dedupe is per device, so it's easy to game.
- **Station assignment:** with 3 stations about 1 km apart, "nearest covered station" is fine. But F8's 1.5 km radius and F1's distance sort aren't connected: a cafe 1.4 km away appears under a station that a user may not think of as nearby.
- **Language root redirect, `/list?c=` and query-driven filtering** all need client JS on a static host. That's fine, but the document doesn't say what users without JS or crawlers see (titles in §10 are per page, not per filter).

## Recommended simplest build
1. **Fix the evidence model first.** Allow `visit` and `cafe_social` rows with `source_url` optional when `source_type = visit`. Add a `confidence`-free field `evidence` (`menu` | `photo` | `seen`), and decide whether `espresso_none` needs any source at all. Rerun the M0 uncertainty test on **machine type**, not "a brewing method".
2. **One validator script** run before every deploy that checks the rules in objection 3. It should fail the build rather than publish.
3. **Pull the sheet via the published-CSV URLs in CI**, not by hand.
4. **Chain stores need their own espresso row to be listed.** Show the chain's typical info on the chain page only, never in filters or cards.
5. **Cut for M1:** PWA/service worker, F6 buttons and the separate SC-06 list page. One `/chains` table of 5–8 chains is enough. That's the realistic way to fit about 30 cafes of machine-type research, plus bilingual copy, into 4 weeks × 8 h = 32 hours. Assuming 30–45 min of research per cafe, research alone is 15–23 hours.
