import { useMotionValueEvent, useScroll } from 'motion/react'
import { useState } from 'react'

/** `true` setelah halaman digulir melewati `threshold` piksel. */
export default function useScrolledPast(threshold) {
  const { scrollY } = useScroll()
  const [past, setPast] = useState(() => window.scrollY > threshold)

  useMotionValueEvent(scrollY, 'change', (y) => setPast(y > threshold))

  return past
}
