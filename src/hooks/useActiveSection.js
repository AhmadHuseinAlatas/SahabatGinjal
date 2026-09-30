import { useEffect, useState } from 'react'

/**
 * Mengembalikan id bagian yang sedang berada di tengah layar.
 * `ids` harus referensi yang stabil (konstanta modul).
 */
export default function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0] ?? null)

  useEffect(() => {
    const elements = ids.map((id) => document.getElementById(id)).filter(Boolean)
    if (!elements.length) return undefined

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id)
        }
      },
      // Pita tipis di tengah layar: bagian yang menyentuhnya dianggap aktif.
      { rootMargin: '-45% 0px -50% 0px' },
    )

    elements.forEach((element) => observer.observe(element))
    return () => observer.disconnect()
  }, [ids])

  return active
}
