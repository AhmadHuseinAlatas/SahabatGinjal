import { cn } from '../../lib/cn'
import Reveal from './Reveal'

/**
 * Judul bagian: nomor bab + kicker, judul besar (serif), dan deskripsi.
 * `id` dipasang di <h2> agar bisa dirujuk lewat aria-labelledby.
 */
export default function SectionHeading({
  id,
  number,
  kicker,
  title,
  description,
  align = 'left',
  className,
}) {
  const centered = align === 'center'

  return (
    <div className={cn('max-w-3xl', centered && 'mx-auto text-center', className)}>
      <Reveal>
        <p className={cn('kicker flex items-center gap-3 text-primary', centered && 'justify-center')}>
          {number && (
            <>
              <span className="font-display text-sm font-medium normal-case tracking-normal text-ink-faint">
                {number}
              </span>
              <span aria-hidden="true" className="h-px w-8 bg-line-strong" />
            </>
          )}
          {kicker}
        </p>
      </Reveal>

      <Reveal delay={0.06}>
        <h2 id={id} className="mt-5 font-display text-title font-normal text-ink">
          {title}
        </h2>
      </Reveal>

      {description && (
        <Reveal delay={0.12}>
          <p
            className={cn(
              'mt-5 max-w-2xl text-lg leading-relaxed text-ink-soft',
              centered && 'mx-auto',
            )}
          >
            {description}
          </p>
        </Reveal>
      )}
    </div>
  )
}
