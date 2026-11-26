# Plan: design basics

Status: decisions made; section 3 written from the founder's answers (2026-11-27).

*No real person's name or data in a plan or a prompt.*

Basis: [PRD v0.6](../prd/PRD-v0.6.md) §1, §3, §7, §10 · [plan 01 (skeleton)](01-skeleton.md) · [japan-cafe-history.md](../research/japan-cafe-history.md) §5

Founder's choices (2026-11-27):
- **Feel:** a plain tool. The information comes first.
- **Themes:** light and dark both, following the browser setting.
- **Where it starts:** this plan, then CSS variables.
- **Espresso status badges:** colour, text *and* an icon, so colour is never the only signal.

## 1. The idea

- **The problem:** people check this on a phone, often on the street, to decide where to go next. The skeleton pages use browser defaults: every method looks the same, and the espresso status doesn't stand out.
- **What it costs:** the one answer the product exists for is hard to spot. The reader has to read every line to find out whether a cafe pulls espresso by hand, by button, or not at all. And every later screen (F1 sorting, F2 filters, F9 chain guide) would invent its own look.
- **The change:** a small design system — colour, type and spacing tokens as CSS variables in light and dark, plus a few components — applied to the existing pages. The espresso status becomes a badge you can read at a glance.
- **What gets better:** on a phone, you can tell from the list alone which cafes have a semi-automatic machine. Later features reuse the same tokens and components instead of adding styles.
- **Checked with a real person:** *not yet.* Show the list to the M0 interviewees and ask which cafe they'd pick, and why.

## 2. Design decisions (the system itself)

### 2.1 Principles
1. **The espresso status is the loudest thing on the page.** Everything else is quieter.
2. **Plain and readable:**
   - one accent colour
   - no photos, gradients or decoration
   - generous spacing
   - left-aligned
3. **Phone first:**
   - one column
   - tap targets at least 44 × 44 px
   - text at least 16 px
   - the layout widens, it never just shrinks
4. **Both languages are first-class.** Japanese text must read as well as English: suitable fonts, line height, and no cramped widths.
5. **Accessible:**
   - WCAG AA contrast (4.5:1 for text, 3:1 for badge outlines and icons)
   - visible focus
   - `prefers-reduced-motion` respected
   - never colour alone

### 2.2 Tokens (CSS custom properties)

Defined once on `:root` with light values, then redefined under `@media (prefers-color-scheme: dark)`.

| Group | Tokens | Notes |
|---|---|---|
| Neutrals | `--bg`, `--surface`, `--text`, `--text-muted`, `--border` | Slightly warm grey, not pure grey |
| Accent | `--accent`, `--accent-text` | One colour for links, focus and the selected filter |
| Status | `--status-semi`, `--status-auto`, `--status-none` (each with `-bg` and `-text`) | See 2.3 |
| Type | `--font-sans`, `--text-sm` 14px, `--text-md` 16px, `--text-lg` 20px, `--text-xl` 24px, `--leading` 1.6 | |
| Space | `--space-1` 4px · `-2` 8px · `-3` 12px · `-4` 16px · `-6` 24px · `-8` 32px | |
| Shape | `--radius` 8px, `--radius-pill` 999px | |

Exact colour values are chosen while building and checked for contrast in both themes. The chosen values and contrast ratios are written into `docs/architecture/design-system.md`.

### 2.3 Espresso status badge

| Status | Text (EN / JA) | Icon | Colour role |
|---|---|---|---|
| `espresso_semi` | Semi-automatic espresso / セミオート | Portafilter | **Strongest**: filled with `--status-semi` |
| `espresso_auto` | Fully automatic espresso / 全自動 | Push button | Medium: outlined, `--status-auto` |
| `espresso_none` | No espresso machine — drip / エスプレッソなし・ドリップ | Dripper | Neutral, not negative: `--status-none`. The research suggests treating drip as a genre of its own, not as "missing" |

- A cafe with both machines shows both badges, semi first.
- The icons are three small hand-made inline SVGs. They need no icon library.
- Badges are not links in this plan. Filters come with F2.

### 2.4 Components

