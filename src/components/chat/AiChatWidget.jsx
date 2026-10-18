import {
  AlertCircle,
  Bell,
  BellOff,
  Bot,
  Check,
  ChevronDown,
  Copy,
  Minus,
  Send,
  Share2,
  Sparkles,
  Trash2,
  X,
} from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import {
  callGeminiApi,
  getOfflineAnswer,
  SUGGESTED_QUESTIONS,
} from '../../data/aiKnowledge'
import useLocalStorage from '../../hooks/useLocalStorage'
import { cn } from '../../lib/cn'

function createMessageId(prefix) {
  return `${prefix}_${Math.random().toString(36).slice(2, 9)}`
}

function getCurrentTime() {
  try {
    return new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
  } catch {
    return 'Baru saja'
  }
}

const DEFAULT_WELCOME_MESSAGE = {
  id: 'welcome',
  sender: 'bot',
  text: `Halo! Saya **SahabatAI** ✨, asisten ramah pendamping kesehatan ginjal dan cuci darah Anda.

Anda bisa bertanya apa saja seputar:
• **Pilihan makanan & buah** (kalium, fosfat, garam)
• **Tips menahan haus** & kuota minum
• **Perawatan lengan Cimino (AV Fistula)**
• **Beda cuci darah mesin (HD) vs perut (CAPD)**
• **Alur penjaminan BPJS Kesehatan**

Ada hal yang sedang membuat Anda bingung atau cemas hari ini?`,
  timestamp: 'Sekarang',
  isEmergency: false,
}

const DEFAULT_ENV_KEY = typeof import.meta !== 'undefined' ? (import.meta.env?.VITE_GEMINI_API_KEY || '') : ''

