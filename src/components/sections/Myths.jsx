import { RotateCcw } from 'lucide-react'
import { motion } from 'motion/react'
import { useState } from 'react'
import { MYTHS } from '../../data/myths'
import { EASE } from '../../lib/motion'
import Accent from '../ui/Accent'
import SectionHeading from '../ui/SectionHeading'
import { Stagger, StaggerItem } from '../ui/Stagger'

function MythCard({ item }) {
  const [flipped, setFlipped] = useState(false)

  return (
    <button
      type="button"
      aria-pressed={flipped}
      aria-label={flipped ? `Fakta: ${item.fact}` : `Mitos: ${item.myth} Ketuk untuk melihat faktanya.`}
      onClick={() => setFlipped((value) => !value)}
      className="group block h-full w-full rounded-[1.75rem] text-left perspective-[1200px]"
    >
      <motion.span
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.7, ease: EASE }}
        className="grid h-full transform-3d"
      >
        <span className="card flex min-h-64 flex-col p-7 backface-hidden [grid-area:1/1]">
          <span className="kicker text-warm">Mitos</span>
          <span className="mt-4 font-display text-2xl leading-snug text-ink">“{item.myth}”</span>
          <span className="mt-auto flex items-center gap-2 pt-6 text-sm text-ink-faint transition-colors group-hover:text-ink">
            <RotateCcw aria-hidden="true" className="size-4" />
            Ketuk untuk membalik
          </span>
        </span>

        <span className="card flex min-h-64 flex-col bg-leaf-50 p-7 rotate-y-180 backface-hidden [grid-area:1/1] dark:bg-leaf-950">
          <span className="kicker text-primary">Faktanya</span>
          <span className="mt-4 leading-relaxed text-ink">{item.fact}</span>
        </span>
      </motion.span>
    </button>
  )
}

export default function Myths() {
  return (
    <section id="mitos" aria-labelledby="judul-mitos" className="py-24 sm:py-32">
      <div className="shell">
        <SectionHeading
          id="judul-mitos"
          number="10"
          kicker="Bersihkan dulu kepalanya"
          title={
            <>
              Yang orang bilang <Accent tone="tide">vs</Accent> yang sebenarnya
            </>
          }
          description="Ketuk kartunya untuk membalik."
        />

        <Stagger as="ul" className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {MYTHS.map((item) => (
            <StaggerItem as="li" key={item.id}>
              <MythCard item={item} />
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  )
}
