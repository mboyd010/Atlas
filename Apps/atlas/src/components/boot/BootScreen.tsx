import { type ReactNode } from 'react'
import { motion } from 'framer-motion'
import { BootBackgroundParticles } from './BootBackgroundParticles'
import { bootMotion, hasReached, type BootPhase } from './BootTimeline'

type BootScreenProps = {
  phase: BootPhase
  children: ReactNode
}

export function BootScreen({ phase, children }: BootScreenProps) {
  const radialVisible = hasReached(phase, 'bloom')
  const backgroundVisible = hasReached(phase, 'background')

  return (
    <div className="boot-screen" aria-hidden="true">
      <motion.span
        className="boot-screen__blackout"
        initial={{ opacity: 1 }}
        animate={{ opacity: backgroundVisible ? 0 : 1 }}
        transition={{ duration: bootMotion.shellDuration, ease: [0.22, 1, 0.36, 1] }}
      />
      <motion.span
        className="boot-screen__radial"
        initial={{ opacity: 0 }}
        animate={{ opacity: radialVisible ? 1 : 0 }}
        transition={{ duration: bootMotion.background.radialDuration, ease: [0.22, 1, 0.36, 1] }}
      />
      <motion.span
        className="boot-screen__grid"
        initial={{ opacity: 0 }}
        animate={{ opacity: backgroundVisible ? 1 : 0 }}
        transition={{ duration: bootMotion.background.gridDuration, ease: [0.22, 1, 0.36, 1] }}
      />
      <motion.span
        className="boot-screen__vignette"
        initial={{ opacity: 0 }}
        animate={{ opacity: backgroundVisible ? 1 : 0 }}
        transition={{ duration: bootMotion.background.gridDuration, ease: [0.22, 1, 0.36, 1] }}
      />
      <BootBackgroundParticles phase={phase} />
      <div className="boot-screen__content">{children}</div>
    </div>
  )
}
