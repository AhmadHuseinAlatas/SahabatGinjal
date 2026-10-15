import { HeartPulse, ShieldCheck, Sparkles } from 'lucide-react'
import { motion } from 'motion/react'
import { cn } from '../../lib/cn'

const FOCUS_MODES = [
  {
    id: 'all',
    label: 'Semua',
    fullLabel: 'Semua Modul',
    icon: Sparkles,
    count: '21 Modul',
    tagline: 'Tampilkan seluruh panduan lengkap',
  },
  {
    id: 'prevention',
    label: 'Cegah Ginjal',
    fullLabel: 'Pencegahan',
    icon: ShieldCheck,
    count: '8 Modul',
    tagline: 'Skrining risiko, eGFR & perlindungan ginjal',
  },
  {
    id: 'dialysis',
    label: 'Dialisis & Pasien',
    fullLabel: 'Dialisis',
    icon: HeartPulse,
    count: '17 Modul',
    tagline: 'Jadwal HD/CAPD, cairan, makanan, & RS',
  },
]

/**
 * Switcher fokus tampilan seluler.
 * Mengatasi masalah "scroll 5 menit" di ponsel dengan memotong modul yang tidak relevan
 * sesuai kebutuhan pengunjung (Pencegahan vs Dialisis vs Semua).
 */
export default function MobileFocusSwitcher({ focusMode, onSelectMode }) {
  const current = FOCUS_MODES.find((m) => m.id === focusMode) || FOCUS_MODES[0]

  return (
    <div
      role="region"
      aria-label="Pilihan fokus tampilan ponsel"
      className="shell mb-6 mt-4 lg:hidden"
    >
      <div className="rounded-2xl border border-line-strong bg-surface/95 p-3 shadow-card backdrop-blur-md">
        <div className="mb-2.5 flex items-center justify-between px-1">
          <span className="text-xs font-bold tracking-tight text-ink-muted">
            Fokus Baca di Ponsel:
          </span>
          <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-[11px] font-extrabold text-primary">
            {current.count} Aktif
          </span>
        </div>

        {/* Tab Buttons */}
        <div
          role="tablist"
          aria-label="Pilih mode panduan"
          className="grid grid-cols-3 gap-1 rounded-xl bg-surface-muted p-1 ring-1 ring-line/60"
        >
          {FOCUS_MODES.map((mode) => {
            const Icon = mode.icon
            const isSelected = focusMode === mode.id

            return (
              <button
                key={mode.id}
                role="tab"
                type="button"
                aria-selected={isSelected}
                onClick={() => onSelectMode(mode.id)}
                className={cn(
                  'relative flex items-center justify-center gap-1.5 rounded-lg py-2 text-center text-xs font-bold transition-all duration-200 active:scale-95',
                  isSelected
                    ? 'text-primary shadow-xs'
                    : 'text-ink-soft hover:text-ink',
                )}
              >
                {isSelected && (
                  <motion.span
                    layoutId="focus-mode-indicator"
                    aria-hidden="true"
                    className="absolute inset-0 rounded-lg bg-surface shadow-xs ring-1 ring-line-strong"
                    transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-1.5 truncate">
                  <Icon className="size-3.5 shrink-0" />
                  <span className="truncate">{mode.label}</span>
                </span>
              </button>
            )
          })}
        </div>

        {/* Tagline penjelas singkat */}
        <p className="mt-2 text-center text-[11px] font-medium text-ink-faint">
          {current.tagline}
        </p>
      </div>
    </div>
  )
}
