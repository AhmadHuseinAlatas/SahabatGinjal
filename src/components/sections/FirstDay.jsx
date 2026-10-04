import { Check } from 'lucide-react'
import { motion, useScroll, useSpring } from 'motion/react'
import { useRef } from 'react'
import { BAG_KIT, FIRST_DAY_STEPS } from '../../data/firstDay'
import useLocalStorage from '../../hooks/useLocalStorage'
import { cn } from '../../lib/cn'
import Accent from '../ui/Accent'
import Reveal from '../ui/Reveal'
import SectionHeading from '../ui/SectionHeading'

function Timeline() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 75%', 'end 55%'] })
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 })

  return (
    <ol ref={ref} className="relative grid gap-10">
      <span aria-hidden="true" className="absolute top-2 bottom-2 left-6 w-px bg-line-strong" />
      <motion.span
        aria-hidden="true"
        style={{ scaleY }}
        className="absolute top-2 bottom-2 left-6 w-0.5 -translate-x-[0.5px] origin-top rounded-full bg-linear-to-b from-leaf-500 via-tide-400 to-coral-400"
      />
      {FIRST_DAY_STEPS.map((step, index) => (
        <Reveal as="li" key={step.id} delay={index * 0.04} className="relative grid grid-cols-[3rem_1fr] gap-5">
          <span
            aria-hidden="true"
            className="relative z-10 grid size-12 place-items-center rounded-full bg-surface text-primary shadow-card ring-1 ring-line"
          >
            <step.icon className="size-5" strokeWidth={1.75} />
          </span>
          <div className="pt-1">
            <p className="kicker text-accent">{step.time}</p>
            <h3 className="mt-2 font-display text-2xl leading-snug text-ink">{step.title}</h3>
            <p className="mt-2 max-w-xl leading-relaxed text-ink-soft">{step.body}</p>
          </div>
        </Reveal>
      ))}
    </ol>
  )
}

function BagChecklist() {
  const [checked, setChecked] = useLocalStorage('sg-kit', [])
  const done = BAG_KIT.filter((item) => checked.includes(item.id)).length

  const toggle = (id) =>
    setChecked((list) => (list.includes(id) ? list.filter((value) => value !== id) : [...list, id]))

  return (
    <div className="card p-6 sm:p-7">
      <div className="flex items-baseline justify-between gap-4">
        <h3 id="judul-tas" className="font-display text-2xl leading-snug text-ink">
          Isi tas yang sering menyelamatkan
        </h3>
        <p className="shrink-0 text-sm font-semibold text-primary" aria-live="polite">
          {done}/{BAG_KIT.length} siap
        </p>
      </div>
      <div aria-hidden="true" className="mt-4 h-1.5 overflow-hidden rounded-full bg-surface-muted">
        <motion.div
          animate={{ scaleX: done / BAG_KIT.length }}
          initial={false}
          transition={{ type: 'spring', stiffness: 200, damping: 30 }}
          className="h-full origin-left rounded-full bg-leaf-500"
        />
      </div>

      <ul aria-labelledby="judul-tas" className="mt-5 grid gap-1">
        {BAG_KIT.map((item) => {
          const isChecked = checked.includes(item.id)
          return (
            <li key={item.id}>
              <label className="flex cursor-pointer items-center gap-3 rounded-xl px-2 py-2.5 transition-colors hover:bg-surface-muted">
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => toggle(item.id)}
                  className="peer sr-only"
                />
                <span
                  aria-hidden="true"
                  className={cn(
                    'grid size-6 shrink-0 place-items-center rounded-lg ring-1 transition-colors peer-focus-visible:outline-3 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-accent',
                    isChecked ? 'bg-leaf-500 text-white ring-leaf-500' : 'ring-line-strong',
                  )}
                >
                  {isChecked && <Check className="size-4" strokeWidth={3} />}
                </span>
                <item.icon aria-hidden="true" className="size-5 shrink-0 text-ink-faint" strokeWidth={1.75} />
                <span className={cn('leading-snug', isChecked ? 'text-ink-faint line-through' : 'text-ink')}>
                  {item.label}
                  <span className="block text-sm text-ink-faint no-underline">{item.note}</span>
                </span>
              </label>
            </li>
          )
        })}
      </ul>
      <p className="mt-4 text-xs text-ink-faint">Centangmu tersimpan di perangkat ini saja.</p>
    </div>
  )
}

export default function FirstDay() {
  return (
    <section id="hari-pertama" aria-labelledby="judul-hari-pertama" className="py-24 sm:py-32">
      <div className="shell">
        <SectionHeading
          id="judul-hari-pertama"
          number="04"
          kicker="Supaya tidak ada kejutan"
          title={
            <>
              Hari pertamamu, <Accent tone="coral">menit per menit</Accent>
            </>
          }
          description="Rasa takut paling sering datang dari tidak tahu. Ini gambaran umum satu sesi hemodialisis; detailnya bisa berbeda di tiap unit."
        />

        <div className="mt-16 grid gap-14 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16">
          <Timeline />
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Reveal>
              <BagChecklist />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
