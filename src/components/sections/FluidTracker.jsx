import { AlertTriangle, CupSoda, Droplets, Info, Plus, RotateCcw, Sparkles } from 'lucide-react'
import { motion } from 'motion/react'
import { useState } from 'react'
import useLocalStorage from '../../hooks/useLocalStorage'
import { cn } from '../../lib/cn'
import { EASE } from '../../lib/motion'
import Accent from '../ui/Accent'
import Button from '../ui/Button'
import Reveal from '../ui/Reveal'
import SectionHeading from '../ui/SectionHeading'

const QUICK_AMOUNTS = [
  { label: 'Es batu kecil', ml: 30, icon: Sparkles },
  { label: 'Teguk minum obat', ml: 50, icon: Droplets },
  { label: 'Kuah / sup', ml: 100, icon: CupSoda },
  { label: 'Gelas kecil', ml: 150, icon: Droplets },
]

const THIRST_TIPS = [
  {
    title: 'Kumur air es',
    desc: 'Kumur air dingin lalu buang, jangan ditelan. Ini membasahi saraf lidah tanpa menambah volume darah.',
  },
  {
    title: 'Hisap es batu',
    desc: 'Satu bongkah es batu kecil (±25–30 ml) bertahan jauh lebih lama di mulut dibanding meneguk setengah gelas air.',
  },
  {
    title: 'Botol semprot dingin',
    desc: 'Gunakan botol semprot kecil bersih berisi air matang dingin untuk menyegarkan rongga mulut yang kering.',
  },
  {
    title: 'Irisan lemon / permen asam',
    desc: 'Rasa asam memicu produksi air liur alami dan mengikis rasa kering di tenggorokan.',
  },
]