| Component | Used on | Contents |
|---|---|---|
| Header | every page | Site name (link to the list) and the EN/JA switch as a clear button-sized link |
| Sample notice | every page, while data is a sample | Quiet bar, not alarming |
| Cafe card | list (SC-01) | Name, espresso badge(s), up to 2 method chips, station. The whole card is the tap target |
| Method chip | card, detail | Small neutral pill for hand drip, siphon and so on |
| Detail layout | cafe page (SC-03) | Name (both languages), badge row, "other methods", chain note, station/address list, actions (website, directions) |
| Footer | every page | Data last updated |
| 404 | not found | Both languages, same tokens |

### 2.5 Type
- **System fonts first, no web font download.** Faster on a phone, and no request to a font host.
  - EN: `system-ui, -apple-system, "Segoe UI", Roboto, sans-serif`
  - JA: `"Hiragino Sans", "Hiragino Kaku Gothic ProN", "Yu Gothic UI", "Noto Sans JP", "Meiryo", sans-serif`
  - Choose by `:lang(ja)`.
- Japanese body text uses `line-height` 1.7 and `font-feature-settings: "palt"` for headings only.

### 2.6 Leaving room for later
- **F2 filter chips** reuse the method chip in a selected state (`--accent`).
- **A map, if added later:** OpenStreetMap tiles through Leaflet are the leading candidate. That needs its own ADR, covering the OSM tile usage policy and attribution. The map would use the same tokens for markers, with marker colour following the status colours.

## 3. Done when

*You write this section yourself.* Written from the founder's answers on 2026-11-27.

**Espresso status badges**
- When a card or a cafe page shows an espresso status, each of the three statuses should have its own text, icon and colour.
- When a screen reader reads a badge, it should read the text and skip the icon (the icon is `aria-hidden`).

**Themes and tokens**
- When the browser is set to dark, the dark token values should apply; when set to light, the light values. (Also checked by hand in the browser.)
- When component or page CSS sets a colour, it should use a token (`var(--…)`), never a literal colour value. Literal colours appear only in the token file.
- When the design is done, `docs/architecture/design-system.md` should list every colour token with its light and dark values and contrast results.

**Phone and language**
- When a page is 375 px wide, it should not scroll sideways. (checked by hand)
- When a tap target (cafe card, EN/JA switch, links in the header and on the cafe page) is measured, it should be at least 44 × 44 px. (checked by hand)
- When any part of a cafe card is tapped, it should open that cafe's page.
- When text is Japanese (`:lang(ja)`), it should use the Japanese font stack and a line height of 1.7.

- Test count before: 15 . Test count when done: 22 (the 9 lines above, minus the 2 checked by hand). If building shows a test is needed that isn't listed, add it, name it here, and update this number. Never drop a listed test to keep the count.

## 4. Not in this plan

- New features: F1 sorting and location, F2 filters, F7 sharing, F9 chain pages, a map.
- A logo or final product name (name is chosen in M0).
- Web fonts, photos, illustrations, animation beyond simple hover/focus.
- A component library or CSS framework.
- Showing sources and dates on the cafe page, and closed/moved notices (still the next data-display plan).

## 5. Decisions for me

1. **CSS approach?**
   - (a) Plain CSS with custom properties in `src/styles/`.
   - (b) Tailwind.
   - *Recommendation: (a).* There are few screens; tokens map directly to variables; no build plugin is needed.
   - **Decided (2026-11-27): (a).**
2. **Fonts?**
   - (a) System fonts only.
   - (b) Noto Sans JP as a web font, for the same look on every device.
   - *Recommendation: (a).* It's faster and makes no third-party request. Revisit if Japanese text looks poor on Windows or Android.
   - **Decided (2026-11-27): (a).**
3. **Icons?**
   - (a) Three hand-made inline SVGs.
   - (b) An icon set such as Lucide.
   - *Recommendation: (a).* There are no good stock icons for "portafilter vs push button", and three icons don't justify a dependency.
   - **Decided (2026-11-27): (a).**
4. **Where the design system is written down?**
   - (a) `docs/architecture/design-system.md` with tokens, contrast results and components.
   - (b) A visual page in the site (e.g. `/en/design/`).
   - *Recommendation: (a) now, (b) later if needed.*
   - **Decided (2026-11-27): (a).**
5. **Status colours: who picks the exact values?**
   - (a) Claude proposes values that pass contrast checks in both themes; the founder approves them on a local preview.
   - (b) The founder gives brand colours first.
   - *Recommendation: (a).*
   - **Decided (2026-11-27): (a).** The founder approves the colours on a local preview before the PR.
