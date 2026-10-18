/**
 * Basis pengetahuan medis & percakapan untuk SahabatAI.
 * Disusun dengan bahasa Indonesia yang hangat, empatik, mudah dipahami lansia,
 * dan berpedoman pada kaidah nefrologi (Pernefri, KDIGO, BPJS Kesehatan).
 */

export const SUGGESTED_QUESTIONS = [
  {
    id: 'pisang',
    icon: '🍌',
    label: 'Boleh makan pisang / alpukat?',
    query: 'Apakah pasien cuci darah boleh makan pisang, alpukat, atau kurma?',
  },
  {
    id: 'haus',
    icon: '🧊',
    label: 'Tips menahan rasa haus',
    query: 'Bagaimana cara menahan rasa haus saat kuota minum tinggal sedikit?',
  },
  {
    id: 'cimino',
    icon: '🩹',
    label: 'Cara merawat lengan Cimino',
    query: 'Bagaimana cara merawat akses Cimino (AV Fistula) agar tidak bengkak atau tersumbat?',
  },
  {
    id: 'bahaya',
    icon: '🚨',
    label: 'Tanda bahaya harus ke IGD',
    query: 'Apa saja tanda bahaya penumpukan cairan yang mengharuskan segera ke IGD?',
  },
  {
    id: 'bpjs',
    icon: '📋',
    label: 'Apakah cuci darah gratis BPJS?',
    query: 'Apakah cuci darah ditanggung 100% oleh BPJS Kesehatan?',
  },
  {
    id: 'hd-vs-capd',
    icon: '🫀',
    label: 'Beda HD mesin vs CAPD perut',
    query: 'Apa perbedaan utama cuci darah mesin (HD) dengan cuci darah lewat perut (CAPD)?',
  },
  {
    id: 'fosfat',
    icon: '💊',
    label: 'Aturan minum obat pengikat fosfat',
    query: 'Kapan waktu yang tepat minum obat pengikat fosfat seperti kalsium karbonat?',
  },
  {
    id: 'stadium',
    icon: '📊',
    label: 'Arti eGFR & Stadium Ginjal',
    query: 'Apa arti hasil lab eGFR dan apakah stadium 3 sudah harus cuci darah?',
  },
]

