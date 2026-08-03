import { AmbientParticle, type AmbientParticleData } from '../motion/AmbientParticle'
import { bootMotion, hasReached, type BootPhase } from './BootTimeline'

const particles: AmbientParticleData[] = Array.from({ length: bootMotion.background.particleCount }, (_, index) => ({
  id: index,
  left: 12 + ((index * 29) % 76),
  top: 10 + ((index * 47) % 80),
  size: 1 + (index % 2) * 0.35,
  opacity: 0.07 + (index % 3) * 0.025,
  driftX: ((index * 11) % 7) - 3,
  driftY: ((index * 17) % 9) - 4,
  duration: bootMotion.background.particleDurationBase + (index % 5) * bootMotion.background.particleDurationStep,
  phase: index * 0.74,
}))

type BootBackgroundParticlesProps = {
  phase: BootPhase
}

export function BootBackgroundParticles({ phase }: BootBackgroundParticlesProps) {
  const active = hasReached(phase, 'background')

  return (
    <div className="boot-background-particles" aria-hidden="true">
      {particles.map((particle) => (
        <AmbientParticle
          key={particle.id}
          className="boot-background-particles__particle"
          particle={particle}
          active={active}
          fadeDuration={bootMotion.background.particleFadeDuration}
        />
      ))}
    </div>
  )
}
