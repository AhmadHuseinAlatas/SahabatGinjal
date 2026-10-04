import { Sprout } from 'lucide-react'
import { MARQUEE_PHRASES } from '../../data/site'

/** Pita kalimat penguat yang berjalan pelan. Dekoratif, jadi disembunyikan dari pembaca layar. */
export default function Marquee() {
  const items = [...MARQUEE_PHRASES, ...MARQUEE_PHRASES]

  return (
    <div aria-hidden="true" className="fade-x overflow-hidden border-y border-line py-5">
      <div className="flex w-max animate-marquee">
        {items.map((phrase, index) => (
          <span
            key={`${phrase}-${index}`}
            className="flex shrink-0 items-center gap-8 pr-8 font-display text-xl text-ink-soft italic sm:text-2xl"
          >
            {phrase}
            <Sprout className="size-5 text-sprout-500" strokeWidth={1.5} />
          </span>
        ))}
      </div>
    </div>
  )
}
