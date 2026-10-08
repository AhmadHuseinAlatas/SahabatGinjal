# Status pengerjaan SahabatGinjal

**Selesai & Lengkap (Pencegahan & Dialisis).** SahabatGinjal kini menjadi platform terpadu: dari deteksi dini & pencegahan kerusakan ginjal hingga pendampingan ramah bagi yang menjalani cuci darah.

## Yang sudah dikerjakan

- [x] Proyek Vite + React + Tailwind CSS + Motion, lint dengan oxlint.
- [x] Aset logo: lencana untuk situs, favicon, dan ikon layar utama.
- [x] Token desain di `src/index.css`: warna dari logo, mode pagi/malam, font, utilitas.
- [x] Semua isi teks di `src/data/` (termasuk modul pencegahan di `src/data/prevention.js`).
- [x] Hooks: tema, penyimpanan lokal, bagian aktif, latihan napas, posisi gulir.
- [x] Komponen dasar di `src/components/ui/` dan layout di `src/components/layout/`.
- [x] 21 bagian halaman terstruktur:
      Hero (Dua Jalur: Mencegah vs Menjalani),
      Skrining Mandiri Risiko Ginjal (1 Menit), Peta 5 Stadium Ginjal, Perlindungan & 8 Aturan Emas (Zat Toksik & Cek Lab),
      Cek Perasaan, Memahami, Kamus Istilah (Glosarium), Dua Jalan (HD/CAPD),
      Hari Pertama, Mitos, Hidup Sehari-hari, Kalkulator Batas Cairan, Panduan Nutrisi (Kalium/Fosfat),
      Biaya BPJS, Direktori RS Cuci Darah Terdekat (BPJS/Swasta, Kapasitas & Ramah Lansia),
      Traveling Dialysis (Bepergian), Cerita, Ruang Tenang (dengan Soundscape Multi-Audio Sintetis & Timer),
      Bantuan Krisis, Tanya Jujur, dan Satu Langkah Kecil (Preset Pertanyaan Dokter).
- [x] Fitur Baru Direktori Rumah Sakit & Klinik Dialisis (`#rumah-sakit`):
      - Deteksi GPS otomatis untuk menemukan RS terdekat (rumus Haversine).
      - Filter BPJS 100% Ditanggung vs Swasta/Eksekutif.
      - Metrik kapasitas mesin HD, estimasi pasien harian, dan sistem shift.
      - Desain ramah lansia: mode teks besar, tombol telepon langsung, dan petunjuk Google Maps.
- [x] Perbaikan Mesin Suara Ruang Tenang:
      - Menghapus tabrakan timeout (bisa diputar berkali-kali tanpa batas).
      - Menambahkan 4 preset sintetis (Hujan, Ombak Laut, Brown Noise Masking, Harmoni 432 Hz).
      - Pengatur volume dan timer mati otomatis (5m, 15m, 30m).
- [x] Perbaikan bug & hardening aksesibilitas:
      - Toast visual untuk status salin/bagikan di `CallToAction`.
      - Guard pencegah crash array pada `useLocalStorage` & `FirstDay`.
      - Perbaikan ARIA attribute pada accordion FAQ.
      - Peningkatan deteksi akhir dokumen pada `useActiveSection`.
- [x] `npm run build` dan `npm run lint` bersih (0 warning, 0 error).

## Fitur Pencegahan & Deteksi Dini yang Baru Ditambahkan

1. **Skrining Mandiri Risiko Ginjal 1 Menit (`#skrining`):**
   - Kuesioner interaktif 6 pertanyaan faktor risiko (tensi, gula darah, obat nyeri/jamu, busa urine, bengkak, air putih).
   - Analisis skor otomatis dan rekomendasi medis konkret (Puskesmas / Faskes 1).
2. **Peta 5 Stadium Penyakit Ginjal Kronis (`#stadium-ginjal`):**
   - Edukasi horizontal 5 stadium (eGFR >90% hingga <15%).
   - Menegaskan bahwa Stadium 1–3b **belum butuh cuci darah** dan fungsi ginjal bisa dipertahankan puluhan tahun jika dijaga ketat.
3. **Daftar Merah: 5 Zat & Kebiasaan Perusak Ginjal (`#pencegahan`):**
   - Kartu edukasi bahaya NSAID berlebih, jamu pegal linu ber-BKO ilegal, garam tersembunyi, minuman manis bersoda, dan menahan kencing.
4. **8 Aturan Emas Merawat Ginjal Sehat:**
   - Rekomendasi harian terstandar dari International Society of Nephrology & World Kidney Day.
5. **Panduan Cek Lab Sederhana di Puskesmas BPJS:**
   - Edukasi tes urine (proteinuria/albuminuria), tes darah kreatinin & eGFR, ureum, dan kalimat mudah untuk berkonsultasi ke dokter.
6. **Dua Jalur di Beranda:**
   - Tombol ramah di Hero: *"Mencegah & Cek Risiko"* vs *"Sedang Menghadapi Dialisis"*.

## Kalau mau dilanjutkan

- [ ] Tombol "Gabung komunitas" kalau sudah ada tautan WhatsApp atau Instagram SahabatGinjal.
- [ ] Ganti logo dengan PNG transparan kalau tersedia, lalu buat ulang aset di `src/assets/brand/` dan `public/`.
- [ ] Menerbitkan situs, misalnya ke GitHub Pages, Netlify, atau Vercel. `vite.config.js` sudah memakai `base: './'` supaya bisa dibuka dari sub-folder.
- [ ] Cek ulang nomor bantuan dan ketentuan BPJS secara berkala.
