/**
 * lightbox.js
 * Preview gambar full-screen saat thumbnail proyek diklik.
 *
 * Cara kerja:
 * - Setiap gambar dalam .thumb dapat diklik untuk membuka lightbox.
 * - Lightbox ditutup dengan: tombol ×, klik area gelap, atau tekan Escape.
 * - Scroll body dimatikan saat lightbox terbuka.
 */

const lightbox    = document.getElementById("lightbox");
const lightboxImg = lightbox.querySelector(".lightbox-img");

/** Buka lightbox dan pasang gambar yang diklik */
document.querySelectorAll(".thumb img").forEach((img) => {
  img.addEventListener("click", () => {
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightbox.classList.add("open");
    document.body.style.overflow = "hidden"; // matikan scroll
  });
});

/** Tutup lightbox */
function closeLightbox() {
  lightbox.classList.remove("open");
  document.body.style.overflow = ""; // aktifkan scroll lagi
}

// Tutup lewat tombol ×
lightbox.querySelector(".lightbox-close").addEventListener("click", closeLightbox);

// Tutup dengan klik area gelap di luar gambar
lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) closeLightbox();
});

// Tutup dengan tekan tombol Escape
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeLightbox();
});

