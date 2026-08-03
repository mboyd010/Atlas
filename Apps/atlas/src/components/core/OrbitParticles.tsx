import { memo } from 'react'
import { motion, useReducedMotion, useTransform } from 'framer-motion'
import { bootMotion } from '../boot/BootTimeline'
import { useAmbientClock } from '../motion/AmbientClock'

const orbitParticles = [
  { id: 0, radius: 78, duration: 23, direction: 1, opacity: 0.42, phase: 0.15 },
  { id: 1, radius: 92, duration: 31, direction: -1, opacity: 0.25, phase: 0.8 },
  { id: 2, radius: 104, duration: 27, direction: 1, opacity: 0.36, phase: 1.5 },
  { id: 3, radius: 116, duration: 38, direction: -1, opacity: 0.22, phase: 2.1 },
  { id: 4, radius: 128, duration: 34, direction: 1, opacity: 0.3, phase: 2.7 },
  { id: 5, radius: 142, duration: 43, direction: -1, opacity: 0.19, phase: 3.35 },
  { id: 6, radius: 154, duration: 36, direction: 1, opacity: 0.28, phase: 4 },
  { id: 7, radius: 86, duration: 29, direction: -1, opacity: 0.33, phase: 4.6 },
  { id: 8, radius: 101, duration: 41, direction: 1, opacity: 0.2, phase: 5.2 },
  { id: 9, radius: 119, duration: 32, direction: -1, opacity: 0.38, phase: 5.85 },
  { id: 10, radius: 134, duration: 46, direction: 1, opacity: 0.18, phase: 0.55 },
  { id: 11, radius: 148, duration: 35, direction: -1, opacity: 0.26, phase: 1.18 },
  { id: 12, radius: 96, duration: 44, direction: 1, opacity: 0.23, phase: 1.85 },
  { id: 13, radius: 162, duration: 48, direction: -1, opacity: 0.16, phase: 2.48 },
] as const

type OrbitParticlesProps = {
  active: boolean
}

export function OrbitParticles({ active }: OrbitParticlesProps) {
  return (
    <div className="orbit-particles" aria-hidden="true">
      {orbitParticles.map((particle) => (
        <OrbitParticle key={particle.id} particle={particle} active={active} />
      ))}
    </div>
  )
}

const OrbitParticle = memo(function OrbitParticle({
  particle,
  active,
}: {
  particle: (typeof orbitParticles)[number]
  active: boolean
}) {
  const clock = useAmbientClock()
  const reduceMotion = useReducedMotion()
  const x = useTransform(clock, (time) => {
    const angle = (time / 1000 / particle.duration) * Math.PI * 2 * particle.direction + particle.phase
    return Math.cos(angle) * particle.radius
  })
  const y = useTransform(clock, (time) => {
    const angle = (time / 1000 / particle.duration) * Math.PI * 2 * particle.direction + particle.phase
    return Math.sin(angle) * particle.radius * 0.58
  })
  const scale = useTransform(clock, (time) => 0.8 + Math.sin((time / 1000 / particle.duration) * Math.PI * 4 + particle.phase) * 0.12)

  return (
    <motion.span
      className="orbit-particles__particle"
      style={{ x: reduceMotion ? 0 : x, y: reduceMotion ? 0 : y, scale: reduceMotion ? 1 : scale }}
      initial={{ opacity: 0 }}
      animate={{ opacity: active ? particle.opacity : 0 }}
      transition={{ opacity: { duration: bootMotion.ringAppearDuration, ease: [0.22, 1, 0.36, 1] } }}
    />
  )
})
