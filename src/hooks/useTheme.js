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

      const run = () => {
        applyTheme(next)
        setTheme(next)
      }

      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (!document.startViewTransition || reduceMotion) {
        run()
        return
      }

      const rect = origin?.getBoundingClientRect?.()
      const x = rect ? rect.left + rect.width / 2 : window.innerWidth - 40
      const y = rect ? rect.top + rect.height / 2 : 40
      const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y))

      const transition = document.startViewTransition(run)
      transition.ready
        .then(() => {
          document.documentElement.animate(
            { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
            {
              duration: 700,
              easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
              pseudoElement: '::view-transition-new(root)',
            },
          )
        })
        .catch(() => {})
    },
    [theme],
  )

  return { theme, toggle }
}
