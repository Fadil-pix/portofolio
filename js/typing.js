/**
 * typing.js
 * Animasi typing effect pada section Hero.
 *
 * Cara kerja:
 * - Mengambil elemen #typed lalu secara bergantian "mengetik"
 *   dan "menghapus" kata-kata dalam array `words`.
 * - Kecepatan mengetik: 90ms/karakter, menghapus: 40ms/karakter.
 * - Jeda setelah kata selesai diketik: 1600ms.
 */

const words = ["Web Developer", "Design Graphic", "Data Analyst"];
const el = document.getElementById("typed");

let wordIndex = 0;      // kata keberapa sekarang
let charIndex = 0;      // karakter keberapa yang sudah tampil
let isDeleting = false; // sedang menghapus atau mengetik?

function type() {
  const currentWord = words[wordIndex];

  // Tampilkan teks sebanyak charIndex karakter
  el.textContent = currentWord.slice(0, charIndex);

  if (!isDeleting && charIndex === currentWord.length) {
    // Sudah selesai diketik → tunggu lalu mulai hapus
    isDeleting = true;
    setTimeout(type, 1600);
    return;
  }

  if (isDeleting && charIndex === 0) {
    // Sudah habis dihapus → pindah ke kata berikutnya
    isDeleting = false;
    wordIndex = (wordIndex + 1) % words.length;
  }

  charIndex += isDeleting ? -1 : 1;
  setTimeout(type, isDeleting ? 40 : 90);
}

type(); // mulai animasi

