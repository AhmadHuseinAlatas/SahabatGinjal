import { ArrowUp } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import useScrolledPast from '../../hooks/useScrolledPast'
import { EASE } from '../../lib/motion'

function scrollToTop() {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' })
  document.getElementById('konten')?.focus({ preventScroll: true })
}

/** Tombol kembali ke atas, muncul setelah hero terlewati. */
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
          className="pointer-events-none fixed right-4 bottom-[max(9.2rem,calc(8.5rem+env(safe-area-inset-bottom,0px)))] z-40 lg:bottom-22 lg:right-6"
        >
          <button
            type="button"
            onClick={scrollToTop}
            aria-label="Kembali ke atas"
            className="glass pointer-events-auto grid size-11 place-items-center rounded-full text-ink shadow-float ring-1 ring-line transition-transform hover:-translate-y-0.5 active:scale-95"
          >
            <ArrowUp aria-hidden="true" className="size-5" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
