import { CalendarDays, Clock, ShieldCheck } from 'lucide-react'

export const HERO_STATS = [
  { icon: Clock, value: '4–5 jam', label: 'lama satu sesi hemodialisis' },
  { icon: CalendarDays, value: '2–3×', label: 'seminggu, bukan setiap hari' },
  { icon: ShieldCheck, value: 'BPJS', label: 'menjamin HD maupun CAPD' },
]

export const MARQUEE_PHRASES = [
  'kamu bukan sekadar angka di rekam medis',
  'takut itu wajar',
  'masih boleh punya rencana',
  'hari buruk bukan seumur hidup',
  'pelan-pelan juga termasuk berjalan',
  'minta tolong itu berani',
]

export const SOURCES = [
  { label: 'Kementerian Kesehatan RI', href: 'https://kemkes.go.id' },
  { label: 'BPJS Kesehatan', href: 'https://bpjs-kesehatan.go.id' },
  {
    label: 'NIDDK (NIH): Kidney Disease',
    href: 'https://www.niddk.nih.gov/health-information/kidney-disease',
  },
]
