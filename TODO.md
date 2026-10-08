# Status pengerjaan SahabatGinjal

**Selesai & Diperbarui.** Semua fitur yang diminta dan perbaikan temuan kode telah selesai diimplementasikan dengan build dan lint bersih.

## Yang sudah dikerjakan

- [x] Proyek Vite + React + Tailwind CSS + Motion, lint dengan oxlint.
- [x] Aset logo: lencana untuk situs, favicon, dan ikon layar utama.
- [x] Token desain di `src/index.css`: warna dari logo, mode pagi/malam, font, utilitas.
- [x] Semua isi teks di `src/data/`.
- [x] Hooks: tema, penyimpanan lokal, bagian aktif, latihan napas, posisi gulir.
- [x] Komponen dasar di `src/components/ui/` dan layout di `src/components/layout/`.
- [x] 17 bagian halaman terstruktur:
      Hero, Cek Perasaan, Memahami, Kamus Istilah (Glosarium), Dua Jalan (HD/CAPD),
      Hari Pertama, Mitos, Hidup Sehari-hari, Kalkulator Batas Cairan, Panduan Nutrisi (Kalium/Fosfat),
      Biaya BPJS, Traveling Dialysis (Bepergian), Cerita, Ruang Tenang (dengan Soundscape Suara Hujan Sintetis),
      Bantuan Krisis, Tanya Jujur, dan Satu Langkah Kecil (dengan Preset Pertanyaan Dokter).
- [x] Perbaikan bug & hardening aksesibilitas:
      - Toast visual untuk status salin/bagikan di `CallToAction`.
      - Guard pencegah crash array pada `useLocalStorage` & `FirstDay`.
      - Perbaikan ARIA attribute pada accordion FAQ.
      - Peningkatan deteksi akhir dokumen pada `useActiveSection`.
- [x] `npm run build` dan `npm run lint` bersih (0 warning, 0 error).

## Fitur Baru yang Ditambahkan

1. **Preset Pertanyaan Dokter (Dokter FAQ Chips):**
   - Tombol chips siap klik di bagian Satu Langkah Kecil untuk langsung menambahkan pertanyaan umum ke catatan konsultasi.
2. **Kalkulator / Pelacak Pembatasan Cairan Harian (`#cairan`):**
   - Pelacak asupan cairan interaktif dengan target fleksibel (500, 600, 800, 1000 ml).
   - Tombol catat cepat (+30ml es batu, +50ml obat, +100ml kuah, +150ml gelas kecil).
   - Progress bar dinamis dan trik menahan haus (kumur air es, semprotan dingin, permen asam).
3. **Panduan Makanan Kalium & Fosfat (`#makanan`):**
   - Pencarian makanan lokal Indonesia dengan filter kategori dan tingkat keamanan (🟢 Aman, 🟡 Sedang, 🔴 Tinggi).
   - Panduan praktis teknik *Leaching* (merendam sayuran di air hangat untuk membuang kalium).
4. **Soundscape Suara Hujan Penenang (`#tenang`):**
   - Generator suara ambien rintik hujan sintetis murni menggunakan Web Audio API (0 KB download, tanpa aset eksternal).
5. **Glosarium Istilah Medis Dialisis (`#istilah`):**
   - Kamus bahasa manusia untuk istilah asing seperti Cimino, CDL, Dry Weight, Kt/V, EPO, Hiperkalemia, dan Dialiser.
6. **Panduan Traveling Dialysis / Mudik (`#bepergian`):**
   - 4 langkah persiapan sesi tamu di RS kota tujuan dan checklist berkas tas kabin.

## Kalau mau dilanjutkan

- [ ] Tombol "Gabung komunitas" kalau sudah ada tautan WhatsApp atau Instagram SahabatGinjal.
- [ ] Ganti logo dengan PNG transparan kalau tersedia, lalu buat ulang aset di `src/assets/brand/` dan `public/`.
- [ ] Menerbitkan situs, misalnya ke GitHub Pages, Netlify, atau Vercel. `vite.config.js` sudah memakai `base: './'` supaya bisa dibuka dari sub-folder.
- [ ] Cek ulang nomor bantuan dan ketentuan BPJS secara berkala.
