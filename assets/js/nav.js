/* Single source of truth for menu tree, in both languages.
   href values are relative to each language's root (no leading slash).
   data-active id = href without ".html" (home => "home"). */
window.PLASTECH_NAV = {
  ko: {
    brandSub: "CHEMICAL & MATERIALS",
    util: { home: "홈", sitemap: "사이트맵", lang: "ENG" },
    menu: [
      { id: "company", label: "회사소개", children: [
        { id: "company/ceo",      label: "CEO 인사말",  href: "company/ceo.html" },
        { id: "company/history",  label: "회사연혁",    href: "company/history.html" },
        { id: "company/location", label: "오시는 길",   href: "company/location.html" }
      ]},
      { id: "products", label: "제품소개", children: [
        { id: "products/solvent",   label: "SOLVENT TYPE",     href: "products/solvent.html" },
        { id: "products/waterbase", label: "WATER BASE TYPE",  href: "products/waterbase.html" },
        { id: "products/inorganic", label: "INORGANIC",        href: "products/inorganic.html" },
        { id: "products/general",   label: "GENERAL CHEMICAL", href: "products/general.html" }
      ]},
      { id: "new", label: "신제품", children: [
        { id: "new/cosmetic", label: "화장품 원료",  href: "new/cosmetic.html" },
        { id: "new/oled",     label: "OLED",         href: "new/oled.html" },
        { id: "new/battery",  label: "2차 전지",     href: "new/battery.html" },
        { id: "new/eco",      label: "친환경 소재",  href: "new/eco.html" },
        { id: "new/etc",      label: "기타",         href: "new/etc.html" }
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
      about: "PLASTECH는 코팅·페인트·전자소재·디스플레이·플라스틱 산업 전반에 걸쳐 고품질 화학 원료와 소재를 공급하는 무역 전문 기업입니다.",
      addr: "경기도 안양시 동안구 시민대로 230 아크로타워 A동 505호",
      tel: "031-000-0000", fax: "031-000-0001", email: "info@plastech.co.kr",
      quickTitle: "바로가기", contactTitle: "오시는 길 · 연락처",
      copyright: "COPYRIGHT © 2026 PLASTECH CO., LTD. ALL RIGHTS RESERVED."
    }
  },

  en: {
    brandSub: "CHEMICAL & MATERIALS",
    util: { home: "HOME", sitemap: "SITEMAP", lang: "KOR" },
    menu: [
      { id: "company", label: "Company", children: [
        { id: "company/ceo",      label: "CEO Message",   href: "company/ceo.html" },
        { id: "company/history",  label: "History",       href: "company/history.html" },
        { id: "company/location", label: "Location",      href: "company/location.html" }
      ]},
      { id: "products", label: "Products", children: [
        { id: "products/solvent",   label: "SOLVENT TYPE",     href: "products/solvent.html" },
        { id: "products/waterbase", label: "WATER BASE TYPE",  href: "products/waterbase.html" },
        { id: "products/inorganic", label: "INORGANIC",        href: "products/inorganic.html" },
        { id: "products/general",   label: "GENERAL CHEMICAL", href: "products/general.html" }
      ]},
      { id: "new", label: "New Products", children: [
        { id: "new/cosmetic", label: "Cosmetic Materials", href: "new/cosmetic.html" },
        { id: "new/oled",     label: "OLED",               href: "new/oled.html" },
        { id: "new/battery",  label: "Secondary Battery",  href: "new/battery.html" },
        { id: "new/eco",      label: "Eco-friendly",       href: "new/eco.html" },
        { id: "new/etc",      label: "Others",             href: "new/etc.html" }
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
      about: "PLASTECH is a trading company supplying high-quality chemical raw materials across coating, paint, electronics, display and plastics industries.",
      addr: "#505, Acro Tower A, 230 Simin-daero, Dongan-gu, Anyang-si, Gyeonggi-do, Korea",
      tel: "+82-31-000-0000", fax: "+82-31-000-0001", email: "info@plastech.co.kr",
      quickTitle: "Quick Links", contactTitle: "Location · Contact",
      copyright: "COPYRIGHT © 2026 PLASTECH CO., LTD. ALL RIGHTS RESERVED."
    }
  }
};
