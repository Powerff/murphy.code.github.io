(() => {
  const year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());

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
      hero.style.transform = `translateY(${y * 0.06}px)`;
      hero.style.opacity = String(Math.max(0.55, 1 - y / 680));
      ticking = false;
    });
  };

  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  // Soft cursor highlight on hero frame (desktop)
  if (window.matchMedia("(pointer:fine)").matches) {
    hero.addEventListener("pointermove", (e) => {
      const r = hero.getBoundingClientRect();
      const x = ((e.clientX - r.left) / r.width) * 100;
      const y = ((e.clientY - r.top) / r.height) * 100;
      hero.style.setProperty("--mx", `${x}%`);
      hero.style.setProperty("--my", `${y}%`);
    });
    hero.style.backgroundImage =
      "radial-gradient(420px circle at var(--mx, 50%) var(--my, 30%), rgba(26,126,168,0.12), transparent 45%), linear-gradient(160deg, rgba(255,255,255,0.62), rgba(255,255,255,0.28))";
  }
})();