export const KNOWLEDGE_BASE = [
  {
    id: 'emergency-breathless',
    keywords: [
      'sesak',
      'napas',
      'sesak napas',
      'megap',
      'sulit tidur terlentang',
      'edema paru',
      'paru basah',
      'bengkak seluruh tubuh',
      'bengkak mata',
      'dada sakit',
      'nyeri dada',
    ],
    isEmergency: true,
    title: 'Peringatan Darurat: Gejala Penumpukan Cairan Berlebih',
    response: `⚠️ **PERINGATAN MEDIS PENTING:**

Jika Anda atau keluarga mengalami **sesak napas saat berbaring lurus**, dada terasa ditekan, atau napas tersengal-sengal, ini adalah tanda **kelebihan cairan (edema paru)** yang TIDAK BISA ditunggu hingga jadwal cuci darah berikutnya.

**Langkah yang harus segera dilakukan sekarang:**
1. **Dudukkan pasien dengan posisi tegak** (posisi duduk sandar 90° atau posisi semi-fowler), jangan biarkan berbaring telentang.
2. **Batasi minum sama sekali** saat ini.
3. **Segera bawa ke IGD Rumah Sakit terdekat** yang memiliki fasilitas Hemodialisis Darurat (Cito HD).
4. Beritahukan perawat IGD: *"Pasien gagal ginjal rutin HD, mengalami sesak napas karena kelebihan cairan."*

📞 **Nomor Darurat Nasional:** Telepon **119** (Ambulans Kemenkes) atau hubungi nomor darurat rumah sakit tempat biasa cuci darah.`,
  },
  {
    id: 'emergency-cimino-bleed',
    keywords: [
      'cimino berdarah',
      'darah merembes',
      'cimino bocor',
      'bekas jarum berdarah',
      'cdl berdarah',
      'kateter lepas',
    ],
    isEmergency: true,
    title: 'Peringatan Darurat: Perdarahan Akses Vaskular',
    response: `🚨 **PENANGANAN CEPAT PERDARAHAN CIMINO / CDL:**

1. **Tekan titik perdarahan langsung** menggunakan kassa steril atau kain bersih yang tebal selama 15–20 menit tanpa henti (gunakan 2 jari). Jangan menekan terlalu keras hingga denyutan hilang sama sekali, tekan secukupnya sampai rembesan darah berhenti.
2. **Posisikan lengan lebih tinggi dari dada** (sangga dengan bantal).
3. **Jangan ikat dengan karet atau tali tourniquet** karena bisa merusak pembuluh darah fistula secara permanen.
4. Jika dalam 20 menit darah masih terus memancar atau mengalir deras, **segera ke IGD Rumah Sakit terdekat**.`,
  },
  {
    id: 'food-potassium',
    keywords: [
      'pisang',
      'alpukat',
      'kurma',
      'air kelapa',
      'kelapa muda',
      'kalium',
      'potasium',
      'durian',
      'nangka',
      'daun singkong',
      'bayam',
      'kentang',
      'tomat',
      'buah untuk ginjal',
    ],
    title: 'Panduan Makanan & Kalium untuk Ginjal',
    response: `🍌 **Mengenai Buah & Makanan Tinggi Kalium:**

Bagi pasien yang menjalani cuci darah (HD) maupun gangguan ginjal stadium lanjut, ginjal sudah tidak mampu membuang kelebihan kalium lewat urine. Kalium yang menumpuk di darah (**hiperkalemia >5.5 mEq/L**) sangat berbahaya karena bisa memicu irama jantung terganggu mendadak.

**Makanan yang perlu SANGAT DIBATASI / DIHINDARI:**
• **Buah:** Pisang, alpukat, air kelapa muda (sangat tinggi kalium!), kurma, durian, nangka, dan buah naga.
• **Sayur:** Daun singkong, bayam, daun melinjo, dan kentang.

**Buah yang relatif LEBIH AMAN (porsi sedang):**
• Apel (1 buah kecil/sedang)
• Pir manis
• Pepaya (1 potong kecil)
• Nanas (1–2 potong)
• Semangka (maksimal 1 potong kecil karena tinggi kadar air)

💡 **Tips Dapur Pintar:**
Untuk sayuran, gunakan **teknik perebusan ganda (*double boiling*)**: potong sayur kecil-kecil, rendam air hangat 2 jam, rebus lalu **buang air rebusannya**, baru dimasak. Cara ini menurunkan kadar kalium sayuran hingga 40–50%!`,
  },
  {
    id: 'food-phosphate',
    keywords: [
      'fosfat',
      'fosfor',
      'susu',
      'keju',
      'kuning telur',
      'telur',
      'jeroan',
      'kacang',
      'minuman bersoda',
      'cola',
      'gatal',
      'kulit gatal',
      'tulang linu',
      'pengikat fosfat',
      'calcium carbonate',
      'kalsium karbonat',
      'renvela',
      'sevelamer',
    ],
    title: 'Panduan Fosfat & Waktu Tepat Minum Obat Pengikat Fosfat',
    response: `🧀 **Fosfat Tinggi & Aturan Minum Obat Pengikat:**

Fosfat yang menumpuk dalam darah akan menarik kalsium dari tulang, menyebabkan **tulang keropos, linu sendi, serta rasa gatal hebat di kulit yang tidak mempan dengan bedak biasa**.

**Sumber Fosfat Tinggi yang Wajib Dibatasi:**
• Minuman bersoda warna gelap (mengandung asam fosfat anorganik yang terserap tubuh 100%)
• Susu sapi, keju, yoghurt, dan es krim
• Kuning telur (Pasien HD dianjurkan makan **putih telur saja**, putih telur tinggi protein hewani tapi sangat rendah fosfat!)
• Jeroan sapi/ayam, kornet, sosis, dan ikan asin olahan.

💊 **KUNCI PENTING: Cara Minum Obat Pengikat Fosfat (*Phosphate Binder*):**
Banyak pasien salah waktu minum obat seperti *Kalsium Karbonat (CaCO3)* atau *Renvela*.
• **Waktu yang benar:** Diminum/dikunyah **BERSAMAAN SUAPAN PERTAMA MAKANAN** atau di tengah makan!
• Jika diminum saat perut kosong atau berjam-jam setelah makan, obat ini TIDAK AKAN mengikat fosfat makanan, melainkan hanya terserap sebagai kalsium biasa.`,
  },
  {
    id: 'fluid-thirst',
    keywords: [
      'haus',
      'tips haus',
      'cara tahan haus',
      'kuota minum',
      'takaran air',
      'minum air',
      'cara minum',
      'kering tenggorokan',
      'bibir kering',
      'cairan',
    ],
    title: 'Tips Cerdas Menahan Haus Tanpa Melebihi Kuota Minum',
    response: `🧊 **5 Trik Praktis Redakan Haus bagi Pasien Ginjal:**

Membatasi cairan memang perjuangan harian paling berat bagi pejuang dialisis. Berikut rahasia yang biasa dipraktikkan pasien berpengalaman:

1. **Gunakan Es Batu Mini:** Kulum es batu kecil di dalam mulut perlahan. Es batu bertahan lebih lama menyegarkan tenggorokan daripada air biasa, namun volume airnya sebenarnya sangat sedikit (1 cetakan es kecil hanya sekitar 10–15 ml).
2. **Botol Spray Mulut:** Masukkan air dingin steril ke dalam botol semprotan kecil berpipa. Semprotkan 2–3 semprot ke rongga mulut dan tenggorokan saat kering tanpa harus menelan bergelas-gelas.
3. **Kumur Air Dingin & Buang:** Berkumurlah dengan air es beberapa detik untuk merangsang kelenjar ludah, lalu buang (jangan ditelan).
4. **Permen Asam / Irisan Jeruk Nipis:** Menghisap irisan tipis lemon atau permen mint bebas gula merangsang produksi air liur alami sehingga mulut tidak kering.
5. **Kurangi Makanan Asin & Gurih:** Garam dan MSG adalah biang kerok rasa haus tak tertahankan. Kurangi kerupuk, keripik, bumbu instan, dan kuah sayur berlebih.`,
  },
  {
    id: 'vascular-cimino',
    keywords: [
      'cimino',
      'av fistula',
      'fistula',
      'cdl',
      'kateter leher',
      'getaran cimino',
      'thrill',
      'bruit',
      'lengan bengkak',
      'merawat cimino',
      'lengan cuci darah',
    ],
    title: 'Panduan Merawat Akses Cimino (AV Fistula)',
    response: `🩹 **Menjaga Akses Cimino (Jalur Hidup Pejuang HD):**

Cimino adalah pembuluh darah vena yang disambung ke arteri untuk akses jarum dialisis. Pembuluh darah ini sangat berharga dan harus dijaga seumur hidup.

**3 Aturan Emas Menjaga Cimino:**
1. **Cek Getaran Setiap Pagi:** Tempelkan jari Anda ke area benjolan cimino. Anda harus merasakan getaran seperti dengkuran kucing (*thrill*). Jika getaran mendadak hilang atau melemah, **segera ke RS hari itu juga** sebelum terjadi sumbatan bekuan darah.
2. **Pantangan Mutlak pada Lengan Cimino:**
   • DILARANG pasang manset tensimeter di lengan ini.
   • DILARANG mengambil sampel darah atau diinfus di lengan ini.
   • DILARANG membawa barang belanjaan berat (>3 kg) atau menindihnya saat tidur.
   • DILARANG mengenakan jam tangan, gelang, atau pakaian dengan lengan ketat.
3. **Penanganan Pasca Jarum Dicabut:**
   • Jika bengkak/kebiruan baru terjadi dalam 24 jam pertama: **Kompres dingin (es batu dibungkus kain)** selama 10–15 menit.
   • Setelah 24 jam (hari berikutnya): Ganti dengan **kompres air hangat suam-suam kuku** dan oleskan salep heparin/tromboflas tipis-tipis atas anjuran perawat.`,
  },
  {
    id: 'dialysis-comparison',
    keywords: [
      'beda hd dan capd',
      'hd atau capd',
      'cuci darah mesin',
      'cuci darah perut',
      'continuous ambulatory',
      'kelebihan capd',
      'pilih mana',
    ],
    title: 'Perbandingan Hemodialisis (HD) vs CAPD (Perut)',
    response: `🫀 **Perbedaan Utama Hemodialisis (HD) vs CAPD:**

Keduanya sama-sama efektif membersihkan racun darah, namun memiliki gaya hidup yang sangat berbeda:

**1. Hemodialisis (HD / Mesin):**
• Dilakukan di Rumah Sakit atau Klinik HD oleh perawat.
• Rutinitas: 2 sampai 3 kali seminggu, masing-masing 4–5 jam per sesi.
• Akses: Menggunakan Cimino (lengan) atau CDL (kateter leher).
• *Kelebihan:* Semua proses ditangani tenaga medis, di hari bebas tidak perlu repot alat.
• *Tantangan:* Batasan cairan dan makanan lebih ketat di hari antar-sesi.

**2. CAPD (Peritoneal Dialysis / Lewat Perut):**
• Dilakukan sendiri di rumah atau di tempat kerja secara mandiri.
• Rutinitas: Ganti kantung cairan 4 kali sehari (pagi, siang, sore, malam), tiap ganti butuh waktu ~30 menit.
• Akses: Selang lembut kecil permanen di dinding perut (kateter Tenckhoff).
• *Kelebihan:* Tidak perlu sering ke RS, pembatasan minum & makanan jauh lebih fleksibel, tensi lebih stabil, bisa tetap bekerja aktif.
• *Tantangan:* Membutuhkan ruangan bersih dan kedisiplinan cuci tangan steril untuk mencegah infeksi selaput perut (peritonitis).`,
  },
  {
    id: 'bpjs-cost',
    keywords: [
      'bpjs',
      'biaya',
      'apakah bayar',
      'gratis',
      'tanggungan bpjs',
      'tarif cuci darah',
      'rujukan',
      'faskes 1',
      'biaya cuci darah',
    ],
    title: 'Pembiayaan Cuci Darah dengan BPJS Kesehatan',
    response: `📋 **Ketentuan Penjaminan BPJS Kesehatan untuk Dialisis:**

Kabar baik dan menenangkan: **Tindakan cuci darah (Hemodialisis rutin maupun CAPD) ditanggung 100% oleh BPJS Kesehatan** tanpa biaya tambahan di Rumah Sakit atau Klinik HD yang bermitra.

**Apa saja yang ditanggung BPJS?**
• Biaya sesi mesin HD (2x seminggu, atau 3x atas indikasi medis spesialis).
• Obat-obatan rutin hemodialisis (eritropoietin/EPO penambah darah, suplemen besi, antihipertensi, dll).
• Pemasangan akses Cimino (AV Fistula) oleh Dokter Bedah Vaskular.
• Kantung cairan CAPD yang dikirim rutin ke rumah pasien.
• Cek laboratorium berkala (Ureum, Kreatinin, Hb, Elektrolit rutin).

**Alur Rujukan yang Benar:**
1. Minta rujukan dari Faskes 1 (Puskesmas atau Klinik BPJS terdaftar).
2. Konsultasi ke Dokter Spesialis Penyakit Dalam (Sp.PD) / Konsultan Ginjal Hipertensi (KGH) di RS rujukan.
3. Rujukan dialisis saat ini memiliki masa berlaku khusus yang dapat diperpanjang otomatis di sistem BPJS selama pasien menjalani terapi rutin.`,
  },
  {
    id: 'kidney-stages-egfr',
    keywords: [
      'egfr',
      'kreatinin',
      'stadium',
      'stadium 1',
      'stadium 2',
      'stadium 3',
      'stadium 4',
      'stadium 5',
      'gagal ginjal akut',
      'penyakit ginjal kronis',
      'fungsi ginjal persen',
    ],
    title: 'Memahami Nilai eGFR & 5 Stadium Ginjal',
    response: `📊 **Penjelasan 5 Stadium Penyakit Ginjal Kronis (PGK):**

eGFR (*estimated Glomerular Filtration Rate*) menunjukkan perkiraan persentase kemampuan ginjal menyaring darah:

• **Stadium 1 (eGFR ≥ 90):** Fungsi normal, namun ada tanda kerusakan (misal: ada protein/darah di urine).
• **Stadium 2 (eGFR 60–89):** Penurunan fungsi ringan. Ginjal masih bekerja sangat baik, fokus kendalikan tensi & gula darah.
• **Stadium 3a & 3b (eGFR 30–59):** Penurunan sedang. **PENTING: Stadium 3 BELUM butuh cuci darah!** Dengan pola makan rendah garam, kontrol tensi, dan obat yang tepat dari dokter, kondisi ini bisa stabil hingga puluhan tahun.
• **Stadium 4 (eGFR 15–29):** Penurunan berat. Edukasi persiapan dan pemilihan terapi pengganti ginjal dimulai dengan tenang.
• **Stadium 5 (eGFR < 15):** Gagal ginjal tahap akhir (*End-Stage Renal Disease*). Dialisis (HD/CAPD) atau transplantasi ginjal dipertimbangkan jika muncul gejala uremik (mual hebat, sesak napas, bengkak).`,
  },
  {
    id: 'emotional-support',
    keywords: [
      'takut',
      'cemas',
      'lelah',
      'capek',
      'bosan',
      'putus asa',
      'menangis',
      'stres',
      'depresi',
      'kenapa saya',
      'takut jarum',
      'jenuh cuci darah',
    ],
    title: 'Ruang Empati: Saat Hati Terasa Berat',
    response: `💚 **Peluk Hangat untuk Anda...**

Wajar sekali jika Anda merasa lelah, sedih, atau bahkan marah. Menjalani rutinitas cuci darah atau mendampingi orang tua yang sakit memang bukan perjalanan yang mudah. 

Perasaan jenuh itu sangat manusiawi. Ingatlah hal-hal ini saat hari terasa berat:
1. **Cuci darah bukan vonis akhir**, melainkan jembatan teknologi yang menggantikan tugas ginjal agar Anda tetap bisa melihat anak cucu tumbuh, tertawa bersama keluarga, dan menikmati hari-hari berharga.
2. **Ambil satu hari pada satu waktu (*one day at a time*).** Anda tidak perlu memikirkan 5 tahun ke depan hari ini. Cukup fokus pada satu langkah kecil hari ini: istirahat yang cukup, bersyukur untuk satu hembusan napas yang lega.
3. Anda tidak sendirian. Ada ratusan ribu pejuang ginjal di Indonesia yang saling menguatkan.

💡 *Coba buka bagian **"Ruang Tenang"** di situs ini untuk latihan pernapasan terpandu dan mendengarkan suara alam yang menenangkan pikiran.*`,
  },
  {
    id: 'exercise-activity',
    keywords: [
      'olahraga',
      'jalan kaki',
      'kegiatan',
      'bekerja',
      'apakah boleh kerja',
      'aktivitas fisik',
      'naik tangga',
    ],
    title: 'Aktivitas Fisik & Olahraga Ramah Ginjal',
    response: `🚶 **Bolehkah Pasien Cuci Darah Berolahraga & Bekerja?**

**Tentu saja boleh dan SANGAT DIANJURKAN!** Menjalani cuci darah bukan berarti harus berbaring di tempat tidur sepanjang hari.

• **Olahraga yang aman:**
  - Jalan santai 15–30 menit di pagi atau sore hari saat cuaca sejuk.
  - Senam peregangan ringan di rumah.
  - Latihan meremas bola karet dengan tangan Cimino untuk memperkuat aliran darah fistula (lakukan hanya pada hari bebas HD).
• **Kapan waktu terbaik olahraga?**
  - Pada hari bebas (hari di mana Anda tidak menjalani jadwal cuci darah).
  - Hindari olahraga berat tepat setelah jarum HD dicabut untuk mencegah perdarahan.
• **Bekerja & Beraktivitas:** Banyak pasien HD dan CAPD tetap aktif bekerja di kantor, berwirausaha, atau mengajar. Kuncinya adalah istirahat cukup dan tidak memaksakan diri jika merasa lemas.`,
  },
]

