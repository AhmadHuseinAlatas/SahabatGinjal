import { Hospital, House } from 'lucide-react'

export const HD_PRESET_SCHEDULES = [
  {
    id: 'sen-kam',
    label: 'Senin & Kamis',
    days: ['Sen', 'Kam'],
    note: 'Pola 2x seminggu paling umum, ada jeda istirahat ideal di antaranya.',
  },
  {
    id: 'sel-jum',
    label: 'Selasa & Jumat',
    days: ['Sel', 'Jum'],
    note: 'Pola 2x seminggu yang memberi kebebasan beraktivitas di akhir pekan.',
  },
  {
    id: 'rab-sab',
    label: 'Rabu & Sabtu',
    days: ['Rab', 'Sab'],
    note: 'Pola 2x seminggu alternatif yang cocok bagi yang aktif di awal pekan.',
  },
  {
    id: 'sen-rab-jum',
    label: '3x Seminggu (Sen-Rab-Jum)',
    days: ['Sen', 'Rab', 'Jum'],
    note: 'Pola 3x seminggu untuk klirens racun dan kestabilan cairan lebih optimal.',
  },
  {
    id: 'sel-kam-sab',
    label: '3x Seminggu (Sel-Kam-Sab)',
    days: ['Sel', 'Kam', 'Sab'],
    note: 'Pola 3x seminggu rotasi genap dengan hari Minggu istirahat penuh.',
  },
]

export const HD_DAYS_DATA = [
  { key: 'Sen', full: 'Senin' },
  { key: 'Sel', full: 'Selasa' },
  { key: 'Rab', full: 'Rabu' },
  { key: 'Kam', full: 'Kamis' },
  { key: 'Jum', full: 'Jumat' },
  { key: 'Sab', full: 'Sabtu' },
  { key: 'Min', full: 'Minggu' },
]

export const CAPD_SLOTS_DATA = [
  {
    time: '06.00',
    title: 'Pagi Hari (Awali Hari)',
    subtitle: 'Drain cairan semalam & isi cairan baru (±30–40 menit)',
    desc: 'Keluarkan cairan yang telah menyerap racun semalaman (dwell night). Timbang dan catat volume cairan buang. Masukkan cairan hangat baru, lalu kamu bebas beraktivitas normal seharian!',
    highlight: 'Cairan baru di rongga perut tidak mengganggu dan bisa dibawa bekerja, mengurus rumah, atau kuliah.',
  },
  {
    time: '12.00',
    title: 'Siang Hari (Waktu Istirahat)',
    subtitle: 'Ganti cairan siang di kantor / tempat kerja',
    desc: 'Dapat dilakukan di ruang bersih kantor atau di rumah (bukan di toilet umum). Cuci tangan 6 langkah, kenakan masker, dan ganti kantong cairan santai sambil istirahat makan siang.',
    highlight: 'Banyak pasien profesional tetap produktif berkarier penuh waktu dengan ritme fleksibel ini.',
  },
  {
    time: '17.00',
    title: 'Sore Hari (Tiba di Rumah)',
    subtitle: 'Pergantian sore menjaga klirens racun tetap stabil',
    desc: 'Setelah menyelesaikan aktivitas di luar rumah, luangkan 30 menit untuk mengganti cairan. Tubuh tetap segar dan tidak menumpuk racun urea menjelang malam.',
    highlight: 'Membantu menjaga nafsu makan dan stamina tetap baik saat makan malam bersama keluarga tercinta.',
  },
  {
    time: '22.00',
    title: 'Malam Hari (Sebelum Tidur)',
    subtitle: 'Proses dwell penyaringan semalaman saat lelap',
    desc: 'Masukkan cairan malam (dapat menggunakan konsentrasi sesuai anjuran dokter). Tutup transfer set dengan rapi dan aman, lalu tidur nyenyak sepanjang malam.',
    highlight: 'Penyaringan terus berjalan lembut tanpa rasa sakit saat kamu tidur lelap hingga fajar.',
  },
]

export const DIALYSIS_OPTIONS = [
  {
    id: 'hd',
    tab: 'Hemodialisis (HD)',
    name: 'Hemodialisis',
    icon: Hospital,
    tone: 'tide',
    where: 'Di rumah sakit atau klinik',
    tagline: 'Darahmu dialirkan keluar, dibersihkan mesin, lalu dikembalikan.',
    facts: [
      { label: 'Ritme', value: 'Umumnya 2–3 kali seminggu, 4–5 jam per sesi.' },
      {
        label: 'Akses',
        value:
          'Lewat pembuluh di lengan (AV fistula, sering disebut “cimino”) atau kateter di leher.',
      },
      { label: 'Ditemani', value: 'Perawat dan dokter mengawasi sepanjang sesi.' },
      {
        label: 'Enaknya',
        value: 'Kamu tidak perlu mengerjakan apa pun sendiri, dan ada hari bebas di antaranya.',
      },
      {
        label: 'Beratnya',
        value:
          'Harus bolak-balik, pembatasan cairan lebih ketat, kadang lemas setelah sesi.',
      },
    ],
    note: 'Empat jam itu terasa lama di sesi pertama. Lama-lama ia jadi ruang sendiri: tempat tidur siang, menonton, mengobrol dengan orang yang mengerti tanpa perlu dijelaskan.',
    schedule: {
      title: 'Contoh minggumu',
      items: [
        { label: 'Sen', active: true },
        { label: 'Sel' },
        { label: 'Rab' },
        { label: 'Kam', active: true },
        { label: 'Jum' },
        { label: 'Sab' },
        { label: 'Min' },
      ],
      caption: 'Klik hari di atas atau pilih pola jadwal untuk melihat simulasi harimu.',
    },
  },
  {
    id: 'capd',
    tab: 'Peritoneal (CAPD)',
    name: 'Dialisis Peritoneal',
    icon: House,
    tone: 'leaf',
    where: 'Di rumah, oleh dirimu sendiri',
    tagline: 'Selaput di rongga perutmu dipakai sebagai penyaring alami.',
    facts: [
      {
        label: 'Ritme',
        value: 'Sekitar 3–5 kali ganti cairan sehari, masing-masing ±30–40 menit.',
      },
      { label: 'Akses', value: 'Selang lunak permanen di perut, dipasang lewat tindakan kecil.' },
      { label: 'Ditemani', value: 'Kamu dan keluarga dilatih dulu sampai benar-benar bisa mandiri.' },
      {
        label: 'Enaknya',
        value:
          'Tidak perlu ke rumah sakit tiap minggu, jadwal lebih lentur, pembatasan cairan biasanya lebih longgar.',
      },
      {
        label: 'Beratnya',
        value: 'Butuh ruang bersih di rumah, disiplin tinggi, dan waspada risiko infeksi.',
      },
    ],
    note: 'Untuk yang masih bekerja, kuliah, atau tinggal jauh dari unit dialisis, jalur ini sering mengembalikan rasa memegang kendali atas hari sendiri.',
    schedule: {
      title: 'Contoh harimu',
      items: [
        { label: '06.00', active: true },
        { label: '12.00', active: true },
        { label: '17.00', active: true },
        { label: '22.00', active: true },
      ],
      caption: 'Klik jam pergantian cairan untuk melihat rincian aktivitasnya.',
    },
  },
]
