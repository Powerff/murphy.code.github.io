(() => {
  const year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());

  const nav = document.getElementById("site-nav");
  const toggle = document.querySelector(".nav-toggle");
  if (nav && toggle) {
    const closeNav = () => {
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "打开导航");
    };

    toggle.addEventListener("click", () => {
      const open = !nav.classList.contains("is-open");
      nav.classList.toggle("is-open", open);
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "关闭导航" : "打开导航");
    });

    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeNav);
    });

    window.addEventListener(
      "resize",
      () => {
        if (window.matchMedia("(min-width: 761px)").matches) closeNav();
      },
      { passive: true },
    );
  }

  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce) return;

  const hero = document.querySelector(".hero");
  if (!hero) return;

  let ticking = false;
  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const y = Math.min(window.scrollY, 320);
      hero.style.transform = `translateY(${y * 0.05}px)`;
      hero.style.opacity = String(Math.max(0.62, 1 - y / 720));
      ticking = false;
    });
  };

  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  if (window.matchMedia("(pointer:fine)").matches) {
    hero.addEventListener("pointermove", (e) => {
      const r = hero.getBoundingClientRect();
      const x = ((e.clientX - r.left) / r.width) * 100;
      const y = ((e.clientY - r.top) / r.height) * 100;
      hero.style.setProperty("--mx", `${x}%`);
      hero.style.setProperty("--my", `${y}%`);
    });
  }
})();
