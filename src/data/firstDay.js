import {
  Armchair,
  CircleCheck,
  Cookie,
  Footprints,
  Headphones,
  MoonStar,
  NotebookPen,
  Scale,
  Shirt,
  Snowflake,
  Syringe,
} from 'lucide-react'

/** Gambaran umum satu sesi hemodialisis. Detail bisa berbeda di tiap unit. */
export const FIRST_DAY_STEPS = [
  {
    id: 'cek',
    time: 'Sebelum mulai',
    icon: Scale,
    title: 'Ditimbang dan diperiksa',
    body: 'Berat badan, tekanan darah, suhu, dan nadi dicek. Selisih berat sebelum dan sesudah sesi dipakai untuk menghitung berapa banyak cairan yang perlu ditarik hari itu.',
  },
  {
    id: 'akses',
    time: 'Menit ke-0',
    icon: Syringe,
    title: 'Menyambungkan akses',
    body: 'Dua jarum dipasang di fistula lenganmu: satu mengambil darah, satu mengembalikannya. Bagian ini paling ditakuti, dan biasanya terasa seperti cubitan kuat beberapa detik. Tanyakan apakah tersedia krim atau semprotan pereda nyeri. Kalau aksesmu kateter di leher, tidak ada tusukan; selangnya langsung disambungkan.',
  },
  {
    id: 'proses',
    time: 'Jam ke-1 sampai ke-4',
    icon: Armchair,
    title: 'Mesin bekerja, kamu beristirahat',
    body: 'Darah mengalir melewati tabung penyaring (dialiser) lalu kembali dalam keadaan bersih. Kamu tetap sadar: bisa tidur, membaca, menonton, atau mengobrol. Segera beri tahu perawat kalau pusing, mual, atau kram.',
  },
  {
    id: 'selesai',
    time: 'Selesai',
    icon: CircleCheck,
    title: 'Dilepas, ditekan, ditimbang lagi',
    body: 'Bekas tusukan ditekan beberapa menit sampai darah berhenti. Ada yang langsung merasa segar, ada yang lemas dan butuh tidur. Keduanya normal.',
  },
  {
    id: 'malam',
    time: 'Malam harinya',
    icon: MoonStar,
    title: 'Tubuhmu sedang menyesuaikan',
    body: 'Minggu-minggu pertama biasanya paling berat karena tubuh sedang belajar ritme baru. Banyak pasien merasa lebih stabil setelah beberapa minggu hingga beberapa bulan.',
  },
]

export const BAG_KIT = [
  { id: 'jaket', icon: Snowflake, label: 'Jaket atau selimut tipis', note: 'ruangan biasanya dingin' },
  {
    id: 'hiburan',
    icon: Headphones,
    label: 'Earphone dan tontonan yang sudah diunduh',
    note: 'sinyal tidak selalu bagus',
  },
  { id: 'kaus-kaki', icon: Footprints, label: 'Kaus kaki tebal', note: 'kaki cepat terasa dingin' },
  { id: 'camilan', icon: Cookie, label: 'Camilan yang diizinkan', note: 'tanyakan dulu ke perawat' },
  {
    id: 'catatan',
    icon: NotebookPen,
    label: 'Catatan obat, hasil lab, nomor keluarga',
    note: 'simpan dalam satu map',
  },
  { id: 'baju', icon: Shirt, label: 'Baju berlengan longgar', note: 'agar akses mudah dijangkau' },
]
