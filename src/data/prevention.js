import {
  Activity,
  AlertTriangle,
  Apple,
  Ban,
  Droplets,
  Heart,
  Pill,
  ShieldCheck,
  Stethoscope,
  TestTube,
} from 'lucide-react'

/** Pertanyaan kuesioner skrining risiko gangguan ginjal */
export const RISK_QUESTIONS = [
  {
    id: 'tensi',
    question: 'Apakah kamu memiliki riwayat tekanan darah tinggi (hipertensi) atau tensi sering di atas 130/80?',
    options: [
      { text: 'Tidak pernah / normal', points: 0 },
      { text: 'Kadang tinggi / belum rutin cek', points: 2 },
      { text: 'Ya, sudah didiagnosis hipertensi', points: 3 },
    ],
  },
  {
    id: 'gula',
    question: 'Apakah kamu memiliki riwayat diabetes atau kadar gula darah tinggi?',
    options: [
      { text: 'Tidak / kadar gula normal', points: 0 },
      { text: 'Ada riwayat di keluarga kandung', points: 1 },
      { text: 'Ya, saya mengidap diabetes', points: 3 },
    ],
  },
  {
    id: 'obat',
    question: 'Seberapa sering kamu minum obat pereda nyeri (asam mefenamat, ibuprofen, antrain) atau jamu sachet pegal linu?',
    options: [
      { text: 'Jarang sekali / hanya resep dokter sesekali', points: 0 },
      { text: 'Sebulan beberapa kali saat pegal/pusing', points: 1 },
      { text: 'Sering / hampir tiap minggu tanpa resep dokter', points: 3 },
    ],
  },
  {
    id: 'urine',
    question: 'Apakah air senimu sering berbusa tebal (seperti busa sabun yang tidak langsung hilang saat disiram)?',
    options: [
      { text: 'Tidak berbusa / bening atau kuning jernih', points: 0 },
      { text: 'Kadang sedikit berbusa saat kurang minum', points: 1 },
      { text: 'Sering berbusa tebal dan pekat', points: 2 },
    ],
  },
  {
    id: 'bengkak',
    question: 'Apakah kamu sering bangun dengan kelopak mata bengkak atau kaki/pergelangan kaki bengkak di sore hari?',
    options: [
      { text: 'Tidak pernah', points: 0 },
      { text: 'Jarang / hanya saat berdiri sangat lama', points: 1 },
      { text: 'Sering bengkak dan meninggalkan bekas lekukan saat ditekan', points: 3 },
    ],
  },
  {
    id: 'minuman',
    question: 'Bagaimana kebiasaan minum sehari-hari?',
    options: [
      { text: 'Dominan air putih matang (1,5–2 liter sehari)', points: 0 },
      { text: 'Air putih cukup, tapi rutin minum kopi/teh manis kemasan', points: 1 },
      { text: 'Sangat jarang air putih, lebih suka minuman manis bersoda / berenergi', points: 2 },
    ],
  },
]

export const RISK_LEVELS = {
  low: {
    level: 'Risiko Rendah',
    badge: 'bg-leaf-100 text-leaf-800 dark:bg-leaf-400/20 dark:text-leaf-300 ring-leaf-300/60',
    title: 'Kondisimu tampak relatif aman. Terus rawat ginjalmu!',
    desc: 'Berdasarkan jawabanmu, faktor risiko kerusakan ginjal saat ini minimal. Pertahankan gaya hidup sehat, minum air putih cukup, dan batasi garam serta makanan olahan.',
    action: 'Jadwalkan cek tensi dan cek urine rutin setahun sekali saat medical check-up.',
    tone: 'leaf',
  },
  medium: {
    level: 'Perlu Perhatian',
    badge: 'bg-sprout-200/90 text-leaf-900 dark:bg-sprout-400/20 dark:text-sprout-300 ring-sprout-300/60',
    title: 'Ada beberapa faktor risiko yang perlu kamu waspadai.',
    desc: 'Ada tanda atau kebiasaan yang berpotensi membebani ginjal jika dibiarkan bertahun-tahun (misalnya tensi, gula darah, atau kebiasaan konsumsi obat nyeri/minuman manis).',
    action: 'Segera kurangi obat antinyeri bebas. Saat periksa ke dokter puskesmas/klinik, minta tes urine sederhana untuk memastikan tidak ada kebocoran protein.',
    tone: 'sprout',
  },
  high: {
    level: 'Perlu Pemeriksaan Dokter',
    badge: 'bg-coral-100 text-coral-800 dark:bg-coral-400/20 dark:text-coral-300 ring-coral-300/60',
    title: 'Sebaiknya lakukan pemeriksaan fungsi ginjal ke dokter.',
    desc: 'Kombinasi faktor risiko tinggi atau gejala fisik (seperti busa urine/bengkak) menandakan ginjalmu mungkin sedang bekerja terlalu keras atau mulai mengalami penurunan fungsi.',
    action: 'Jangan panik. Datanglah ke faskes 1 (Puskesmas/Klinik BPJS). Mintalah skrining: tes urine rutin (cek albumin/proteinuria) dan tes darah kreatinin (eGFR). Mengetahui lebih awal menyelamatkan ginjalmu!',
    tone: 'coral',
  },
}

