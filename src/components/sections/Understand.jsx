import { motion } from 'motion/react'
import { BASICS, KIDNEY_FACTS } from '../../data/basics'
import { cn } from '../../lib/cn'
import { EASE, VIEWPORT } from '../../lib/motion'
import Accent from '../ui/Accent'
import IconBadge from '../ui/IconBadge'
import SectionHeading from '../ui/SectionHeading'
import { Stagger, StaggerItem } from '../ui/Stagger'

const SPANS = ['lg:col-span-7', 'lg:col-span-5', 'lg:col-span-5', 'lg:col-span-7']

function Facts() {
  return (
    <ul className="mt-6 grid gap-2 sm:grid-cols-3">
      {KIDNEY_FACTS.map((fact) => (
        <li key={fact.value} className="rounded-2xl bg-tide-50/80 p-4 ring-1 ring-tide-200 dark:bg-tide-400/10 dark:ring-tide-400/25">
          <span className="block font-display text-2xl leading-none text-accent">{fact.value}</span>
          <span className="mt-1.5 block text-sm leading-snug text-ink-soft">{fact.label}</span>
        </li>
      ))}
    </ul>
  )
}

function Meter() {
  return (
    <div className="mt-6" role="img" aria-label="Ilustrasi: dialisis biasanya dimulai saat fungsi ginjal tinggal sekitar 10 sampai 15 persen.">
      <div className="flex justify-between text-sm text-ink-faint">
        <span>Fungsi ginjal</span>
        <span className="font-semibold text-warm">±10–15%: saatnya dialisis</span>
      </div>
      <div className="mt-2 h-3 overflow-hidden rounded-full bg-surface-muted ring-1 ring-line">
        <motion.div
          initial={{ scaleX: 1 }}
          whileInView={{ scaleX: 0.14 }}
          viewport={VIEWPORT}
          transition={{ duration: 2.2, delay: 0.3, ease: EASE }}
          className="h-full origin-left rounded-full bg-linear-to-r from-coral-500 via-sprout-400 to-leaf-500"
        />
      </div>
    </div>
  )
}

export default function Understand() {
  return (
    <section id="paham" aria-labelledby="judul-paham" className="py-24 sm:py-32">
      <div className="shell">
        <SectionHeading
          id="judul-paham"
          number="02"
          kicker="Penjelasan tanpa istilah menakutkan"
          title={
            <>
              Sebenarnya, <Accent tone="tide">apa yang terjadi?</Accent>
            </>
          }
          description="Empat hal yang biasanya tidak sempat dijelaskan di ruang periksa yang ramai."
        />

        <Stagger className="mt-14 grid gap-5 lg:grid-cols-12">
          {BASICS.map((item, index) => (
            <StaggerItem key={item.id} as="article" className={cn('card relative p-7 sm:p-9', SPANS[index])}>
              <div className="flex items-start justify-between gap-4">
                <IconBadge icon={item.icon} tone={item.tone} size="lg" />
                <span aria-hidden="true" className="font-display text-4xl text-ink-faint/40">
                  {String(index + 1).padStart(2, '0')}
                </span>
              </div>
              <h3 className="mt-6 font-display text-2xl leading-snug text-ink sm:text-[1.75rem]">{item.title}</h3>
              <p className="mt-3 leading-relaxed text-ink-soft">{item.body}</p>
              {item.visual === 'facts' && <Facts />}
              {item.visual === 'meter' && <Meter />}
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  )
}
