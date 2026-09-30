import { useCallback, useEffect, useReducer } from 'react'

const IDLE = { running: false, phase: 0, left: 0, cycles: 0 }

function reducer(state, action) {
  switch (action.type) {
    case 'start':
      return { running: true, phase: 0, left: action.phases[0].seconds, cycles: 0 }
    case 'stop':
      return IDLE
    case 'tick': {
      if (!state.running) return state
      if (state.left > 1) return { ...state, left: state.left - 1 }
      const phase = (state.phase + 1) % action.phases.length
      return {
        ...state,
        phase,
        left: action.phases[phase].seconds,
        cycles: phase === 0 ? state.cycles + 1 : state.cycles,
      }
    }
    default:
      return state
  }
}

/**
 * Penghitung latihan napas. `phases` harus referensi stabil (dari data/calm.js).
 * Mengembalikan fase aktif, sisa detik, jumlah siklus, serta start/stop.
 */
export default function useBreathing(phases) {
  const [state, dispatch] = useReducer(reducer, IDLE)

  useEffect(() => {
    if (!state.running) return undefined
    const timer = window.setInterval(() => dispatch({ type: 'tick', phases }), 1000)
    return () => window.clearInterval(timer)
  }, [state.running, phases])

  const start = useCallback(() => dispatch({ type: 'start', phases }), [phases])
  const stop = useCallback(() => dispatch({ type: 'stop' }), [])

  return {
    ...state,
    current: state.running ? phases[state.phase] : null,
    start,
    stop,
  }
}
