import { ChevronDown, HeartHandshake, Wind } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import { NAV_CATEGORIES } from '../../data/navigation'
import { cn } from '../../lib/cn'
import { EASE } from '../../lib/motion'
import Button from '../ui/Button'

const FOCUSABLE = '#site-header a, #site-header button, #menu-seluler a, #menu-seluler button'

/**
 * Menu layar penuh untuk ponsel/tablet. Mengunci gulir, menutup dengan Escape,
 * dan menjaga fokus keyboard tetap di header + menu selama terbuka.
 *
 * Dikelompokkan per kategori agar mudah ditemukan oleh pengguna berusia lanjut.
 */
export default function MobileMenu({ open, onClose, active, returnFocusRef }) {
  const firstLinkRef = useRef(null)
  const [expandedCat, setExpandedCat] = useState(null)

  // Auto-expand the category containing the active section
  useEffect(() => {
    if (open && active) {
      const category = NAV_CATEGORIES.find((cat) => cat.links.some((l) => l.id === active))
      if (category) setExpandedCat(category.key)
    }
  }, [open, active])

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

  const toggleCategory = (key) => {
    setExpandedCat((prev) => (prev === key ? null : key))
  }

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
            className="shell relative h-full overflow-y-auto pt-24 pb-10"
          >
            {/* Heading */}
            <p className="mb-6 text-sm font-semibold uppercase tracking-wider text-ink-faint">
              Menu Navigasi
            </p>

            {/* Categories */}
            <div className="space-y-3">
              {NAV_CATEGORIES.map((cat, catIndex) => {
                const isExpanded = expandedCat === cat.key
                const hasActiveChild = cat.links.some((l) => l.id === active)

                return (
                  <motion.div
                    key={cat.key}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.06 + catIndex * 0.06, duration: 0.4, ease: EASE }}
                    className={cn(
                      'overflow-hidden rounded-2xl ring-1 transition-colors duration-300',
                      hasActiveChild
                        ? 'bg-primary/5 ring-primary/20'
                        : 'bg-surface/60 ring-line',
                    )}
                  >
                    {/* Category Header */}
                    <button
                      ref={catIndex === 0 ? firstLinkRef : undefined}
                      type="button"
                      onClick={() => toggleCategory(cat.key)}
                      aria-expanded={isExpanded}
                      className="flex w-full items-center gap-3 px-5 py-4 text-left"
                    >
                      <span className="text-2xl leading-none" aria-hidden="true">
                        {cat.emoji}
                      </span>
                      <span className="flex-1">
                        <span
                          className={cn(
                            'font-display text-xl leading-tight tracking-tight',
                            hasActiveChild ? 'text-primary' : 'text-ink',
                          )}
                        >
                          {cat.label}
                        </span>
                        <span className="mt-0.5 block text-xs text-ink-faint">
                          {cat.links.length} halaman
                        </span>
                      </span>
                      <ChevronDown
                        aria-hidden="true"
                        className={cn(
                          'size-5 text-ink-faint transition-transform duration-300',
                          isExpanded && 'rotate-180',
                        )}
                      />
                    </button>

                    {/* Category Links */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: EASE }}
                          className="overflow-hidden"
                        >
                          <div className="border-t border-line px-3 pt-2 pb-3">
                            {cat.links.map((link) => {
                              const Icon = link.icon
                              const isActive = active === link.id
                              return (
                                <a
                                  key={link.id}
                                  href={`#${link.id}`}
                                  onClick={onClose}
                                  aria-current={isActive ? 'location' : undefined}
                                  className={cn(
                                    'group flex items-center gap-3 rounded-xl px-3 py-3 transition-colors duration-200',
                                    isActive
                                      ? 'bg-primary/10'
                                      : 'hover:bg-surface-muted active:bg-surface-muted',
                                  )}
                                >
                                  <span
                                    className={cn(
                                      'grid size-10 shrink-0 place-items-center rounded-xl transition-colors',
                                      isActive
                                        ? 'bg-primary/15 text-primary'
                                        : 'bg-surface-muted text-ink-faint group-hover:text-primary',
                                    )}
                                  >
                                    <Icon aria-hidden="true" className="size-5" />
                                  </span>
                                  <div className="min-w-0 flex-1">
                                    <p
                                      className={cn(
                                        'text-base font-semibold',
                                        isActive ? 'text-primary' : 'text-ink',
                                      )}
                                    >
                                      {link.label}
                                    </p>
                                    <p className="mt-0.5 text-sm leading-snug text-ink-faint">
                                      {link.desc}
                                    </p>
                                  </div>
                                  {isActive && (
                                    <span className="size-2 shrink-0 rounded-full bg-primary" />
                                  )}
                                </a>
                              )
                            })}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                )
              })}
            </div>

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
