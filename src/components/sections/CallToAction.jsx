import { Check, Copy, NotebookPen, Share2, Trash } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useState } from 'react'
import useLocalStorage from '../../hooks/useLocalStorage'
import { EASE } from '../../lib/motion'
import Button from '../ui/Button'
import Reveal from '../ui/Reveal'

export default function CallToAction() {
  const [questions, setQuestions] = useLocalStorage('sg-questions', [])
  const [draft, setDraft] = useState('')
  const [status, setStatus] = useState('')

  const add = (event) => {
    event.preventDefault()
    const text = draft.trim()
    if (!text) return
    setQuestions((list) => [...list, { id: `${Date.now()}`, text }])
    setDraft('')
    setStatus('Pertanyaan disimpan.')
  }

  const remove = (id) => {
    setQuestions((list) => list.filter((item) => item.id !== id))
    setStatus('Pertanyaan dihapus.')
  }

  const copyAll = async () => {
    if (!questions.length) return
    const text = questions.map((item, index) => `${index + 1}. ${item.text}`).join('\n')
    try {
      await navigator.clipboard.writeText(text)
      setStatus('Semua pertanyaan disalin.')
    } catch {
      setStatus('Browser menolak akses salin. Silakan salin manual.')
    }
  }

  const share = async () => {
    const url = window.location.href
    const data = {
      title: 'SahabatGinjal',
      text: 'Ruang tenang untuk memahami cuci darah.',
      url,
    }
    try {
      if (navigator.share) {
        await navigator.share(data)
        return
      }
      await navigator.clipboard.writeText(url)
      setStatus('Tautan halaman disalin.')
    } catch {
      /* pengguna membatalkan, tidak perlu pesan */
    }
  }

  return (
    <section id="langkah" aria-labelledby="judul-langkah" className="py-24 sm:py-32">
      <div className="shell">
        <Reveal>
          <div className="card relative overflow-hidden p-8 sm:p-12 lg:p-16">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -top-32 -left-24 size-96 rounded-full bg-leaf-300/35 blur-3xl dark:bg-leaf-500/15"
            />

            <div className="relative grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
              <div>
                <h2 id="judul-langkah" className="font-display text-title font-normal text-ink">
                  Satu langkah kecil untuk hari ini
                </h2>
                <p className="mt-5 max-w-lg text-lg leading-relaxed text-ink-soft">
                  Tidak perlu memahami semuanya sekarang. Pilih satu saja: tulis pertanyaan untuk dokter
                  berikutnya, atau kirim halaman ini ke satu orang yang perlu membacanya.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Button variant="secondary" iconLeft={Copy} onClick={copyAll} disabled={!questions.length}>
                    Salin semua
                  </Button>
                  <Button variant="secondary" iconLeft={Share2} onClick={share}>
                    Bagikan halaman ini
                  </Button>
                </div>
              </div>

              <div>
                <form onSubmit={add} noValidate>
                  <label htmlFor="pertanyaan" className="block font-semibold text-ink">
                    Tulis satu pertanyaan untuk dokter
                  </label>
                  <div className="mt-3 flex flex-col gap-3 sm:flex-row">
                    <input
                      id="pertanyaan"
                      name="pertanyaan"
                      type="text"
                      value={draft}
                      maxLength={200}
                      autoComplete="off"
                      onChange={(event) => setDraft(event.target.value)}
                      placeholder="Contoh: berapa batas cairan saya per hari?"
                      className="min-h-12 flex-1 rounded-full bg-surface px-5 text-ink ring-1 ring-line-strong transition-shadow placeholder:text-ink-faint focus-visible:ring-2 focus-visible:ring-accent"
                    />
                    <Button type="submit" iconLeft={NotebookPen}>
                      Simpan
                    </Button>
                  </div>
                  <p className="mt-3 text-sm text-ink-faint">
                    Tersimpan di perangkatmu saja. Tidak dikirim ke mana pun.
                  </p>
                </form>

                <ul aria-label="Pertanyaanmu" className="mt-7 grid gap-2">
                  <AnimatePresence initial={false}>
                    {questions.map((item) => (
                      <motion.li
                        key={item.id}
                        layout
                        initial={{ opacity: 0, x: -12 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 12 }}
                        transition={{ duration: 0.3, ease: EASE }}
                        className="flex items-start gap-3 rounded-2xl bg-surface-muted/70 p-4"
                      >
                        <Check aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-primary" />
                        <span className="flex-1 leading-relaxed text-ink">{item.text}</span>
                        <button
                          type="button"
                          onClick={() => remove(item.id)}
                          aria-label={`Hapus pertanyaan: ${item.text}`}
                          className="grid size-9 shrink-0 place-items-center rounded-full text-ink-faint transition-colors hover:bg-surface hover:text-warm"
                        >
                          <Trash aria-hidden="true" className="size-4" />
                        </button>
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </ul>

                <p className="sr-only" aria-live="polite">
                  {status}
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
