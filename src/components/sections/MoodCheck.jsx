import { ArrowRight, Check, Phone } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useState } from 'react'
import { MOODS } from '../../data/moods'
import { cn } from '../../lib/cn'
import { EASE } from '../../lib/motion'
import { TONES } from '../../lib/tones'
import Accent from '../ui/Accent'
import Button from '../ui/Button'
import IconBadge from '../ui/IconBadge'
import Reveal from '../ui/Reveal'
import SectionHeading from '../ui/SectionHeading'

function EmptyState() {
  return (
    <motion.div
      key="kosong"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex h-full min-h-80 flex-col items-center justify-center gap-6 p-8 text-center"
    >
      <span aria-hidden="true" className="relative grid size-20 place-items-center">
        <span className="absolute inset-0 animate-pulse-ring rounded-full bg-tide-300/40" />
        <span className="absolute inset-0 animate-pulse-ring rounded-full bg-leaf-300/40 [animation-delay:-1.8s]" />
        <span className="relative size-10 rounded-full bg-linear-to-br from-leaf-300 to-tide-300" />
      </span>
      <p className="max-w-xs font-display text-xl leading-snug text-ink-soft">
        Sentuh salah satu perasaan di atas. Kami tunggu, tidak ada yang mengejar.
      </p>
    </motion.div>
  )
}

function MoodPanel({ mood }) {
  const tone = TONES[mood.tone]

  return (
    <motion.article
      key={mood.id}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.45, ease: EASE }}
      className="p-7 sm:p-10"
    >
      <p className={cn('kicker', tone.text)}>{mood.title}</p>
      <blockquote className="mt-4 font-display text-3xl leading-tight text-ink sm:text-[2.4rem]">
        “{mood.quote}”
      </blockquote>
      <p className="mt-5 text-lg leading-relaxed text-ink-soft">{mood.body}</p>

      <ul className="mt-7 grid gap-3">
        {mood.steps.map((step) => (
          <li key={step} className="flex gap-3 text-ink">
            <span
              aria-hidden="true"
              className={cn('mt-0.5 grid size-6 shrink-0 place-items-center rounded-full', tone.chip)}
            >
              <Check className="size-3.5" strokeWidth={2.5} />
            </span>
            <span className="leading-relaxed">{step}</span>
          </li>
        ))}
      </ul>

      {mood.urgent && (
        <div className="mt-7 rounded-2xl bg-coral-50 p-5 ring-1 ring-coral-200 dark:bg-coral-400/10 dark:ring-coral-400/25">
          <p className="font-semibold text-ink">Kalau kamu sedang berpikir untuk menyakiti diri, bicaralah sekarang:</p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Button href="tel:119" variant="warm" iconLeft={Phone}>
              Telepon 119, lalu tekan 8
            </Button>
            <Button href="tel:112" variant="secondary" iconLeft={Phone}>
              Darurat 112
            </Button>
          </div>
        </div>
      )}

      <div className="mt-8">
        <Button href={mood.link.href} variant="secondary" icon={ArrowRight}>
          {mood.link.label}
        </Button>
      </div>
    </motion.article>
  )
}

export default function MoodCheck() {
  const [selectedId, setSelectedId] = useState(null)
  const selected = MOODS.find((mood) => mood.id === selectedId) ?? null

  return (
    <section id="perasaan" aria-labelledby="judul-perasaan" className="py-24 sm:py-32">
      <div className="shell">
        <SectionHeading
          id="judul-perasaan"
          number="05"
          kicker="Ruang Empati Dialisis"
          title={
            <>
              Bagaimana perasaanmu <Accent tone="coral">hari ini?</Accent>
            </>
          }
          description="Tidak ada jawaban yang salah. Pilih satu, dan kami temani dari titik itu."
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-[0.85fr_1.15fr] lg:gap-8">
          <Reveal>
            <div role="group" aria-label="Pilih perasaanmu" className="grid gap-2 sm:grid-cols-2 lg:grid-cols-1">
              {MOODS.map((mood) => {
                const active = mood.id === selectedId
                return (
                  <button
                    key={mood.id}
                    type="button"
                    aria-pressed={active}
                    onClick={() => setSelectedId(mood.id)}
                    className={cn(
                      'relative flex min-h-16 items-center gap-4 rounded-2xl px-3 py-2.5 text-left transition-colors',
                      active ? 'text-ink' : 'text-ink-soft hover:bg-surface/60 hover:text-ink',
                    )}
                  >
                    {active && (
                      <motion.span
                        layoutId="mood-active"
                        aria-hidden="true"
                        className="absolute inset-0 rounded-2xl bg-surface shadow-card ring-1 ring-line"
                        transition={{ type: 'spring', stiffness: 380, damping: 34 }}
                      />
                    )}
                    <IconBadge icon={mood.icon} tone={mood.tone} className="relative" />
                    <span className="relative">
                      <span className="block font-semibold">{mood.label}</span>
                      <span className="block text-sm text-ink-faint">{mood.hint}</span>
                    </span>
                  </button>
                )
              })}
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="card relative h-full overflow-hidden">
              {selected && (
                <div
                  aria-hidden="true"
                  className={cn(
                    'pointer-events-none absolute -top-24 -right-24 size-72 rounded-full blur-3xl transition-colors duration-700',
                    TONES[selected.tone].glow,
                  )}
                />
              )}
              <div className="relative">
                <AnimatePresence mode="wait" initial={false}>
                  {selected ? <MoodPanel key={selected.id} mood={selected} /> : <EmptyState key="kosong" />}
                </AnimatePresence>
              </div>
            </div>
          </Reveal>
        </div>

        <p className="sr-only" aria-live="polite">
          {selected ? `Saran untuk perasaan ${selected.label} ditampilkan.` : ''}
        </p>
      </div>
    </section>
  )
}
