import { type ReactNode } from 'react'
import { useTime } from 'framer-motion'
import { AmbientClockContext } from './AmbientClock'

export function AmbientMotionProvider({ children }: { children: ReactNode }) {
  const clock = useTime()

  return <AmbientClockContext.Provider value={clock}>{children}</AmbientClockContext.Provider>
}
