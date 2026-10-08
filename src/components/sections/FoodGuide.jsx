import { AlertCircle, CheckCircle2, ChevronRight, HelpCircle, Search, UtensilsCrossed } from 'lucide-react'
import { motion } from 'motion/react'
import { useState } from 'react'
import { FOOD_CATEGORIES, FOOD_ITEMS, LEACHING_STEPS } from '../../data/foodGuide'
import { cn } from '../../lib/cn'
import Accent from '../ui/Accent'
import Reveal from '../ui/Reveal'
import SectionHeading from '../ui/SectionHeading'

const BADGE_STYLES = {
  safe: {
    bg: 'bg-leaf-100 text-leaf-800 dark:bg-leaf-400/20 dark:text-leaf-300 ring-leaf-300/60',
    icon: CheckCircle2,
    iconColor: 'text-primary',
  },
  moderate: {
    bg: 'bg-sprout-200/80 text-leaf-900 dark:bg-sprout-400/20 dark:text-sprout-300 ring-sprout-300/60',
    icon: HelpCircle,
    iconColor: 'text-sprout-600 dark:text-sprout-400',
  },
  limit: {
    bg: 'bg-coral-100 text-coral-800 dark:bg-coral-400/20 dark:text-coral-300 ring-coral-300/60',
    icon: AlertCircle,
    iconColor: 'text-warm',
  },
}

export default function FoodGuide() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [query, setQuery] = useState('')
  const [levelFilter, setLevelFilter] = useState('all')

  const filteredFoods = FOOD_ITEMS.filter((item) => {
    const matchCategory = selectedCategory === 'all' || item.category === selectedCategory
    const matchLevel = levelFilter === 'all' || item.level === levelFilter
    const matchQuery =
      query === '' ||
      item.name.toLowerCase().includes(query.toLowerCase()) ||
      item.note.toLowerCase().includes(query.toLowerCase())
    return matchCategory && matchLevel && matchQuery
  })

  return (
    <section id="makanan" aria-labelledby="judul-makanan" className="py-24 sm:py-32">
      <div className="shell">
        <SectionHeading
          id="judul-makanan"
          number="13"
          kicker="Panduan Nutrisi Ginjal"
          title={
            <>
              Makan tenang tanpa <Accent tone="coral">takut salah</Accent>
            </>
          }
          description="Banyak pasien takut makan apa pun setelah didiagnosis. Padahal tubuhmu tetap butuh tenaga dan protein. Ini panduan bahan makanan lokal sehari-hari."
        />

        {/* Filter Bar & Search */}
        <Reveal className="mt-12">
          <div className="card p-5 sm:p-6">
            <div className="grid gap-4 md:grid-cols-[1fr_auto]">
              {/* Search input */}
              <div className="relative">
                <Search className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-ink-faint" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Cari makanan (contoh: pisang, kelapa, tahu, bayam)..."
                  className="min-h-11 w-full rounded-full bg-surface pr-4 pl-10 text-sm text-ink ring-1 ring-line placeholder:text-ink-faint focus-visible:ring-2 focus-visible:ring-accent"
                />
              </div>

              {/* Filter Level (Aman / Dibatasi) */}
              <div className="flex flex-wrap items-center gap-1.5">
                {[
                  { id: 'all', label: 'Semua Status' },
                  { id: 'safe', label: '🟢 Aman' },
                  { id: 'moderate', label: '🟡 Porsi Sedang' },
                  { id: 'limit', label: '🔴 Wajib Dibatasi' },
                ].map((lvl) => (
                  <button
                    key={lvl.id}
                    type="button"
                    onClick={() => setLevelFilter(lvl.id)}
                    className={cn(
                      'rounded-full px-3 py-1.5 text-xs font-semibold ring-1 transition-all',
                      levelFilter === lvl.id
                        ? 'bg-brand text-brand-ink ring-brand'
                        : 'bg-surface text-ink-soft ring-line hover:text-ink',
                    )}
                  >
                    {lvl.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Kategori Tabs */}
            <div className="mt-4 flex flex-wrap gap-2 border-t border-line pt-4">
              {FOOD_CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id)}
                  className={cn(
                    'rounded-xl px-3.5 py-1.5 text-xs font-semibold transition-colors',
                    selectedCategory === cat.id
                      ? 'bg-primary/15 font-bold text-primary ring-1 ring-primary/30'
                      : 'text-ink-soft hover:bg-surface hover:text-ink',
                  )}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Daftar Kartu Makanan */}
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredFoods.map((item) => {
            const style = BADGE_STYLES[item.level]
            const Icon = style.icon
            return (
              <motion.article
                key={item.id}
                layout
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="card flex flex-col justify-between p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-card"
              >
                <div>
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-display text-xl text-ink">{item.name}</h3>
                    <span
                      className={cn(
                        'inline-flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-bold ring-1',
                        style.bg,
                      )}
                    >
                      <Icon className={cn('size-3.5', style.iconColor)} />
                      <span>{item.levelLabel}</span>
                    </span>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-ink-soft">{item.note}</p>
                </div>
              </motion.article>
            )
          })}
        </div>

        {filteredFoods.length === 0 && (
          <div className="mt-8 rounded-2xl border border-dashed border-line p-12 text-center text-ink-faint">
            <UtensilsCrossed className="mx-auto size-8 text-ink-faint/60" />
            <p className="mt-3 text-base font-semibold text-ink">Makanan tidak ditemukan</p>
            <p className="mt-1 text-sm">Coba kata kunci lain atau pilih kategori &quot;Semua Makanan&quot;.</p>
          </div>
        )}

        {/* Cara Leaching (Menurunkan Kalium) */}
        <Reveal delay={0.1} className="mt-14">
          <div className="rounded-[2.5rem] bg-surface-muted/70 p-8 ring-1 ring-line sm:p-12">
            <div className="max-w-2xl">
              <span className="kicker text-primary">Tips Dapur Sahabat</span>
              <h3 className="mt-2 font-display text-2xl text-ink sm:text-3xl">
                Teknik <Accent tone="leaf">Leaching</Accent>: Cara Mengurangi Kalium Sayuran
              </h3>
              <p className="mt-3 text-base leading-relaxed text-ink-soft">
                Kamu tetap bisa makan sayur dengan aman! Kalium larut dalam air. Dengan teknik perendaman ini, kadar kalium pada kentang, wortel, dan sayuran bisa berkurang hingga 40–50%.
              </p>
            </div>

            <div className="mt-8 grid gap-5 md:grid-cols-3">
              {LEACHING_STEPS.map((step) => (
                <div key={step.step} className="rounded-2xl bg-surface p-6 ring-1 ring-line">
                  <span className="grid size-9 place-items-center rounded-xl bg-leaf-100 font-display text-base font-bold text-leaf-800 dark:bg-leaf-400/20 dark:text-leaf-300">
                    {step.step}
                  </span>
                  <p className="mt-4 font-semibold text-ink">{step.title}</p>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">{step.body}</p>
                </div>
              ))}
            </div>

            <p className="mt-6 flex items-center gap-2 text-xs text-ink-faint">
              <ChevronRight className="size-3.5 text-primary" />
              Ingat: Air rendaman dan air rebusan pertama selalu dibuang, jangan dijadikan kuah sup!
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
