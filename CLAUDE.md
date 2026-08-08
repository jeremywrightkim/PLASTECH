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

`style.css`, the three scripts and `favicon.svg` all carry a `?v=YYYYMMDD` token, and
`include.js` repeats it in `ASSET_V` for the runtime-injected logos. GitHub Pages serves
everything with `Cache-Control: max-age=600`, and because the entire header, footer and
menu are built by the scripts, a cached `nav.js`/`include.js` renders the *whole previous
site* even when the HTML is fresh — the change looks like it never deployed.

Bump the token everywhere in one pass before pushing. **Use `sed`, not PowerShell** — the
pages are UTF-8 without a BOM, and Windows PowerShell 5.1's `Get-Content` decodes them with
the system ANSI codepage (949 here), which irreversibly mangles every Korean character on
the round-trip. `sed` substitutes bytes, and the token is pure ASCII, so multi-byte
sequences are left alone:

```bash
find . -path ./.git -prune -o \( -name '*.html' -o -name 'include.js' \) -print \
  | xargs sed -i 's/?v=20260808/?v=20260901/g'
```

If you must use PowerShell, pass `-Encoding UTF8` to **both** `Get-Content` and `Set-Content`.

- [assets/js/nav.js](assets/js/nav.js) — `window.PLASTECH_NAV`, the **single source of truth** for the menu tree, footer text and contact details, in both `ko` and `en`. Adding, renaming or reordering a page means editing this file; nothing else knows the menu.
- [assets/js/include.js](assets/js/include.js) — builds header/footer markup from `PLASTECH_NAV`, fills `[data-breadcrumb]` and `[data-sidenav]` elements if the page has them, and computes the language-switch href.
- [assets/js/main.js](assets/js/main.js) — mobile nav toggle + accordion (≤760px), hero slider (`.hero`, 5.5s autoplay, dots generated from `.slide` count), and inquiry form validation. The site currently has no form; the `form[data-validate]` handler is dormant but kept for reuse.

### Menu groups

Three groups: `company` (회사소개), `products` (상품안내 / Products) and `support` (고객문의 / Contact).
`products` has five children — `overview`, `flame`, `additives`, `resins`, `thermal`; **SAYTEX ALERO**
on the flame page and **DYNACARD** on the thermal page are the two headline items, marked up with
`.highlight-card` (the card above the tables) and `span.main-item` (the grade cell inside a table —
per cell, never per row, because `rowspan`-merged cells can't take a row background).
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

Product tables share one five-column shape: 구분 / 상표(Brand) / 주요 품목(Grade) / 제조사 / 비고, with `rowspan` merging the 구분 and 상표 cells. `products/overview.html` is the concatenation of the four category tables and must be kept in sync when a category page changes.
