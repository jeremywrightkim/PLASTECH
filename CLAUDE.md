# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

PLASTECH corporate marketing site — a **dependency-free static site**: hand-written HTML, one CSS file, three plain-ES5 IIFE scripts. No build step, no package manager, no tests, no framework.

## Running locally

Open `index.html` directly, or serve the folder so relative paths behave like production:

```powershell
python -m http.server 8000     # then http://localhost:8000/
```

## Architecture

### Shared chrome is injected, not duplicated

Every page's HTML contains only `<main id="main">`. The header, footer, breadcrumb and side nav are generated at runtime. Script order matters and is identical on every page:

```html
<script src="../assets/js/nav.js?v=20260808"></script>      <!-- data -->
<script src="../assets/js/include.js?v=20260808"></script>  <!-- injects header/footer/breadcrumb/sidenav -->
<script src="../assets/js/main.js?v=20260808"></script>     <!-- interactions; assumes chrome exists -->
```

### Bump `?v=` on every deploy

**Every file under `assets/` that HTML references directly** carries a `?v=` token — CSS,
all three scripts, and *every image*, including the hero backgrounds inside inline
`style="background-image:url(...)"`. `include.js` repeats the token in `ASSET_V` for
`logo.svg` / `logo-white.svg`, which it injects at runtime and which therefore have no
token in the HTML.

Do not turn that sentence back into a list of filenames. It used to read "style.css, the
three scripts and favicon.svg", and the thirteen images that the list forgot shipped with
no token at all — replacing a product image changed the file but not its URL, so phones
kept showing the old one with nothing in the page to indicate why.

GitHub Pages serves everything with `Cache-Control: max-age=600`, and because the entire
header, footer and menu are built by the scripts, a cached `nav.js`/`include.js` renders the
*whole previous site* even when the HTML is fresh — the change looks like it never deployed.

Token format is `YYYYMMDD` plus an optional letter: `20260808`, then `20260808b`, `20260808c`
for further deploys the same day. The letter exists because a date alone cannot express a
second deploy, and same-day redeploys are the normal case while iterating.

Bump the token everywhere in one pass before pushing. **Use `sed`, not PowerShell** — the
pages are UTF-8 without a BOM, and Windows PowerShell 5.1's `Get-Content` decodes them with
the system ANSI codepage (949 here), which irreversibly mangles every Korean character on
the round-trip. `sed` substitutes bytes, and the token is pure ASCII, so multi-byte
sequences are left alone:

```bash
find . -path ./.git -prune -o \( -name '*.html' -o -name 'include.js' \) -print \
  | xargs sed -i 's/?v=[0-9]\{8\}[a-z]\?/?v=20260901/g'
```

If you must use PowerShell, pass `-Encoding UTF8` to **both** `Get-Content` and `Set-Content`.

Then confirm nothing was missed — this must print nothing:

```bash
grep -rhoE 'assets/(images|css|js)/[A-Za-z0-9._-]+(\?v=[0-9]{8}[a-z]?)?' --include='*.html' . \
  | grep -v '?v=' | sort -u
```

Run it after adding any new image. It is the only thing standing between a new asset and
the silent staleness described above.

- [assets/js/nav.js](assets/js/nav.js) — `window.PLASTECH_NAV`, the **single source of truth** for the menu tree, footer text and contact details, in both `ko` and `en`. Adding, renaming or reordering a page means editing this file; nothing else knows the menu.
- [assets/js/include.js](assets/js/include.js) — builds header/footer markup from `PLASTECH_NAV`, fills `[data-breadcrumb]` and `[data-sidenav]` elements if the page has them, and computes the language-switch href.
- [assets/js/main.js](assets/js/main.js) — mobile nav toggle + accordion (≤760px), hero slider (`.hero`, 5.5s autoplay, dots generated from `.slide` count), and inquiry form validation. The site currently has no form; the `form[data-validate]` handler is dormant but kept for reuse.

### Menu groups

Three groups: `company` (회사소개), `products` (상품안내 / Products) and `support` (고객문의 / Contact).
`products` has five children — `overview`, `flame`, `additives`, `resins`, `thermal`; **SAYTEX ALERO**
on the flame page and **DYNACARD** on the thermal page are the two headline items, marked up with
`.highlight-card` — the card above the tables. Their grade cells inside the tables are plain text:
the `span.main-item` wrapper that painted a "MAIN" pill via `::after`, and the card's own
`MAIN ITEM` badge, were both removed along with their CSS. Do not reintroduce either.
`support` has a single child, `support/contact.html`.
There is no logistics group and no notice/inquiry-form page.

