# Status pengerjaan SahabatGinjal

Dihentikan sementara pada 30 September 2026, atas permintaan. Branch: `wip/landing-react-tailwind`.

> **Situs belum bisa dijalankan.** `src/main.jsx`, `src/App.jsx`, dan semua bagian halaman
> (`src/components/sections/`) belum dibuat, jadi `npm run dev` dan `npm run build` masih gagal.
> `npm run lint` sudah bersih untuk kode yang ada.

## Cara melanjutkan

```bash
git checkout wip/landing-react-tailwind
npm install
```

Lalu kerjakan daftar "Belum selesai" di bawah dari atas ke bawah. Kalau memakai Kiro, cukup minta:
"lanjutkan TODO.md".

## Sudah selesai

- [x] Proyek Vite 8 + React 19 + Tailwind CSS 4 + Motion 13, versi dipatok di `package.json`, lint dengan oxlint.
- [x] Aset logo dari `SahabatGinjal.jpeg`: `src/assets/brand/logo-badge.jpg` (720×720, tampilkan di wadah `rounded-full`), `public/favicon.png`, `public/apple-touch-icon.png`.
  - `SahabatGinjal-no-bg.jpeg` **tidak benar-benar transparan**: pola kotak-kotak abu-abu ikut tercetak di gambar (JPEG tidak mendukung transparansi), jadi tidak dipakai. Kalau ada PNG transparan asli, logonya bisa diganti.
- [x] Token desain: `src/index.css` (warna dari logo, mode pagi/malam, font Fraunces + Plus Jakarta Sans, utilitas `shell`, `card`, `glass`, `kicker`, `text-gradient`, `grain`, `fade-x`, `breath-orb`, `night-sky`).
- [x] Semua isi teks halaman: `src/data/*.js`.
- [x] Hooks: `useTheme`, `useLocalStorage`, `useActiveSection`, `useBreathing`, `useScrolledPast`.
- [x] Komponen dasar `src/components/ui/`: `Button`, `Reveal`, `Stagger`/`StaggerItem`, `SectionHeading`, `Accent`, `IconBadge`, `Logo`/`BrandBadge`.
- [x] Layout `src/components/layout/`: `Navbar` (menu aktif + kapsul kaca), `MobileMenu`, `ThemeToggle` (efek lingkaran View Transitions), `ScrollProgress`, `AuraBackground`, `Footer`, `FloatingActions`.

## Belum selesai

### 1. Bagian halaman (`src/components/sections/`)

Aturan umum: setiap bagian `<section id="…" aria-labelledby="…">`, judul pakai `SectionHeading`
(nomor bab, kicker, judul dengan `Accent`, deskripsi). Urutan dan `id` harus sama dengan
`SECTION_IDS` di `src/data/navigation.js`. Animasi muncul pakai `Reveal`/`Stagger`.

- [ ] **Hero.jsx** (`beranda`), data `HERO_STATS`, `MARQUEE_PHRASES`
  - Pil kecil dengan titik koral berdenyut: "Untuk kamu yang baru saja mendengar kata itu".
  - `h1` `font-display text-display`: "Ginjalmu berhenti bekerja." lalu baris "Hidupmu tidak." (miring, `text-gradient`, garis bawah SVG digambar dengan `pathLength` 0→1). Kata-kata muncul bergiliran (opacity + y + blur); teks utuh di `sr-only`, animasinya `aria-hidden`.
  - Paragraf: "Mungkin dokter baru menyebut “cuci darah” dan dunia terasa menyempit. Mungkin kamu sudah menjalaninya berbulan-bulan dan lelah menjelaskan pada orang lain. Di sini kamu tidak perlu kuat dulu untuk boleh membaca."
  - Tombol: "Mulai dari perasaanku" → `#perasaan` (primary, ikon `ArrowRight`), "Aku cuma ingin tahu" → `#paham` (secondary). Lalu 3 kartu statistik.
  - **FiltrationOrb.jsx** di kanan: `BrandBadge` di tengah (inset ±21%), dua cincin putus-putus berputar pelan (`animate-spin-slow`, `animate-spin-reverse`), SVG viewBox 400 dengan jalur masuk `M 6 332 C 52 338, 92 318, 124 282` (tetes koral) dan keluar `M 276 118 C 308 82, 348 62, 394 66` (tetes biru/hijau) memakai `<animateMotion>` dengan `begin` negatif. Jangan render tetesan saat `useReducedMotion()`. Label kaca melayang: "darah masuk", "darah bersih", "mesin jadi ginjal keduamu". Paralaks halus mengikuti mouse (hanya pointer mouse) dan saat digulir (`useScroll`, y 0→-60).
  - **Marquee.jsx**: `animate-marquee`, frasa digandakan 2×, jarak pakai padding per item (bukan `gap`) supaya -50% menyambung mulus, mask `fade-x`, `aria-hidden`.
