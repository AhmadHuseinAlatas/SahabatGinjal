import { Check, Copy, NotebookPen, Plus, Share2, Sparkles, Trash } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import { PRESET_QUESTIONS } from '../../data/questions'
import useLocalStorage from '../../hooks/useLocalStorage'
import { cn } from '../../lib/cn'
import { EASE } from '../../lib/motion'
import Button from '../ui/Button'
import Reveal from '../ui/Reveal'

export default function CallToAction() {
  const [questions, setQuestions] = useLocalStorage('sg-questions', [])
  const safeQuestions = Array.isArray(questions) ? questions : []
  const [draft, setDraft] = useState('')
  const [status, setStatus] = useState('')
  const [copiedRecently, setCopiedRecently] = useState(false)
  const timerRef = useRef(null)

  const showStatus = (msg) => {
    setStatus(msg)
    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => {
      setStatus('')
      setCopiedRecently(false)
    }, 3500)
  }

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [])

  const add = (event) => {
    event.preventDefault()
    const text = draft.trim()
    if (!text) return
    setQuestions((list) => {
      const current = Array.isArray(list) ? list : []
      return [...current, { id: `${Date.now()}-${Math.random().toString(36).slice(2, 6)}`, text }]
    })
    setDraft('')
    showStatus('Pertanyaan berhasil disimpan!')
  }

  const addPreset = (text) => {
    const exists = safeQuestions.some((q) => q.text.toLowerCase() === text.toLowerCase())
    if (exists) {
      showStatus('Pertanyaan ini sudah ada di daftarmu.')
      return
    }
    setQuestions((list) => {
      const current = Array.isArray(list) ? list : []
      return [...current, { id: `${Date.now()}-${Math.random().toString(36).slice(2, 6)}`, text }]
    })
    showStatus('Pertanyaan ditambahkan dari rekomendasi.')
  }

  const remove = (id) => {
    setQuestions((list) => {
      const current = Array.isArray(list) ? list : []
      return current.filter((item) => item.id !== id)
    })
    showStatus('Pertanyaan dihapus.')
  }

  const copyAll = async () => {
    if (!safeQuestions.length) return
    const text = safeQuestions.map((item, index) => `${index + 1}. ${item.text}`).join('\n')
    try {
      await navigator.clipboard.writeText(text)
      setCopiedRecently(true)
      showStatus('Semua pertanyaan berhasil disalin ke clipboard! Siap dibawa saat konsultasi.')
    } catch {
      showStatus('Browser menolak akses clipboard. Silakan salin manual.')
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
      showStatus('Tautan SahabatGinjal berhasil disalin!')
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
                  Tidak perlu memahami semuanya sekarang. Pilih satu saja: siapkan pertanyaan untuk dokter
                  berikutnya, atau kirim halaman ini ke satu orang yang perlu membacanya.
                </p>

                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <Button
                    variant="secondary"
                    iconLeft={copiedRecently ? Check : Copy}
                    onClick={copyAll}
                    disabled={!safeQuestions.length}
                    className={cn(copiedRecently && 'text-primary ring-primary/40')}
                  >
                    {copiedRecently ? 'Tersalin!' : 'Salin semua'}
                  </Button>
                  <Button variant="secondary" iconLeft={Share2} onClick={share}>
                    Bagikan halaman ini
                  </Button>
                </div>

                {/* Feedback Toast Visual untuk sighted users */}
                <AnimatePresence>
                  {status && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.25, ease: EASE }}
                      className="mt-5 inline-flex items-center gap-2.5 rounded-2xl bg-primary/10 px-4 py-2.5 text-sm font-semibold text-primary ring-1 ring-primary/25"
                    >
                      <Check className="size-4 shrink-0" strokeWidth={2.5} />
                      <span>{status}</span>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Preset Chips Pertanyaan Dokter (Fitur 1) */}
                <div className="mt-10 border-t border-line pt-8">
                  <p className="flex items-center gap-2 text-sm font-bold text-ink">
                    <Sparkles className="size-4 text-sprout-500" />
                    Belum tahu mau tanya apa? Klik untuk langsung menambahkan:
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {PRESET_QUESTIONS.map((preset) => {
                      const isAdded = safeQuestions.some((q) => q.text.toLowerCase() === preset.text.toLowerCase())
                      return (
                        <button
                          key={preset.id}
                          type="button"
                          onClick={() => addPreset(preset.text)}
                          className={cn(
                            'group flex items-center gap-2 rounded-xl px-3 py-2 text-left text-xs font-semibold ring-1 transition-all sm:text-sm',
                            isAdded
                              ? 'bg-leaf-100/70 text-leaf-800 ring-leaf-300 dark:bg-leaf-400/20 dark:text-leaf-200'
                              : 'bg-surface/90 text-ink-soft ring-line hover:bg-surface hover:text-ink hover:ring-line-strong',
                          )}
                        >
                          <span
                            aria-hidden="true"
                            className={cn(
                              'grid size-4 shrink-0 place-items-center rounded-full',
                              isAdded ? 'bg-primary text-white' : 'text-ink-faint group-hover:text-ink',
                            )}
                          >
                            {isAdded ? <Check className="size-3" strokeWidth={3} /> : <Plus className="size-3" />}
                          </span>
                          <span>{preset.text}</span>
                        </button>
                      )
                    })}
                  </div>
                </div>
              </div>

              <div>
                <form onSubmit={add} noValidate>
                  <label htmlFor="pertanyaan" className="block font-semibold text-ink">
                    Tulis pertanyaan sendiri untuk dokter
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
                      placeholder="Contoh: apakah obat tensi saya tetap diminum sebelum HD?"
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
                    {safeQuestions.map((item) => (
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

                {safeQuestions.length === 0 && (
                  <p className="mt-6 rounded-2xl border border-dashed border-line p-6 text-center text-sm text-ink-faint">
                    Daftar pertanyaanmu masih kosong. Tulis pertanyaan di atas atau pilih salah satu rekomendasi cepat.
                  </p>
                )}

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
