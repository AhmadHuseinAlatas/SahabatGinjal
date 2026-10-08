import { Info } from 'lucide-react'
import { COST_EXTRAS, COST_STEPS } from '../../data/cost'
import Accent from '../ui/Accent'
import Reveal from '../ui/Reveal'
import SectionHeading from '../ui/SectionHeading'
import { Stagger, StaggerItem } from '../ui/Stagger'

export default function Cost() {
  return (
    <section id="biaya" aria-labelledby="judul-biaya" className="py-24 sm:py-32">
      <div className="shell">
        <SectionHeading
          id="judul-biaya"
          number="10"
          kicker="Pertanyaan yang jarang berani ditanya"
          title={
            <>
              “Uangnya <Accent tone="coral">dari mana?</Accent>”
            </>
          }
          description="Kekhawatiran paling wajar dan paling jarang diucapkan. Kabar baiknya: hemodialisis maupun CAPD termasuk layanan yang dijamin program JKN yang dikelola BPJS Kesehatan."
        />

        <div className="mt-14 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
          <div>
            <Stagger as="ol" className="relative grid gap-6">
              <span aria-hidden="true" className="absolute top-5 bottom-5 left-5 w-px bg-line-strong" />
              {COST_STEPS.map((step, index) => (
                <StaggerItem as="li" key={step} className="relative flex gap-5">
                  <span
                    aria-hidden="true"
                    className="relative z-10 grid size-10 shrink-0 place-items-center rounded-full bg-brand font-display text-lg text-brand-ink"
                  >
                    {index + 1}
                  </span>
                  <p className="pt-1.5 text-lg leading-relaxed text-ink">{step}</p>
                </StaggerItem>
              ))}
            </Stagger>

            <Reveal>
              <p className="mt-10 flex gap-3 rounded-2xl bg-tide-50/80 p-5 text-sm leading-relaxed text-ink-soft ring-1 ring-tide-200 dark:bg-tide-400/10 dark:ring-tide-400/25">
                <Info aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-accent" />
                <span>
                  Aturan teknis bisa berubah. Konfirmasi lewat BPJS Kesehatan Care Center{' '}
                  <a href="tel:165" className="font-semibold text-accent underline underline-offset-2">
                    165
                  </a>
                  , aplikasi Mobile JKN, atau petugas rumah sakitmu.
                </span>
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <aside aria-labelledby="judul-terlewat" className="card p-7 sm:p-9">
              <h3 id="judul-terlewat" className="font-display text-2xl text-ink">
                Hal yang sering terlewat
              </h3>
              <ul className="mt-6 grid gap-6">
                {COST_EXTRAS.map((item) => (
                  <li key={item.id} className="flex gap-4">
                    <span
                      aria-hidden="true"
                      className="grid size-10 shrink-0 place-items-center rounded-xl bg-coral-100 text-coral-700 dark:bg-coral-400/15 dark:text-coral-300"
                    >
                      <item.icon className="size-5" strokeWidth={1.75} />
                    </span>
                    <div>
                      <p className="font-semibold text-ink">{item.title}</p>
                      <p className="mt-1 leading-relaxed text-ink-soft">{item.body}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </aside>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