- [ ] **MoodCheck.jsx** (`perasaan`, 01, "Mulai dari sini"), judul "Bagaimana perasaanmu *hari ini?*" (coral), deskripsi "Tidak ada jawaban yang salah. Pilih satu, dan kami temani dari titik itu." Data `MOODS`.
  - Kiri: 7 tombol `aria-pressed` (IconBadge + label + hint), latar aktif bergeser dengan `layoutId="mood-active"`.
  - Kanan: panel kartu dengan `AnimatePresence mode="wait"`: judul kecil, kutipan besar (serif), isi, 3 langkah (ikon `Check`), tombol ke `mood.link`. Keadaan kosong: bola berdenyut + "Sentuh salah satu perasaan di atas. Kami tunggu, tidak ada yang mengejar."
  - `urgent` (Putus asa): kotak koral dengan `tel:119` ("Telepon 119, lalu tekan 8") dan `tel:112`.
  - Umumkan lewat `sr-only aria-live="polite"`: "Saran untuk perasaan … ditampilkan."
- [ ] **Understand.jsx** (`paham`, 02, "Penjelasan tanpa istilah menakutkan"), judul "Sebenarnya, *apa yang terjadi?*" (tide), deskripsi "Empat hal yang biasanya tidak sempat dijelaskan di ruang periksa yang ramai." Data `BASICS`, `KIDNEY_FACTS`.
  - Grid bento `lg:grid-cols-12` (lebar 7/5/5/7), `card` + `IconBadge` + nomor kartu.
  - `visual: 'facts'`: 3 chip angka dari `KIDNEY_FACTS`. `visual: 'meter'`: bar fungsi ginjal `scaleX` 1→0.14 saat terlihat (gradasi leaf→sprout→coral), label "Fungsi ginjal" dan "±10–15%: saatnya dialisis".
- [ ] **DialysisOptions.jsx** (`pilihan`, 03, "Kamu punya pilihan"), judul "Dua jalan, *satu tujuan*" (leaf), deskripsi "Banyak orang tidak tahu bahwa cuci darah tidak hanya satu bentuk. Keduanya dijamin BPJS. Mana yang cocok tergantung kondisi tubuh, rumah, dan ritme hidupmu." Data `DIALYSIS_OPTIONS`.
  - Tab aksesibel (`tablist`/`tab`/`tabpanel`, tombol panah kiri/kanan), pil aktif `layoutId="dialysis-tab"`.
  - Panel (`AnimatePresence`): kiri ikon, badge `where`, nama, tagline, `note` bergaya kutipan, strip jadwal (`schedule`, item aktif disorot, caption). Kanan: `dl` berisi `facts`.
  - Catatan kecil: "Tidak semua orang bebas memilih: kondisi jantung, riwayat operasi perut, sampai kondisi rumah ikut menentukan. Tanyakan keduanya ke dokter, jangan tunggu ditawari."
