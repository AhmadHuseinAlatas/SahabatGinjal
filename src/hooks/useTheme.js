import { useCallback, useEffect, useState } from 'react'

const STORAGE_KEY = 'sg-theme'
const THEME_COLORS = { light: '#f7f8f3', dark: '#0b1f1b' }

function readSaved() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved === 'dark' || saved === 'light' ? saved : null
  } catch {
    return null
  }
}

function applyTheme(theme) {
  document.documentElement.classList.toggle('dark', theme === 'dark')
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', THEME_COLORS[theme])
}

/**
 * Gelombang fajar/senja visual yang bergerak dari tombol ke seluruh layar.
 * Ringan, GPU-accelerated, dan 100% bebas lag karena hanya me-render 1 viewport layer
 * tanpa perlu screenshot 15.000px DOM via View Transitions API.
 */
function createThemeWave(origin, nextTheme) {
  if (typeof window === 'undefined') return
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

  const rect = origin?.getBoundingClientRect?.()
  const x = rect ? Math.round(rect.left + rect.width / 2) : Math.round(window.innerWidth - 44)
  const y = rect ? Math.round(rect.top + rect.height / 2) : 44

  const maxDistX = Math.max(x, window.innerWidth - x)
  const maxDistY = Math.max(y, window.innerHeight - y)
  const radius = Math.ceil(Math.hypot(maxDistX, maxDistY) * 1.08)

  // Bersihkan gelombang sebelumnya jika diklik cepat
  document.querySelectorAll('.sg-theme-wave').forEach((el) => el.remove())

  const wave = document.createElement('div')
  wave.className = 'sg-theme-wave'

  const isLight = nextTheme === 'light'
  // Palet alami SahabatGinjal:
  // Pagi (Light): Cahaya mentari fajar segar + hijau daun (leaf) + biru air (tide)
  // Malam (Dark): Kedalaman malam tenang (night) + zamrud hening + biru samudra
  const bg = isLight
    ? `radial-gradient(circle at ${x}px ${y}px, rgba(255, 255, 255, 0.92) 0%, rgba(217, 242, 224, 0.75) 45%, rgba(146, 207, 232, 0.45) 80%, rgba(247, 248, 243, 0.15) 100%)`
    : `radial-gradient(circle at ${x}px ${y}px, rgba(22, 52, 46, 0.95) 0%, rgba(11, 31, 27, 0.88) 50%, rgba(7, 21, 18, 0.75) 85%, rgba(13, 34, 46, 0.25) 100%)`

  Object.assign(wave.style, {
    position: 'fixed',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    maxWidth: '100vw',
    maxHeight: '100vh',
    pointerEvents: 'none',
    zIndex: '99999',
    background: bg,
    clipPath: `circle(0px at ${x}px ${y}px)`,
    willChange: 'clip-path, opacity',
    transform: 'translateZ(0)',
  })

  document.body.appendChild(wave)

  const animation = wave.animate(
    [
      { clipPath: `circle(0px at ${x}px ${y}px)`, opacity: 0.85 },
      { clipPath: `circle(${Math.round(radius * 0.65)}px at ${x}px ${y}px)`, opacity: 0.7, offset: 0.5 },
      { clipPath: `circle(${radius}px at ${x}px ${y}px)`, opacity: 0 },
    ],
    {
      duration: 500,
      easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
      fill: 'forwards',
    },
  )

  animation.onfinish = () => {
    wave.remove()
  }

  // Pengaman bila animasi terinterupsi
  setTimeout(() => {
    if (wave.parentNode) wave.remove()
  }, 800)
}

/**
 * Mode "pagi" (terang) dan "malam" (gelap).
 * Tema awal sudah dipasang skrip kecil di index.html sebelum React berjalan.
 */
export default function useTheme() {
  const [theme, setTheme] = useState(() =>
    document.documentElement.classList.contains('dark') ? 'dark' : 'light',
  )

  useEffect(() => {
    applyTheme(theme)
  }, [theme])

  // Ikuti perubahan tema sistem selama pengguna belum memilih sendiri.
  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)')
    const onChange = (event) => {
      if (!readSaved()) setTheme(event.matches ? 'dark' : 'light')
    }
    media.addEventListener('change', onChange)
    return () => media.removeEventListener('change', onChange)
  }, [])

  /** `origin` = elemen pemicu, dipakai sebagai titik awal efek lingkaran. */
  const toggle = useCallback(
    (origin) => {
      const next = theme === 'dark' ? 'light' : 'dark'
      try {
        localStorage.setItem(STORAGE_KEY, next)
      } catch {
        /* penyimpanan tidak tersedia, tema tetap berganti */
      }

      // 1. Terapkan tema seketika tanpa delay dan tanpa freeze
      applyTheme(next)
      setTheme(next)

      // 2. Jalankan efek gelombang fajar/senja yang lembut dari tombol
      createThemeWave(origin, next)
    },
    [theme],
  )

  return { theme, toggle }
}