/** 5 Stadium Penyakit Ginjal Kronis (PGK) */
export const CKD_STAGES = [
  {
    stage: 'Stadium 1',
    egfr: '> 90%',
    status: 'Fungsi Normal dengan Kerusakan Ringan',
    dialysisNeeded: false,
    tone: 'leaf',
    desc: 'Ginjal masih menyaring dengan sangat baik, namun ada tanda kebocoran protein halus di urine atau kelainan bentuk ginjal.',
    target: 'Jaga tensi < 130/80 mmHg, kontrol gula darah, perbanyak air putih, hindari obat antinyeri.',
  },
  {
    stage: 'Stadium 2',
    egfr: '60–89%',
    status: 'Penurunan Fungsi Ringan',
    dialysisNeeded: false,
    tone: 'leaf',
    desc: 'Penyaringan sedikit melambat. Biasanya tubuh masih merasa 100% sehat tanpa ada keluhan fisik apa pun.',
    target: 'Evaluasi obat rutin bersama dokter, batasi konsumsi natrium/garam, pertahankan berat badan ideal.',
  },
  {
    stage: 'Stadium 3a & 3b',
    egfr: '30–59%',
    status: 'Penurunan Sedang (Fase Kunci Pencegahan)',
    dialysisNeeded: false,
    tone: 'sprout',
    desc: 'Kadar limbah darah mulai meningkat sedikit. INI FASE PALING KRUSIAL: jika dijaga dengan disiplin ketat, pasien bisa hidup puluhan tahun di stadium ini TANPA PERNAH BUTUH CUCI DARAH!',
    target: 'Konsultasi dokter spesialis penyakit dalam / nefrolog. Atur diet protein terukur, obati anemia dan tensi secara teratur.',
  },
  {
    stage: 'Stadium 4',
    egfr: '15–29%',
    status: 'Penurunan Berat',
    dialysisNeeded: false,
    tone: 'tide',
    desc: 'Fungsi penyaringan tinggal sedikit. Gejala seperti cepat lelah, mual ringan, atau bengkak mulai muncul. Dokter mulai merencanakan proteksi sisa nefron.',
    target: 'Diet ketat kalium dan fosfat, persiapan akses dialisis (misalnya membuat cimino lebih awal agar siap saat darurat) untuk mengantisipasi masa depan.',
  },
  {
    stage: 'Stadium 5',
    egfr: '< 15%',
    status: 'Gagal Ginjal Terminal (End-Stage)',
    dialysisNeeded: true,
    tone: 'coral',
    desc: 'Ginjal sudah tidak sanggup membuang racun dan air secara mandiri. Di titik inilah terapi pengganti ginjal (hemodialisis, CAPD, atau transplantasi ginjal) dimulai untuk menyambung hidup.',
    target: 'Rutin menjalani jadwal dialisis dengan tenang, disiplin pembatasan cairan, konsumsi obat pengikat fosfat dan penambah sel darah merah.',
  },
]

