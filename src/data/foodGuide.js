/**
 * Panduan nutrisi ginjal: Kalium, Fosfat, dan Natrium pada makanan sehari-hari di Indonesia.
 * Tingkat:
 * - 'safe': Relatif aman / Rendah kalium & fosfat
 * - 'moderate': Perhatikan porsi / Konsumsi secukupnya
 * - 'limit': Tinggi kalium atau fosfat / Wajib dibatasi atau dihindari
 */

export const FOOD_CATEGORIES = [
  { id: 'all', label: 'Semua Makanan' },
  { id: 'buah', label: 'Buah-buahan' },
  { id: 'sayur', label: 'Sayuran' },
  { id: 'lauk', label: 'Lauk & Protein' },
  { id: 'minuman', label: 'Minuman & Olahan' },
]

export const FOOD_ITEMS = [
  // BUAH
  {
    id: 'apel',
    name: 'Apel',
    category: 'buah',
    level: 'safe',
    levelLabel: 'Aman / Rendah Kalium',
    note: 'Pilihan buah harian yang ramah ginjal. Kulit boleh dimakan setelah dicuci bersih.',
  },
  {
    id: 'pir',
    name: 'Pir',
    category: 'buah',
    level: 'safe',
    levelLabel: 'Aman / Rendah Kalium',
    note: 'Kandungan kalium rendah, menyegarkan saat tenggorokan kering.',
  },
  {
    id: 'semangka',
    name: 'Semangka',
    category: 'buah',
    level: 'moderate',
    levelLabel: 'Perhatikan Porsi',
    note: 'Kalium relatif sedang, tetapi mengandung kadar air sangat tinggi. Batasi agar tidak melampaui kuota cairan.',
  },
  {
    id: 'pisang',
    name: 'Pisang',
    category: 'buah',
    level: 'limit',
    levelLabel: 'Tinggi Kalium (Batasi)',
    note: 'Sangat tinggi kalium. Satu buah pisang ukuran sedang bisa langsung menaikkan kadar kalium darah secara signifikan.',
  },
  {
    id: 'air-kelapa',
    name: 'Air Kelapa & Daging Kelapa Muda',
    category: 'buah',
    level: 'limit',
    levelLabel: 'Sangat Tinggi Kalium',
    note: 'Salah satu pemicu hiperkalemia darurat tersering di IGD. Hindari sama sekali tanpa anjuran dokter.',
  },
  {
    id: 'alpukat',
    name: 'Alpukat',
    category: 'buah',
    level: 'limit',
    levelLabel: 'Tinggi Kalium (Batasi)',
    note: 'Meskipun lemak sehatnya bagus, kadar kalium alpukat sangat tinggi untuk pasien dialisis.',
  },
  {
    id: 'belimbing',
    name: 'Belimbing (Starfruit)',
    category: 'buah',
    level: 'limit',
    levelLabel: 'Bahaya (Neurotoksin)',
    note: 'Mengandung caramboxin yang beracun bagi penderita gangguan ginjal. Jangan dikonsumsi sama sekali.',
  },

  // SAYUR
  {
    id: 'wortel',
    name: 'Wortel (Rebus)',
    category: 'sayur',
    level: 'safe',
    levelLabel: 'Aman',
    note: 'Potong kecil lalu rebus dengan air berlebih, buang air rebusannya sebelum dimakan.',
  },
  {
    id: 'timun',
    name: 'Mentimun & Labu Siam',
    category: 'sayur',
    level: 'safe',
    levelLabel: 'Aman / Rendah Kalium',
    note: 'Rendah kalium. Kupas kulitnya dan buang bijinya untuk mengurangi kalium.',
  },
  {
    id: 'bayam',
    name: 'Bayam & Kangkung',
    category: 'sayur',
    level: 'limit',
    levelLabel: 'Tinggi Kalium & Oksalat',
    note: 'Sayuran berdaun hijau gelap kaya akan kalium. Jika ingin mengonsumsi, potong kecil dan lakukan proses leaching.',
  },
  {
    id: 'daun-singkong',
    name: 'Daun Singkong & Daun Pepaya',
    category: 'sayur',
    level: 'limit',
    levelLabel: 'Tinggi Kalium',
    note: 'Kalium sangat pekat. Hindari lalapan daun singkong mentah atau kuah gulai kental.',
  },
  {
    id: 'kentang',
    name: 'Kentang',
    category: 'sayur',
    level: 'moderate',
    levelLabel: 'Perlu Proses Rendam',
    note: 'Tinggi kalium jika digoreng/dibakar. Wajib direndam air hangat minimal 2 jam lalu direbus dan airnya dibuang.',
  },

  // LAUK & PROTEIN
  {
    id: 'putih-telur',
    name: 'Putih Telur',
    category: 'lauk',
    level: 'safe',
    levelLabel: 'Sumber Protein Terbaik',
    note: 'Protein biologis tinggi tanpa fosfat tinggi. Kuning telur sebaiknya dibatasi (maksimal 1 butir per hari).',
  },
  {
    id: 'ayam',
    name: 'Daging Ayam Tanpa Kulit',
    category: 'lauk',
    level: 'safe',
    levelLabel: 'Dianjurkan',
    note: 'Pasien hemodialisis butuh protein ekstra (1.2g/kg BB) untuk menggantikan asam amino yang hilang saat sesi.',
  },
  {
    id: 'ikan-segar',
    name: 'Ikan Segar (Tenggiri, Nila, Lele)',
    category: 'lauk',
    level: 'safe',
    levelLabel: 'Aman',
    note: 'Pilih ikan segar, bukan ikan asin atau ikan kaleng olahan yang kaya natrium dan pengawet fosfat.',
  },
  {
    id: 'tahu-tempe',
    name: 'Tahu & Tempe',
    category: 'lauk',
    level: 'moderate',
    levelLabel: 'Konsumsi Terukur',
    note: 'Protein nabati bagus, tetapi perhatikan kandungan fosfat dan kaliumnya. Konsumsi dalam porsi sedang.',
  },
  {
    id: 'jeroan',
    name: 'Jeroan (Hati, Usus, Paru)',
    category: 'lauk',
    level: 'limit',
    levelLabel: 'Tinggi Fosfat & Kolesterol',
    note: 'Fosfat organik sangat pekat, dapat memicu gatal kulit parah dan pengeroposan tulang.',
  },

  // MINUMAN & OLAHAN
  {
    id: 'air-putih',
    name: 'Air Mineral / Air Putih Hangat',
    category: 'minuman',
    level: 'safe',
    levelLabel: 'Pilihan Utama',
    note: 'Minuman terbaik, namun ukur volume harian dengan gelas berukuran tetap agar tidak melebihi target cairan.',
  },
  {
    id: 'soda-gelap',
    name: 'Minuman Bersoda Gelap (Cola)',
    category: 'minuman',
    level: 'limit',
    levelLabel: 'Tinggi Fosfat Anorganik',
    note: 'Fosfat buatan pada minuman kemasan diserap hampir 100% oleh usus dan membebani peredaran darah.',
  },
  {
    id: 'susu-keju',
    name: 'Susu Sapi, Keju, & Olahan Susu',
    category: 'minuman',
    level: 'moderate',
    levelLabel: 'Perhatikan Fosfat & Cairan',
    note: 'Kaya fosfat dan kalsium. Tanyakan susu khusus formula ginjal (rendah protein/tinggi kalori) ke ahli gizi.',
  },
  {
    id: 'makanan-kaleng',
    name: 'Makanan Kaleng & Sosis Olahan',
    category: 'minuman',
    level: 'limit',
    levelLabel: 'Tinggi Natrium & Pengawet',
    note: 'Tinggi garam yang membuat haus hebat dan menahan cairan di dalam tubuh.',
  },
]

export const LEACHING_STEPS = [
  {
    step: '1',
    title: 'Kupas dan iris tipis',
    body: 'Kupas sayuran (seperti wortel, kentang, labu) dan potong menjadi irisan kecil atau tipis agar luas permukaannya terbuka.',
  },
  {
    step: '2',
    title: 'Rendam di air hangat',
    body: 'Rendam potongan sayuran dalam air hangat (suhu suam-suam kuku) dengan perbandingan air 4 kali lebih banyak dari sayuran selama 2–4 jam.',
  },
  {
    step: '3',
    title: 'Bilas dan rebus kembali',
    body: 'Tiriskan, bilas dengan air mengalir, lalu rebus dengan air baru hingga matang. Buang air rebusannya sebelum sayuran dimasak atau dikonsumsi.',
  },
]
