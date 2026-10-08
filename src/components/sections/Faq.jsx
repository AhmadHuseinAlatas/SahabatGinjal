import { Plus } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useState } from 'react'
import { FAQ } from '../../data/faq'
import { EASE } from '../../lib/motion'
import Accent from '../ui/Accent'
import Reveal from '../ui/Reveal'
import SectionHeading from '../ui/SectionHeading'

export default function Faq() {
  const [openId, setOpenId] = useState(FAQ[0].id)

  return (
    <section id="tanya" aria-labelledby="judul-tanya" className="py-24 sm:py-32">
      <div className="shell grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading
            id="judul-tanya"
            number="18"
            kicker="Tanya jujur"
            title={
              <>
                Hal yang <Accent tone="coral">malu ditanyakan</Accent> di depan dokter
              </>
            }
            description="Tidak ada pertanyaan bodoh. Ini beberapa yang paling sering dibisikkan di ruang tunggu."
          />
        </div>

        <Reveal delay={0.08}>
          <ul className="divide-y divide-line border-y border-line">
            {FAQ.map((item) => {
              const open = item.id === openId
              return (
                <li key={item.id}>
                  <h3>
                    <button
                      type="button"
                      id={`tanya-${item.id}`}
                      aria-expanded={open}
                      aria-controls={open ? `jawab-${item.id}` : undefined}
                      onClick={() => setOpenId(open ? null : item.id)}
                      className="flex w-full items-start justify-between gap-5 py-5 text-left"
                    >
                      <span className="font-display text-xl leading-snug text-ink sm:text-2xl">{item.q}</span>
                      <motion.span
                        aria-hidden="true"
                        animate={{ rotate: open ? 45 : 0 }}
                        transition={{ duration: 0.3, ease: EASE }}
                        className="mt-0.5 grid size-9 shrink-0 place-items-center rounded-full text-ink ring-1 ring-line-strong"
                      >
                        <Plus className="size-4" />
                      </motion.span>
                    </button>
                  </h3>

                  <AnimatePresence initial={false}>
                    {open && (
                      <motion.div
                        key="isi"
                        id={`jawab-${item.id}`}
                        role="region"
                        aria-labelledby={`tanya-${item.id}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: EASE }}
                        className="overflow-hidden"
                      >
                        <p className="max-w-2xl pb-6 leading-relaxed text-ink-soft">{item.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              )
            })}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}
