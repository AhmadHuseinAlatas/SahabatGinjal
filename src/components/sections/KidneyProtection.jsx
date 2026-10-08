import { AlertTriangle, Shield, Stethoscope, TestTube } from 'lucide-react'
import { GOLDEN_RULES, KIDNEY_TOXINS, LAB_GUIDE } from '../../data/prevention'
import Accent from '../ui/Accent'
import IconBadge from '../ui/IconBadge'
import Reveal from '../ui/Reveal'
import SectionHeading from '../ui/SectionHeading'
import { Stagger, StaggerItem } from '../ui/Stagger'

export default function KidneyProtection() {
  return (
    <section id="pencegahan" aria-labelledby="judul-pencegahan" className="py-24 sm:py-32">
      <div className="shell">
        <SectionHeading
          id="judul-pencegahan"
          number="04"
          kicker="Perlindungan & Gaya Hidup Sehat"
          title={
            <>
              Menjaga ginjal <Accent tone="coral">sebelum terlambat</Accent>
            </>
          }
          description="Banyak kasus gagal ginjal di Indonesia terjadi bukan karena faktor keturunan, melainkan akibat kebiasaan sehari-hari yang dikira aman. Hindari racunnya, terapkan aturan emasnya."
        />

        {/* 1. DAFTAR MERAH: Zat & Kebiasaan Toksik */}
        <div className="mt-16">
          <div className="max-w-2xl">
            <span className="kicker text-warm flex items-center gap-2">
              <AlertTriangle className="size-4" />
              Daftar Merah: Waspadai Ini
            </span>
            <h3 className="mt-2 font-display text-2xl text-ink sm:text-3xl">
              5 Hal yang Diam-diam Merusak Filter Ginjal
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-ink-soft">
              Zat dan kebiasaan ini paling sering memicu penurunan fungsi ginjal secara mendadak maupun menahun:
            </p>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {KIDNEY_TOXINS.map((toxin) => (
              <div
                key={toxin.id}
                className="card flex flex-col justify-between p-6 transition-all duration-300 hover:ring-line-strong"
              >
                <div>
                  <div className="flex items-center gap-3">
                    <IconBadge icon={toxin.icon} tone={toxin.tone} size="md" />
                    <div>
                      <h4 className="font-display text-lg font-bold text-ink">{toxin.title}</h4>
                      <p className="text-xs text-ink-faint">{toxin.subtitle}</p>
                    </div>
                  </div>
                  <p className="mt-4 text-xs leading-relaxed text-ink-soft sm:text-sm">
                    {toxin.danger}
                  </p>
                </div>

                <div className="mt-5 rounded-xl bg-surface-muted/60 p-3.5 ring-1 ring-line/50">
                  <p className="text-xs font-semibold text-primary">Solusi Aman:</p>
                  <p className="mt-1 text-xs text-ink-soft">{toxin.solution}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 2. 8 LANGKAH EMAS (World Kidney Day) */}
        <div className="mt-24 border-t border-line pt-20">
          <div className="max-w-2xl">
            <span className="kicker text-primary flex items-center gap-2">
              <Shield className="size-4" />
              Rekomendasi Internasional
            </span>
            <h3 className="mt-2 font-display text-2xl text-ink sm:text-3xl">
              8 Aturan Emas Merawat Ginjal Sehat
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-ink-soft">
              Panduan baku dari International Society of Nephrology &amp; World Kidney Day untuk menjaga ginjal tetap prima:
            </p>
          </div>

          <Stagger className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {GOLDEN_RULES.map((rule, index) => (
              <StaggerItem
                key={rule.title}
                className="card flex flex-col p-5 transition-transform duration-300 hover:-translate-y-1"
              >
                <div className="flex items-center justify-between">
                  <span className="grid size-9 place-items-center rounded-xl bg-leaf-100 text-leaf-800 dark:bg-leaf-400/20 dark:text-leaf-300">
                    <rule.icon className="size-4" />
                  </span>
                  <span className="font-display text-lg font-bold text-ink-faint/40">
                    0{index + 1}
                  </span>
                </div>
                <h4 className="mt-4 font-display text-base font-bold text-ink">{rule.title}</h4>
                <p className="mt-2 text-xs leading-relaxed text-ink-soft">{rule.desc}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>

        {/* 3. PANDUAN CEK LAB PUSKESMAS BPJS */}
        <Reveal className="mt-24">
          <div className="rounded-[2.5rem] bg-tide-50/70 p-8 ring-1 ring-tide-200 sm:p-12 dark:bg-tide-400/10 dark:ring-tide-400/25">
            <div className="max-w-2xl">
              <span className="kicker text-accent flex items-center gap-2">
                <TestTube className="size-4" />
                Deteksi Dini di Puskesmas
              </span>
              <h3 className="mt-2 font-display text-2xl text-ink sm:text-3xl">
                Tes Sederhana Apa yang Harus Diminta ke Dokter?
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                Jangan tunggu sampai ada keluhan bengkak atau sesak. Jika kamu punya riwayat hipertensi atau diabetes, mintalah pemeriksaan berkala ini di Puskesmas faskes 1:
              </p>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {LAB_GUIDE.map((lab) => (
                <div key={lab.test} className="rounded-2xl bg-surface p-6 ring-1 ring-line">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-accent uppercase tracking-wider">
                      {lab.sample}
                    </span>
                    <span className="rounded-full bg-leaf-100 px-2.5 py-0.5 text-[11px] font-semibold text-leaf-800 dark:bg-leaf-400/20 dark:text-leaf-300">
                      {lab.bpjs}
                    </span>
                  </div>
                  <h4 className="mt-3 font-display text-lg font-bold text-ink">{lab.test}</h4>
                  <p className="mt-1 text-xs font-semibold text-primary">{lab.focus}</p>
                  <p className="mt-3 text-xs leading-relaxed text-ink-soft">{lab.why}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 flex items-start gap-3 rounded-2xl bg-surface/90 p-5 ring-1 ring-line">
              <Stethoscope className="size-5 shrink-0 text-accent mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-ink">Kalimat Mudah untuk Berkonsultasi:</p>
                <p className="mt-1 text-xs leading-relaxed text-ink-soft italic">
                  &ldquo;Dokter, saya ingin skrining fungsi ginjal karena saya ada riwayat tensi tinggi / diabetes / sering minum obat antinyeri. Apakah saya bisa periksa tes urine rutin dan tes darah kreatinin?&rdquo;
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
