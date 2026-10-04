# Status pengerjaan SahabatGinjal

**Selesai.** Semua daftar pekerjaan sebelumnya sudah dikerjakan dan situsnya bisa dijalankan.
Cara menjalankan ada di [README.md](README.md).

## Yang sudah dikerjakan

- [x] Proyek Vite + React + Tailwind CSS + Motion, lint dengan oxlint.
- [x] Aset logo: lencana untuk situs, favicon, dan ikon layar utama.
- [x] Token desain di `src/index.css`: warna dari logo, mode pagi/malam, font, utilitas.
- [x] Semua isi teks di `src/data/`.
- [x] Hooks: tema, penyimpanan lokal, bagian aktif, latihan napas, posisi gulir.
- [x] Komponen dasar di `src/components/ui/` dan layout di `src/components/layout/`.
- [x] 13 bagian halaman di `src/components/sections/`:
      Hero (dengan ilustrasi penyaringan dan pita kalimat), Cek Perasaan, Memahami,
      Dua Jalan (HD/CAPD), Hari Pertama, Mitos, Hidup Sehari-hari, Biaya, Cerita,
      Ruang Tenang, Bantuan Krisis, Tanya Jujur, dan Satu Langkah Kecil.
- [x] `src/main.jsx` dan `src/App.jsx`.
- [x] README berisi cara menjalankan dan peta folder.

## Hasil pemeriksaan

`npm run build` dan `npm run lint` bersih. Diperiksa otomatis lewat browser pada lebar
390, 834, dan 1440 piksel, mode terang dan gelap:

- Tidak ada isi yang meluber ke samping di semua lebar.
- Tidak ada error JavaScript di konsol.
- Menu menyesuaikan lebar layar; menu ponsel terbuka, tertutup dengan Escape, dan fokus
  kembali ke tombolnya.
- "Langsung ke isi" adalah sasaran Tab pertama.
- Interaksi berjalan: pilih perasaan (termasuk kartu krisis), ganti tab HD/CAPD, balik kartu
  mitos, centang isi tas, buka tanya jawab, latihan napas, ambil kalimat penguat, simpan dan
  hapus pertanyaan, serta ganti tema.
- Centang isi tas dan daftar pertanyaan tetap tersimpan di perangkat.
- Saat setelan "kurangi gerak" menyala, animasi berhenti dan tidak ada isi yang hilang.

## Kalau mau dilanjutkan

- [ ] Tombol "Gabung komunitas" kalau sudah ada tautan WhatsApp atau Instagram SahabatGinjal.
- [ ] Ganti logo dengan PNG transparan kalau tersedia, lalu buat ulang aset di
      `src/assets/brand/` dan `public/`.
- [ ] Menerbitkan situs, misalnya ke GitHub Pages, Netlify, atau Vercel.
      `vite.config.js` sudah memakai `base: './'` supaya bisa dibuka dari sub-folder.
- [ ] Cek ulang nomor bantuan dan ketentuan BPJS secara berkala.
