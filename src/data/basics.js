import { Activity, Droplets, Hourglass, RefreshCw } from 'lucide-react'

/** Kartu "Sebenarnya, apa yang terjadi?". `visual` menambah ilustrasi kecil. */
export const BASICS = [
  {
    id: 'fungsi',
    icon: Droplets,
    tone: 'tide',
    title: 'Ginjal itu tukang cuci tubuhmu',
    body: 'Dua organ sebesar kepalan tangan di kanan-kiri tulang belakangmu ini bekerja tanpa henti: membuang sisa metabolisme dan kelebihan air, mengatur tekanan darah, menjaga keseimbangan mineral, sampai membantu tubuh membuat sel darah merah. Saat fungsinya tinggal sedikit, sisa-sisa itu menumpuk di dalam darah.',
    visual: 'facts',
  },
  {
    id: 'terapi',
    icon: RefreshCw,
    tone: 'leaf',
    title: 'Cuci darah bukan hukuman',
    body: 'Ini terapi pengganti fungsi ginjal. Mesin, atau selaput perutmu sendiri, mengambil alih pekerjaan menyaring. Ia tidak menyembuhkan ginjal, tapi mengembalikan hal yang diam-diam kamu rindukan: tenaga, napas yang lega, kepala yang tidak berat.',
  },
  {
    id: 'penyebab',
    icon: Activity,
    tone: 'coral',
    title: 'Kenapa aku, dan kenapa sekarang?',
    body: 'Penyebab tersering adalah diabetes dan tekanan darah tinggi yang berjalan bertahun-tahun, sering tanpa gejala. Ginjal sangat sabar; keluhan sering baru terasa jelas ketika fungsinya tinggal sekitar 10–15%. Itu sebabnya kabar ini terasa tiba-tiba, padahal prosesnya panjang. Ini bukan karena kamu ceroboh.',
    visual: 'meter',
  },
  {
    id: 'selamanya',
    icon: Hourglass,
    tone: 'sprout',
    title: 'Apakah selamanya?',
    body: 'Jujur saja: pada gagal ginjal tahap akhir, dialisis biasanya berlanjut seumur hidup atau sampai ada transplantasi. Pada gangguan ginjal akut, dialisis bisa bersifat sementara sampai ginjal pulih. Jalurmu ditentukan kondisimu sendiri, jadi bicarakan langsung dengan dokter spesialis ginjal (nefrolog).',
  },
]

export const KIDNEY_FACTS = [
  { value: '100+ liter', label: 'darah disaring setiap hari' },
  { value: '1–2 liter', label: 'sisa dan air dibuang sebagai urine' },
  { value: '24 jam', label: 'bekerja tanpa jeda, bahkan saat kamu tidur' },
]
