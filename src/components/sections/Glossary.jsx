import { BookOpen, ChevronDown, Search } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useState } from 'react'
import { GLOSSARY_TERMS } from '../../data/glossary'
import { EASE } from '../../lib/motion'
import Accent from '../ui/Accent'
import Reveal from '../ui/Reveal'
import SectionHeading from '../ui/SectionHeading'

export default function Glossary() {
  const [query, setQuery] = useState('')
  const [expandedId, setExpandedId] = useState(null)

  const filtered = GLOSSARY_TERMS.filter((item) => {
    const q = query.toLowerCase()
    return (
      item.term.toLowerCase().includes(q) ||
      item.pronounce.toLowerCase().includes(q) ||
      item.summary.toLowerCase().includes(q) ||
      item.details.toLowerCase().includes(q)
    )
  })

  const toggle = (id) => {
    setExpandedId((prev) => (prev === id ? null : id))
  }

  return (
    <section id="istilah" aria-labelledby="judul-istilah" className="py-24 sm:py-32">
      <div className="shell">
        <SectionHeading
          id="judul-istilah"
          number="07"
          kicker="Kamus Bahasa Manusia"
          title={
            <>
              Istilah medis yang <Accent tone="tide">sering didengar</Accent>
            </>
          }
          description="Dokter dan perawat sering berbicara dengan singkatan yang terdengar membingungkan. Ini terjemahan sederhananya agar kamu tidak lagi merasa asing."
        />

        {/* Search Bar */}
        <Reveal className="mt-12">
          <div className="relative max-w-xl">
            <Search className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-ink-faint" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Cari istilah (contoh: cimino, dry weight, CDL, kalium)..."
              className="min-h-12 w-full rounded-full bg-surface pr-4 pl-10 text-sm text-ink ring-1 ring-line placeholder:text-ink-faint focus-visible:ring-2 focus-visible:ring-accent"
            />
          </div>
        </Reveal>

        {/* List of Terms */}
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {filtered.map((item) => {
            const isExpanded = expandedId === item.id
            return (
              <motion.article
                key={item.id}
                layout
                className="card overflow-hidden p-6 transition-all duration-300 hover:ring-line-strong"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="inline-block rounded-full bg-tide-100 px-2.5 py-0.5 text-xs font-semibold text-tide-800 dark:bg-tide-400/20 dark:text-tide-300">
                      {item.badge}
                    </span>
                    <h3 className="mt-2 font-display text-2xl text-ink">{item.term}</h3>
                    <p className="text-xs font-medium text-ink-faint italic">{item.pronounce}</p>
                  </div>

                  <button
                    type="button"
                    onClick={() => toggle(item.id)}
                    aria-expanded={isExpanded}
                    aria-label={`Lihat detail ${item.term}`}
                    className="grid size-9 shrink-0 place-items-center rounded-full text-ink ring-1 ring-line hover:bg-surface-muted"
                  >
                    <motion.span animate={{ rotate: isExpanded ? 180 : 0 }} transition={{ duration: 0.2 }}>
                      <ChevronDown className="size-4" />
                    </motion.span>
                  </button>
                </div>

                <p className="mt-3 text-sm leading-relaxed text-ink-soft">{item.summary}</p>

                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: EASE }}
                      className="overflow-hidden"
                    >
                      <div className="mt-4 border-t border-line/70 pt-4 text-xs leading-relaxed text-ink-soft sm:text-sm">
                        <p className="rounded-xl bg-surface-muted/60 p-3.5 ring-1 ring-line/50">
                          {item.details}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.article>
            )
          })}
        </div>

        {filtered.length === 0 && (
          <div className="mt-8 rounded-2xl border border-dashed border-line p-10 text-center text-ink-faint">
            <BookOpen className="mx-auto size-8 text-ink-faint/60" />
            <p className="mt-3 font-semibold text-ink">Istilah belum ada di glosarium</p>
            <p className="mt-1 text-sm">Tanyakan istilah tersebut langsung ke perawat atau doktermu.</p>
          </div>
        )}
      </div>
    </section>
  )
}
