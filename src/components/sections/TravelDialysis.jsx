import { Calendar, Check, Luggage, ShieldAlert } from 'lucide-react'
import { motion } from 'motion/react'
import { TRAVEL_CHECKLIST, TRAVEL_STEPS } from '../../data/travel'
import useLocalStorage from '../../hooks/useLocalStorage'
import { cn } from '../../lib/cn'
import Accent from '../ui/Accent'
import SectionHeading from '../ui/SectionHeading'

export default function TravelDialysis() {
  const [checked, setChecked] = useLocalStorage('sg-travel-kit', [])
  const checkedList = Array.isArray(checked) ? checked : []
  const done = TRAVEL_CHECKLIST.filter((item) => checkedList.includes(item.id)).length

  const toggle = (id) => {
    setChecked((list) => {
      const current = Array.isArray(list) ? list : []
      return current.includes(id) ? current.filter((val) => val !== id) : [...current, id]
    })
  }

  return (
    <section id="bepergian" aria-labelledby="judul-bepergian" className="py-24 sm:py-32">
      <div className="shell">
        <SectionHeading
          id="judul-bepergian"
          number="16"
          kicker="Traveling Dialysis"
          title={
            <>
              Tetap bisa <Accent tone="leaf">mudik &amp; bepergian</Accent>
            </>
          }
          description="Cuci darah bukan berarti kamu harus terkurung di rumah selamanya. Dengan persiapan dokumen 2–3 minggu sebelumnya, kamu bisa tetap berkunjung ke kota lain dengan aman."
        />

        <div className="mt-14 grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
          {/* Timeline Langkah Persiapan */}
          <div>
            <h3 className="font-display text-2xl text-ink">4 Langkah Persiapan Sesi Tamu</h3>
            <p className="mt-1 text-sm text-ink-soft">
              Alur umum memesan slot mesin cuci darah di rumah sakit kota tujuan:
            </p>

            <ol className="relative mt-8 grid gap-8 border-l border-line pl-6">
              {TRAVEL_STEPS.map((step) => (
                <li key={step.step} className="relative">
                  <span
                    aria-hidden="true"
                    className="absolute -left-[2.1rem] top-0 grid size-8 place-items-center rounded-full bg-brand font-display text-xs text-brand-ink"
                  >
                    {step.step}
                  </span>
                  <div className="flex items-center gap-2 text-xs font-semibold text-accent">
                    <Calendar className="size-3.5" />
                    <span>{step.time}</span>
                  </div>
                  <h4 className="mt-1 font-display text-xl text-ink">{step.title}</h4>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">{step.desc}</p>
                </li>
              ))}
            </ol>
          </div>

          {/* Checklist Berkas Tas Kabin */}
          <div>
            <div className="card p-7 sm:p-9">
              <div className="flex items-start justify-between gap-3 border-b border-line pb-5">
                <div className="flex items-center gap-3">
                  <span className="grid size-10 place-items-center rounded-xl bg-leaf-100 text-leaf-800 dark:bg-leaf-400/20 dark:text-leaf-300">
                    <Luggage className="size-5" />
                  </span>
                  <div>
                    <h3 className="font-display text-xl text-ink">Berkas &amp; Bawaan Traveling</h3>
                    <p className="text-xs text-ink-faint">Wajib dibawa di tas jinjing (kabin)</p>
                  </div>
                </div>

                <span className="shrink-0 rounded-full bg-surface-muted px-3 py-1 text-xs font-bold text-primary">
                  {done}/{TRAVEL_CHECKLIST.length} siap
                </span>
              </div>

              {/* Progress Bar */}
              <div aria-hidden="true" className="mt-4 h-1.5 overflow-hidden rounded-full bg-surface-muted">
                <motion.div
                  animate={{ scaleX: done / TRAVEL_CHECKLIST.length }}
                  initial={false}
                  transition={{ type: 'spring', stiffness: 200, damping: 30 }}
                  className="h-full origin-left rounded-full bg-leaf-500"
                />
              </div>

              <ul className="mt-6 grid gap-2">
                {TRAVEL_CHECKLIST.map((item) => {
                  const isChecked = checkedList.includes(item.id)
                  return (
                    <li key={item.id}>
                      <label className="flex cursor-pointer items-start gap-3 rounded-xl p-2.5 transition-colors hover:bg-surface-muted">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => toggle(item.id)}
                          className="peer sr-only"
                        />
                        <span
                          aria-hidden="true"
                          className={cn(
                            'mt-0.5 grid size-5 shrink-0 place-items-center rounded-md ring-1 transition-colors',
                            isChecked ? 'bg-leaf-500 text-white ring-leaf-500' : 'ring-line-strong',
                          )}
                        >
                          {isChecked && <Check className="size-3.5" strokeWidth={3} />}
                        </span>
                        <div>
                          <span
                            className={cn(
                              'block text-sm font-semibold leading-snug',
                              isChecked ? 'text-ink-faint line-through' : 'text-ink',
                            )}
                          >
                            {item.label}
                          </span>
                          <span className="mt-0.5 block text-xs text-ink-faint no-underline">
                            {item.note}
                          </span>
                        </div>
                      </label>
                    </li>
                  )
                })}
              </ul>

              <div className="mt-6 flex items-start gap-2.5 rounded-xl bg-coral-50/90 p-4 text-xs text-warm ring-1 ring-coral-200 dark:bg-coral-400/10 dark:ring-coral-400/25">
                <ShieldAlert className="mt-0.5 size-4 shrink-0" />
                <span>
                  <strong>Penting:</strong> Jangan berangkat tanpa konfirmasi slot tertulis dari RS tujuan. Menghadiri jadwal dialisis tepat waktu sangat penting agar tidak terjadi overload cairan selama perjalanan.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
