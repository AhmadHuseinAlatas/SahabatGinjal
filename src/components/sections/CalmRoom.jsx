import { Pause, Play, Sparkles } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useState } from 'react'
import { AFFIRMATIONS, BREATH_PATTERNS, STARS } from '../../data/calm'
import useBreathing from '../../hooks/useBreathing'
import { cn } from '../../lib/cn'
import { EASE } from '../../lib/motion'
import Accent from '../ui/Accent'
import Button from '../ui/Button'
import Reveal from '../ui/Reveal'
import SectionHeading from '../ui/SectionHeading'

function Stars() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0">
      {STARS.map((star) => (
        <span
          key={star.id}
          className="absolute animate-twinkle rounded-full bg-white"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: star.size,
            height: star.size,
            animationDelay: `-${star.delay}s`,
          }}
        />
      ))}
    </div>
  )
}

function Breather() {
  const [patternId, setPatternId] = useState(BREATH_PATTERNS[0].id)
  const pattern = BREATH_PATTERNS.find((item) => item.id === patternId)
  const { running, current, left, cycles, start, stop } = useBreathing(pattern.phases)

  const choose = (id) => {
    stop()
    setPatternId(id)
  }

  return (
    <div className="flex flex-col items-center">
      <div role="radiogroup" aria-label="Pola napas" className="flex flex-wrap justify-center gap-2">
        {BREATH_PATTERNS.map((item) => {
          const active = item.id === patternId
          return (
            <button
              key={item.id}
              type="button"
              role="radio"
              aria-checked={active}
              onClick={() => choose(item.id)}
              className={cn(
                'min-h-10 rounded-full px-4 text-sm font-semibold ring-1 transition-colors',
                active ? 'bg-white text-night-950 ring-white' : 'text-white/80 ring-white/25 hover:bg-white/10',
              )}
            >
              {item.label}
            </button>
          )
        })}
      </div>
      <p className="mt-3 max-w-xs text-center text-sm text-white/70">{pattern.hint}</p>

      <div className="relative mt-8 grid size-64 place-items-center sm:size-80">
        <span aria-hidden="true" className="absolute inset-0 rounded-full ring-1 ring-white/10" />
        <span aria-hidden="true" className="absolute inset-[10%] rounded-full ring-1 ring-white/10" />
        <motion.div
          aria-hidden="true"
          animate={{ scale: current ? current.scale : 0.6 }}
          transition={{ duration: current ? current.seconds : 0.8, ease: 'easeInOut' }}
          className="breath-orb absolute inset-0"
        />
        <div aria-hidden="true" className="relative text-center">
          <p className="font-display text-2xl text-white">{current ? current.label : 'Siap?'}</p>
          <p className="mt-1 font-display text-5xl text-tide-200 tabular-nums">{current ? left : '–'}</p>
        </div>
      </div>

      <p className="sr-only" aria-live="polite">
        {current ? current.label : ''}
      </p>

      <div className="mt-8">
        {running ? (
          <Button variant="outlineLight" iconLeft={Pause} onClick={stop}>
            Berhenti
          </Button>
        ) : (
          <Button variant="light" iconLeft={Play} onClick={start}>
            Mulai bernapas
          </Button>
        )}
      </div>
      <p className="mt-4 text-sm text-white/70">
        Siklus selesai: <span className="font-semibold text-white tabular-nums">{cycles}</span>
      </p>
      <p className="mt-2 text-center text-xs text-white/60">
        Berhenti kapan saja kalau terasa pusing atau sesak.
      </p>
    </div>
  )
}

function Affirmation() {
  const [index, setIndex] = useState(null)

  const next = () =>
    setIndex((current) => {
      let pick = Math.floor(Math.random() * AFFIRMATIONS.length)
      if (pick === current) pick = (pick + 1) % AFFIRMATIONS.length
      return pick
    })

  return (
    <div className="rounded-3xl bg-white/5 p-6 ring-1 ring-white/10 sm:p-7">
      <div className="min-h-24" aria-live="polite">
        <AnimatePresence mode="wait">
          <motion.p
            key={index ?? 'kosong'}
            initial={{ opacity: 0, y: 10, filter: 'blur(6px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -10, filter: 'blur(6px)' }}
            transition={{ duration: 0.5, ease: EASE }}
            className="font-display text-2xl leading-snug text-white"
          >
            {index === null ? 'Ada satu kalimat yang menunggumu di sini.' : `“${AFFIRMATIONS[index]}”`}
          </motion.p>
        </AnimatePresence>
      </div>
      <Button variant="outlineLight" size="sm" iconLeft={Sparkles} onClick={next} className="mt-5">
        Ambil satu kalimat untuk hari ini
      </Button>
    </div>
  )
}

export default function CalmRoom() {
  return (
    <section id="tenang" aria-labelledby="judul-tenang" className="py-12 sm:py-20">
      <div className="shell">
        <div className="dark night-sky relative overflow-hidden rounded-[2.5rem] px-6 py-16 text-ink sm:px-12 sm:py-20 lg:px-16">
          <Stars />
          <div className="relative grid items-center gap-14 lg:grid-cols-2">
            <div>
              <SectionHeading
                id="judul-tenang"
                number="09"
                kicker="Ruang Tenang"
                title={
                  <>
                    Kalau dadamu sedang <Accent tone="tide">sesak</Accent>
                  </>
                }
                description="Ini bukan pengganti bantuan profesional. Ini hanya satu menit untuk menurunkan detak jantungmu: bisa dipakai di ruang tunggu, di angkot, atau di kamar pukul dua pagi."
              />
              <Reveal delay={0.15} className="mt-10">
                <Affirmation />
              </Reveal>
            </div>
            <Reveal delay={0.1}>
              <Breather />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
