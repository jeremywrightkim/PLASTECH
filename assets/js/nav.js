/* Single source of truth for menu tree, in both languages.
   href values are relative to each language's root (no leading slash).
   data-active id = href without ".html" (home => "home"). */
window.PLASTECH_NAV = {
  ko: {
    brandSub: "CHEMICAL & MATERIALS",
    util: { home: "홈", sitemap: "사이트맵", lang: "ENG" },
    menu: [
      { id: "company", label: "회사소개", children: [
        { id: "company/about",    label: "기업개요",    href: "company/about.html" },
        { id: "company/ceo",      label: "CEO 인사말",  href: "company/ceo.html" },
        { id: "company/history",  label: "회사연혁",    href: "company/history.html" },
        { id: "company/location", label: "오시는 길",   href: "company/location.html" }
      ]},
      { id: "products", label: "제품소개", children: [
        { id: "products/overview",  label: "전체 품목",        href: "products/overview.html" },
        { id: "products/additives", label: "플라스틱 첨가제",  href: "products/additives.html" },
        { id: "products/resins",    label: "플라스틱 수지",    href: "products/resins.html" },
        { id: "products/thermal",   label: "열 관리 소재",     href: "products/thermal.html" }
      ]},
      { id: "logistics", label: "물류/보관", children: [
        { id: "logistics/gallery",  label: "갤러리",       href: "logistics/gallery.html" },
        { id: "logistics/facility", label: "시설 및 장비", href: "logistics/facility.html" }
      ]},
      { id: "support", label: "고객센터", children: [
        { id: "support/notice",   label: "공지사항",           href: "support/notice.html" },
        { id: "support/new",      label: "신제품 소개",        href: "support/new-product.html" },
        { id: "support/inquiry",  label: "샘플요청 및 문의",   href: "support/inquiry.html" }
      ]}
    ],
    footer: {
      about: "플라스텍서비스(주)는 1998년부터 플라스틱 첨가제와 화학 소재를 공급해 온 전문 기업입니다. 난연제·열안정제·유동성 가공 조제부터 친환경 생분해 소재, 열 관리 소재까지 대응합니다.",
      addr: "서울특별시 강남구 테헤란로 311, 1910호 (역삼동, 아남타워빌딩)",
      tel: "02-501-5775", fax: "02-501-5749", email: "",
      legalName: "플라스텍서비스(주)",
      ceoLabel: "대표", ceo: "박상각",
      bizLabel: "사업자등록번호", bizno: "220-86-47146",
      quickTitle: "바로가기", contactTitle: "오시는 길 · 연락처",
      copyright: "COPYRIGHT © 2026 플라스텍서비스(주) ALL RIGHTS RESERVED."
    }
  },

  en: {
    brandSub: "CHEMICAL & MATERIALS",
    util: { home: "HOME", sitemap: "SITEMAP", lang: "KOR" },
    menu: [
      { id: "company", label: "Company", children: [
        { id: "company/about",    label: "Overview",      href: "company/about.html" },
        { id: "company/ceo",      label: "CEO Message",   href: "company/ceo.html" },
        { id: "company/history",  label: "History",       href: "company/history.html" },
        { id: "company/location", label: "Location",      href: "company/location.html" }
      ]},
      { id: "products", label: "Products", children: [
        { id: "products/overview",  label: "All Items",           href: "products/overview.html" },
        { id: "products/additives", label: "Plastic Additives",   href: "products/additives.html" },
        { id: "products/resins",    label: "Plastic Resins",      href: "products/resins.html" },
        { id: "products/thermal",   label: "Thermal Management",  href: "products/thermal.html" }
      ]},
      { id: "logistics", label: "Logistics", children: [
        { id: "logistics/gallery",  label: "Gallery",             href: "logistics/gallery.html" },
        { id: "logistics/facility", label: "Facility & Equipment",href: "logistics/facility.html" }
      ]},
      { id: "support", label: "Customer", children: [
        { id: "support/notice",  label: "Notice",           href: "support/notice.html" },
        { id: "support/new",     label: "New Product News", href: "support/new-product.html" },
        { id: "support/inquiry", label: "Sample & Inquiry", href: "support/inquiry.html" }
      ]}
    ],
    footer: {
      about: "PLASTECH Service (PTS) has supplied plastic additives and chemical materials since 1998 — from flame retardants, heat stabilizers and flow processing aids through to biodegradable and thermal management materials.",
      addr: "#1910, Anam Tower, 311 Teheran-ro, Gangnam-gu, Seoul, Korea",
      tel: "+82-2-501-5775", fax: "+82-2-501-5749", email: "",
      legalName: "PLASTECH SERVICE CO., LTD.",
      ceoLabel: "CEO", ceo: "Sang-gak Park",
      bizLabel: "Business Reg. No.", bizno: "220-86-47146",
      quickTitle: "Quick Links", contactTitle: "Location · Contact",
      copyright: "COPYRIGHT © 2026 PLASTECH SERVICE CO., LTD. ALL RIGHTS RESERVED."
    }
  }
};
