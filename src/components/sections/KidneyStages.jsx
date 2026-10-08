import { AlertCircle, CheckCircle2, ShieldCheck } from 'lucide-react'
import { useState } from 'react'
import { CKD_STAGES } from '../../data/prevention'
import { cn } from '../../lib/cn'
import Accent from '../ui/Accent'
import Reveal from '../ui/Reveal'
import SectionHeading from '../ui/SectionHeading'

export default function KidneyStages() {
  const [activeStageIndex, setActiveStageIndex] = useState(2) // Default ke Stadium 3 (fase paling krusial)
  const activeStage = CKD_STAGES[activeStageIndex]

  return (
    <section id="stadium-ginjal" aria-labelledby="judul-stadium" className="py-24 sm:py-32">
      <div className="shell">
        <SectionHeading
          id="judul-stadium"
          number="03"
          kicker="Peta 5 Stadium Penyakit Ginjal"
          title={
            <>
              Kapan cuci darah <Accent tone="tide">sebenarnya dibutuhkan?</Accent>
            </>
          }
          description="Banyak orang mengira vonis gangguan ginjal berarti harus langsung cuci darah. Kenyataannya, cuci darah hanya untuk Stadium 5. Di Stadium 1 sampai 3, penurunan fungsi bisa dicegah dan diperlambat bertahun-tahun."
        />

        {/* Stadium Selector Bar */}
        <Reveal className="mt-14">
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-5">
            {CKD_STAGES.map((s, idx) => {
              const isSelected = activeStageIndex === idx
              return (
                <button
                  key={s.stage}
                  type="button"
                  onClick={() => setActiveStageIndex(idx)}
                  className={cn(
                    'group flex flex-col items-center justify-center rounded-2xl p-4 text-center ring-1 transition-all',
                    isSelected
                      ? 'bg-brand text-brand-ink ring-brand shadow-card'
                      : 'bg-surface-muted/60 text-ink-soft ring-line hover:bg-surface hover:text-ink',
                  )}
                >
                  <span className="text-xs font-semibold opacity-75">{s.stage}</span>
                  <span className="mt-1 font-display text-lg font-bold sm:text-xl">{s.egfr}</span>
                  <span
                    className={cn(
                      'mt-2 inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-semibold',
                      isSelected
                        ? 'bg-white/20 text-white'
                        : s.dialysisNeeded
                          ? 'bg-coral-100 text-coral-800 dark:bg-coral-400/20 dark:text-coral-300'
                          : 'bg-leaf-100 text-leaf-800 dark:bg-leaf-400/20 dark:text-leaf-300',
                    )}
                  >
                    {s.dialysisNeeded ? 'Dialisis' : 'Tanpa Dialisis'}
                  </span>
                </button>
              )
            })}
          </div>
        </Reveal>

        {/* Detail Panel Stadium Aktif */}
        <Reveal delay={0.08} className="mt-8">
          <div className="card overflow-hidden p-8 sm:p-12">
            <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <span className="rounded-full bg-primary/15 px-3 py-1 text-xs font-bold text-primary ring-1 ring-primary/30">
                    {activeStage.stage} (eGFR: {activeStage.egfr})
                  </span>
                  <span
                    className={cn(
                      'inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold ring-1',
                      activeStage.dialysisNeeded
                        ? 'bg-coral-100 text-coral-800 ring-coral-300 dark:bg-coral-400/20 dark:text-coral-300'
                        : 'bg-leaf-100 text-leaf-800 ring-leaf-300 dark:bg-leaf-400/20 dark:text-leaf-300',
                    )}
                  >
                    {activeStage.dialysisNeeded ? (
                      <>
                        <AlertCircle className="size-3.5" />
                        <span>Saatnya Terapi Pengganti (Dialisis)</span>
                      </>
                    ) : (
                      <>
                        <CheckCircle2 className="size-3.5" />
                        <span>Belum Butuh Cuci Darah</span>
                      </>
                    )}
                  </span>
                </div>

                <h3 className="mt-4 font-display text-2xl text-ink sm:text-3xl">
                  {activeStage.status}
                </h3>
                <p className="mt-4 text-base leading-relaxed text-ink-soft sm:text-lg">
                  {activeStage.desc}
                </p>

                {/* Highlight Khusus Stadium 3 */}
                {activeStageIndex === 2 && (
                  <div className="mt-6 rounded-2xl bg-sprout-200/40 p-5 ring-1 ring-sprout-300/60 dark:bg-sprout-400/10 dark:ring-sprout-400/25">
                    <p className="flex items-center gap-2 font-bold text-leaf-900 dark:text-sprout-300">
                      <ShieldCheck className="size-5" />
                      Kabar Baik untuk Pasien Stadium 3:
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                      Banyak orang hidup hingga usia lanjut di Stadium 3 tanpa pernah menginjakkan kaki ke ruang cuci darah! Kuncinya adalah kontrol ketat tekanan darah, menjaga gula darah, dan rutin periksa berkala ke nefrolog.
                    </p>
                  </div>
                )}
              </div>

              {/* Target Perawatan & Aksi */}
              <div className="flex flex-col justify-between rounded-2xl bg-surface-muted/60 p-6 sm:p-8 ring-1 ring-line">
                <div>
                  <p className="text-xs font-bold text-accent uppercase tracking-wider">
                    Target Pencegahan &amp; Perawatan
                  </p>
                  <p className="mt-3 text-base leading-relaxed text-ink font-medium">
                    {activeStage.target}
                  </p>
                </div>

                <div className="mt-8 border-t border-line pt-6">
                  <p className="text-xs text-ink-faint">
                    * eGFR (estimated Glomerular Filtration Rate) adalah perkiraan persentase kemampuan saring ginjal yang dihitung dari kadar kreatinin darah, usia, dan jenis kelamin.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