/**
 * Mencari jawaban terbaik berdasarkan input kata kunci pengguna.
 * Jika tidak ditemukan kecocokan spesifik, memberikan jawaban penenang dan mengarahkan ke topik populer.
 */
export function getOfflineAnswer(query) {
  if (!query || typeof query !== 'string') {
    return {
      text: 'Halo! Ada yang bisa SahabatAI bantu jelaskan mengenai kesehatan ginjal, nutrisi, atau panduan cuci darah hari ini?',
      isEmergency: false,
    }
  }

  const cleanQuery = query.toLowerCase().trim()

  // 1. Cek kondisi darurat terlebih dahulu
  for (const item of KNOWLEDGE_BASE) {
    if (item.isEmergency) {
      const match = item.keywords.some((kw) => cleanQuery.includes(kw))
      if (match) {
        return {
          title: item.title,
          text: item.response,
          isEmergency: true,
        }
      }
    }
  }

  // 2. Cek kecocokan kata kunci reguler
  let bestMatch = null
  let maxScore = 0

  for (const item of KNOWLEDGE_BASE) {
    let score = 0
    for (const kw of item.keywords) {
      if (cleanQuery.includes(kw)) {
        score += kw.length // Skor lebih tinggi untuk frasa kata yang lebih panjang & spesifik
      }
    }
    if (score > maxScore) {
      maxScore = score
      bestMatch = item
    }
  }

  if (bestMatch && maxScore > 0) {
    return {
      title: bestMatch.title,
      text: bestMatch.response,
      isEmergency: false,
    }
  }

  // 3. Fallback response jika topik belum dikenali
  return {
    title: 'Pertanyaan Bagus!',
    text: `Terima kasih atas pertanyaannya. 

Untuk pertanyaan spesifik: *" ${query} "*, saya sarankan untuk mendiskusikannya langsung dengan Dokter Spesialis Penyakit Dalam (Sp.PD) atau Perawat Hemodialisis Anda, karena kondisi medis setiap pejuang ginjal bersifat unik.

Namun, Anda juga bisa menanyakan topik populer berikut kepada saya:
• **Nutrisi & Pantangan:** Kalium pisang, fosfat susu, garam, atau protein.
• **Manajemen Cairan:** Tips menahan haus & takaran minum.
• **Akses Vaskular:** Cara merawat Cimino & kateter leher (CDL).
• **Biaya:** Ketentuan penjaminan BPJS Kesehatan 100%.
• **Perbedaan Terapi:** Cuci darah mesin (HD) vs Cuci darah mandiri (CAPD).

Silakan ketik pertanyaan lain atau tekan salah satu tombol cepat di bawah! ✨`,
    isEmergency: false,
  }
}

