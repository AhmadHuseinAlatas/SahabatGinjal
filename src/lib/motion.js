/** Kurva gerak lembut yang dipakai di seluruh halaman. */
export const EASE = [0.22, 1, 0.36, 1]

/** Muncul saat elemen masuk ke 88% bagian atas layar, hanya sekali. */
export const VIEWPORT = { once: true, margin: '0px 0px -12% 0px' }

export const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
}

export const staggerContainer = (stagger = 0.08, delay = 0) => ({
  hidden: {},
  show: { transition: { staggerChildren: stagger, delayChildren: delay } },
})
