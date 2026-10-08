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
  Phone,
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
 * 3 Kategori dropdown utama untuk desktop dan mobile.
 * Dirancang ringkas, tidak memadati layar, dan mudah dipahami orang tua / keluarga pasien.
 */
export const NAV_DROPDOWNS = [
  {
    key: 'edukasi',
    label: 'Edukasi',
    fullLabel: 'Edukasi Ginjal',
    icon: BookOpen,
    desc: 'Kenali risiko, stadium, dan pencegahan',
    links: [
      {
        id: 'skrining',
        label: 'Cek Risiko Ginjal',
        desc: 'Skrining mandiri 1 menit untuk deteksi dini',
        icon: Activity,
      },
      {
        id: 'stadium-ginjal',
        label: 'Peta 5 Stadium Ginjal',
        desc: 'Penjelasan tahapan penurunan fungsi ginjal',
        icon: Stethoscope,
      },
      {
        id: 'pencegahan',
        label: '8 Aturan Ginjal Sehat',
        desc: 'Panduan menjaga fungsi ginjal agar tidak memburuk',
        icon: Shield,
      },
      {
        id: 'perasaan',
        label: 'Perasaan & Emosi',
        desc: 'Ruang untuk merangkul rasa takut, sedih, dan cemas',
        icon: Smile,
      },
    ],
  },
  {
    key: 'cuci-darah',
    label: 'Cuci Darah',
    fullLabel: 'Info Cuci Darah',
    icon: HeartPulse,
    desc: 'Penjelasan terapi hemodialisis & CAPD',
    links: [
      {
        id: 'paham',
        label: 'Mengenal Cuci Darah',
        desc: 'Apa sebenarnya cuci darah itu dan bagaimana cara kerjanya',
        icon: BookOpen,
      },
      {
        id: 'pilihan',
        label: 'Pilihan: HD vs CAPD',
        desc: 'Bandingkan cuci darah mesin dengan cuci darah mandiri lewat perut',
        icon: HeartPulse,
      },
      {
        id: 'hari-pertama',
        label: 'Hari Pertama HD',
        desc: 'Panduan menit demi menit agar tidak bingung di ruang dialisis',
        icon: Sparkles,
      },
      {
        id: 'istilah',
        label: 'Kamus Istilah Medis',
        desc: 'Arti kata AV Fistula, CDL, URR, Kt/V, dan istilah dokter lainnya',
        icon: Lightbulb,
      },
      {
        id: 'mitos',
        label: 'Mitos vs Fakta Medis',
        desc: 'Luruskan kabar burung yang sering menakut-nakuti pasien',
        icon: CircleHelp,
      },
    ],
  },
  {
    key: 'panduan',
    label: 'Panduan Pasien',
    fullLabel: 'Panduan Pasien',
    icon: Utensils,
    desc: 'Makanan, batasan minum, biaya, dan traveling',
    links: [
      {
        id: 'cairan',
        label: 'Kalkulator Cairan',
        desc: 'Hitung batas aman minum harian agar tidak sesak napas',
        icon: Droplets,
      },
      {
        id: 'makanan',
        label: 'Panduan Makanan',
        desc: 'Daftar makanan aman serta pantangan kalium & fosfat',
        icon: Utensils,
      },
      {
        id: 'biaya',
        label: 'Biaya & Alur BPJS',
        desc: 'Panduan memanfaatkan BPJS Kesehatan 100% tanpa biaya',
        icon: Calculator,
      },
      {
        id: 'bepergian',
        label: 'Mudik & Traveling',
        desc: 'Tips bepergian aman dan mencari unit HD tamu di luar kota',
        icon: Plane,
      },
      {
        id: 'harian',
        label: 'Aktivitas Harian',
        desc: 'Tips beraktivitas, istirahat, dan menjaga semangat hidup',
        icon: Pill,
      },
    ],
  },
]

/**
 * 2 Tautan langsung di navbar desktop untuk fitur yang paling sering dicari.
 */
export const NAV_DIRECT_LINKS = [
  {
    id: 'rumah-sakit',
    label: 'Cari RS Terdekat',
    icon: Hospital,
    highlight: true,
  },
  {
    id: 'tenang',
    label: 'Ruang Tenang',
    icon: Wind,
    highlight: false,
  },
]

/**
 * Kategori tambahan untuk komunitas & dukungan di mobile & footer.
 */
export const NAV_COMMUNITY_LINKS = [
  {
    id: 'cerita',
    label: 'Kisah Sahabat',
    desc: 'Cerita nyata dan semangat dari sesama pasien',
    icon: HeartHandshake,
  },
  {
    id: 'tanya',
    label: 'Tanya Dokter',
    desc: 'Pertanyaan penting yang wajib ditanyakan ke nefrolog',
    icon: CircleHelp,
  },
  {
    id: 'bantuan',
    label: 'Bantuan Darurat 119',
    desc: 'Layanan konsultasi krisis saat kondisi terasa sangat berat',
    icon: Phone,
  },
]

/** Semua ID section berurutan untuk scroll spy / active section. */
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

/** Map setiap section ID ke dropdown key (untuk highlight active dropdown). */
export const SECTION_TO_DROPDOWN = {}
NAV_DROPDOWNS.forEach((group) => {
  group.links.forEach((link) => {
    SECTION_TO_DROPDOWN[link.id] = group.key
  })
})
