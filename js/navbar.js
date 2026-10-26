/**
 * navbar.js
 * Elegant sliding pill — smooth scroll + stable active highlight.
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

  pill.style.left   = (linkRect.left - navRect.left) + "px";
  pill.style.top    = (linkRect.top  - navRect.top)  + "px";
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
  pill.style.transition = "none";
  movePill(active);
  requestAnimationFrame(() => {
    requestAnimationFrame(() => { pill.style.transition = ""; });
  });
}

/* ── Smooth scroll saat klik ── */
let isScrolling = false;
let scrollTimer = null;

links.forEach((a) => {
  a.addEventListener("click", (e) => {
    const target = document.querySelector(a.getAttribute("href"));
    if (!target) return;
    e.preventDefault();

    setActive(a);

    // Tandai sedang scroll manual agar IO tidak override
    isScrolling = true;
    clearTimeout(scrollTimer);

    target.scrollIntoView({ behavior: "smooth", block: "start" });

    // Beri waktu scroll selesai (~800ms) sebelum IO aktif lagi
    scrollTimer = setTimeout(() => { isScrolling = false; }, 800);
  });
});

/* ── IntersectionObserver — highlight saat scroll bebas ── */
const io = new IntersectionObserver(
  (entries) => {
    if (isScrolling) return;                    // abaikan saat klik scroll
    // Ambil entry dengan intersection ratio terbesar
    const visible = entries
      .filter((e) => e.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
    if (!visible) return;
    const link = [...links].find((a) => a.hash === "#" + visible.target.id);
    if (link) setActive(link);
  },
  { threshold: [0.2, 0.5], rootMargin: "-80px 0px -30% 0px" }
);

document.querySelectorAll("section").forEach((s) => io.observe(s));

/* ── Init & resize ── */
window.addEventListener("load", initPill);
window.addEventListener("resize", () => {
  const active = document.querySelector(".navbar a.active");
  if (active) movePill(active);
});
