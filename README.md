# SahabatGinjal

Landing page untuk orang yang baru mendengar kata "cuci darah" maupun yang sudah lama
menjalaninya. Isinya penjelasan jujur, gambaran hari pertama, pelurusan mitos, informasi biaya
BPJS, dan satu Ruang Tenang untuk menarik napas.

Dibuat dengan Vite, React, Tailwind CSS, dan Motion.

## Menjalankan

Butuh [Node.js](https://nodejs.org) versi 20.19 atau lebih baru.

```bash
npm install     # sekali saja, memasang semua kebutuhan
npm run dev     # buka alamat yang muncul, biasanya http://localhost:5173
```

Perintah lain:

| Perintah          | Gunanya                                              |
| ----------------- | ---------------------------------------------------- |
| `npm run dev`     | Menjalankan situs di komputermu sambil menulis kode   |
| `npm run build`   | Membuat versi siap unggah di folder `dist/`           |
| `npm run preview` | Mencoba hasil `build` seperti di server sungguhan     |
| `npm run lint`    | Memeriksa kode                                       |

## Isi folder

```
index.html              halaman kerangka + pemasang tema awal
public/                 favicon dan ikon layar utama
src/
  main.jsx              titik masuk: font, gaya, lalu React
  App.jsx               susunan seluruh bagian halaman
  index.css             token desain: warna, font, mode malam, utilitas
  assets/brand/         lencana logo
  data/                 semua teks dan isi halaman
  hooks/                tema, penyimpanan lokal, bagian aktif, latihan napas
  lib/                  pembantu kecil: cn, nilai gerak, nada warna
  components/
    ui/                 tombol, judul bagian, kartu muncul, lencana ikon
    layout/             navbar, menu ponsel, footer, latar, tombol mengambang
    sections/           13 bagian halaman, satu file satu bagian
```

Gaya tampilan ditulis sebagai kelas Tailwind di tiap komponen, dengan warna dan ukuran
terpusat di `src/index.css`. Tidak ada CSS yang menumpuk di `index.html`.

## Mengubah isi teks

Hampir semua kalimat ada di `src/data/`, terpisah dari kode tampilan:

| File            | Isinya                                        |
| --------------- | --------------------------------------------- |
| `moods.js`      | Pilihan perasaan dan tanggapannya             |
| `basics.js`     | Penjelasan dasar soal ginjal dan dialisis     |
| `dialysis.js`   | Perbandingan hemodialisis dan CAPD            |
| `firstDay.js`   | Urutan sesi pertama dan isi tas               |
| `myths.js`      | Mitos dan faktanya                            |
| `dailyLife.js`  | Cairan, kalium, fosfat, protein, gerak, kerja |
| `cost.js`       | Langkah rujukan BPJS dan biaya tak terduga    |
| `stories.js`    | Cerita ilustratif                             |
| `calm.js`       | Pola napas dan kalimat penguat                |
| `help.js`       | Nomor bantuan                                 |
| `faq.js`        | Tanya jawab                                   |
| `navigation.js` | Menu dan urutan bagian                        |

## Catatan

- **Bukan nasihat medis.** Halaman ini bersifat edukatif dan tidak menggantikan pemeriksaan
  atau instruksi dokter dan tim dialisis. Batas cairan serta pantangan makanan selalu
  bersifat individual.
- Cerita di bagian "Suara dari kursi sebelah" disusun dari pengalaman umum pasien, bukan
  kutipan orang tertentu.
- Nomor bantuan (119 lalu tekan 8, 112, dan 165) diperiksa pada September 2026. Sebaiknya
  dicek ulang secara berkala.
- Logo diambil dari `SahabatGinjal.jpeg`. Berkas `SahabatGinjal-no-bg.jpeg` ternyata tidak
  transparan: pola kotak-kotaknya ikut tercetak, karena JPEG tidak mendukung transparansi.
  Kalau nanti ada PNG transparan, aset di `src/assets/brand/` dan `public/` bisa dibuat ulang.
- Catatan pengguna (pertanyaan untuk dokter dan centang isi tas) hanya tersimpan di
  perangkat masing-masing lewat `localStorage`. Tidak ada data yang dikirim ke server.

Rujukan umum: [Kementerian Kesehatan RI](https://kemkes.go.id),
[BPJS Kesehatan](https://bpjs-kesehatan.go.id), dan
[NIDDK, NIH](https://www.niddk.nih.gov/health-information/kidney-disease).