- [ ] **FirstDay.jsx** (`hari-pertama`, 04, "Supaya tidak ada kejutan"), judul "Hari pertamamu, *menit per menit*" (coral), deskripsi "Rasa takut paling sering datang dari tidak tahu. Ini gambaran umum satu sesi hemodialisis; detailnya bisa berbeda di tiap unit." Data `FIRST_DAY_STEPS`, `BAG_KIT`.
  - Timeline vertikal; garis progres ikut gulir: `useScroll({ target, offset: ['start 75%', 'end 55%'] })` + `useSpring` → `scaleY` (`origin-top`, gradasi).
  - Samping (sticky di `lg`): checklist "Isi tas yang sering menyelamatkan" dengan checkbox tersimpan (`useLocalStorage('sg-kit', [])`), hitungan "x/6 siap" + bar progres.
- [ ] **Myths.jsx** (`mitos`, 05, "Bersihkan dulu kepalanya"), judul "Yang orang bilang *vs* yang sebenarnya" (tide), deskripsi "Ketuk kartunya untuk membalik." Data `MYTHS`.
  - Kartu balik: `<button aria-pressed>` berisi `motion.span` `rotateY` 0/180 (`transform-3d`, induk `perspective-[1200px]`). Kedua sisi di satu sel grid (`[grid-area:1/1]`, `backface-hidden`, sisi belakang `rotate-y-180`) agar tinggi kartu mengikuti teks terpanjang. Depan: label "Mitos" (coral) + mitos (serif). Belakang: label "Faktanya" (leaf) + fakta.
- [ ] **DailyLife.jsx** (`harian`, 06, "Di antara jadwal"), judul "Hidup tetap *milikmu*" (leaf), deskripsi "Enam hal yang paling sering ditanyakan tentang hari-hari biasa. Angka pastinya berbeda untuk setiap orang: ini peta, bukan resep." Data `DAILY_LIFE`. Grid 3×2 `card` + `IconBadge`, sedikit terangkat saat hover.
- [ ] **Cost.jsx** (`biaya`, 07, "Pertanyaan yang jarang berani ditanya"), judul "“Uangnya *dari mana?*”" (coral), deskripsi "Kekhawatiran paling wajar dan paling jarang diucapkan. Kabar baiknya: hemodialisis maupun CAPD termasuk layanan yang dijamin program JKN yang dikelola BPJS Kesehatan." Data `COST_STEPS`, `COST_EXTRAS`.
  - Kiri: langkah bernomor dengan garis penghubung. Kanan: kartu "Hal yang sering terlewat".
  - Catatan: "Aturan teknis bisa berubah. Konfirmasi lewat BPJS Kesehatan Care Center 165, aplikasi Mobile JKN, atau petugas rumah sakitmu."
- [ ] **Stories.jsx** (`cerita`, 08, "Bukan hanya kamu"), judul "Suara dari *kursi sebelah*" (tide), deskripsi "Cerita ini gambaran yang disusun dari pengalaman umum pasien dialisis, bukan kutipan orang tertentu. Kami sengaja tidak memakai nama asli siapa pun." Data `STORIES`. Grid 2 kolom, kartu genap turun sedikit (`md:translate-y-10`), ikon `Quote`, `figure`/`blockquote`/`figcaption`.
- [ ] **CalmRoom.jsx** (`tenang`, 09, "Ruang Tenang"): "ruangan" gelap membulat besar (kelas `dark` di pembungkus agar token gelap aktif, latar `night-sky`, bintang `STARS` berkedip `animate-twinkle`). Judul "Kalau dadamu sedang *sesak*" (tide). Paragraf: "Ini bukan pengganti bantuan profesional. Ini hanya satu menit untuk menurunkan detak jantungmu: bisa dipakai di ruang tunggu, di angkot, atau di kamar pukul dua pagi." Data `BREATH_PATTERNS`, `AFFIRMATIONS`, `STARS`.
  - Pilihan pola (pil radio; saat ganti pola panggil `stop()` dulu). Lingkaran `breath-orb` dianimasikan `scale` ke `current.scale` selama `current.seconds`, label fase + hitung mundur di tengah, tombol Mulai/Berhenti, jumlah siklus. `sr-only aria-live` hanya untuk pergantian fase. Catatan: "Berhenti kapan saja kalau terasa pusing atau sesak."
  - Kartu afirmasi: tombol "Ambil satu kalimat untuk hari ini" → kalimat acak (tidak sama dengan sebelumnya), `AnimatePresence`.
