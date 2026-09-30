import { useEffect, useState } from 'react'

/** State yang tersimpan di perangkat pengguna (localStorage). Tidak dikirim ke mana pun. */
export default function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const raw = localStorage.getItem(key)
      return raw !== null ? JSON.parse(raw) : initialValue
    } catch {
      return initialValue
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch {
      /* mode privat atau penyimpanan penuh: abaikan */
    }
  }, [key, value])

  return [value, setValue]
}
