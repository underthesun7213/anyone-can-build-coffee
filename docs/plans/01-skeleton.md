# Plan: site skeleton

Status: decisions made — section 3 is yours to write.

*No real person's name or data in a plan or a prompt.*

Basis: [PRD v0.6](../prd/PRD-v0.6.md) §7, §9, §10, §11 · [ADR-0001](../adr/0001-static-site-and-light-pwa.md), [0002](../adr/0002-four-sheet-data-model-and-csv-build.md), [0005](../adr/0005-static-site-generator-astro.md), [0006](../adr/0006-hosting-github-pages.md) · [data-validation.md](../architecture/data-validation.md) · [conventions.md](../architecture/conventions.md) §5

## 1. The idea

- **The problem:** the founder has research on cafes and chains, but nowhere to put it so that it can be checked and seen. Every later feature (F1–F9) needs the same base: data read from four CSVs, pages in English and Japanese, and a deploy.
- **What it costs:** without the base, each feature would invent its own data loading and routes. A typo in the data could reach the live site, which breaks the PRD's promise that every fact is sourced and dated.
- **The change:** an Astro site that reads `cafes`, `chains`, `methods` and `stations` from CSV, checks them against the validation rules before every build, and publishes `/en/` and `/ja/` pages to GitHub Pages. The pages are minimal: a plain list of cafes with their espresso status, and a detail page per cafe.
- **What gets better:** opening the GitHub Pages URL shows the sample cafes in both languages. A pull request with broken data fails its check and doesn't deploy.
- **Checked with a real person:** *not yet.* This is infrastructure; M0 interviews test the product itself.

## 2. Files it touches

| File | Function or section | Add or change |
|---|---|---|
| `package.json`, `package-lock.json`, `astro.config.mjs`, `tsconfig.json` | | add: Astro (version pinned, ADR-0005), TypeScript, Vitest; `site`/`base` set for GitHub Pages |
| `data/cafes.csv`, `chains.csv`, `methods.csv`, `stations.csv` | | add: hand-made **sample** data (decision 1). About 5 cafes, 2 chains with a store each, 3 stations; values marked as samples in `internal_note` |
| `src/lib/codes.ts` | method, source, status codes | add: the codes from PRD §5 and §6 with EN/JA labels |
| `src/lib/load-data.ts` | `loadData` | add: parse the 4 CSVs, join methods to cafes and chains, a chain store takes its chain's methods (PRD §8 F3), compute `station_id` from coordinates. No Astro imports (ADR-0005) |
| `src/lib/geo.ts` | `distanceMeters` | add: haversine distance, used for `station_id` now and F1 later |
| `scripts/validate-data.ts` | | add: the rules in data-validation.md §4.1–§4.8; exits non-zero on any error, prints warnings and the §5 summary |
| `src/i18n/strings.ts` | | add: the UI strings these pages need, EN and JA |
| `src/layouts/Base.astro` | | add: `<html lang>`, title, header with EN/JA switch, footer "Data last updated" |
| `src/pages/index.astro` | | add: root — goes to the remembered language, else browser language (PRD §10) |
| `src/pages/[lang]/index.astro` | | add: plain list of active cafes and chain stores with espresso status first |
| `src/pages/[lang]/cafe/[id].astro` | | add: name, address, station and methods, espresso status first; a chain store shows its chain's methods |
| `src/pages/404.astro` | | add: two-language 404 with a link back |
| `tests/unit/*.test.ts` | `load-data`, `validate-data`, `geo` | add |
| `.github/workflows/ci.yml` | | add: on pull request — install, validate, test, build |
| `.github/workflows/deploy.yml` | | add: on push to `main` and manual run — same steps, then deploy to GitHub Pages |
| `README.md` | 현재 상태 | change: how to run, test and build locally; the site URL |

## 3. Done when

*You write this section yourself.* Written from the founder's answers on 2026-11-27.

