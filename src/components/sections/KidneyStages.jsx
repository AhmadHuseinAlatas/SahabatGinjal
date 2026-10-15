import {
  AlertCircle,
  ArrowDown,
  Calculator,
  CheckCircle2,
  RotateCcw,
  ShieldCheck,
  Sparkles,
} from 'lucide-react'
import { useState } from 'react'
import { CKD_STAGES } from '../../data/prevention'
import { cn } from '../../lib/cn'
import Accent from '../ui/Accent'
import Button from '../ui/Button'
import Reveal from '../ui/Reveal'
import SectionHeading from '../ui/SectionHeading'

/**
 * Formula CKD-EPI 2021 (race-free) standar KDIGO untuk menghitung eGFR:
 * - Scr: Kreatinin serum darah (mg/dL)
 * - Usia: Tahun
 * - Gender: 'male' | 'female'
 */
function calculateEgfr(scrVal, ageVal, gender) {
  const scr = parseFloat(scrVal)
  const age = parseInt(ageVal, 10)
  if (!scr || isNaN(scr) || scr <= 0 || !age || isNaN(age) || age < 18 || age > 120) {
    return null
  }

  const isFemale = gender === 'female'
  const kappa = isFemale ? 0.7 : 0.9
  const alpha = isFemale ? -0.241 : -0.302
  const multiplier = isFemale ? 1.012 : 1.000

  const ratio = scr / kappa
  const minVal = Math.min(ratio, 1)
  const maxVal = Math.max(ratio, 1)

  const egfr = 142 * Math.pow(minVal, alpha) * Math.pow(maxVal, -1.200) * Math.pow(0.9938, age) * multiplier
  const rounded = Math.round(egfr * 10) / 10

  let stageIndex = 0
  let stageName = 'Stadium 1'
  let note = 'Fungsi ginjal normal / sangat optimal. Terus pertahankan pola hidup sehat!'

  if (rounded >= 90) {
    stageIndex = 0
    stageName = 'Stadium 1 (>90%)'
    note = 'Fungsi ginjal berada di batas normal tinggi. Pastikan rutin minum air putih dan hindari obat nyeri tanpa resep.'
  } else if (rounded >= 60) {
    stageIndex = 1
    stageName = 'Stadium 2 (60–89%)'
    note = 'Penurunan fungsi tergolong ringan dan umum terjadi seiring usia. Tetap aman dan belum ada indikasi dialisis.'
  } else if (rounded >= 30) {
    stageIndex = 2
    stageName = 'Stadium 3a/3b (30–59%)'
    note = 'KABAR BAIK: Anda BELUM butuh cuci darah! Dengan kontrol tensi & gula darah ketat, fungsi ginjal bisa stabil puluhan tahun.'
  } else if (rounded >= 15) {
    stageIndex = 3
    stageName = 'Stadium 4 (15–29%)'
    note = 'Fungsi ginjal mengalami penurunan signifikan. Sangat dianjurkan rutin kontrol ke nefrolog dan menjaga asupan kalium/fosfat.'
  } else {
    stageIndex = 4
    stageName = 'Stadium 5 (<15%)'
    note = 'Fungsi saring ginjal sudah sangat rendah. Konsultasikan dengan dokter spesialis ginjal mengenai terapi pengganti (HD/CAPD) demi menjaga stamina tubuh.'
  }

  return {
    egfr: rounded,
    stageIndex,
    stageName,
    note,
  }
}

