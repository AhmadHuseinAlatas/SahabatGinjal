import { motion } from 'motion/react'
import { EASE, VIEWPORT } from '../../lib/motion'

/** Memunculkan isi dengan lembut saat digulir ke layar (sekali saja). */
export default function Reveal({ as = 'div', delay = 0, y = 24, className, children, ...props }) {
  const Component = motion[as]

  return (
    <Component
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={{ duration: 0.8, ease: EASE, delay }}
      {...props}
    >
      {children}
    </Component>
  )
}
