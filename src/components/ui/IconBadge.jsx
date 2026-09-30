import { cn } from '../../lib/cn'
import { TONES } from '../../lib/tones'

const SIZES = {
  sm: 'size-9 rounded-xl [&>svg]:size-4',
  md: 'size-12 rounded-2xl [&>svg]:size-5',
  lg: 'size-14 rounded-2xl [&>svg]:size-6',
}

/** Ikon dekoratif di dalam kotak berwarna lembut. */
export default function IconBadge({ icon: Icon, tone = 'leaf', size = 'md', className }) {
  return (
    <span
      aria-hidden="true"
      className={cn('grid shrink-0 place-items-center', TONES[tone].chip, SIZES[size], className)}
    >
      <Icon strokeWidth={1.75} />
    </span>
  )
}
