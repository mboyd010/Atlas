import { memo } from 'react'
import { motion, useReducedMotion, useTransform } from 'framer-motion'
import { useAmbientClock } from './AmbientClock'

export type AmbientParticleData = {
  id: number
  left: number
  top: number
  size: number
  opacity: number
  driftX: number
  driftY: number
  duration: number
  phase: number
}

type AmbientParticleProps = {
  className: string
  particle: AmbientParticleData
  active: boolean
  fadeDuration: number
  speedMultiplier?: number
}

export const AmbientParticle = memo(function AmbientParticle({
  className,
  particle,
  active,
  fadeDuration,
  speedMultiplier = 1,
}: AmbientParticleProps) {
  const clock = useAmbientClock()
  const reduceMotion = useReducedMotion()
  const x = useTransform(clock, (time) => Math.sin((time / 1000 / (particle.duration / speedMultiplier)) * Math.PI * 2 + particle.phase) * particle.driftX)
  const y = useTransform(clock, (time) => Math.cos((time / 1000 / (particle.duration / speedMultiplier)) * Math.PI * 2 + particle.phase) * particle.driftY)

  return (
    <motion.span
      className={className}
      style={{
        left: `${particle.left}%`,
        top: `${particle.top}%`,
        width: particle.size,
        height: particle.size,
        x: reduceMotion ? 0 : x,
        y: reduceMotion ? 0 : y,
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: active ? particle.opacity : 0 }}
      transition={{ opacity: { duration: fadeDuration, ease: [0.22, 1, 0.36, 1] } }}
    />
  )
})
