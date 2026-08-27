(() => {
  const year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());

  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce) return;

  const hero = document.querySelector(".hero");
  if (!hero) return;

  const onScroll = () => {
    const y = Math.min(window.scrollY, 280);
    hero.style.transform = `translateY(${y * 0.08}px)`;
    hero.style.opacity = String(1 - y / 520);
  };

  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
})();
