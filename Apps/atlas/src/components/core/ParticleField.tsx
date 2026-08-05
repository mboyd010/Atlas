import { memo } from 'react'
import { motion } from 'framer-motion'
import { AmbientParticle, type AmbientParticleData } from '../motion/AmbientParticle'
import { ambientParticleMotion, bootMotion, bootParticles, hasReached, type BootPhase } from '../boot/BootTimeline'

const particles: AmbientParticleData[] = Array.from({ length: ambientParticleMotion.count }, (_, index) => ({
  id: index,
  left: 5 + ((index * 37) % 91),
  top: 4 + ((index * 61) % 93),
  size: 1 + (index % 3) * 0.35,
  opacity: 0.13 + (index % 4) * 0.045,
  driftX: ((index * 13) % 9) - 4,
  driftY: ((index * 17) % 11) - 5,
  duration: ambientParticleMotion.durationBase + (index % 8) * ambientParticleMotion.durationStep,
  phase: index * 0.57,
}))

type ParticleFieldProps = {
  phase: BootPhase
  bootActive: boolean
  speedMultiplier: number
}

export function ParticleField({ phase, bootActive, speedMultiplier }: ParticleFieldProps) {
  const assembling = hasReached(phase, 'coreAssembly')
  const active = assembling || !bootActive

  return (
    <>
      {bootActive && (
        <div className="core-assembly-particles" aria-hidden="true">
          {bootParticles.map((particle) => (
            <AssemblyParticle key={particle.id} particle={particle} active={assembling} />
          ))}
        </div>
      )}
      <div className="particle-field" aria-hidden="true">
        {particles.map((particle) => (
          <AmbientParticle
            key={particle.id}
            className="particle-field__particle"
            particle={particle}
            active={active}
            fadeDuration={bootMotion.ringAppearDuration}
            speedMultiplier={speedMultiplier}
          />
        ))}
      </div>
    </>
  )
}

const AssemblyParticle = memo(function AssemblyParticle({
  particle,
  active,
}: {
  particle: (typeof bootParticles)[number]
  active: boolean
}) {
  return (
    <motion.span
      className="core-assembly-particles__particle"
      style={{ width: particle.size, height: particle.size }}
      initial={{ x: particle.x, y: particle.y, opacity: 0 }}
      animate={{ x: active ? 0 : particle.x, y: active ? 0 : particle.y, opacity: active ? [0, 0.65, 0.06] : 0 }}
      transition={{ duration: bootMotion.coreAssemblyDuration, ease: [0.22, 1, 0.36, 1] }}
    />
  )
})
