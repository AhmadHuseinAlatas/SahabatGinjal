import { Quote } from 'lucide-react'
import { STORIES } from '../../data/stories'
import { cn } from '../../lib/cn'
import { TONES } from '../../lib/tones'
import Accent from '../ui/Accent'
import SectionHeading from '../ui/SectionHeading'
import { Stagger, StaggerItem } from '../ui/Stagger'

export default function Stories() {
  return (
    <section id="cerita" aria-labelledby="judul-cerita" className="py-24 sm:py-32">
      <div className="shell">
        <SectionHeading
          id="judul-cerita"
          number="08"
          kicker="Bukan hanya kamu"
          title={
            <>
              Suara dari <Accent tone="tide">kursi sebelah</Accent>
            </>
          }
          description="Cerita ini gambaran yang disusun dari pengalaman umum pasien dialisis, bukan kutipan orang tertentu. Kami sengaja tidak memakai nama asli siapa pun."
        />

        <Stagger className="mt-14 grid gap-6 md:grid-cols-2 md:pb-10">
          {STORIES.map((story, index) => (
            <StaggerItem key={story.id} className={cn(index % 2 === 1 && 'md:translate-y-10')}>
              <figure className="card relative h-full overflow-hidden p-8 sm:p-10">
                <div
                  aria-hidden="true"
                  className={cn('absolute -top-16 -right-16 size-48 rounded-full blur-3xl', TONES[story.tone].glow)}
                />
                <Quote aria-hidden="true" className={cn('relative size-8', TONES[story.tone].text)} strokeWidth={1.5} />
                <blockquote className="relative mt-5 font-display text-xl leading-relaxed text-ink sm:text-2xl">
                  <p>{story.quote}</p>
                </blockquote>
                <figcaption className="relative mt-7 flex items-center gap-3">
                  <span aria-hidden="true" className={cn('size-2.5 rounded-full', TONES[story.tone].dot)} />
                  <span>
                    <span className="block font-semibold text-ink">{story.who}</span>
                    <span className="block text-sm text-ink-faint">{story.meta}</span>
                  </span>
                </figcaption>
              </figure>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  )
}