### The three body data attributes

`include.js` derives every link from these, so they must be exact:

```html
<body data-lang="ko" data-active="products/flame" data-root="../">
```

- `data-lang` — `"ko"` or `"en"`; picks the `PLASTECH_NAV` branch.
- `data-active` — the nav child `id` (href minus `.html`); `"home"` and `"sitemap"` are special-cased. Drives the active GNB group, `.current` highlighting, breadcrumb and side nav. A value not present in the menu tree silently disables breadcrumb/sidenav.
- `data-root` — relative prefix back to **this language's root** (`""` at `index.html`, `"../"` one level down). Menu hrefs are `data-root + child.href`. Since Korean lives at the site root and English under `/en/`, `include.js` derives the *site* root as `data-root + "../"` for `en` — that's why `en/index.html` uses `data-root=""` but still links CSS as `../assets/...`.

### Mirrored bilingual tree

`/` is Korean and `/en/` is the English mirror with **identical file names and directory layout**. The language toggle swaps the prefix and keeps the path, so any new page must be added to both trees (and to both `ko` and `en` branches of `PLASTECH_NAV`) or the toggle 404s.

Every nav id now maps straight to `id + ".html"`; the `FILE` table in `include.js` only special-cases `home` and `sitemap`.

### Styling

[assets/css/style.css](assets/css/style.css) is the whole design system: CSS custom properties at `:root` (`--brand`, `--accent`, `--ink`, `--bg-soft`, `--wrap`, `--radius`, `--shadow`, `--header-h`, `--ease`) followed by banner-commented sections — Reset, Header, Hero slider, Sections, Sub-page layout, Footer, Responsive. Use the variables rather than literal colors; inline `style=` in pages is only used for one-off backgrounds and hero slide images.

### Page templates

Two shapes, copy the nearest existing page rather than starting from scratch:

- **Home** (`index.html`) — `.hero` slider + `.wrap` sections.
- **Interior** (everything else) — `.page-hero` → `<nav data-breadcrumb>` → `.page-body > .wrap > .sub-layout` containing `<aside data-sidenav>` and `.page-content`. Tables go inside `.table-scroll > table.tbl`.

### Headline-product pages

`products/flame.html` and `products/thermal.html` are the two pages built around a headline
item (SAYTEX ALERO, DYNACARD). They share one block order — keep them in step:

```
h2 + .lead
.highlight-card        claim, description
.spec-split            .maker-mark logo → .eyebrow "제품 개요" → h4 → description → .btn.outline
.stat-row              key figures
.feature-grid          three characteristic cards
…page-specific body…   flame: SAYTEX advantages · thermal: stack diagram, spec table
table.tbl              handling items
h3 적용 분야 + .app-grid
footnote
```

Two rules that exist because both were violated before:

- **`.spec-split`'s `.bullet-list` is an optional slot and must not repeat `.stat-row`.**
  thermal once listed 납기/가격/성능/효율 there and then restated the same four as figures
  directly below. flame keeps its list because the per-resin benefits (ABS / PP / PC-ABS)
  appear nowhere else.
- **flame's `.stat-row` figures are tallied from its own tables** (18 grades, 7 named
  manufacturers). Editing those tables invalidates the figures; an HTML comment above the
  block says so.

`.maker-mark` shows the supplier's own logo — `brand-albemarle.svg` and `brand-dynac.svg`
are official vectors pulled from albemarle.com and dynacltd.com, not redrawn. The class
constrains height only (`width: auto`) so a replacement of any aspect ratio drops in safely.

Product tables come in two shapes, and which one applies depends on whether the
heading above already names the category:

- **4 columns** — 상표(Brand) / 주요 품목(Grade) / 제조사 / 비고, widths `18/30/20/rest`.
  Used on `products/flame.html`, `additives.html` and `thermal.html`, where each table sits
  under an `h3` that *is* the category name (브롬계, 산화방지제, 방열 소재 …). A 구분 column
  here would `rowspan` the same word the heading just said and eat 12–16% of the width.
- **5 columns** — the above with 구분 in front. Used on `products/overview.html` (four
  category tables merged into one listing per product group) and `products/resins.html`
  (single table under the generic heading 취급 수지, so 구분 carries PPE / Polyamide /
  탄화수소). In both, 구분 is the only thing separating row groups.

`rowspan` still merges the 상표 cells where a brand spans several grades. `overview.html`
is the concatenation of the four category tables, so keep it in sync when a category page
changes — including the 구분 values, which must match the category pages' `h3` headings.
