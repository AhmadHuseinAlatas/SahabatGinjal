/** Pola napas untuk Ruang Tenang. `scale` = ukuran lingkaran di akhir fase. */
export const BREATH_PATTERNS = [
  {
    id: 'lembut',
    label: 'Lembut 4–6',
    hint: 'Tanpa menahan napas. Lebih nyaman kalau dadamu terasa sesak.',
    phases: [
      { key: 'in', label: 'Tarik napas', seconds: 4, scale: 1 },
      { key: 'out', label: 'Embuskan pelan', seconds: 6, scale: 0.6 },
    ],
  },
  {
    id: '478',
    label: '4-7-8',
    hint: 'Tarik 4, tahan 7, embuskan 8. Sering dipakai menjelang tidur.',
    phases: [
      { key: 'in', label: 'Tarik napas', seconds: 4, scale: 1 },
      { key: 'hold', label: 'Tahan', seconds: 7, scale: 1 },
      { key: 'out', label: 'Embuskan', seconds: 8, scale: 0.6 },
    ],
  },
]

export const AFFIRMATIONS = [
  'Hari ini kamu tidak harus kuat. Cukup hadir.',
  'Tubuhmu sedang berusaha keras. Kamu juga.',
  'Satu sesi pada satu waktu. Satu hari pada satu waktu.',
  'Menangis bukan kemunduran. Itu cara hati bernapas.',
  'Kamu lebih dari hasil lab minggu ini.',
  'Minta tolong adalah keberanian, bukan beban.',
  'Hari yang buruk bukan berarti hidup yang buruk.',
  'Kamu boleh beristirahat tanpa merasa bersalah.',
  'Ada orang yang lega karena kamu masih di sini.',
  'Pelan-pelan juga termasuk berjalan.',
]

/** Posisi bintang yang tetap (deterministik), dihitung sekali saat modul dimuat. */
const hash = (i, n) => {
  const x = Math.sin(i * 12.9898 + n * 78.233) * 43758.5453
  return x - Math.floor(x)
}

export const STARS = Array.from({ length: 42 }, (_, i) => ({
  id: i,
  x: hash(i, 1) * 100,
  y: hash(i, 2) * 100,
  size: 1 + hash(i, 3) * 2.2,
  delay: hash(i, 4) * 5,
}))
