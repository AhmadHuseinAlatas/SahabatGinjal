import { HeartHandshake, Wind } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useRef } from 'react'
import { NAV_LINKS } from '../../data/navigation'
import { cn } from '../../lib/cn'
import { EASE } from '../../lib/motion'
import Button from '../ui/Button'

const FOCUSABLE = '#site-header a, #site-header button, #menu-seluler a, #menu-seluler button'

/**
 * Menu layar penuh untuk ponsel/tablet. Mengunci gulir, menutup dengan Escape,
 * dan menjaga fokus keyboard tetap di header + menu selama terbuka.
 */
export default function MobileMenu({ open, onClose, active, returnFocusRef }) {
  const firstLinkRef = useRef(null)

  useEffect(() => {
    if (!open) return undefined

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    firstLinkRef.current?.focus()

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose()
        returnFocusRef.current?.focus()
        return
      }
      if (event.key !== 'Tab') return
      const items = [...document.querySelectorAll(FOCUSABLE)].filter((el) => el.offsetParent !== null)
      if (!items.length) return
      const first = items[0]
      const last = items[items.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    // Tutup otomatis kalau layar melebar sampai menu desktop tampil.
    const wide = window.matchMedia('(min-width: 80rem)')
    const onWide = (event) => event.matches && onClose()

    window.addEventListener('keydown', onKeyDown)
    wide.addEventListener('change', onWide)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKeyDown)
      wide.removeEventListener('change', onWide)
    }
  }, [open, onClose, returnFocusRef])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="menu-seluler"
          id="menu-seluler"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-40 xl:hidden"
        >
          <div aria-hidden="true" onClick={onClose} className="absolute inset-0 bg-canvas/85 backdrop-blur-xl" />

          <motion.nav
            aria-label="Menu"
            initial={{ y: -16, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -16, opacity: 0 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="shell relative h-full overflow-y-auto pt-28 pb-10"
          >
            <ul>
              {NAV_LINKS.map((link, index) => (
                <motion.li
                  key={link.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.06 + index * 0.04, duration: 0.4, ease: EASE }}
                >
                  <a
                    ref={index === 0 ? firstLinkRef : undefined}
                    href={`#${link.id}`}
                    onClick={onClose}
                    aria-current={active === link.id ? 'location' : undefined}
                    className={cn(
                      'flex items-baseline justify-between gap-4 border-b border-line py-4 font-display text-[1.9rem] leading-tight transition-colors',
                      active === link.id ? 'text-primary' : 'text-ink hover:text-primary',
                    )}
                  >
                    {link.label}
                    <span className="font-sans text-sm text-ink-faint">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </a>
                </motion.li>
              ))}
            </ul>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              <Button href="#tenang" variant="secondary" iconLeft={Wind} onClick={onClose}>
                Ruang Tenang
              </Button>
              <Button href="#bantuan" variant="warm" iconLeft={HeartHandshake} onClick={onClose}>
                Butuh bantuan?
              </Button>
            </div>
          </motion.nav>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
