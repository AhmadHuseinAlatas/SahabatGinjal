import { Bus, FileText, MapPin, Users } from 'lucide-react'

export const COST_STEPS = [
  'Pastikan kepesertaan BPJS Kesehatan aktif dan iuran tidak menunggak.',
  'Mulai dari FKTP (puskesmas atau klinik faskes 1) untuk mendapatkan rujukan.',
  'Bawa rujukan ke rumah sakit yang memiliki unit dialisis dan bekerja sama dengan BPJS.',
  'Setelah program dialisis berjalan, rujukan perlu diperbarui berkala. Tanyakan polanya ke petugas unit agar tidak terputus.',
  'Siapkan dana kecil untuk hal di luar tanggungan: transportasi rutin, sebagian suplemen, kebutuhan pribadi.',
]

export const COST_EXTRAS = [
  {
    id: 'transportasi',
    icon: Bus,
    title: 'Transportasi',
    body: 'Dua sampai tiga perjalanan per minggu cepat menumpuk. Cari teman satu jadwal untuk berbagi kendaraan.',
  },
  {
    id: 'pendamping',
    icon: Users,
    title: 'Pendamping',
    body: 'Sesi-sesi awal sebaiknya ditemani. Setelah terbiasa, banyak yang berangkat sendiri.',
  },
  {
    id: 'berkas',
    icon: FileText,
    title: 'Berkas',
    body: 'Simpan satu map khusus: kartu, rujukan, hasil lab, daftar obat. Ini menghemat banyak energi.',
  },
  {
    id: 'bepergian',
    icon: MapPin,
    title: 'Bepergian',
    body: 'Kalau harus ke luar kota, hubungi unit dialisis di kota tujuan lebih awal untuk mengatur sesi tamu.',
  },
]
