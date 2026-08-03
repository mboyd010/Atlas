import { motion } from 'framer-motion'
import { bootMotion, hasReached, type BootPhase } from '../boot/BootTimeline'
import { SystemStatus } from '../SystemStatus'
import { OrbitRing } from './OrbitRing'
import { OrbitParticles } from './OrbitParticles'
import { ParticleField } from './ParticleField'

type AICoreProps = {
  phase: BootPhase
  bootActive: boolean
}

export function AICore({ phase, bootActive }: AICoreProps) {
  const assembling = hasReached(phase, 'coreAssembly')
  const sphereVisible = hasReached(phase, 'sphere')
  const identityVisible = hasReached(phase, 'identity')

  return (
    <section className="ai-core" aria-labelledby="atlas-core-title">
      <motion.div
        layoutId="atlas-ai-core"
        layout="position"
        className="ai-core__visual"
        aria-hidden="true"
        initial={{ opacity: bootActive ? 0 : 1 }}
        animate={{ opacity: assembling || !bootActive ? 1 : 0 }}
        transition={{ duration: bootMotion.ringAppearDuration, ease: [0.22, 1, 0.36, 1] }}
      >
        <ParticleField phase={phase} bootActive={bootActive} />
        <OrbitRing
          className="orbit-ring orbit-ring--outer"
          duration={bootMotion.orbitDuration[0]}
          visible={hasReached(phase, 'outerRing')}
        />
        <OrbitRing
          className="orbit-ring orbit-ring--inner"
          duration={bootMotion.orbitDuration[1]}
          direction={-1}
          visible={hasReached(phase, 'innerRing')}
        />
        <OrbitParticles active={hasReached(phase, 'outerRing')} />
        <motion.div
          className="ai-core__orb"
          initial={{ scale: bootActive ? 0.68 : 1, opacity: bootActive ? 0 : 1 }}
          animate={{ scale: sphereVisible || !bootActive ? [1, 1.018, 1] : 0.68, opacity: sphereVisible || !bootActive ? 1 : 0 }}
          transition={{
            scale: { duration: bootMotion.coreBreatheDuration, ease: [0.22, 1, 0.36, 1], repeat: Infinity },
            opacity: { duration: bootMotion.ringAppearDuration, ease: [0.22, 1, 0.36, 1] },
          }}
        >
          <motion.span
            className="ai-core__orb-inner"
            initial={{ scale: bootActive ? 0.76 : 1, opacity: bootActive ? 0 : 1 }}
            animate={{ scale: sphereVisible || !bootActive ? [1, 1.035, 1] : 0.76, opacity: sphereVisible || !bootActive ? 1 : 0 }}
            transition={{
              scale: { duration: bootMotion.corePulseDuration, ease: [0.22, 1, 0.36, 1], repeat: Infinity },
              opacity: { duration: bootMotion.ringAppearDuration, ease: [0.22, 1, 0.36, 1] },
            }}
          />
        </motion.div>
      </motion.div>
      <motion.div
        className="ai-core__identity"
        initial={{ opacity: bootActive ? 0 : 1, y: bootActive ? 8 : 0 }}
        animate={{ opacity: identityVisible || !bootActive ? 1 : 0, y: identityVisible || !bootActive ? 0 : 8 }}
        transition={{ duration: bootMotion.shellDuration, ease: [0.22, 1, 0.36, 1] }}
      >
        <h1 id="atlas-core-title">ATLAS</h1>
        <p>AI Operating System</p>
        <SystemStatus label="System Ready" subtle />
      </motion.div>
    </section>
  )
}
