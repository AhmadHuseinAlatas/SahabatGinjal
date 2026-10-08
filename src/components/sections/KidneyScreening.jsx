import { ArrowRight, CheckCircle2, RotateCcw, ShieldAlert, Sparkles, Stethoscope } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useState } from 'react'
import { RISK_LEVELS, RISK_QUESTIONS } from '../../data/prevention'
import { cn } from '../../lib/cn'
import { EASE } from '../../lib/motion'
import Accent from '../ui/Accent'
import Button from '../ui/Button'
import Reveal from '../ui/Reveal'
import SectionHeading from '../ui/SectionHeading'

export default function KidneyScreening() {
  const [answers, setAnswers] = useState({})
  const [submitted, setSubmitted] = useState(false)

  const answeredCount = Object.keys(answers).length
  const totalQuestions = RISK_QUESTIONS.length
  const isComplete = answeredCount === totalQuestions

  const handleSelect = (questionId, points) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: points,
    }))
  }

  const calculateScore = () => {
    return Object.values(answers).reduce((acc, curr) => acc + curr, 0)
  }

  const totalScore = calculateScore()

  const getResult = () => {
    if (totalScore <= 2) return RISK_LEVELS.low
    if (totalScore <= 5) return RISK_LEVELS.medium
    return RISK_LEVELS.high
  }

  const result = getResult()

  const handleReset = () => {
    setAnswers({})
    setSubmitted(false)
  }

  return (
    <section id="skrining" aria-labelledby="judul-skrining" className="py-24 sm:py-32">
      <div className="shell">
        <SectionHeading
          id="judul-skrining"
          number="02"
          kicker="Deteksi Dini & Pencegahan"
          title={
            <>
              Cek risiko ginjalmu dalam <Accent tone="leaf">1 menit</Accent>
            </>
          }
          description="Ginjal tidak memiliki saraf nyeri di dalamnya; kerusakan sering kali berjalan senyap tanpa keluhan. Jawab 6 pertanyaan sederhana ini untuk mengetahui kondisi risikomu."
        />

        <div className="mt-14 grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14">
          {/* Form Kuesioner */}
          <div>
            <div className="space-y-6">
              {RISK_QUESTIONS.map((q, qIndex) => {
                const selectedPoint = answers[q.id]
                return (
                  <Reveal key={q.id} delay={qIndex * 0.05}>
                    <div className="card p-6 transition-all duration-300 hover:ring-line-strong">
                      <p className="flex items-center gap-2 text-xs font-bold text-accent uppercase tracking-wider">
                        <span>Pertanyaan {qIndex + 1} dari {totalQuestions}</span>
                      </p>
                      <h3 className="mt-2 font-display text-lg leading-snug text-ink sm:text-xl">
                        {q.question}
                      </h3>

                      <div className="mt-4 grid gap-2.5">
                        {q.options.map((opt) => {
                          const isSelected = selectedPoint === opt.points
                          return (
                            <button
                              key={opt.text}
                              type="button"
                              onClick={() => handleSelect(q.id, opt.points)}
                              className={cn(
                                'flex items-center justify-between rounded-xl p-3.5 text-left text-sm font-medium transition-all',
                                isSelected
                                  ? 'bg-brand text-brand-ink ring-1 ring-brand font-semibold shadow-sm'
                                  : 'bg-surface-muted/60 text-ink-soft ring-1 ring-line hover:bg-surface hover:text-ink',
                              )}
                            >
                              <span>{opt.text}</span>
                              {isSelected && <CheckCircle2 className="size-4 shrink-0 text-brand-ink" />}
                            </button>
                          )
                        })}
                      </div>
                    </div>
                  </Reveal>
                )
              })}
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Button
                size="lg"
                disabled={!isComplete}
                onClick={() => setSubmitted(true)}
                icon={ArrowRight}
              >
                Lihat Hasil Analisis ({answeredCount}/{totalQuestions})
              </Button>

              {answeredCount > 0 && (
                <button
                  type="button"
                  onClick={handleReset}
                  className="flex items-center gap-1.5 text-sm font-semibold text-ink-faint hover:text-warm transition-colors"
                >
                  <RotateCcw className="size-4" />
                  <span>Ulangi Kuesioner</span>
                </button>
              )}
            </div>
          </div>

          {/* Panel Hasil Skrining */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Reveal delay={0.1}>
              <div className="card relative overflow-hidden p-7 sm:p-9">
                <AnimatePresence mode="wait">
                  {submitted ? (
                    <motion.div
                      key="result"
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -16 }}
                      transition={{ duration: 0.4, ease: EASE }}
                    >
                      <span
                        className={cn(
                          'inline-flex items-center gap-1.5 rounded-full px-3.5 py-1 text-xs font-bold ring-1 uppercase tracking-wider',
                          result.badge,
                        )}
                      >
                        <ShieldAlert className="size-3.5" />
                        <span>{result.level}</span>
                      </span>

                      <h3 className="mt-4 font-display text-2xl text-ink sm:text-3xl leading-snug">
                        {result.title}
                      </h3>
                      <p className="mt-3 text-base leading-relaxed text-ink-soft">
                        {result.desc}
                      </p>

                      <div className="mt-6 rounded-2xl bg-surface-muted/80 p-5 ring-1 ring-line">
                        <p className="flex items-center gap-2 font-semibold text-ink">
                          <Stethoscope className="size-4 text-primary" />
                          Rekomendasi Langkah Nyata:
                        </p>
                        <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                          {result.action}
                        </p>
                      </div>

                      <div className="mt-7 flex flex-wrap gap-3">
                        <Button href="#stadium-ginjal" variant="secondary" size="sm">
                          Pahami 5 Stadium Ginjal
                        </Button>
                        <Button href="#pencegahan" variant="secondary" size="sm">
                          Zat yang Wajib Dihindari
                        </Button>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="placeholder"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="py-10 text-center"
                    >
                      <span className="mx-auto grid size-16 place-items-center rounded-2xl bg-leaf-100 text-leaf-700 dark:bg-leaf-400/20 dark:text-leaf-300">
                        <Sparkles className="size-8" />
                      </span>
                      <h3 className="mt-5 font-display text-2xl text-ink">
                        Hasil Analisis Risikomu
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-ink-soft max-w-xs mx-auto">
                        Pilih jawaban untuk semua pertanyaan di sebelah kiri ({answeredCount}/{totalQuestions}), lalu klik tombol untuk melihat rekomendasi medis.
                      </p>
                      <div className="mt-6 flex justify-center">
                        <span className="rounded-full bg-surface-muted px-4 py-1.5 text-xs font-semibold text-ink-faint">
                          Privat · Tidak disimpan di server mana pun
                        </span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