- [ ] **CrisisHelp.jsx** (`bantuan`, tanpa nomor): kartu bernuansa koral, judul "Kalau hari ini terasa terlalu berat", isi "Pikiran untuk mengakhiri hidup bisa muncul saat sakit terasa tidak ada ujungnya. Itu tanda kamu butuh ditemani sekarang, bukan tanda kamu lemah. Tolong bicara dengan seseorang hari ini." Tiga kartu tautan `tel:` dari `HELP_LINES`. Penutup: "Kalau ada bahaya langsung pada dirimu atau orang lain, hubungi 112 atau datang ke IGD terdekat. Kamu juga boleh memulai dengan satu pesan singkat ke satu orang yang kamu percaya."
- [ ] **Faq.jsx** (`tanya`, 10, "Tanya jujur"), judul "Hal yang *malu ditanyakan* di depan dokter" (coral), deskripsi "Tidak ada pertanyaan bodoh. Ini beberapa yang paling sering dibisikkan di ruang tunggu." Data `FAQ`. Judul sticky di kiri, akordeon di kanan (tombol `aria-expanded`/`aria-controls`, tinggi `auto` dengan `AnimatePresence`, ikon `Plus` berputar 45°), satu terbuka sekaligus, item pertama terbuka.
- [ ] **CallToAction.jsx** (`langkah`, 11), judul "Satu langkah kecil untuk hari ini", isi "Tidak perlu memahami semuanya sekarang. Pilih satu saja: tulis pertanyaan untuk dokter berikutnya, atau kirim halaman ini ke satu orang yang perlu membacanya."
  - Form: label "Tulis satu pertanyaan untuk dokter", placeholder "Contoh: berapa batas cairan saya per hari?", `maxLength` 200 → daftar `useLocalStorage('sg-questions', [])` dengan tombol hapus (`AnimatePresence` + `layout`).
  - Tombol "Salin semua" (clipboard, daftar bernomor) dan "Bagikan halaman ini" (`navigator.share`, cadangan: salin tautan). Pesan status `aria-live`. Petunjuk: "Tersimpan di perangkatmu saja. Tidak dikirim ke mana pun."

### 2. File utama

- [ ] `src/main.jsx`: impor font (`@fontsource-variable/fraunces/soft.css`, `@fontsource-variable/fraunces/soft-italic.css`, `@fontsource-variable/plus-jakarta-sans`), lalu `./index.css`, render `<App />` di dalam `StrictMode`.
- [ ] `src/App.jsx`: `MotionConfig reducedMotion="user"`; skip link "Langsung ke isi" → `#konten`; `ScrollProgress`, `AuraBackground`, `Navbar`; `<main id="konten" tabIndex={-1}>` berisi 13 bagian sesuai urutan; `Footer`; `FloatingActions`.

### 3. Pemeriksaan

- [ ] `npm run build` dan `npm run lint` tanpa error.
- [ ] Cek tampilan desktop dan ponsel, mode terang dan gelap, navigasi keyboard (Tab, Escape di menu), dan `prefers-reduced-motion`.

### 4. Penutup

- [ ] README: cara menjalankan (`npm install`, `npm run dev`, `npm run build`, `npm run preview`).
- [ ] Opsional: tombol "Gabung komunitas" kalau ada link WhatsApp/Instagram SahabatGinjal.

## Catatan teknis

- lucide-react 1.x mengganti beberapa nama ikon: pakai `FaceSlightlyFrowning` (bukan `Frown`), `FaceAngry` (bukan `Angry`), `CircleQuestionMark` (bukan `CircleHelp`), `Trash` (bukan `Trash2`).
- Tailwind 4: warna semantik (`bg-canvas`, `text-ink`, `text-ink-soft`, `border-line`, `bg-brand`, …) otomatis berganti di mode malam. Menambah kelas `dark` pada satu bagian membuat bagian itu selalu gelap.
- Nomor bantuan (119 tekan 8, 112, 165) diperiksa September 2026; cek ulang secara berkala.
