/**
 * Pertanyaan rekomendasi yang sering dan penting ditanyakan ke dokter spesialis nefrologi.
 * Pengguna dapat mengklik untuk langsung menambahkan ke daftar catatan mereka.
 */
export const PRESET_QUESTIONS = [
  {
    id: 'dry-weight',
    category: 'Cairan & Berat',
    text: 'Berapa target berat badan kering (dry weight) saya saat ini?',
  },
  {
    id: 'fluid-limit',
    category: 'Cairan & Berat',
    text: 'Berapa mililiter batas maksimal asupan cairan harian saya?',
  },
  {
    id: 'lab-schedule',
    category: 'Hasil Lab',
    text: 'Kapan jadwal pemeriksaan lab rutin (Hb, Kalium, Fosfat, Ureum) berikutnya?',
  },
  {
    id: 'phosphate-binder',
    category: 'Obat',
    text: 'Bagaimana aturan minum obat pengikat fosfat saya: bersama suapan makan atau sesudahnya?',
  },
  {
    id: 'fistula-check',
    category: 'Akses Dialisis',
    text: 'Apakah desiran (thrill/bruit) pada akses cimino/fistula saya masih normal?',
  },
  {
    id: 'anemia-epo',
    category: 'Kondisi Fisik',
    text: 'Apakah kadar hemoglobin (Hb) saya memerlukan tambahan suntikan eritropoietin (EPO)?',
  },
]
