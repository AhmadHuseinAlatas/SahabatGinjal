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
- [x] Pembersihan kode menyeluruh: `oxlint` 0 warning, 0 error (6 unused imports dibersihkan).
- [x] Optimasi Bundle & Code-Splitting di `vite.config.js`:
      - Pemisahan manual chunks (`vendor-react`, `vendor-motion`, `vendor-lucide`).
      - Ukuran chunk turun dari >590 kB menjadi <240 kB per bundle, build time tembus <900 ms.
- [x] Progressive Web App (PWA) readiness: `manifest.webmanifest` & meta icon terhubung.

## Fitur Baru Pencegahan, Klinis, Nutrisi, & Simulasi Interaktif

1. **Simulasi Jadwal Dialisis Interaktif (Contoh Minggumu & Harimu) di `#pilihan`:**
   - Bagian "Contoh minggumu" kini **100% interaktif dan bisa diklik**:
     - **Pilihan Pola Jadwal Populer:** Tombol preset cepat (*Senin & Kamis*, *Selasa & Jumat*, *Rabu & Sabtu*, *3x Seminggu Sen-Rab-Jum*, *3x Seminggu Sel-Kam-Sab*).
     - **Tombol Hari Interaktif (Senin s/d Minggu):** Setiap hari dapat diklik untuk membuka rundown simulasi harian.
     - **Rundown Hari Cuci Darah:** 3 tahap konkret (Persiapan pagi sebelum berangkat, saat 4-5 jam di mesin HD, dan penanganan pasca jarum dicabut).
     - **Panduan Hari Bebas (Inter-dialitik):** Waktu berkumpul keluarga, disiplin kuota cairan harian, dan cara merawat lengan akses cimino/kateter leher.
     - **Simulasi CAPD (06.00, 12.00, 17.00, 22.00):** Menjelaskan 3 tahap pergantian cairan (*Drain, Flush, Fill*) di tiap jam pergantian.
2. **Kalkulator eGFR Mandiri Terintegrasi (CKD-EPI 2021) di `#stadium-ginjal`:**
   - Menghitung persentase fungsi ginjal (mL/min/1.73m²) dari kadar kreatinin darah, usia, dan jenis kelamin.
   - Otomatis menyorot kartu stadium 1–5 yang sesuai beserta pesan medis penenang ("Belum butuh cuci darah", arahan diet & tensi).
3. **Fitur Salin & Ekspor Rekap Asupan Cairan di `#cairan`:**
   - Tombol satu klik untuk menyalin rekap minum harian lengkap dengan status kuota dan rincian waktu, siap dikirim ke WhatsApp perawat HD/dokter saat kontrol.
4. **Pencarian Cepat & Filter Chip Makanan Lokal di `#makanan`:**
   - Tombol chip sekali sentuh untuk bahan makanan yang paling sering dicari (Pisang, Air Kelapa, Apel, Putih Telur, Bayam, Susu).
   - Tombol reset cepat (clear search) untuk kenyamanan lansia di ponsel.
5. **Skrining Mandiri Risiko Ginjal 1 Menit (`#skrining`):**
   - Kuesioner interaktif 6 pertanyaan faktor risiko (tensi, gula darah, obat nyeri/jamu, busa urine, bengkak, air putih).
   - Analisis skor otomatis dan rekomendasi medis konkret (Puskesmas / Faskes 1).
6. **Peta 5 Stadium Penyakit Ginjal Kronis (`#stadium-ginjal`):**
   - Edukasi horizontal 5 stadium (eGFR >90% hingga <15%).
   - Menegaskan bahwa Stadium 1–3b **belum butuh cuci darah** dan fungsi ginjal bisa dipertahankan puluhan tahun jika dijaga ketat.
7. **Daftar Merah: 5 Zat & Kebiasaan Perusak Ginjal (`#pencegahan`):**
   - Kartu edukasi bahaya NSAID berlebih, jamu pegal linu ber-BKO ilegal, garam tersembunyi, minuman manis bersoda, dan menahan kencing.
8. **8 Aturan Emas Merawat Ginjal Sehat:**
   - Rekomendasi harian terstandar dari International Society of Nephrology & World Kidney Day.
9. **Panduan Cek Lab Sederhana di Puskesmas BPJS:**
   - Edukasi tes urine (proteinuria/albuminuria), tes darah kreatinin & eGFR, ureum, dan kalimat mudah untuk berkonsultasi ke dokter.

## Kalau mau dilanjutkan

- [ ] Tombol "Gabung komunitas" kalau sudah ada tautan WhatsApp atau Instagram SahabatGinjal.
- [ ] Ganti logo dengan PNG transparan kalau tersedia, lalu buat ulang aset di `src/assets/brand/` dan `public/`.
- [ ] Menerbitkan situs, misalnya ke GitHub Pages, Netlify, atau Vercel. `vite.config.js` sudah memakai `base: './'` supaya bisa dibuka dari sub-folder.
- [ ] Cek ulang nomor bantuan dan ketentuan BPJS secara berkala.
