/**
 * theme.js
 * Switch mode terang / gelap.
 *
 * Cara kerja:
 * - Tema disimpan di atribut data-theme pada <html> ("light" | "dark").
 * - Pilihan disimpan di localStorage; jika belum ada, ikuti setelan sistem.
 * - Warna diatur lewat variabel CSS di css/theme.css (:root).
 */

(function () {
  const root = document.documentElement;
  const btn = document.getElementById("theme-toggle");
  const media = window.matchMedia("(prefers-color-scheme: dark)");

  function currentTheme() {
    return root.getAttribute("data-theme") === "dark" ? "dark" : "light";
  }

  function applyTheme(theme) {
    root.setAttribute("data-theme", theme);
    btn.setAttribute(
      "aria-label",
      theme === "dark" ? "Ganti ke mode terang" : "Ganti ke mode gelap"
    );
  }

  /** Animasi transisi singkat hanya saat user menekan tombol */
  function withTransition(fn) {
    root.classList.add("theme-transition");
    fn();
    setTimeout(() => root.classList.remove("theme-transition"), 350);
  }

  // Sinkronkan label tombol dengan tema awal
  applyTheme(currentTheme());

  btn.addEventListener("click", () => {
    const next = currentTheme() === "dark" ? "light" : "dark";
    withTransition(() => applyTheme(next));
    try { localStorage.setItem("theme", next); } catch (e) {}
  });

  // Jika user belum memilih manual, ikuti perubahan setelan sistem
  media.addEventListener("change", (e) => {
    let saved = null;
    try { saved = localStorage.getItem("theme"); } catch (err) {}
    if (!saved) applyTheme(e.matches ? "dark" : "light");
  });
})();
