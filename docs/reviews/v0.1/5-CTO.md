# CTO Review — Espresso Finder Japan PRD v0.1

## Verdict
Don't build the app yet. The only evidence you have argues against the problem, the data plan conflicts with the places-API terms you rely on, and v1 can be tested with a static list.

## Top 3 killer objections

**1. You are engineering a solution to a problem your only data point rejects.**
The PRD quotes it: *"I just drank any coffee"*, *"It wasn't a big problem, so I didn't try."* Then it specs PostGIS, a PWA and an admin backend anyway. M0 is supposed to be the go/no-go, but M1 asks for "50 verified cafes... clickable prototype" without saying what score counts as a "go". The kill criterion *"Nobody opens the page for one month"* can't fail: the founder's own clicks keep it alive. Set a hard number, for example fewer than N directions clicks a week from people other than the founder.

**2. "Cached within its terms" is hand-waving over a legal and cost problem.**
*"Base place data (name, address, hours, coordinates) from a maps/places API; coffee fields stored in our own database."* With Google Places this probably isn't allowed. The terms generally let you store only `place_id` indefinitely. Coordinates have a short time-limited cache, and names, addresses and hours can't be stored at all. That means a live Places call on every card render, billed per SKU, plus required Google attribution. *"Google Maps JS API or Mapbox"* is not a free choice either: Google Places content is generally not allowed on a non-Google map. And §11's *"Licensing the verified coffee dataset"* fails if every record hangs off identifiers and content you don't own. Pick a source with permissive terms, such as OpenStreetMap or your own manually entered addresses, or accept Google's lock-in and per-request costs. Then write down the cost per 1,000 sessions.

**3. "Verified" is undefined, and the data model can't hold reality.**
*"G2. Every listed cafe shows its coffee type and brewing method, verified"*, yet `source` can be *"Instagram"*. A machine in an old photo doesn't verify anything. `coffee_type` is a single enum (*Espresso machine / Drip only / Factory-made*), but the PRD itself says chains serve factory-made coffee *"especially for iced drinks"*. That is a per-drink property, not a per-cafe one. A cafe with a La Marzocco and bottled iced latte breaks your schema. Re-verifying every *"6 months"* is too slow for hours, closures and menus in Tokyo, and nothing says who does it once one founder has 100+ cafes (§12 asks this question and never answers it). Define what counts as verified (an in-person visit, or an official source dated within X months), make the fields per drink (hot or iced), and budget the founder's time per cafe.

## Other issues
- **Scale of the curation:** 50 visited cafes in 4 weeks is about 2.5 a day alongside building the product. There is no plan for a second curator, no contributor rubric, and no QA (for example a second person checking a sample). "Report wrong info" is the only feedback loop.
- **Metric "Wrong-info reports < 5% of cafe views":** low reports usually mean low engagement, not accurate data. Measure accuracy directly by re-auditing a random 10% each month.
- **Report button abuse:** no accounts and no rate limiting, so anyone can flag every cafe. Nothing says what happens to a flagged cafe in the meantime.
- **Admin form under "No accounts in v1":** the admin side still needs authentication. This isn't specified.
- **Location privacy:** the PRD doesn't say whether coordinates leave the device. Sort by distance on the client and never send raw coordinates to the server or analytics. Make the "pick a station" option work fully without location permission. If any location is logged, state that it is coarsened and say how long it is kept.
- **Photos:** `machine_photo_url` pointing at someone's Instagram post is a copyright and hotlinking problem. Use your own photos only.
- **Coverage cliff:** "Near me" with 50 cafes in one ward shows an empty list to anyone outside it. Showing nothing nearby will feel like the product is broken. Default to the launch area and say so.
- **"Espresso filter on by default"** inflates the success metrics you then report.
- **"Weekly returning ≥ 30%"** isn't a credible measure for a tool people use when they need a cafe, in a single ward, with cookie-less analytics.
- **Over-built stack:** PostGIS for 100 rows is unnecessary, and so is the PWA.

## Recommended simplest v1 build
1. **Before any code:** run the 8 interviews with a pass bar (≥5/8 rate the problem 4+/5). In parallel, publish a hand-curated Google My Maps or Notion list of 30 cafes in a coffee-focused foreign-resident community. Count saves, shares and DMs.
2. **If that passes:** build one static page (no backend):
   - Data: a `cafes.json` in git with `name, lat, lng, station, coffee_type_hot, coffee_type_iced, brew_methods[], espresso_menu[], evidence (visit | official), verified_at, verified_by`. Enter addresses yourself.
   - Map: Leaflet with OSM tiles, or no map at all. Mobile users want a list sorted by distance, computed on the device.
   - Directions: a plain Google Maps URL link. It needs no API key and has no caching problem. Leave hours to Google Maps.
   - Reports: a Google Form link. Analytics: cookie-less page views and outbound clicks only.
   - Hosting: free static hosting. Cost: about ¥0 a month. Build time: a weekend.
3. **Graduate to a database and an admin tool** only once the list outgrows one person editing JSON. If it never does, you just saved a month.
