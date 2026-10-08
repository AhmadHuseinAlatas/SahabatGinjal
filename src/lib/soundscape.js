/**
 * Generator suara ambien sintetis menggunakan Web Audio API murni.
 * Tanpa file MP3 eksternal, 100% offline, hemat kuota internet, dan dapat diputar berulang kali tanpa batas.
 */

let audioCtx = null
let activeSessionId = 0
let activeCleanup = null
let currentMasterGain = null
let currentVolume = 0.35

/**
 * Inisialisasi atau kembalikan AudioContext yang aktif.
 */
function getAudioContext() {
  const AudioContextClass = window.AudioContext || window.webkitAudioContext
  if (!AudioContextClass) return null

  if (!audioCtx || audioCtx.state === 'closed') {
    audioCtx = new AudioContextClass()
  }
  return audioCtx
}

/**
 * Cache noise buffer untuk efisiensi memori.
 */
let cachedNoiseBuffer = null

function getNoiseBuffer(ctx, duration = 5) {
  if (cachedNoiseBuffer && cachedNoiseBuffer.sampleRate === ctx.sampleRate) {
    return cachedNoiseBuffer
  }

  const bufferSize = ctx.sampleRate * duration
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
  const data = buffer.getChannelData(0)

  // Algoritma Pink/Brown noise lembut
  let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0
  for (let i = 0; i < bufferSize; i++) {
    const white = Math.random() * 2 - 1
    b0 = 0.99886 * b0 + white * 0.0555179
    b1 = 0.99332 * b1 + white * 0.0750759
    b2 = 0.96900 * b2 + white * 0.1538520
    b3 = 0.86650 * b3 + white * 0.3104856
    b4 = 0.55000 * b4 + white * 0.5329522
    b5 = -0.7616 * b5 - white * 0.0168980
    data[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.12
    b6 = white * 0.115926
  }

  cachedNoiseBuffer = buffer
  return cachedNoiseBuffer
}

/**
 * Daftar jenis suara penenang yang tersedia.
 */
export const SOUND_PRESETS = [
  {
    id: 'rain',
    label: 'Rintik Hujan',
    desc: 'Suara derau rintik air lembut di jendela kamar.',
  },
  {
    id: 'waves',
    label: 'Ombak Pantai',
    desc: 'Deburan ombak berirama teratur untuk meredakan denyut tegang.',
  },
  {
    id: 'brown',
    label: 'Derau Masking (Brown)',
    desc: 'Derau hangat meredam bunyi bising mesin HD & monitor rumah sakit.',
  },
  {
    id: 'meditation',
    label: 'Harmoni 432 Hz',
    desc: 'Resonansi nada lembut menenangkan saraf dan rasa cemas.',
  },
]

/**
 * Ubah volume suara aktif secara langsung (0.01 - 1.0).
 */
export function setAmbientVolume(vol) {
  currentVolume = Math.max(0.01, Math.min(1, vol))
  if (currentMasterGain && audioCtx) {
    try {
      const now = audioCtx.currentTime
      currentMasterGain.gain.cancelScheduledValues(now)
      currentMasterGain.gain.linearRampToValueAtTime(currentVolume, now + 0.1)
    } catch {
      /* ignore */
    }
  }
}

/**
 * Hentikan suara yang sedang berputar.
 * @param {boolean} immediate - Jika true, hentikan instan tanpa fade out.
 */
export function stopAmbientSound(immediate = false) {
  // Menaikkan ID sesi langsung menggugurkan timer dari sesi sebelumnya
  activeSessionId++

  if (activeCleanup) {
    const cleanup = activeCleanup
    activeCleanup = null
    currentMasterGain = null
    cleanup(immediate)
  }
}

/**
 * Putar suara ambien sesuai jenis pilihan (rain, waves, brown, meditation).
 * @param {string} type - Jenis suara: 'rain' | 'waves' | 'brown' | 'meditation'
 * @param {number} volume - Tingkat volume (0.05 - 1.0)
 * @returns {Promise<boolean>}
 */
export async function playAmbientSound(type = 'rain', volume = currentVolume) {
  try {
    const ctx = getAudioContext()
    if (!ctx) return false

    if (ctx.state === 'suspended') {
      await ctx.resume()
    }

    // Bersihkan sesi sebelumnya secara instan agar tidak tumpang tindih
    stopAmbientSound(true)

    const thisSessionId = ++activeSessionId
    currentVolume = Math.max(0.01, Math.min(1, volume))

    // Master Gain untuk pengaturan volume & fade in/out
    const masterGain = ctx.createGain()
    masterGain.gain.setValueAtTime(0.0001, ctx.currentTime)
    masterGain.gain.linearRampToValueAtTime(currentVolume, ctx.currentTime + 1.2)
    masterGain.connect(ctx.destination)
    currentMasterGain = masterGain

    const nodesToStop = []
    const nodesToDisconnect = [masterGain]

    if (type === 'rain') {
      // Suara Hujan Lembut (Lowpass + Highpass pada Pink Noise)
      const buffer = getNoiseBuffer(ctx, 4)
      const noise = ctx.createBufferSource()
      noise.buffer = buffer
      noise.loop = true

      const highpass = ctx.createBiquadFilter()
      highpass.type = 'highpass'
      highpass.frequency.setValueAtTime(140, ctx.currentTime)

      const lowpass = ctx.createBiquadFilter()
      lowpass.type = 'lowpass'
      lowpass.frequency.setValueAtTime(680, ctx.currentTime)

      noise.connect(highpass)
      highpass.connect(lowpass)
      lowpass.connect(masterGain)

      nodesToStop.push(noise)
      nodesToDisconnect.push(noise, highpass, lowpass)
    } else if (type === 'waves') {
      // Deburan Ombak (LFO mengayunkan cutoff filter dan volume perlahan ~9 detik)
      const buffer = getNoiseBuffer(ctx, 6)
      const noise = ctx.createBufferSource()
      noise.buffer = buffer
      noise.loop = true

      const filter = ctx.createBiquadFilter()
      filter.type = 'lowpass'
      filter.frequency.setValueAtTime(450, ctx.currentTime)

      // LFO untuk ayunan deburan ombak
      const lfo = ctx.createOscillator()
      lfo.frequency.setValueAtTime(0.11, ctx.currentTime) // Siklus ~9 detik

      const lfoGain = ctx.createGain()
      lfoGain.gain.setValueAtTime(320, ctx.currentTime) // Rentang ayunan 450 +/- 320 Hz
      lfo.connect(lfoGain)
      lfoGain.connect(filter.frequency)

      noise.connect(filter)
      filter.connect(masterGain)

      nodesToStop.push(noise, lfo)
      nodesToDisconnect.push(noise, filter, lfo, lfoGain)
    } else if (type === 'brown') {
      // Derau Masking Frekuensi Rendah (Penenang Ruang HD)
      const buffer = getNoiseBuffer(ctx, 4)
      const noise = ctx.createBufferSource()
      noise.buffer = buffer
      noise.loop = true

      const lowpass = ctx.createBiquadFilter()
      lowpass.type = 'lowpass'
      lowpass.frequency.setValueAtTime(380, ctx.currentTime)

      noise.connect(lowpass)
      lowpass.connect(masterGain)

      nodesToStop.push(noise)
      nodesToDisconnect.push(noise, lowpass)
    } else if (type === 'meditation') {
      // Alunan Resonansi Meditatif 432 Hz + Harmoni Sub-oktaf 216 Hz
      const osc1 = ctx.createOscillator()
      osc1.type = 'sine'
      osc1.frequency.setValueAtTime(432, ctx.currentTime) // Nada pokok

      const osc2 = ctx.createOscillator()
      osc2.type = 'sine'
      osc2.frequency.setValueAtTime(216, ctx.currentTime) // Sub-oktaf hangat

      const osc3 = ctx.createOscillator()
      osc3.type = 'sine'
      osc3.frequency.setValueAtTime(436, ctx.currentTime) // Detak binaural pelan 4 Hz (theta)

      const toneGain = ctx.createGain()
      toneGain.gain.setValueAtTime(0.18, ctx.currentTime)

      const filter = ctx.createBiquadFilter()
      filter.type = 'lowpass'
      filter.frequency.setValueAtTime(800, ctx.currentTime)

      osc1.connect(toneGain)
      osc2.connect(toneGain)
      osc3.connect(toneGain)
      toneGain.connect(filter)
      filter.connect(masterGain)

      nodesToStop.push(osc1, osc2, osc3)
      nodesToDisconnect.push(osc1, osc2, osc3, toneGain, filter)
    }

    // Jalankan semua generator suara
    nodesToStop.forEach((node) => {
      try {
        node.start()
      } catch {
        /* ignore */
      }
    })

    // Daftarkan fungsi pembersih aman yang terisolasi untuk sesi ini
    activeCleanup = (immediate) => {
      try {
        const now = ctx.currentTime
        if (immediate) {
          masterGain.gain.cancelScheduledValues(now)
          masterGain.gain.setValueAtTime(0.0001, now)
          nodesToStop.forEach((n) => {
            try { n.stop() } catch { /* ignore */ }
          })
          nodesToDisconnect.forEach((n) => {
            try { n.disconnect() } catch { /* ignore */ }
          })
        } else {
          // Fade out lembut 0.5 detik
          masterGain.gain.cancelScheduledValues(now)
          masterGain.gain.setValueAtTime(masterGain.gain.value, now)
          masterGain.gain.linearRampToValueAtTime(0.0001, now + 0.5)

          setTimeout(() => {
            // Hanya hentikan node jika ID sesi ini tidak digantikan oleh sesi baru
            if (activeSessionId === thisSessionId) {
              nodesToStop.forEach((n) => {
                try { n.stop() } catch { /* ignore */ }
              })
              nodesToDisconnect.forEach((n) => {
                try { n.disconnect() } catch { /* ignore */ }
              })
            }
          }, 550)
        }
      } catch {
        /* ignore */
      }
    }

    return true
  } catch (err) {
    console.error('Soundscape play error:', err)
    return false
  }
}

/**
 * Kompatibilitas mundur: Putar suara hujan penenang
 */
export function playAmbientRain(volume = 0.3) {
  return playAmbientSound('rain', volume)
}

/**
 * Kompatibilitas mundur: Hentikan suara hujan penenang
 */
export function stopAmbientRain(immediate = false) {
  stopAmbientSound(immediate)
}