/** 5 Zat dan Kebiasaan Perusak Ginjal (Daftar Merah) */
export const KIDNEY_TOXINS = [
  {
    id: 'nsaid',
    icon: Pill,
    tone: 'coral',
    title: 'Obat Antinyeri Bebas (NSAID)',
    subtitle: 'Asam mefenamat, Ibuprofen, Piroxicam, Natrium Diklofenak',
    danger:
      'NSAID memblokir enzim prostaglandin yang bertugas melebarkan pembuluh darah ginjal. Akibatnya, aliran darah ke filter ginjal turun drastis. Minum obat ini rutin setiap pusing/pegal adalah salah satu pemicu gagal ginjal akut tersering di Indonesia.',
    solution:
      'Gunakan parasetamol untuk nyeri ringan biasa (sesuai dosis), atau selalu konsultasikan ke dokter sebelum minum pereda nyeri.',
  },
  {
    id: 'jamu-bko',
    icon: Ban,
    tone: 'coral',
    title: 'Jamu Pegal Linu Tradisional Ilegal (BKO)',
    subtitle: 'Jamu serbuk/sachet tanpa izin BPOM resmi',
    danger:
      'Banyak jamu pegal linu curah yang secara ilegal dicampur Bahan Kimia Obat (BKO) seperti deksametason, fenilbutazon, dan parasetamol dosis tinggi. Efek "langsung cespleng enteng" itu menipu; dalam beberapa bulan, ginjal dan lambung bisa rusak permanen.',
    solution:
      'Pastikan jamu memiliki nomor registrasi resmi BPOM (bukan nomor fiktif), atau hindari jamu kemasan yang menjanjikan sembuh instan dari pegal linu.',
  },
  {
    id: 'garam',
    icon: AlertTriangle,
    tone: 'tide',
    title: 'Garam & Natrium Tersembunyi',
    subtitle: 'Micin, saus botolan, mie instan, makanan kaleng, keripik',
    danger:
      'Natrium mengikat air dan menyempitkan pembuluh darah halus di glomerulus ginjal. Tekanan darah tinggi merusak saringan ginjal seperti selang pemadam kebakaran yang merusak kain kasa tipis.',
    solution:
      'Batasi garam maksimal 1 sendok teh (5 gram garam / 2000 mg natrium) per hari untuk orang sehat, atau 1/2 sendok teh bagi yang sudah punya hipertensi.',
  },
  {
    id: 'minuman-manis',
    icon: Droplets,
    tone: 'sprout',
    title: 'Minuman Kemasan Berpemanis & Soda',
    subtitle: 'Boba, teh manis kemasan, minuman berenergi, soda gelap',
    danger:
      'Fruktosa tinggi memicu pembentukan asam urat berlebih yang mengkristal di tubulus ginjal, serta mempercepat resistensi insulin (diabetes melitus tipe 2—penyebab gagal ginjal nomor 1 di dunia).',
    solution:
      'Jadikan air putih sebagai minuman utama. Minuman manis cukup dinikmati sesekali sebagai hadiah, bukan pengganti air minum harian.',
  },
  {
    id: 'tahan-kemih',
    icon: ShieldCheck,
    tone: 'leaf',
    title: 'Kebiasaan Menahan Buang Air Kecil',
    subtitle: 'Infeksi saluran kemih (ISK) yang tidak diobati tuntas',
    danger:
      'Air seni yang tertahan di kandung kemih menjadi sarang bakteri berkembang biak. Infeksi bisa merambat naik ke ginjal (pielonefritis), meninggalkan jaringan parut yang merusak nefron selamanya.',
    solution:
      'Jangan menahan kencing saat sudah terasa. Segera periksakan diri ke dokter jika kencing terasa perih, panas, atau sering anyang-anyangan.',
  },
]

/** 8 Langkah Emas Perlindungan Ginjal (World Kidney Day) */
export const GOLDEN_RULES = [
  { icon: Activity, title: 'Aktif bergerak', desc: 'Jalan cepat, bersepeda, atau senam 30 menit sehari menjaga kelancaran sirkulasi darah.' },
  { icon: Heart, title: 'Pantau tekanan darah', desc: 'Jaga tensi di kisaran ideal (< 120/80 atau maksimal < 130/80 mmHg).' },
  { icon: Apple, title: 'Pola makan seimbang', desc: 'Banyak sayur, kurangi garam, batasi gorengan dan daging olahan tinggi pengawet.' },
  { icon: Droplets, title: 'Cukupi air putih sehat', desc: 'Bagi ginjal yang sehat: minum 1,5–2 liter air putih sehari membersihkan racun urin.' },
  { icon: TestTube, title: 'Kontrol gula darah', desc: 'Cek gula darah puasa berkala jika usia > 35 tahun atau memiliki berat badan berlebih.' },
  { icon: Ban, title: 'Jangan merokok', desc: 'Rokok menyempitkan pembuluh darah dan mempercepat pemburukan fungsi ginjal.' },
  { icon: Pill, title: 'Hindari obat antinyeri bebas', desc: 'Jangan jadikan obat antinyeri kebiasaan tanpa indikasi dan resep dokter.' },
  { icon: Stethoscope, title: 'Cek fungsi ginjal berkala', desc: 'Wajib tes urine & darah minimal 1 tahun sekali jika punya hipertensi atau diabetes.' },
]

/** Panduan Cek Lab Sederhana di Puskesmas / Faskes 1 BPJS */
export const LAB_GUIDE = [
  {
    test: 'Tes Urine Rutin (Urinalisis)',
    focus: 'Mencari Proteinuria / Albuminuria',
    why: 'Filter ginjal normalnya menahan protein agar tetap di dalam darah. Jika urine mengandung protein (+1, +2, atau albuminuria), itu alarm paling awal bahwa filter ginjal mulai bocor.',
    sample: 'Air seni pagi hari',
    bpjs: 'Dijamin di FKTP / Puskesmas',
  },
  {
    test: 'Kreatinin Serum & eGFR',
    focus: 'Menghitung Persentase Daya Saring Ginjal',
    why: 'Kreatinin adalah zat sisa metabolisme otot. Nilainya diukur bersama usia dan jenis kelamin untuk menghitung eGFR (persentase fungsi ginjal dari 0 sampai 100%).',
    sample: 'Sampel darah',
    bpjs: 'Bisa dirujuk sesuai indikasi medis dokter',
  },
  {
    test: 'Ureum Darah (BUN)',
    focus: 'Sisa Pemecahan Protein Tubuh',
    why: 'Mengetahui seberapa banyak zat limbah nitrogen yang tertumpuk di dalam aliran darah.',
    sample: 'Sampel darah',
    bpjs: 'Pemeriksaan laboratorium standar',
  },
]
