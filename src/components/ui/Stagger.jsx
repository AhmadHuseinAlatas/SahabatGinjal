import { motion } from 'motion/react'
import { fadeUp, staggerContainer, VIEWPORT } from '../../lib/motion'

/** Wadah yang memunculkan anak-anaknya (StaggerItem) satu per satu. */
export function Stagger({ as = 'div', stagger = 0.08, delay = 0, className, children, ...props }) {
  const Component = motion[as]

  return (
    <Component
      className={className}
      variants={staggerContainer(stagger, delay)}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
      {...props}
    >
      {children}
    </Component>
  )
}

export function StaggerItem({ as = 'div', className, children, ...props }) {
  const Component = motion[as]

  return (
    <Component className={className} variants={fadeUp} {...props}>
      {children}
    </Component>
  )
}
