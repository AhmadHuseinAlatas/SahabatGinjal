import { Moon, Sun } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { cn } from '../../lib/cn'
import { EASE } from '../../lib/motion'

/** Tombol mode pagi/malam dengan ikon yang berputar saat berganti. */
export default function ThemeToggle({ theme, onToggle, className }) {
  const dark = theme === 'dark'

  return (
    <button
      type="button"
      onClick={(event) => onToggle(event.currentTarget)}
      aria-label={dark ? 'Ganti ke mode terang' : 'Ganti ke mode malam'}
      title={dark ? 'Mode terang' : 'Mode malam, untuk kamu yang masih terjaga'}
      className={cn(
        'relative grid size-11 place-items-center rounded-full text-ink ring-1 ring-line-strong transition-colors hover:bg-surface-muted',
        className,
      )}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={theme}
          initial={{ rotate: -90, scale: 0.4, opacity: 0 }}
          animate={{ rotate: 0, scale: 1, opacity: 1 }}
          exit={{ rotate: 90, scale: 0.4, opacity: 0 }}
          transition={{ duration: 0.3, ease: EASE }}
          className="grid place-items-center"
        >
          {dark ? (
            <Sun aria-hidden="true" className="size-5" />
          ) : (
            <Moon aria-hidden="true" className="size-5" />
          )}
        </motion.span>
      </AnimatePresence>
    </button>
  )
}
