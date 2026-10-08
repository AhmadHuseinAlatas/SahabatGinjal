/**
 * Generator suara ambien sintetis menggunakan Web Audio API.
 * Menghasilkan rintik hujan lembut (gentle rain) tanpa perlu mengunduh aset audio eksternal.
 */

let audioCtx = null
let noiseNode = null
let gainNode = null
let filterNode = null

function createNoiseBuffer(ctx, duration = 4) {
  const bufferSize = ctx.sampleRate * duration
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
  const data = buffer.getChannelData(0)

  // Brown / Pink noise algorithm untuk suara derau lembut seperti hujan
  let lastOut = 0.0
  for (let i = 0; i < bufferSize; i++) {
    const white = Math.random() * 2 - 1
    lastOut = (lastOut + 0.02 * white) / 1.02
    data[i] = lastOut * 3.5
  }

  return buffer
}

export function playAmbientRain(volume = 0.3) {
  try {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext
    if (!AudioContextClass) return null

    if (!audioCtx) {
      audioCtx = new AudioContextClass()
    }

    if (audioCtx.state === 'suspended') {
      audioCtx.resume()
    }

    stopAmbientRain()

    const buffer = createNoiseBuffer(audioCtx)

    noiseNode = audioCtx.createBufferSource()
    noiseNode.buffer = buffer
    noiseNode.loop = true

    // Lowpass filter agar derau terdengar seperti rintik air hujan tenang di luar jendela
    filterNode = audioCtx.createBiquadFilter()
    filterNode.type = 'lowpass'
    filterNode.frequency.setValueAtTime(650, audioCtx.currentTime)

    gainNode = audioCtx.createGain()
    // Fade in lembut 1.5 detik
    gainNode.gain.setValueAtTime(0.001, audioCtx.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(Math.max(0.01, volume), audioCtx.currentTime + 1.5)

    noiseNode.connect(filterNode)
    filterNode.connect(gainNode)
    gainNode.connect(audioCtx.destination)

    noiseNode.start()
    return true
  } catch {
    return false
  }
}

export function stopAmbientRain() {
  try {
    if (gainNode && audioCtx) {
      const now = audioCtx.currentTime
      gainNode.gain.setValueAtTime(gainNode.gain.value, now)
      gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 0.8)
      setTimeout(() => {
        if (noiseNode) {
          try {
            noiseNode.stop()
            noiseNode.disconnect()
          } catch {
            /* ignore */
          }
          noiseNode = null
        }
      }, 850)
    } else if (noiseNode) {
      noiseNode.stop()
      noiseNode.disconnect()
      noiseNode = null
    }
  } catch {
    /* ignore */
  }
}