/**
 * Panggilan ke Google Gemini API (mendukung model terkini dengan fallback otomatis).
 */
export async function callGeminiApi(apiKey, userPrompt, history = []) {
  const activeKey = (apiKey || (typeof import.meta !== 'undefined' && import.meta.env?.VITE_GEMINI_API_KEY) || '').trim()

  if (!activeKey) {
    throw new Error('API key tidak ditemukan.')
  }

  const systemInstruction = `Kamu adalah "SahabatAI", asisten digital ramah, hangat, dan empatik dari platform kesehatan "SahabatGinjal" di Indonesia.
Audiensmu adalah pasien gagal ginjal kronis (CKD), pasien yang sedang menjalani cuci darah (Hemodialisis rutin atau CAPD), serta keluarga/pendamping pasien (seringkali lansia).

Prinsip komunikasimu:
1. Bersikap ramah, santun, dan langsung ke inti (to the point).
2. Jawaban harus RINGKAS dan PADAT (cukup 1–2 paragraf pendek atau maksimal 3 poin penting). Hindari basa-basi dan penjelasan bertele-tele.
3. Gunakan bahasa yang mudah dipahami orang awam dan lansia.
4. Utamakan keselamatan: jika ada keluhan darurat (sesak napas berat, nyeri dada, perdarahan akses cimino), langsung ingatkan ke IGD / 119 secara tegas dan singkat.`

  // Siapkan riwayat chat
  const contents = [
    {
      role: 'user',
      parts: [{ text: systemInstruction }],
    },
    {
      role: 'model',
      parts: [{ text: 'Mengerti. Saya siap bertindak sebagai SahabatAI yang ramah, empatik, dan berhati-hati dalam memberikan panduan edukasi ginjal.' }],
    },
  ]

  // Tambahkan beberapa riwayat terakhir
  history.slice(-4).forEach((msg) => {
    contents.push({
      role: msg.sender === 'user' ? 'user' : 'model',
      parts: [{ text: msg.text }],
    })
  })

  // Tambahkan prompt terkini
  contents.push({
    role: 'user',
    parts: [{ text: userPrompt }],
  })

  const payload = {
    contents,
    generationConfig: {
      temperature: 0.7,
      maxOutputTokens: 800,
    },
  }

  // Model-model Gemini yang dicoba berurutan jika terjadi ketidaktersediaan versi
  const CANDIDATE_MODELS = [
    'gemini-3.5-flash-lite',
    'gemini-3.8-flash',
    'gemini-2.5-flash-lite',
    'gemini-1.5-flash',
  ]

  let lastError = null

  for (const model of CANDIDATE_MODELS) {
    try {
      const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${activeKey}`
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (response.ok) {
        const data = await response.json()
        const candidate = data.candidates?.[0]
        const replyText = candidate?.content?.parts?.[0]?.text
        if (replyText) {
          return replyText
        }
      } else {
        const errJson = await response.json().catch(() => ({}))
        lastError = errJson?.error?.message || `HTTP ${response.status}`
        // Jika model 404 (tidak ditemukan), lanjutkan ke model berikutnya
        if (response.status === 404) {
          continue
        }
        // Jika error autentikasi (400/403 Invalid API Key), jangan lanjutkan loop
        if (response.status === 400 || response.status === 403) {
          throw new Error(lastError)
        }
      }
    } catch (err) {
      lastError = err.message
      if (err.message && (err.message.includes('API key') || err.message.includes('API_KEY'))) {
        throw err
      }
    }
  }

  throw new Error(lastError || 'Gagal menghubungi Gemini API.')
}
