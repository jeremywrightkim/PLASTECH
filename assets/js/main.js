/* Interactions: mobile nav, dropdown accordion, hero slider, form validation.
   Runs after include.js has injected the header/footer. */
(function () {
  var body = document.body;

  /* ---------- Mobile nav ---------- */
  var toggle = document.querySelector(".nav-toggle");
  var scrim = document.querySelector(".nav-scrim");
  function closeNav() { body.classList.remove("nav-open"); if (toggle) toggle.setAttribute("aria-expanded", "false"); }
  if (toggle) {
    toggle.addEventListener("click", function () {
      var open = body.classList.toggle("nav-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }
  if (scrim) scrim.addEventListener("click", closeNav);

  // dropdown accordion (mobile only)
  document.querySelectorAll(".gnb > li > a").forEach(function (a) {
    a.addEventListener("click", function (e) {
      if (window.innerWidth <= 760) {
        var li = a.parentElement;
        if (li.querySelector(".submenu")) {
          e.preventDefault();
          li.classList.toggle("open");
        }
      }
    });
  });
  window.addEventListener("resize", function () { if (window.innerWidth > 760) closeNav(); });

  /* ---------- Hero slider ---------- */
  var hero = document.querySelector(".hero");
  if (hero) {
    var slides = Array.prototype.slice.call(hero.querySelectorAll(".slide"));
    var dotsWrap = hero.querySelector(".hero-dots");
    var i = 0, timer = null, DELAY = 5500;

    slides.forEach(function (_, idx) {
      var b = document.createElement("button");
      b.setAttribute("aria-label", "slide " + (idx + 1));
      b.addEventListener("click", function () { go(idx); reset(); });
      dotsWrap.appendChild(b);
    });
    var dots = Array.prototype.slice.call(dotsWrap.children);

    function go(n) {
      slides[i].classList.remove("is-active");
      dots[i].classList.remove("is-active");
      i = (n + slides.length) % slides.length;
      slides[i].classList.add("is-active");
      dots[i].classList.add("is-active");
    }
    function next() { go(i + 1); }
    function prev() { go(i - 1); }
    function play() { timer = setInterval(next, DELAY); }
    function reset() { clearInterval(timer); play(); }

    slides[0].classList.add("is-active");
    dots[0].classList.add("is-active");

    var nextBtn = hero.querySelector(".hero-btn.next");
    var prevBtn = hero.querySelector(".hero-btn.prev");
    if (nextBtn) nextBtn.addEventListener("click", function () { next(); reset(); });
    if (prevBtn) prevBtn.addEventListener("click", function () { prev(); reset(); });
    hero.addEventListener("mouseenter", function () { clearInterval(timer); });
    hero.addEventListener("mouseleave", play);
    play();
  }

  /* ---------- Inquiry form validation ---------- */
  var form = document.querySelector("form[data-validate]");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var ok = true;
      form.querySelectorAll("[required]").forEach(function (el) {
        var field = el.closest(".field");
        var valid = el.type === "checkbox" ? el.checked : el.value.trim() !== "";
        if (el.type === "email" && valid) {
          valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(el.value.trim());
        }
        field.classList.toggle("invalid", !valid);
        if (!valid) ok = false;
      });
      if (ok) {
        var msg = form.getAttribute("data-success") || "문의가 접수되었습니다. 감사합니다.";
        alert(msg);
        form.reset();
      } else {
        var firstBad = form.querySelector(".field.invalid input, .field.invalid textarea, .field.invalid select");
        if (firstBad) firstBad.focus();
      }
    });
    form.querySelectorAll("[required]").forEach(function (el) {
      el.addEventListener("input", function () {
        var field = el.closest(".field");
        if (field.classList.contains("invalid")) field.classList.remove("invalid");
      });
    });
  }
})();
