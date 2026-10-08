import {
  Activity,
  BookOpen,
  Calculator,
  CircleHelp,
  Droplets,
  HeartHandshake,
  HeartPulse,
  Hospital,
  Lightbulb,
  Pill,
  Plane,
  Shield,
  Smile,
  Sparkles,
  Stethoscope,
  Utensils,
  Wind,
} from 'lucide-react'

/**
 * Kategori navigasi utama.
 * Setiap kategori memiliki label singkat yang tampil di navbar,
 * beserta daftar link di dalamnya.
 *
 * Desain ini disesuaikan untuk pengguna berusia lanjut agar
 * mudah ditemukan dan tidak membingungkan.
 */
export const NAV_CATEGORIES = [
  {
    key: 'kenali',
    label: 'Kenali Ginjal',
    emoji: '🫘',
    links: [
      { id: 'skrining', label: 'Cek Risiko', desc: 'Tes risiko ginjal 1 menit', icon: Activity },
      {
        id: 'stadium-ginjal',
        label: '5 Stadium',
        desc: 'Tahapan penyakit ginjal',
        icon: Stethoscope,
      },
      { id: 'pencegahan', label: 'Pencegahan', desc: '8 aturan emas ginjal sehat', icon: Shield },
      { id: 'perasaan', label: 'Perasaanmu', desc: 'Cek kondisi emosimu', icon: Smile },
    ],
  },
  {
    key: 'cuci-darah',
    label: 'Cuci Darah',
    emoji: '💉',
    links: [
      { id: 'paham', label: 'Apa Itu Cuci Darah', desc: 'Penjelasan sederhana', icon: BookOpen },
      { id: 'istilah', label: 'Kamus Istilah', desc: 'Arti kata-kata medis', icon: Lightbulb },
      {
        id: 'pilihan',
        label: 'HD atau CAPD',
        desc: 'Bandingkan pilihan terapi',
        icon: HeartPulse,
      },
      {
        id: 'hari-pertama',
        label: 'Hari Pertama',
        desc: 'Menit per menit pertama kali',
        icon: Sparkles,
      },
      { id: 'mitos', label: 'Mitos vs Fakta', desc: 'Luruskan salah paham', icon: CircleHelp },
    ],
  },
  {
    key: 'hidup',
    label: 'Hidup Sehari-hari',
    emoji: '🍽️',
    links: [
      { id: 'harian', label: 'Hidup Harian', desc: 'Tips aktivitas sehari-hari', icon: Pill },
      {
        id: 'cairan',
        label: 'Kalkulator Cairan',
        desc: 'Hitung batasan minummu',
        icon: Droplets,
      },
      {
        id: 'makanan',
        label: 'Panduan Nutrisi',
        desc: 'Makanan yang aman & pantangan',
        icon: Utensils,
      },
      {
        id: 'biaya',
        label: 'Biaya & BPJS',
        desc: 'Alur dan estimasi biaya',
        icon: Calculator,
      },
      {
        id: 'rumah-sakit',
        label: 'Cari Rumah Sakit',
        desc: 'RS dialisis terdekat',
        icon: Hospital,
      },
      {
        id: 'bepergian',
        label: 'Traveling / Mudik',
        desc: 'Dialisis saat bepergian',
        icon: Plane,
      },
    ],
  },
  {
    key: 'dukungan',
    label: 'Dukungan',
    emoji: '💚',
    links: [
      { id: 'cerita', label: 'Cerita Sesama', desc: 'Kisah dari pasien lain', icon: HeartHandshake },
      { id: 'tenang', label: 'Ruang Tenang', desc: 'Napas & suara penenang', icon: Wind },
      { id: 'tanya', label: 'Tanya Dokter', desc: 'Pertanyaan jujur yang sering ditanya', icon: CircleHelp },
    ],
  },
]

/**
 * Tautan flat untuk navbar ringkas (quick-links yang paling sering diakses).
 * Ini akan tampil langsung di desktop navbar sebagai tombol utama.
 */
export const NAV_QUICK_LINKS = [
  { id: 'skrining', label: 'Cek Risiko' },
  { id: 'rumah-sakit', label: 'Cari RS' },
  { id: 'tenang', label: 'Ruang Tenang' },
]

/** Semua bagian halaman secara berurutan, dipakai penanda menu aktif. */
export const SECTION_IDS = [
  'beranda',
  'skrining',
  'stadium-ginjal',
  'pencegahan',
  'perasaan',
  'paham',
  'istilah',
  'pilihan',
  'hari-pertama',
  'mitos',
  'harian',
  'cairan',
  'makanan',
  'biaya',
  'rumah-sakit',
  'bepergian',
  'cerita',
  'tenang',
  'bantuan',
  'tanya',
  'langkah',
]

/** Flat list of all nav link IDs for mapping active section to category. */
export const SECTION_TO_CATEGORY = Object.fromEntries(
  NAV_CATEGORIES.flatMap((cat) => cat.links.map((link) => [link.id, cat.key])),
)

export const FOOTER_LINKS = NAV_CATEGORIES