**Data validation**
- When a required field is empty, validation should fail. Required fields: a cafe's `id`, `name_en`, `name_ja`, `lat` and `lng`; a method's `source_url` unless its `source_type` is `visit`.
- When a method, source or status code is not in the PRD §5, §6 or §9 lists (e.g. `espreso_semi`), validation should fail.
- When an active independent cafe or a chain has no espresso status, or has `espresso_none` together with `espresso_semi` or `espresso_auto`, validation should fail.
- When a `cafe_id`, `chain_id`, `moved_to` or `station_id` points to an id that doesn't exist, validation should fail.
- When a cafe, chain or station is missing `name_en` or `name_ja`, validation should fail. (Names are required in both languages; there is no fallback to the other language.)
- When the sample data is valid, validation should pass.

**Languages and addresses**
- When `/en/` and `/ja/` are opened, both should list the same cafes, with the page text in that language.
- When `/` is opened, it should go to the language chosen last; with none, to `/ja/` if the browser's language is Japanese, otherwise to `/en/`.
- When the EN/JA switch is used on a page, it should open the same page in the other language.

**Pages**
- When the list or a cafe page shows a cafe, its espresso status should come before any other method.
- When a chain store's page opens, it should show its chain's methods.

**Pull requests and deploy**
- When a pull request has data that fails validation, its `ci` check should fail.
- When validation fails on `main`, nothing should be deployed and the live site should stay as it was. (checked by hand)
- When an address that doesn't exist is opened, it should show a 404 in both languages with a link to the list.

**Added while building**
- When a link field (`cafe_url`, `social_url`, `site_url`, `source_url`, `source_url_2`) is not an http(s) URL, validation should fail (`fails when a link is not an http(s) URL`). Added after an automated security review: links are rendered as `href`, so a `javascript:` value would run in the page.

- Test count before: 0 . Test count when done: 14 (the 14 planned lines minus the 1 checked by hand, plus the 1 added while building). If building shows a test is needed that isn't listed, add it, name it here, and update this number. Never drop a listed test to keep the count.

## 4. Not in this plan

- Location, distance sorting and the station picker (F1, SC-02).
- Filters (F2), shareable lists (F7), empty states beyond the 404 (F8).
- Chain guide pages (F9, SC-06) and the About page (SC-05).
- The correction form (F5) and "Was it as listed?" (F6).
- GoatCounter analytics.
- The PWA manifest and service worker.
- `scripts/fetch-sheets.ts` and the Google Sheet itself (decision 1).
- A custom subdomain (decision 3).
- Any styling beyond readable defaults.
- Showing each fact's source, link and checked date on the cafe page (founder's choice, 2026-11-27: next plan). The data still carries them and validation still checks them.
- Closed and moved cafes: hiding them from the list, the "closed" notice and the link to the new entry (next plan).
- Automatic deploy on merge is built (`deploy.yml`) but isn't one of the Done-when lines.

## 5. Decisions for me

1. **Where does the first data come from?**
   - (a) Hand-made sample CSVs committed to `data/`, clearly marked as samples, until the sheet exists.
   - (b) Create the Google Sheet and the fetch script first.
   - *Recommendation: (a).* It unblocks the skeleton now, and the fetch script is a small plan of its own.
   - **Decided (2026-11-27): (a).**
2. **Test tool?** Vitest or Node's built-in test runner. *Recommendation: Vitest*, which works with Astro's TypeScript setup.
   - **Decided (2026-11-27): Vitest.**
3. **Custom subdomain now?** *Recommendation: later.* Use the default `github.io` URL first; adding a CNAME doesn't change the code.
   - **Decided (2026-11-27): later.**
4. **Make the CI check required to merge (branch protection)?** *Recommendation: yes, once `ci.yml` has passed once,* since data changes go through PRs (decided 2026-11-27).
   - **Decided (2026-11-27): yes, after the first passing run.** It's a repository setting, so the founder turns it on.
5. **Already decided (2026-11-27):**
   - `internal_note` may be public. It isn't shown on the site.
   - A cafe with both machine types records both.
   - Data-only changes go through a PR.