export default function FluidTracker() {
  const [todayKey] = useState(() => new Date().toISOString().slice(0, 10))
  const [trackerData, setTrackerData] = useLocalStorage(`sg-fluid-${todayKey}`, {
    target: 600,
    consumed: 0,
    logs: [],
  })

  const [customMl, setCustomMl] = useState('')
  const target = trackerData?.target ?? 600
  const consumed = trackerData?.consumed ?? 0

  const percentage = Math.min(Math.round((consumed / target) * 100), 150)
  const isOver = consumed > target
  const remaining = Math.max(0, target - consumed)

  const addFluid = (ml, label) => {
    if (!ml || ml <= 0) return
    setTrackerData((prev) => {
      const current = prev || { target: 600, consumed: 0, logs: [] }
      const newLogs = [
        { id: Date.now(), ml, label: label || `${ml} ml`, time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) },
        ...(current.logs || []),
      ]
      return {
        ...current,
        consumed: current.consumed + ml,
        logs: newLogs.slice(0, 15),
      }
    })
    setCustomMl('')
  }

  const handleCustomAdd = (e) => {
    e.preventDefault()
    const ml = parseInt(customMl, 10)
    if (!isNaN(ml) && ml > 0) {
      addFluid(ml, `Tambahan ${ml} ml`)
    }
  }

  const resetToday = () => {
    setTrackerData({
      target,
      consumed: 0,
      logs: [],
    })
  }

  const setTargetLimit = (newLimit) => {
    setTrackerData((prev) => ({
      ...prev,
      target: newLimit,
    }))
  }

  return (
    <section id="cairan" aria-labelledby="judul-cairan" className="py-24 sm:py-32">
      <div className="shell">
        <SectionHeading
          id="judul-cairan"
          number="12"
          kicker="Kalkulator & Pelacak Praktis"
          title={
            <>
              Menjaga kuota <Accent tone="tide">cairan harian</Accent>
            </>
          }
          description="Kelebihan cairan adalah salah satu penyebab utama sesak napas dan bengkak pada pasien dialisis. Catat setiap tegukan untuk menjaga tubuh tetap ringan."
        />

        <div className="mt-14 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
          {/* Panel Kalkulator */}
          <Reveal>
            <div className="card relative overflow-hidden p-7 sm:p-10">
              <div className="flex flex-wrap items-baseline justify-between gap-4 border-b border-line pb-6">
                <div>
                  <p className="kicker text-accent">Asupan Hari Ini</p>
                  <p className="mt-1 flex items-baseline gap-2 font-display text-4xl text-ink sm:text-5xl">
                    <span>{consumed}</span>
                    <span className="font-sans text-xl font-normal text-ink-faint">/ {target} ml</span>
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs text-ink-faint">Batas:</span>
                  {[500, 600, 800, 1000].map((limit) => (
                    <button
                      key={limit}
                      type="button"
                      onClick={() => setTargetLimit(limit)}
                      className={cn(
                        'rounded-lg px-2.5 py-1 text-xs font-semibold ring-1 transition-all',
                        target === limit
                          ? 'bg-brand text-brand-ink ring-brand'
                          : 'bg-surface text-ink-faint ring-line hover:text-ink',
                      )}
                    >
                      {limit}
                    </button>
                  ))}
                </div>
              </div>

              {/* Progress Bar Visual */}
              <div className="mt-8">
                <div className="flex justify-between text-sm font-semibold">
                  <span className="text-ink-soft">
                    {isOver ? (
                      <span className="flex items-center gap-1.5 text-coral-600 dark:text-coral-400">
                        <AlertTriangle className="size-4" />
                        Melebihi target sebanyak {consumed - target} ml
                      </span>
                    ) : (
                      <span>Tersisa {remaining} ml lagi</span>
                    )}
                  </span>
                  <span className={cn('tabular-nums', isOver ? 'text-coral-600' : 'text-primary')}>
                    {percentage}%
                  </span>
                </div>

                <div className="mt-3 h-3 overflow-hidden rounded-full bg-surface-muted ring-1 ring-line">
                  <motion.div
                    initial={false}
                    animate={{ width: `${Math.min(percentage, 100)}%` }}
                    transition={{ duration: 0.5, ease: EASE }}
                    className={cn(
                      'h-full rounded-full transition-colors',
                      isOver
                        ? 'bg-coral-500'
                        : percentage > 75
                          ? 'bg-sprout-500'
                          : 'bg-leaf-500',
                    )}
                  />
                </div>
              </div>

              {/* Tombol Tambah Cepat */}
              <div className="mt-8">
                <p className="text-xs font-bold tracking-wider text-ink-faint uppercase">
                  Catat Cepat Asupan
                </p>
                <div className="mt-3 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
                  {QUICK_AMOUNTS.map((item) => (
                    <button
                      key={item.label}
                      type="button"
                      onClick={() => addFluid(item.ml, item.label)}
                      className="group flex flex-col items-center justify-center rounded-2xl bg-surface-muted/60 p-3 ring-1 ring-line transition-all hover:bg-surface hover:ring-line-strong hover:shadow-card active:scale-95"
                    >
                      <item.icon className="size-5 text-accent transition-transform group-hover:scale-110" />
                      <span className="mt-2 text-xs font-semibold text-ink">{item.label}</span>
                      <span className="text-[11px] font-bold text-accent">+{item.ml} ml</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Custom Input & Reset */}
              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
                <form onSubmit={handleCustomAdd} className="flex flex-1 gap-2">
                  <input
                    type="number"
                    value={customMl}
                    onChange={(e) => setCustomMl(e.target.value)}
                    placeholder="Ukuran lain (ml)"
                    min="1"
                    max="2000"
                    className="min-h-10 w-full rounded-xl bg-surface px-3.5 text-sm text-ink ring-1 ring-line placeholder:text-ink-faint focus-visible:ring-2 focus-visible:ring-accent"
                  />
                  <Button type="submit" size="sm" iconLeft={Plus}>
                    Tambah
                  </Button>
                </form>

                <button
                  type="button"
                  onClick={resetToday}
                  className="flex items-center justify-center gap-1.5 rounded-xl px-3 py-2 text-xs font-medium text-ink-faint transition-colors hover:bg-surface hover:text-warm"
                >
                  <RotateCcw className="size-3.5" />
                  <span>Reset Hari Ini</span>
                </button>
              </div>

              <p className="mt-5 text-xs text-ink-faint">
                Catatan cairan tersimpan di perangkatmu untuk hari ini. Tidak dikirim ke server.
              </p>
            </div>
          </Reveal>

          {/* Panel Tips Menahan Haus */}
          <Reveal delay={0.1}>
            <div className="card h-full p-7 sm:p-9">
              <div className="flex items-center gap-3">
                <span className="grid size-10 place-items-center rounded-xl bg-tide-100 text-tide-700 dark:bg-tide-400/15 dark:text-tide-300">
                  <Droplets className="size-5" />
                </span>
                <h3 className="font-display text-2xl text-ink">Trik Menahan Rasa Haus</h3>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                Rasa haus pada pasien cuci darah sering kali sangat menyiksa. Gunakan cara-cara ini untuk menipu lidah tanpa membebani jantung dan paru-paru:
              </p>

              <ul className="mt-6 grid gap-4">
                {THIRST_TIPS.map((tip) => (
                  <li key={tip.title} className="rounded-2xl bg-surface-muted/50 p-4 ring-1 ring-line/60">
                    <p className="font-semibold text-ink">{tip.title}</p>
                    <p className="mt-1 text-sm leading-relaxed text-ink-soft">{tip.desc}</p>
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex items-start gap-2.5 rounded-xl bg-tide-50/80 p-3.5 text-xs text-ink-soft ring-1 ring-tide-200 dark:bg-tide-400/10 dark:ring-tide-400/25">
                <Info className="mt-0.5 size-4 shrink-0 text-accent" />
                <span>
                  Batas cairan pasti selalu ditentukan oleh dokter nefrolog berdasarkan sisa volume urine 24 jam dan kondisi jantungmu.
                </span>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
