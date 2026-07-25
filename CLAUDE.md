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
<script src="../assets/js/nav.js"></script>      <!-- data -->
<script src="../assets/js/include.js"></script>  <!-- injects header/footer/breadcrumb/sidenav -->
<script src="../assets/js/main.js"></script>     <!-- interactions; assumes chrome exists -->
```

- [assets/js/nav.js](assets/js/nav.js) — `window.PLASTECH_NAV`, the **single source of truth** for the menu tree, footer text and contact details, in both `ko` and `en`. Adding, renaming or reordering a page means editing this file; nothing else knows the menu.
- [assets/js/include.js](assets/js/include.js) — builds header/footer markup from `PLASTECH_NAV`, fills `[data-breadcrumb]` and `[data-sidenav]` elements if the page has them, and computes the language-switch href.
- [assets/js/main.js](assets/js/main.js) — mobile nav toggle + accordion (≤760px), hero slider (`.hero`, 5.5s autoplay, dots generated from `.slide` count), and inquiry form validation.

### The three body data attributes

`include.js` derives every link from these, so they must be exact:

```html
<body data-lang="ko" data-active="products/solvent" data-root="../">
```

- `data-lang` — `"ko"` or `"en"`; picks the `PLASTECH_NAV` branch.
- `data-active` — the nav child `id` (href minus `.html`); `"home"` and `"sitemap"` are special-cased. Drives the active GNB group, `.current` highlighting, breadcrumb and side nav. A value not present in the menu tree silently disables breadcrumb/sidenav.
- `data-root` — relative prefix back to **this language's root** (`""` at `index.html`, `"../"` one level down). Menu hrefs are `data-root + child.href`. Since Korean lives at the site root and English under `/en/`, `include.js` derives the *site* root as `data-root + "../"` for `en` — that's why `en/index.html` uses `data-root=""` but still links CSS as `../assets/...`.

### Mirrored bilingual tree

`/` is Korean and `/en/` is the English mirror with **identical file names and directory layout**. The language toggle swaps the prefix and keeps the path, so any new page must be added to both trees (and to both `ko` and `en` branches of `PLASTECH_NAV`) or the toggle 404s.

One name mismatch to remember: nav id `support/new` maps to the file `support/new-product.html` via the `FILE` table in `include.js`.

### Styling

[assets/css/style.css](assets/css/style.css) is the whole design system: CSS custom properties at `:root` (`--brand`, `--accent`, `--ink`, `--bg-soft`, `--wrap`, `--radius`, `--shadow`, `--header-h`, `--ease`) followed by banner-commented sections — Reset, Header, Hero slider, Sections, Sub-page layout, Footer, Responsive. Use the variables rather than literal colors; inline `style=` in pages is only used for one-off backgrounds and hero slide images.

### Page templates

Two shapes, copy the nearest existing page rather than starting from scratch:

- **Home** (`index.html`) — `.hero` slider + `.wrap` sections.
- **Interior** (everything else) — `.page-hero` → `<nav data-breadcrumb>` → `.page-body > .wrap > .sub-layout` containing `<aside data-sidenav>` and `.page-content`. Tables go inside `.table-scroll > table.tbl`.

The inquiry form uses `form[data-validate]` with `[required]` fields wrapped in `.field`; validation is client-side only (`alert()` on success, no backend submit).
