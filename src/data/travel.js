/**
 * Panduan bepergian (Traveling Dialysis) bagi pasien cuci darah.
 * Membantu pasien tetap bisa mudik, berlibur, atau dinas luar kota dengan aman.
 */

export const TRAVEL_STEPS = [
  {
    step: '1',
    time: '3–4 minggu sebelum berangkat',
    title: 'Cari & hubungi unit dialisis tujuan',
    desc: 'Cari rumah sakit di kota tujuan yang memiliki unit hemodialisis (dan bekerja sama dengan BPJS Kesehatan jika memakai BPJS). Konfirmasi ketersediaan jadwal untuk "pasien tamu" (traveling HD).',
  },
  {
    step: '2',
    time: '1–2 minggu sebelum berangkat',
    title: 'Minta dokumen "Traveling Pack"',
    desc: 'Minta dokter nefrolog di unit asalmu menyiapkan resume medis: protokol HD (tipe dialiser, heparin, target UF, dry weight), hasil lab darah terbaru (wajib ada HBsAg, Anti-HCV, dan HIV terbaru).',
  },
  {
    step: '3',
    time: 'H-5 keberangkatan',
    title: 'Urus administrasi rujukan BPJS',
    desc: 'Jika menggunakan BPJS, urus surat rujukan luar kota atau koordinasi dengan petugas BPJS Care Center 165 agar penjaminan di faskes kota tujuan tidak terkendala.',
  },
  {
    step: '4',
    time: 'Hari keberangkatan',
    title: 'Bawa obat & berkas di tas kabin',
    desc: 'Jangan pernah menaruh obat rutin dan berkas medis di bagasi terdaftar. Selalu bawa di tas jinjing bersama nomor kontak dokter/unit asalmu.',
  },
]

export const TRAVEL_CHECKLIST = [
  {
    id: 't-resume',
    label: 'Resume medis & lembar rekam HD terakhir',
    note: 'Berisi dry weight, resep obat, jenis membran, dan heparin',
  },
  {
    id: 't-lab',
    label: 'Hasil tes infeksi (HBsAg, Anti-HCV, HIV)',
    note: 'Unit tujuan wajib memverifikasi keamanan mesin',
  },
  {
    id: 't-bpjs',
    label: 'Kartu BPJS/KIS & surat rujukan luar kota',
    note: 'Bawa fotokopi dan simpan foto digitalnya di ponsel',
  },
  {
    id: 't-obat',
    label: 'Persediaan obat rutin untuk durasi perjalanan + cadangan 3 hari',
    note: 'Obat tensi, pengikat fosfat, asam folat, dll',
  },
  {
    id: 't-jadwal',
    label: 'Bukti konfirmasi tertulis jadwal di RS tujuan',
    note: 'Nama petugas kontak dan jam kehadiran yang disepakati',
  },
  {
    id: 't-darurat',
    label: 'Daftar nomor kontak darurat (keluarga & perawat unit asal)',
    note: 'Simpan di map medis',
  },
]
