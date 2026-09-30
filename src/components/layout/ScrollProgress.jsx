import { motion, useScroll, useSpring } from 'motion/react'

/** Garis tipis di atas layar yang menunjukkan seberapa jauh halaman sudah dibaca. */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 })

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-70 h-[3px] origin-left bg-linear-to-r from-leaf-500 via-tide-400 to-coral-500"
    />
  )
}
