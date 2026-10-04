import { Info } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useRef, useState } from 'react'
import { DIALYSIS_OPTIONS } from '../../data/dialysis'
import { cn } from '../../lib/cn'
import { EASE } from '../../lib/motion'
import { TONES } from '../../lib/tones'
import Accent from '../ui/Accent'
import IconBadge from '../ui/IconBadge'
import Reveal from '../ui/Reveal'
import SectionHeading from '../ui/SectionHeading'

function Schedule({ schedule, tone }) {
  return (
    <div className="mt-8">
      <p className="kicker text-ink-faint">{schedule.title}</p>
      <ul className="mt-3 flex flex-wrap gap-2">
        {schedule.items.map((item) => (
          <li
            key={item.label}
            className={cn(
              'grid min-w-14 place-items-center rounded-xl px-3 py-2 text-sm font-semibold ring-1',
              item.active ? cn(TONES[tone].chip, 'ring-transparent') : 'text-ink-faint ring-line',
            )}
          >
            {item.label}
            {item.active && <span className="sr-only"> (jadwal dialisis)</span>}
          </li>
        ))}
      </ul>
      <p className="mt-3 text-sm text-ink-faint">{schedule.caption}</p>
    </div>
  )
}

export default function DialysisOptions() {
  const [activeId, setActiveId] = useState(DIALYSIS_OPTIONS[0].id)
  const tabRefs = useRef({})
  const option = DIALYSIS_OPTIONS.find((item) => item.id === activeId)

  const onKeyDown = (event) => {
    if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return
    event.preventDefault()
    const index = DIALYSIS_OPTIONS.findIndex((item) => item.id === activeId)
    const step = event.key === 'ArrowRight' ? 1 : -1
    const next = DIALYSIS_OPTIONS[(index + step + DIALYSIS_OPTIONS.length) % DIALYSIS_OPTIONS.length]
    setActiveId(next.id)
    tabRefs.current[next.id]?.focus()
  }

  return (
    <section id="pilihan" aria-labelledby="judul-pilihan" className="py-24 sm:py-32">
      <div className="shell">
        <SectionHeading
          id="judul-pilihan"
          number="03"
          kicker="Kamu punya pilihan"
          title={
            <>
              Dua jalan, <Accent tone="leaf">satu tujuan</Accent>
            </>
          }
          description="Banyak orang tidak tahu bahwa cuci darah tidak hanya satu bentuk. Keduanya dijamin BPJS. Mana yang cocok tergantung kondisi tubuh, rumah, dan ritme hidupmu."
        />

        <Reveal className="mt-12">
          <div
            role="tablist"
            aria-label="Jenis cuci darah"
            className="inline-flex rounded-full bg-surface/70 p-1.5 ring-1 ring-line"
          >
            {DIALYSIS_OPTIONS.map((item) => {
              const active = item.id === activeId
              return (
                <button
                  key={item.id}
                  ref={(el) => {
                    tabRefs.current[item.id] = el
                  }}
                  role="tab"
                  type="button"
                  id={`tab-${item.id}`}
                  aria-selected={active}
                  aria-controls={`panel-${item.id}`}
                  tabIndex={active ? 0 : -1}
                  onClick={() => setActiveId(item.id)}
                  onKeyDown={onKeyDown}
                  className={cn(
                    'relative min-h-11 rounded-full px-5 text-sm font-semibold transition-colors sm:px-6',
                    active ? 'text-brand-ink' : 'text-ink-soft hover:text-ink',
                  )}
                >
                  {active && (
                    <motion.span
                      layoutId="dialysis-tab"
                      aria-hidden="true"
                      className="absolute inset-0 rounded-full bg-brand"
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span className="relative">{item.tab}</span>
                </button>
              )
            })}
          </div>
        </Reveal>

        <Reveal delay={0.08} className="mt-6">
          <div className="card overflow-hidden">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={option.id}
                role="tabpanel"
                id={`panel-${option.id}`}
                aria-labelledby={`tab-${option.id}`}
                tabIndex={0}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.4, ease: EASE }}
                className="grid gap-10 p-7 sm:p-10 lg:grid-cols-[1fr_1.1fr] lg:gap-14"
              >
                <div>
                  <div className="flex items-center gap-4">
                    <IconBadge icon={option.icon} tone={option.tone} size="lg" />
                    <span className={cn('rounded-full px-3 py-1 text-sm font-semibold', TONES[option.tone].chip)}>
                      {option.where}
                    </span>
                  </div>
                  <h3 className="mt-6 font-display text-4xl leading-tight text-ink">{option.name}</h3>
                  <p className="mt-3 text-lg leading-relaxed text-ink-soft">{option.tagline}</p>
                  <p
                    className={cn(
                      'mt-6 border-l-2 pl-5 font-display text-lg leading-relaxed text-ink italic',
                      TONES[option.tone].border,
                    )}
                  >
                    {option.note}
                  </p>
                  <Schedule schedule={option.schedule} tone={option.tone} />
                </div>

                <dl className="grid content-start divide-y divide-line">
                  {option.facts.map((fact) => (
                    <div key={fact.label} className="grid gap-1 py-4 first:pt-0 sm:grid-cols-[7rem_1fr] sm:gap-4">
                      <dt className={cn('kicker pt-1', TONES[option.tone].text)}>{fact.label}</dt>
                      <dd className="leading-relaxed text-ink">{fact.value}</dd>
                    </div>
                  ))}
                </dl>
              </motion.div>
            </AnimatePresence>
          </div>
        </Reveal>

        <Reveal delay={0.12}>
          <p className="mt-6 flex max-w-3xl gap-3 text-sm leading-relaxed text-ink-faint">
            <Info aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
            Tidak semua orang bebas memilih: kondisi jantung, riwayat operasi perut, sampai kondisi
            rumah ikut menentukan. Tanyakan keduanya ke dokter, jangan tunggu ditawari.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
