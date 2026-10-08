import {
  ChevronRight,
  HeartHandshake,
  Hospital,
  Phone,
  Wind,
  X,
} from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import {
  NAV_COMMUNITY_LINKS,
  NAV_DIRECT_LINKS,
  NAV_DROPDOWNS,
} from '../../data/navigation'
import { cn } from '../../lib/cn'
import { EASE } from '../../lib/motion'
import Button from '../ui/Button'
import Logo from '../ui/Logo'

const FOCUSABLE = '#site-header a, #site-header button, #menu-seluler a, #menu-seluler button'

/**
 * Menu seluler layar penuh yang ramah pengguna lanjut usia.
 * - Tipografi besar & kontras tinggi
 * - Tombol cepat untuk fitur utama (Cari RS, Ruang Tenang)
 * - Pengelompokan kategori yang jelas dan tidak membingungkan
 */
export default function MobileMenu({ open, onClose, active, returnFocusRef }) {
  const containerRef = useRef(null)
  const [activeTab, setActiveTab] = useState('edukasi')

  useEffect(() => {
    if (!open) return undefined

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

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

    const wide = window.matchMedia('(min-width: 64rem)')
    const onWide = (event) => event.matches && onClose()

    window.addEventListener('keydown', onKeyDown)
    wide.addEventListener('change', onWide)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKeyDown)
      wide.removeEventListener('change', onWide)
    }
  }, [open, onClose, returnFocusRef])

  // Cari grup dropdown yang sedang dipilih
  const currentGroup = NAV_DROPDOWNS.find((g) => g.key === activeTab) || NAV_DROPDOWNS[0]

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="menu-seluler"
          id="menu-seluler"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-50 flex flex-col bg-canvas lg:hidden"
        >
          {/* Header Menu Seluler */}
          <div className="flex h-16 shrink-0 items-center justify-between border-b border-line px-4 sm:px-6">
            <Logo onClick={onClose} />
            <button
              type="button"
              onClick={onClose}
              aria-label="Tutup menu"
              className="grid size-10 place-items-center rounded-full text-ink ring-1 ring-line-strong transition-colors hover:bg-surface-muted active:scale-95"
            >
              <X aria-hidden="true" className="size-5" />
            </button>
          </div>

          {/* Konten Menu Seluler (Scrollable) */}
          <div ref={containerRef} className="flex-1 overflow-y-auto px-4 py-5 sm:px-6">
            {/* Quick Access Action Cards */}
            <div className="mb-6 grid grid-cols-2 gap-2.5">
              <a
                href="#rumah-sakit"
                onClick={onClose}
                className={cn(
                  'flex items-center gap-3 rounded-2xl p-3.5 transition-all ring-1',
                  active === 'rumah-sakit'
                    ? 'bg-primary text-white shadow-md ring-primary'
                    : 'bg-primary/10 text-primary ring-primary/20 hover:bg-primary/15',
                )}
              >
                <div
                  className={cn(
                    'grid size-10 shrink-0 place-items-center rounded-xl',
                    active === 'rumah-sakit' ? 'bg-white/20 text-white' : 'bg-primary text-white',
                  )}
                >
                  <Hospital aria-hidden="true" className="size-5" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-semibold uppercase tracking-wider opacity-80">Direktori</p>
                  <p className="font-bold text-sm leading-tight">Cari RS Terdekat</p>
                </div>
              </a>

              <a
                href="#tenang"
                onClick={onClose}
                className={cn(
                  'flex items-center gap-3 rounded-2xl p-3.5 transition-all ring-1',
                  active === 'tenang'
                    ? 'bg-tide-600 text-white shadow-md ring-tide-600'
                    : 'bg-tide-500/10 text-tide-700 dark:text-tide-300 ring-tide-500/20 hover:bg-tide-500/15',
                )}
              >
                <div
                  className={cn(
                    'grid size-10 shrink-0 place-items-center rounded-xl',
                    active === 'tenang' ? 'bg-white/20 text-white' : 'bg-tide-600 text-white',
                  )}
                >
                  <Wind aria-hidden="true" className="size-5" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-semibold uppercase tracking-wider opacity-80">Relaksasi</p>
                  <p className="font-bold text-sm leading-tight">Ruang Tenang</p>
                </div>
              </a>
            </div>

            {/* Kategori Tab Switcher */}
            <div className="mb-4">
              <p className="mb-2 text-xs font-bold uppercase tracking-wider text-ink-faint">
                Kategori Informasi
              </p>
              <div className="flex gap-1.5 rounded-2xl bg-surface-muted p-1 ring-1 ring-line">
                {NAV_DROPDOWNS.map((group) => {
                  const isSelected = activeTab === group.key
                  return (
                    <button
                      key={group.key}
                      type="button"
                      onClick={() => setActiveTab(group.key)}
                      className={cn(
                        'flex-1 rounded-xl py-2 px-2 text-xs font-semibold whitespace-nowrap transition-all',
                        isSelected
                          ? 'bg-surface text-ink shadow-sm ring-1 ring-line'
                          : 'text-ink-soft hover:text-ink',
                      )}
                    >
                      {group.label}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Isi Link dalam Kategori Terpilih */}
            <div className="mb-6 space-y-2">
              {currentGroup.links.map((item) => {
                const Icon = item.icon
                const isLinkActive = active === item.id

                return (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    onClick={onClose}
                    className={cn(
                      'flex items-center gap-3.5 rounded-2xl p-3.5 transition-all ring-1',
                      isLinkActive
                        ? 'bg-primary/10 ring-primary/30'
                        : 'bg-surface/80 ring-line hover:bg-surface-muted',
                    )}
                  >
                    <span
                      className={cn(
                        'grid size-11 shrink-0 place-items-center rounded-xl transition-colors',
                        isLinkActive
                          ? 'bg-primary text-white shadow-sm'
                          : 'bg-surface-muted text-ink-soft',
                      )}
                    >
                      <Icon aria-hidden="true" className="size-5" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p
                        className={cn(
                          'text-base font-bold leading-tight',
                          isLinkActive ? 'text-primary' : 'text-ink',
                        )}
                      >
                        {item.label}
                      </p>
                      <p className="mt-0.5 text-xs text-ink-soft leading-snug">
                        {item.desc}
                      </p>
                    </div>
                    <ChevronRight aria-hidden="true" className="size-4 shrink-0 text-ink-faint" />
                  </a>
                )
              })}
            </div>

            {/* Seksi Dukungan & Komunitas */}
            <div className="mb-6">
              <p className="mb-2 text-xs font-bold uppercase tracking-wider text-ink-faint">
                Dukungan & Tanya Jawab
              </p>
              <div className="grid gap-2 sm:grid-cols-2">
                {NAV_COMMUNITY_LINKS.map((item) => {
                  const Icon = item.icon
                  const isLinkActive = active === item.id

                  return (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      onClick={onClose}
                      className={cn(
                        'flex items-center gap-3 rounded-2xl p-3 transition-colors ring-1',
                        isLinkActive
                          ? 'bg-primary/10 ring-primary/30'
                          : 'bg-surface/60 ring-line hover:bg-surface',
                      )}
                    >
                      <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-surface-muted text-ink-soft">
                        <Icon aria-hidden="true" className="size-4" />
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-semibold text-ink leading-tight">
                          {item.label}
                        </p>
                        <p className="text-xs text-ink-faint leading-snug mt-0.5">
                          {item.desc}
                        </p>
                      </div>
                    </a>
                  )
                })}
              </div>
            </div>

            {/* Hotline Bantuan Darurat 119 */}
            <div className="rounded-2xl bg-coral-500/10 p-4 ring-1 ring-coral-500/25">
              <div className="flex items-start gap-3">
                <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-coral-500 text-white shadow-sm">
                  <Phone aria-hidden="true" className="size-4" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-bold text-coral-700 dark:text-coral-300">
                    Layanan Bantuan Krisis 119 (ext. 8)
                  </p>
                  <p className="mt-0.5 text-xs text-ink-soft leading-relaxed">
                    Bila kamu atau keluarga merasa sangat sesak, pusing hebat, atau cemas berlebih, segera hubungi 119 atau IGD terdekat.
                  </p>
                  <a
                    href="tel:119"
                    className="mt-2.5 inline-flex items-center gap-2 rounded-full bg-coral-600 px-4 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-coral-700"
                  >
                    <Phone aria-hidden="true" className="size-3.5" />
                    Telepon 119 Sekarang
                  </a>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
