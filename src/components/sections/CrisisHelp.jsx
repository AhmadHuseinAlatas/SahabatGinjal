import { ArrowRight, HeartHandshake } from 'lucide-react'
import { HELP_LINES } from '../../data/help'
import { cn } from '../../lib/cn'
import { TONES } from '../../lib/tones'
import Reveal from '../ui/Reveal'
import { Stagger, StaggerItem } from '../ui/Stagger'

export default function CrisisHelp() {
  return (
    <section id="bantuan" aria-labelledby="judul-bantuan" className="py-16 sm:py-24">
      <div className="shell">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2.5rem] bg-coral-50 p-8 ring-1 ring-coral-200 sm:p-12 dark:bg-coral-950/40 dark:ring-coral-400/25">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -top-24 -right-20 size-72 rounded-full bg-coral-300/40 blur-3xl dark:bg-coral-500/20"
            />

            <div className="relative flex flex-col gap-6 sm:flex-row sm:items-start">
              <span
                aria-hidden="true"
                className="grid size-14 shrink-0 place-items-center rounded-2xl bg-coral-600 text-white"
              >
                <HeartHandshake className="size-7" strokeWidth={1.75} />
              </span>
              <div>
                <h2 id="judul-bantuan" className="font-display text-title font-normal text-ink">
                  Kalau hari ini terasa terlalu berat
                </h2>
                <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-soft">
                  Pikiran untuk mengakhiri hidup bisa muncul saat sakit terasa tidak ada ujungnya. Itu
                  tanda kamu butuh ditemani sekarang, bukan tanda kamu lemah. Tolong bicara dengan
                  seseorang hari ini.
                </p>
              </div>
            </div>

            <Stagger as="ul" className="relative mt-10 grid gap-4 md:grid-cols-3">
              {HELP_LINES.map((line) => (
                <StaggerItem as="li" key={line.id}>
                  <a
                    href={line.href}
                    className="group flex h-full flex-col rounded-2xl bg-surface/90 p-6 ring-1 ring-line transition-transform duration-300 hover:-translate-y-1 hover:ring-line-strong"
                  >
                    <span className="flex items-baseline gap-2">
                      <span className={cn('font-display text-4xl leading-none', TONES[line.tone].text)}>
                        {line.number}
                      </span>
                      {line.extra && (
                        <span className="text-sm font-semibold text-ink-faint">{line.extra}</span>
                      )}
                    </span>
                    <span className="mt-4 font-semibold text-ink">{line.title}</span>
                    <span className="mt-1 text-sm leading-relaxed text-ink-soft">{line.body}</span>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-ink">
                      Telepon sekarang
                      <ArrowRight
                        aria-hidden="true"
                        className="size-4 transition-transform group-hover:translate-x-0.5"
                      />
                    </span>
                  </a>
                </StaggerItem>
              ))}
            </Stagger>

            <p className="relative mt-8 max-w-3xl leading-relaxed text-ink-soft">
              Kalau ada bahaya langsung pada dirimu atau orang lain, hubungi{' '}
              <a href="tel:112" className="font-semibold text-warm underline underline-offset-2">
                112
              </a>{' '}
              atau datang ke IGD terdekat. Kamu juga boleh memulai dengan satu pesan singkat ke satu
              orang yang kamu percaya.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
