/* Injects the shared header & footer from PLASTECH_NAV.
   Reads on <body>:
     data-lang   "ko" | "en"
     data-active e.g. "home", "company/ceo", "products/solvent"
     data-root   relative prefix to THIS language's root ("", "../", "../../")
*/
(function () {
  var body = document.body;
  var lang = body.getAttribute("data-lang") || "ko";
  var active = body.getAttribute("data-active") || "home";
  var root = body.getAttribute("data-root") || "";

  /* ===== REVIEW-ONLY BLOCK — DELETE THIS ENTIRE BLOCK AT REAL LAUNCH =====
     Keeps the GitHub Pages review build out of search engines, and labels
     every page so placeholder content is never mistaken for the real site.
     Sits above the `if (!data) return;` guard on purpose, so it still applies
     even if PLASTECH_NAV fails to load. */
  (function () {
    var head = document.head || document.getElementsByTagName("head")[0];
    var rule = "noindex, nofollow, noarchive, nosnippet, noimageindex";
    function meta(name) {
      var m = document.createElement("meta");
      m.setAttribute("name", name);
      m.setAttribute("content", rule);
      head.appendChild(m);
    }
    meta("robots");    // Google, Bing, Daum and every standards-compliant crawler
    meta("Yeti");      // Naver
    meta("NaverBot");  // Naver, legacy user agent

    var bar = document.createElement("div");
    bar.id = "review-banner";
    bar.style.cssText =
      "position:fixed;left:0;right:0;bottom:0;z-index:9999;" +
      "background:#b3261e;color:#fff;text-align:center;padding:8px 12px;" +
      "font-size:13px;font-weight:600;line-height:1.5;" +
      "font-family:system-ui,-apple-system,'Malgun Gothic',sans-serif";
    bar.appendChild(document.createTextNode(lang === "en"
      ? "INTERNAL REVIEW BUILD — sample content and placeholder images. Not for public release."
      : "내부 검토용 — 예시 콘텐츠와 임시 이미지가 포함되어 있습니다. 외부 공개용이 아닙니다."));
    body.appendChild(bar);
    body.style.paddingBottom = "44px";
  })();
  /* ===== END REVIEW-ONLY BLOCK ===== */

  var data = (window.PLASTECH_NAV || {})[lang];
  if (!data) return;

  // path of current page relative to its language root
  var relPath = active === "home" ? "index.html" : active
      .replace("support/new", "support/new-product")
      .replace("support/inquiry", "support/inquiry") + ".html";
  // map data-active ids to real files where they differ
  var FILE = {
    "home": "index.html",
    "support/new": "support/new-product.html",
    "sitemap": "sitemap.html"
  };
  relPath = FILE[active] || (active + ".html");

  // site-root prefix (KO lives at site root, EN lives at /en/)
  var siteRoot = lang === "en" ? root + "../" : root;
  // language switch target -> same page in the other language
  var langHref = lang === "en"
      ? siteRoot + relPath                 // en -> ko
      : siteRoot + "en/" + relPath;        // ko -> en
  var homeHref = root + "index.html";
  var sitemapHref = root + "sitemap.html";
  var topGroup = active.split("/")[0];

  /* ---------- Header ---------- */
  var gnb = data.menu.map(function (m) {
    var isActive = m.id === topGroup;
    var subs = m.children.map(function (c) {
      var cur = c.id === active ? ' class="current"' : "";
      return '<li' + cur + '><a href="' + root + c.href + '">' + c.label + "</a></li>";
    }).join("");
    // top link points to first child
    var firstHref = root + m.children[0].href;
    return '<li class="' + (isActive ? "is-active" : "") + '">' +
      '<a href="' + firstHref + '">' + m.label + "</a>" +
      '<ul class="submenu">' + subs + "</ul></li>";
  }).join("");

  /* Cache-busting token. GitHub Pages serves everything with max-age=600, and
     the header/footer are built here at runtime — so a stale copy of this file
     or the logo keeps showing the old site. Bump this together with the ?v=
     token in every page's <head> whenever you deploy. */
  var ASSET_V = "?v=20260726";
  var logo = siteRoot + "assets/images/logo.svg" + ASSET_V;
  var logoWhite = siteRoot + "assets/images/logo-white.svg" + ASSET_V;
  var brandAlt = "PLASTECH Service (PTS)";

  var header =
    '<a href="#main" class="skip-link">본문 바로가기</a>' +
    '<header class="site-header">' +
      '<div class="topbar"><div class="wrap">' +
        '<a href="' + homeHref + '">' + data.util.home + "</a>" +
        '<a href="' + sitemapHref + '">' + data.util.sitemap + "</a>" +
        '<a class="lang" href="' + langHref + '">' + data.util.lang + "</a>" +
      "</div></div>" +
      '<div class="header-main"><div class="wrap">' +
        '<a class="brand" href="' + homeHref + '">' +
          '<img class="logo" src="' + logo + '" alt="' + brandAlt + '">' +
        "</a>" +
        '<button class="nav-toggle" aria-label="menu" aria-expanded="false">' +
          "<span></span><span></span><span></span></button>" +
        '<nav aria-label="main"><ul class="gnb">' + gnb + "</ul></nav>" +
      "</div></div>" +
    "</header>" +
    '<div class="nav-scrim"></div>';

  /* ---------- Footer ---------- */
  var f = data.footer;
  var quick = data.menu.map(function (m) {
    return '<a href="' + root + m.children[0].href + '">' + m.label + "</a>";
  }).join("");

  var footer =
    '<footer class="site-footer"><div class="wrap">' +
      '<div class="footer-top">' +
        '<div class="footer-brand">' +
          '<img class="logo-footer" src="' + logoWhite + '" alt="' + brandAlt + '">' +
          "<p>" + f.about + "</p>" +
        "</div>" +
        '<div class="footer-col"><h4>' + f.quickTitle + "</h4>" + quick + "</div>" +
        '<div class="footer-col footer-contact"><h4>' + f.contactTitle + "</h4><ul>" +
          "<li>" + f.addr + "</li>" +
          "<li><b>TEL</b> " + f.tel + " &nbsp; <b>FAX</b> " + f.fax + "</li>" +
          (f.email ? "<li><b>E-MAIL</b> " + f.email + "</li>" : "") +
          "<li><b>" + f.ceoLabel + "</b> " + f.ceo +
            " &nbsp; <b>" + f.bizLabel + "</b> " + f.bizno + "</li>" +
        "</ul></div>" +
      "</div>" +
      '<div class="footer-bottom"><span>' + f.copyright + "</span>" +
        "<span>" + f.legalName + "</span></div>" +
    "</div></footer>";

  // Inject
  body.insertAdjacentHTML("afterbegin", header);
  body.insertAdjacentHTML("beforeend", footer);

  /* ---------- Interior helpers: breadcrumb + side nav ---------- */
  var group = data.menu.filter(function (m) { return m.id === topGroup; })[0];
  function findChild() {
    if (!group) return null;
    var c = group.children.filter(function (x) { return x.id === active; })[0];
    return c || group.children[0];
  }

  var bc = document.querySelector("[data-breadcrumb]");
  if (bc && group) {
    var cur = findChild();
    bc.classList.add("breadcrumb");
    bc.innerHTML = '<div class="wrap">' +
      '<a href="' + homeHref + '">' + data.util.home + "</a>" +
      '<span class="sep">/</span><span>' + group.label + "</span>" +
      '<span class="sep">/</span><span>' + cur.label + "</span></div>";
  }

  var aside = document.querySelector("[data-sidenav]");
  if (aside && group) {
    aside.classList.add("side-nav");
    var items = group.children.map(function (c) {
      var isc = c.id === active ? ' class="current"' : "";
      return "<li" + isc + '><a href="' + root + c.href + '">' + c.label + "</a></li>";
    }).join("");
    aside.innerHTML = '<div class="head">' + group.label + "</div><ul>" + items + "</ul>";
  }
})();
