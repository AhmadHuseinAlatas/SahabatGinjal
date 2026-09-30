import { ArrowUp } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import useScrolledPast from '../../hooks/useScrolledPast'
import { EASE } from '../../lib/motion'

function scrollToTop() {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' })
  document.getElementById('konten')?.focus({ preventScroll: true })
}

/** Pintasan "Butuh napas?" dan tombol kembali ke atas, muncul setelah hero terlewati. */
export default function FloatingActions() {
  const visible = useScrolledPast(720)

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="floating-actions"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.4, ease: EASE }}
          className="pointer-events-none fixed inset-x-0 bottom-4 z-40 sm:bottom-6"
        >
          <div className="shell flex items-end justify-between">
            <a
              href="#tenang"
              className="glass pointer-events-auto inline-flex min-h-12 items-center gap-2.5 rounded-full px-4 text-sm font-semibold text-ink shadow-float ring-1 ring-line transition-transform hover:-translate-y-0.5"
            >
              <span aria-hidden="true" className="relative flex size-2.5">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-tide-400 opacity-70" />
                <span className="relative inline-flex size-2.5 rounded-full bg-tide-500" />
              </span>
              Butuh napas?
            </a>

            <button
              type="button"
              onClick={scrollToTop}
              aria-label="Kembali ke atas"
              className="glass pointer-events-auto grid size-12 place-items-center rounded-full text-ink shadow-float ring-1 ring-line transition-transform hover:-translate-y-0.5"
            >
              <ArrowUp aria-hidden="true" className="size-5" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
