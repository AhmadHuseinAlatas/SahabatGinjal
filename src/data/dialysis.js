import { Hospital, House } from 'lucide-react'

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
      caption: 'Misalnya Senin dan Kamis. Jadwal pastinya diatur unit dialisismu.',
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
      caption: 'Misalnya empat kali ganti cairan. Jadwalnya disesuaikan dengan harimu.',
    },
  },
]