export default function AiChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useLocalStorage('sahabat_chat_messages', [DEFAULT_WELCOME_MESSAGE])
  const [inputMessage, setInputMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [copiedId, setCopiedId] = useState(null)

  // Notifikasi berkala setiap 40 detik
  const [showNotification, setShowNotification] = useState(false)
  const [isAlertMuted, setIsAlertMuted] = useLocalStorage('sahabat_chat_alert_muted', false)

  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)

  // Munculkan notifikasi setiap 40 detik jika tidak sedang dibuka dan tidak di-mute
  useEffect(() => {
    if (isOpen || isAlertMuted) {
      return
    }

    // Pertama kali muncul setelah 6 detik
    const firstTimer = setTimeout(() => {
      setShowNotification(true)
    }, 6000)

    // Muncul berulang setiap 40 detik
    const intervalTimer = setInterval(() => {
      setShowNotification(true)
    }, 40000)

    return () => {
      clearTimeout(firstTimer)
      clearInterval(intervalTimer)
    }
  }, [isOpen, isAlertMuted])

  // Otomatis sembunyikan notifikasi setelah 8 detik jika tidak disentuh
  useEffect(() => {
    if (!showNotification) return
    const autoHide = setTimeout(() => {
      setShowNotification(false)
    }, 8000)
    return () => clearTimeout(autoHide)
  }, [showNotification])

  // Scroll otomatis ke pesan terbaru
  const scrollToBottom = (smooth = true) => {
    messagesEndRef.current?.scrollIntoView({ behavior: smooth ? 'smooth' : 'auto' })
  }

  useEffect(() => {
    if (isOpen) {
      scrollToBottom(false)
      setTimeout(() => {
        inputRef.current?.focus()
      }, 250)
    }
  }, [isOpen])

  useEffect(() => {
    if (isOpen) {
      scrollToBottom(true)
    }
  }, [messages, isTyping, isOpen])

  // Kirim pesan
  const handleSendMessage = async (customText = null) => {
    const textToSend = (customText || inputMessage).trim()
    if (!textToSend || isTyping) return

    const userMsgId = createMessageId('user')
    const timeStr = getCurrentTime()

    const newMessages = [
      ...messages,
      {
        id: userMsgId,
        sender: 'user',
        text: textToSend,
        timestamp: timeStr,
      },
    ]

    setMessages(newMessages)
    setInputMessage('')
    setIsTyping(true)

    try {
      let botReplyText = ''
      let isEmergency = false

      if (DEFAULT_ENV_KEY && DEFAULT_ENV_KEY.trim().length > 10) {
        // Mode Live AI via Google Gemini API (langsung aktif dari API key pemilik situs)
        try {
          botReplyText = await callGeminiApi(DEFAULT_ENV_KEY, textToSend, newMessages)
        } catch {
          // Jika terjadi kendala jaringan/kuota, fallback otomatis ke basis pengetahuan lokal
          const fallback = getOfflineAnswer(textToSend)
          botReplyText = fallback.text
          isEmergency = fallback.isEmergency
        }
      } else {
        // Mode Pintar Offline Cepat
        await new Promise((res) => setTimeout(res, 650))
        const result = getOfflineAnswer(textToSend)
        botReplyText = result.text
        isEmergency = result.isEmergency
      }

      const botMsgId = createMessageId('bot')
      setMessages([
        ...newMessages,
        {
          id: botMsgId,
          sender: 'bot',
          text: botReplyText,
          timestamp: getCurrentTime(),
          isEmergency,
        },
      ])
    } catch {
      setMessages([
        ...newMessages,
        {
          id: createMessageId('bot_err'),
          sender: 'bot',
          text: 'Maaf, terjadi kendala saat memproses jawaban. Silakan coba kembali.',
          timestamp: getCurrentTime(),
          isEmergency: false,
        },
      ])
    } finally {
      setIsTyping(false)
    }
  }

  // Bersihkan riwayat chat
  const handleClearHistory = () => {
    if (window.confirm('Hapus seluruh riwayat percakapan dengan SahabatAI?')) {
      setMessages([DEFAULT_WELCOME_MESSAGE])
    }
  }

  // Salin pesan ke clipboard / kirim ke WhatsApp
  const handleCopyMessage = (msgId, text) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedId(msgId)
      setTimeout(() => setCopiedId(null), 2000)
    })
  }

  const handleShareToWhatsApp = (text) => {
    const waText = encodeURIComponent(`*Tanya SahabatAI - SahabatGinjal:*\n\n${text}`)
    window.open(`https://wa.me/?text=${waText}`, '_blank', 'noopener,noreferrer')
  }

  // Format teks sederhana (bold, list, bullet)
  const renderFormattedText = (rawText) => {
    const paragraphs = rawText.split('\n')
    return paragraphs.map((para, pIdx) => {
      if (!para.trim()) {
        return <div key={pIdx} className="h-2" />
      }

      // Format bold **kata**
      const parts = para.split(/(\*\*.*?\*\*)/g)
      return (
        <p key={pIdx} className="leading-relaxed">
          {parts.map((part, idx) => {
            if (part.startsWith('**') && part.endsWith('**')) {
              return (
                <strong key={idx} className="font-semibold text-ink dark:text-white">
                  {part.slice(2, -2)}
                </strong>
              )
            }
            return part
          })}
        </p>
      )
    })
  }

  return (
    <>
      {/* 1. TOMBOL MELAYANG DENGAN ARROW CLICK INDICATOR */}
      <div className="fixed bottom-[max(5.2rem,calc(4.5rem+env(safe-area-inset-bottom,0px)))] right-4 z-40 lg:bottom-6 lg:right-6">
        {/* NOTIFIKASI POPUP SETIAP 40 DETIK */}
        <AnimatePresence>
          {!isOpen && !isAlertMuted && showNotification && (
            <motion.div
              initial={{ opacity: 0, y: 12, scale: 0.9, filter: 'blur(4px)' }}
              animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: 8, scale: 0.9, filter: 'blur(4px)' }}
              transition={{ type: 'spring', stiffness: 350, damping: 25 }}
              onClick={() => {
                setIsOpen(true)
                setShowNotification(false)
              }}
              className="absolute -top-22 right-0 z-50 w-72 max-w-[calc(100vw-3rem)] cursor-pointer select-none rounded-2xl border border-line-strong bg-surface/95 p-3 shadow-2xl backdrop-blur-xl transition-all hover:scale-[1.02] active:scale-[0.98] dark:shadow-black/60"
            >
              {/* Segitiga Ekor Balon Mengarah ke Tombol */}
              <div className="absolute -bottom-1.5 right-6 size-3 rotate-45 border-r border-b border-line-strong bg-surface" />

              <div className="relative flex items-center justify-between gap-2.5">
                {/* Ikon Avatar Bot */}
                <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-leaf-500 to-tide-600 text-white shadow-xs">
                  <Bot className="size-5" />
                </div>

                {/* Teks Notifikasi Rapi (Tidak Terpotong) */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-xs text-ink dark:text-white">SahabatAI</span>
                    <Sparkles className="size-3 text-amber-500" />
                  </div>
                  <p className="mt-0.5 text-[11px] text-ink-soft leading-tight">
                    Ada pertanyaan seputar ginjal & makanan? Klik untuk diskusi! 💬
                  </p>
                </div>

                {/* Tombol Simpel Matikan/Tutup Notifikasi */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    setIsAlertMuted(true)
                    setShowNotification(false)
                  }}
                  title="Matikan notifikasi pengingat ini"
                  aria-label="Matikan notifikasi"
                  className="grid size-6 shrink-0 place-items-center rounded-full text-ink-faint transition-colors hover:bg-surface-muted hover:text-warm"
                >
                  <X className="size-3.5" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* TOMBOL BULAT UTAMA */}
        <motion.button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? 'Tutup obrolan SahabatAI' : 'Buka obrolan SahabatAI'}
          className={cn(
            'group relative flex items-center justify-center rounded-full shadow-2xl transition-all duration-300',
            isOpen
              ? 'size-13 bg-surface text-ink ring-2 ring-line-strong'
              : 'size-14 bg-linear-to-tr from-leaf-600 via-leaf-500 to-tide-600 text-white ring-4 ring-leaf-500/25',
            'hover:shadow-leaf-500/30 active:scale-95',
          )}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
        >
          {/* Efek Denyut Halus */}
          {!isOpen && (
            <span
              aria-hidden="true"
              className="absolute inset-0 -z-10 animate-pulse-ring rounded-full bg-leaf-400/40 opacity-75"
            />
          )}

          <div className="relative flex items-center justify-center">
            {isOpen ? (
              <X className="size-6 transition-transform group-hover:rotate-90" />
            ) : (
              <Bot className="size-7 transition-transform group-hover:scale-110" />
            )}
            {!isOpen && (
              <span className="absolute -top-1 -right-1 size-3 rounded-full border-2 border-surface bg-amber-400 animate-pulse" />
            )}
          </div>
        </motion.button>
      </div>

      {/* 2. JENDELA PERCAKAPAN (BULAT ORGANIK & ANIMASI MEKAR) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="chat-window"
            initial={{ opacity: 0, scale: 0.15, y: 35, filter: 'blur(8px)' }}
            animate={{ opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 0.15, y: 35, filter: 'blur(8px)' }}
            transition={{
              type: 'spring',
              stiffness: 350,
              damping: 27,
              mass: 0.85,
            }}
            style={{ transformOrigin: 'bottom right' }}
            className={cn(
              'fixed z-50 flex flex-col overflow-hidden bg-surface shadow-2xl backdrop-blur-2xl transition-colors',
              // Desktop: Tampilan membulat organik yang modern & nyaman
              'lg:bottom-22 lg:right-6 lg:h-[620px] lg:max-h-[82vh] lg:w-[420px] lg:rounded-[2.25rem] lg:border lg:border-line-strong',
              // Ponsel: Bottom sheet dengan lengkungan atas sangat lembut
              'inset-x-0 bottom-0 h-[88vh] max-h-[92vh] rounded-t-[2.25rem] border-t border-line-strong lg:inset-x-auto lg:top-auto',
            )}
          >
            {/* Grab Bar di Mobile */}
            <div className="flex h-4 w-full items-center justify-center lg:hidden">
              <span className="h-1.5 w-12 rounded-full bg-line-strong" />
            </div>

            {/* HEADER OBROLAN */}
            <header className="flex items-center justify-between border-b border-line bg-surface/90 px-4 py-3">
              <div className="flex items-center gap-3">
                <div className="relative flex size-10 items-center justify-center rounded-2xl bg-linear-to-br from-leaf-500 to-tide-600 text-white shadow-sm">
                  <Bot className="size-5.5" />
                  <span className="absolute -right-0.5 -bottom-0.5 size-3 rounded-full border-2 border-surface bg-emerald-500" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-bold text-ink text-sm dark:text-white">SahabatAI</h3>
                    <Sparkles className="size-3.5 text-amber-500" />
                    <span className="rounded-full bg-leaf-100 px-2 py-0.5 font-medium text-[10px] text-leaf-800 dark:bg-leaf-900/40 dark:text-leaf-300">
                      Online ✨
                    </span>
                  </div>
                  <p className="text-[11px] text-ink-soft">Teman Diskusi Ginjal & Cuci Darah</p>
                </div>
              </div>

              {/* Tombol Aksi Header */}
              <div className="flex items-center gap-1">
                {/* Tombol Matikan/Aktifkan Notifikasi 40 Detik */}
                <button
                  type="button"
                  onClick={() => setIsAlertMuted(!isAlertMuted)}
                  title={isAlertMuted ? 'Aktifkan pengingat notifikasi 40 detik' : 'Matikan pengingat notifikasi 40 detik'}
                  aria-label={isAlertMuted ? 'Aktifkan notifikasi' : 'Matikan notifikasi'}
                  className={cn(
                    'grid size-8 place-items-center rounded-full transition-colors',
                    isAlertMuted
                      ? 'text-ink-faint hover:bg-surface-muted hover:text-ink'
                      : 'text-primary hover:bg-leaf-100 dark:hover:bg-leaf-950',
                  )}
                >
                  {isAlertMuted ? <BellOff className="size-4" /> : <Bell className="size-4" />}
                </button>

                <button
                  type="button"
                  onClick={handleClearHistory}
                  title="Hapus Riwayat Chat"
                  className="grid size-8 place-items-center rounded-full text-ink-soft transition-colors hover:bg-surface-muted hover:text-warm"
                >
                  <Trash2 className="size-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  title="Tutup Obrolan"
                  className="grid size-8 place-items-center rounded-full text-ink-soft transition-colors hover:bg-surface-muted hover:text-ink"
                >
                  <Minus className="hidden size-4 lg:block" />
                  <ChevronDown className="size-5 lg:hidden" />
                </button>
              </div>
            </header>

            {/* DISCLAIMER MEDIS SINGKAT */}
            <div className="flex items-center gap-2 border-b border-line/60 bg-amber-500/10 px-3.5 py-1.5 text-[11px] text-amber-900 dark:text-amber-300">
              <AlertCircle className="size-3.5 shrink-0 text-amber-600 dark:text-amber-400" />
              <span className="leading-tight">
                Pendamping edukasi ramah. Bukan pengganti dokter atau tindakan IGD darurat.
              </span>
            </div>

            {/* DAFTAR PESAN (CHAT STREAM) */}
            <div className="flex-1 space-y-4 overflow-y-auto p-4 text-sm scroll-smooth">
              {messages.map((msg) => {
                const isBot = msg.sender === 'bot'

                return (
                  <div
                    key={msg.id}
                    className={cn(
                      'flex flex-col',
                      isBot ? 'items-start' : 'items-end',
                    )}
                  >
                    <div
                      className={cn(
                        'relative max-w-[88%] rounded-2xl p-3.5 text-sm shadow-sm transition-all',
                        isBot
                          ? 'rounded-tl-xs border border-line bg-surface-muted text-ink'
                          : 'rounded-tr-xs bg-linear-to-r from-leaf-700 to-leaf-600 text-white',
                        msg.isEmergency &&
                          'border-red-500/60 bg-red-50/90 text-red-950 ring-2 ring-red-400/40 dark:bg-red-950/40 dark:text-red-200',
                      )}
                    >
                      {/* Konten Teks Pesan */}
                      <div className="space-y-1.5 text-xs sm:text-[13px]">
                        {renderFormattedText(msg.text)}
                      </div>

                      {/* Tombol Cepat Panggilan IGD jika Kondisi Darurat */}
                      {msg.isEmergency && (
                        <div className="mt-3 flex flex-wrap gap-2 pt-2 border-t border-red-300/40">
                          <a
                            href="tel:119"
                            className="inline-flex items-center gap-1.5 rounded-lg bg-red-600 px-3 py-1.5 font-bold text-xs text-white shadow hover:bg-red-700"
                          >
                            <AlertCircle className="size-3.5" /> Panggil Ambulans 119
                          </a>
                          <a
                            href="#rumah-sakit"
                            onClick={() => setIsOpen(false)}
                            className="inline-flex items-center gap-1.5 rounded-lg bg-surface px-3 py-1.5 font-semibold text-xs text-red-700 ring-1 ring-red-300 hover:bg-red-50"
                          >
                            Cari RS Terdekat
                          </a>
                        </div>
                      )}

                      {/* Bar Informasi Waktu & Tombol Salin */}
                      <div
                        className={cn(
                          'mt-2 flex items-center justify-between gap-3 text-[10px]',
                          isBot ? 'text-ink-faint' : 'text-white/80',
                        )}
                      >
                        <span>{msg.timestamp}</span>

                        {isBot && (
                          <div className="flex items-center gap-1.5">
                            <button
                              type="button"
                              onClick={() => handleCopyMessage(msg.id, msg.text)}
                              title="Salin teks jawaban"
                              className="inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 hover:bg-surface hover:text-ink transition-colors"
                            >
                              {copiedId === msg.id ? (
                                <>
                                  <Check className="size-3 text-emerald-600" />
                                  <span className="text-[10px] text-emerald-600 font-medium">Tersalin</span>
                                </>
                              ) : (
                                <>
                                  <Copy className="size-3" />
                                  <span>Salin</span>
                                </>
                              )}
                            </button>

                            <button
                              type="button"
                              onClick={() => handleShareToWhatsApp(msg.text)}
                              title="Kirim ke WhatsApp Keluarga"
                              className="inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 hover:bg-emerald-100 hover:text-emerald-800 dark:hover:bg-emerald-950 transition-colors"
                            >
                              <Share2 className="size-3" />
                              <span>WhatsApp</span>
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })}

              {/* Indikator Mengetik */}
              {isTyping && (
                <div className="flex items-center gap-2 text-ink-soft">
                  <div className="flex size-7 items-center justify-center rounded-xl bg-surface-muted border border-line">
                    <Bot className="size-4 animate-spin-slow text-primary" />
                  </div>
                  <div className="flex items-center gap-1.5 rounded-2xl bg-surface-muted px-3.5 py-2 text-xs">
                    <span className="size-1.5 animate-bounce rounded-full bg-primary" />
                    <span className="size-1.5 animate-bounce rounded-full bg-primary [animation-delay:0.2s]" />
                    <span className="size-1.5 animate-bounce rounded-full bg-primary [animation-delay:0.4s]" />
                    <span className="ml-1 text-[11px] text-ink-faint">SahabatAI sedang berpikir...</span>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* CHIPS PERTANYAAN CEPAT (SUGGESTION PILLS) */}
            <div className="border-t border-line/70 bg-surface/90 px-3 py-2">
              <p className="mb-1.5 font-medium text-[11px] text-ink-faint">
                Pertanyaan Cepat Sering Ditanyakan:
              </p>
              <div className="flex gap-1.5 overflow-x-auto pb-1 no-scrollbar">
                {SUGGESTED_QUESTIONS.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleSendMessage(item.query)}
                    className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-line bg-surface px-2.5 py-1 text-xs text-ink-soft shadow-xs transition-all hover:border-primary hover:bg-leaf-50 hover:text-primary dark:hover:bg-leaf-950 active:scale-95"
                  >
                    <span>{item.icon}</span>
                    <span className="whitespace-nowrap">{item.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* FORM INPUT PESAN */}
            <form
              onSubmit={(e) => {
                e.preventDefault()
                handleSendMessage()
              }}
              className="flex items-center gap-2 border-t border-line bg-surface p-3"
            >
              <input
                ref={inputRef}
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Ketik pertanyaan seputar ginjal / cuci darah..."
                className="flex-1 rounded-2xl border border-line bg-surface-muted px-4 py-2.5 text-xs sm:text-sm text-ink outline-none transition-all placeholder:text-ink-faint focus:border-primary focus:bg-surface focus:ring-2 focus:ring-primary/20"
              />
              <button
                type="submit"
                disabled={!inputMessage.trim() || isTyping}
                aria-label="Kirim pertanyaan"
                className="grid size-10 shrink-0 place-items-center rounded-2xl bg-linear-to-r from-leaf-600 to-tide-600 text-white shadow-sm transition-transform hover:scale-105 active:scale-95 disabled:pointer-events-none disabled:opacity-40"
              >
                <Send className="size-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
