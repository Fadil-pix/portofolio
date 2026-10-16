/**
 * navbar.js
 * Jelly sliding pill — satu elemen .navbar-pill bergerak
 * ke posisi link .active dengan efek spring.
 */

const nav   = document.querySelector(".navbar");
const links = document.querySelectorAll(".navbar a");

/* ── Buat elemen pill ── */
const pill = document.createElement("span");
pill.className = "navbar-pill";
nav.prepend(pill);

/* ── Pindahkan pill ke link target ── */
function movePill(link) {
  const navRect  = nav.getBoundingClientRect();
  const linkRect = link.getBoundingClientRect();

  pill.style.left   = linkRect.left - navRect.left + "px";
  pill.style.top    = linkRect.top  - navRect.top  + "px";
  pill.style.width  = linkRect.width  + "px";
  pill.style.height = linkRect.height + "px";
}

/* ── Set active + gerakkan pill ── */
function setActive(link) {
  links.forEach((a) => a.classList.remove("active"));
  link.classList.add("active");
  movePill(link);
}

/* ── Inisialisasi posisi pill (tanpa animasi) ── */
function initPill() {
  const active = document.querySelector(".navbar a.active") || links[0];
  pill.style.transition = "none";           // skip animasi pertama
  movePill(active);
  // re-enable transisi setelah 1 frame
  requestAnimationFrame(() => {
    pill.style.transition = "";
  });
}

/* ── IntersectionObserver — highlight saat scroll ── */
const io = new IntersectionObserver(
  (entries) =>
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const link = [...links].find((a) => a.hash === "#" + entry.target.id);
        if (link) setActive(link);
      }
    }),
  { threshold: 0.3, rootMargin: "-80px 0px -40% 0px" }
);

document.querySelectorAll("section").forEach((s) => io.observe(s));

/* ── Klik manual ── */
links.forEach((a) => a.addEventListener("click", () => setActive(a)));

/* ── Init & resize ── */
window.addEventListener("load", initPill);
window.addEventListener("resize", () => {
  const active = document.querySelector(".navbar a.active");
  if (active) movePill(active);
});
