import { cn } from '../../lib/cn'

const TONES = {
  leaf: 'text-primary',
  tide: 'text-accent',
  coral: 'text-warm',
  gradient: 'text-gradient pe-[0.08em] [box-decoration-break:clone]',
}

/** Kata miring berwarna di dalam judul. */
export default function Accent({ tone = 'leaf', className, children }) {
  return <em className={cn('font-display italic', TONES[tone], className)}>{children}</em>
}
