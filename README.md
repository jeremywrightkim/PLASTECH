# PLASTECH — internal review build

Static marketing site (Korean at root, English mirror under `en/`), published to
GitHub Pages **for internal review only**.

> **This is not the company's live website.**
> Content is placeholder material: names, phone numbers, addresses, product
> tables, certifications and every image are samples used to evaluate layout,
> navigation and bilingual structure. Nothing here should be quoted, shared
> externally, or treated as a company statement.
>
> **회사의 실제 홈페이지가 아닙니다.** 대표자명·연락처·주소·제품표·인증·이미지는
> 모두 레이아웃과 다국어 구조를 검토하기 위한 예시입니다. 인용하거나 외부에
> 공유하지 마십시오. (다만 회사 등록정보, 상품 표, 고객문의 페이지의 영업담당자
> 연락처는 실제 데이터입니다.)

The build injects `<meta name="robots" content="noindex, nofollow, ...">` at
runtime so it stays out of search results. See the block marked
`REVIEW-ONLY BLOCK` in `assets/js/include.js`; deleting that one block reverts
the site to launch state.

## Structure

- `index.html`, `company/`, `products/`, `support/` — Korean
- `en/` — English mirror, identical filenames
- `assets/js/nav.js` — menu tree and footer text, both languages (single source of truth)
- `assets/js/include.js` — injects header, footer, breadcrumb and side nav at runtime
- `assets/js/main.js` — mobile nav, hero slider, form validation
- `assets/css/style.css` — the whole design system

Every page's HTML contains only `<main id="main">`; the shared chrome is
generated at runtime from three `<body>` attributes:

```html
<body data-lang="ko" data-active="products/flame" data-root="../">
```

- `data-lang` — `ko` or `en`, picks the `PLASTECH_NAV` branch
- `data-active` — nav child id (href minus `.html`); drives active menu, breadcrumb and side nav
- `data-root` — relative prefix back to that language's root (`""` at the index, `"../"` one level down)

No build step, no package manager, no dependencies.

## Local preview

```
python -m http.server 8000
```

Then open http://localhost:8000/
