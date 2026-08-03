import { createContext, useContext } from 'react'
import type { MotionValue } from 'framer-motion'

export const AmbientClockContext = createContext<MotionValue<number> | null>(null)

export function useAmbientClock() {
  const clock = useContext(AmbientClockContext)

  if (!clock) {
    throw new Error('useAmbientClock must be used within AmbientMotionProvider')
  }

  return clock
}