export default function KidneyStages() {
  const [activeStageIndex, setActiveStageIndex] = useState(2) // Default ke Stadium 3 (fase paling krusial)
  const activeStage = CKD_STAGES[activeStageIndex]

  // State Kalkulator eGFR
  const [gender, setGender] = useState('male')
  const [age, setAge] = useState('')
  const [creatinine, setCreatinine] = useState('')
  const [calcResult, setCalcResult] = useState(null)
  const [calcError, setCalcError] = useState('')

  const handleCalculate = (e) => {
    e.preventDefault()
    setCalcError('')

    const res = calculateEgfr(creatinine, age, gender)
    if (!res) {
      setCalcError('Mohon masukkan usia valid (18–120 tahun) dan kadar kreatinin (contoh: 1.2).')
      return
    }

    setCalcResult(res)
    setActiveStageIndex(res.stageIndex)
  }

  const handleResetCalc = () => {
    setAge('')
    setCreatinine('')
    setCalcResult(null)
    setCalcError('')
  }

  return (
    <section id="stadium-ginjal" aria-labelledby="judul-stadium" className="py-12 sm:py-20 lg:py-28">
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

        {/* Kalkulator eGFR Interaktif */}
        <Reveal className="mt-12">
          <div className="card relative overflow-hidden border-2 border-primary/20 bg-surface/90 p-6 sm:p-8 shadow-card">
            <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
              <div className="max-w-xl">
                <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary ring-1 ring-primary/25">
                  <Calculator className="size-3.5" />
                  Kalkulator Medis Mandiri (CKD-EPI 2021)
                </div>
                <h3 className="mt-3 font-display text-xl font-bold text-ink sm:text-2xl">
                  Punya Hasil Cek Darah Kreatinin? Cek Stadium di Sini
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                  Masukkan angka kreatinin dari lembar laboratorium (Puskesmas / RS / Prodia) untuk memperkirakan persentase fungsi ginjalmu secara instan.
                </p>
              </div>

              {calcResult && (
                <button
                  type="button"
                  onClick={handleResetCalc}
                  className="inline-flex items-center gap-1.5 self-start rounded-full bg-surface-muted px-3 py-1.5 text-xs font-semibold text-ink-soft ring-1 ring-line transition-colors hover:text-ink"
                >
                  <RotateCcw className="size-3.5" />
                  Hitung Ulang
                </button>
              )}
            </div>

            {/* Form Input */}
            <form onSubmit={handleCalculate} className="mt-6 grid gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {/* Jenis Kelamin */}
              <div>
                <label className="block text-xs font-semibold text-ink mb-1.5">
                  Jenis Kelamin
                </label>
                <div className="grid grid-cols-2 gap-1.5 rounded-xl bg-surface-muted p-1 ring-1 ring-line">
                  <button
                    type="button"
                    onClick={() => setGender('male')}
                    className={cn(
                      'rounded-lg py-2 text-xs font-bold transition-all',
                      gender === 'male'
                        ? 'bg-brand text-brand-ink shadow-sm'
                        : 'text-ink-soft hover:text-ink',
                    )}
                  >
                    Laki-laki
                  </button>
                  <button
                    type="button"
                    onClick={() => setGender('female')}
                    className={cn(
                      'rounded-lg py-2 text-xs font-bold transition-all',
                      gender === 'female'
                        ? 'bg-brand text-brand-ink shadow-sm'
                        : 'text-ink-soft hover:text-ink',
                    )}
                  >
                    Perempuan
                  </button>
                </div>
              </div>

              {/* Usia */}
              <div>
                <label htmlFor="input-age" className="block text-xs font-semibold text-ink mb-1.5">
                  Usia (Tahun)
                </label>
                <input
                  id="input-age"
                  type="number"
                  min="18"
                  max="120"
                  placeholder="Contoh: 54"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="min-h-10.5 w-full rounded-xl bg-surface px-3.5 text-sm text-ink ring-1 ring-line placeholder:text-ink-faint focus-visible:ring-2 focus-visible:ring-primary"
                  required
                />
              </div>

              {/* Kreatinin */}
              <div>
                <label htmlFor="input-creatinine" className="block text-xs font-semibold text-ink mb-1.5">
                  Kreatinin Serum (mg/dL)
                </label>
                <input
                  id="input-creatinine"
                  type="number"
                  step="0.01"
                  min="0.2"
                  max="30"
                  placeholder="Contoh: 1.4"
                  value={creatinine}
                  onChange={(e) => setCreatinine(e.target.value)}
                  className="min-h-10.5 w-full rounded-xl bg-surface px-3.5 text-sm text-ink ring-1 ring-line placeholder:text-ink-faint focus-visible:ring-2 focus-visible:ring-primary"
                  required
                />
              </div>

              {/* Tombol Hitung */}
              <div className="flex items-end sm:col-span-3 lg:col-span-1">
                <Button type="submit" size="md" className="w-full min-h-10.5 font-bold">
                  <Sparkles className="size-4" />
                  Hitung eGFR
                </Button>
              </div>
            </form>

            {calcError && (
              <p className="mt-3 text-xs font-medium text-coral-600 dark:text-coral-400">
                {calcError}
              </p>
            )}

            {/* Hasil Perhitungan eGFR */}
            {calcResult && (
              <div className="mt-6 rounded-2xl bg-primary/10 p-5 ring-1 ring-primary/30 dark:bg-primary/15">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-4">
                    <div className="grid size-16 shrink-0 place-items-center rounded-2xl bg-brand text-brand-ink font-display text-2xl font-bold shadow-md">
                      {calcResult.egfr}
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-primary">
                        Estimasi GFR (Fungsi Ginjal)
                      </p>
                      <h4 className="font-display text-xl font-bold text-ink">
                        {calcResult.stageName}
                      </h4>
                      <p className="text-xs text-ink-soft">
                        Satuan: mL/menit/1.73m² (Sekitar {calcResult.egfr}% kemampuan saring)
                      </p>
                    </div>
                  </div>

                  <a
                    href="#detail-stadium"
                    onClick={() => setActiveStageIndex(calcResult.stageIndex)}
                    className="inline-flex items-center justify-center gap-1.5 rounded-full bg-brand px-4 py-2 text-xs font-bold text-brand-ink shadow-sm transition-transform hover:-translate-y-0.5"
                  >
                    <span>Buka Rincian {CKD_STAGES[calcResult.stageIndex].stage}</span>
                    <ArrowDown className="size-3.5" />
                  </a>
                </div>

                <div className="mt-4 border-t border-primary/20 pt-3 text-xs leading-relaxed text-ink-soft">
                  <strong className="text-ink font-semibold">Penjelasan Medis: </strong>
                  {calcResult.note}
                </div>
              </div>
            )}
          </div>
        </Reveal>

        {/* Stadium Selector Bar */}
        <Reveal className="mt-14" id="detail-stadium">
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
