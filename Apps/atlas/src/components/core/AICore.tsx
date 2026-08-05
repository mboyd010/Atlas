import { motion } from 'framer-motion'
import { bootMotion, hasReached, type BootPhase } from '../boot/BootTimeline'
import { SystemStatus } from '../SystemStatus'
import { OrbitRing } from './OrbitRing'
import { OrbitParticles } from './OrbitParticles'
import { ParticleField } from './ParticleField'
import { VoiceState, useVoiceState } from '../voice/VoiceState'
import { voiceMotion, voiceVisualConfig } from '../voice/VoiceVisualConfig'

type AICoreProps = {
  phase: BootPhase
  bootActive: boolean
}

export function AICore({ phase, bootActive }: AICoreProps) {
  const { voiceState } = useVoiceState()
  const voiceVisual = voiceVisualConfig[voiceState]
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
        animate={{ opacity: assembling || !bootActive ? 1 : 0, scale: voiceVisual.coreScale }}
        transition={{ duration: voiceMotion.stateTransition, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.span
          className="ai-core__voice-glow"
          animate={{ opacity: voiceVisual.glowOpacity, scale: voiceState === VoiceState.Listening ? [0.94, 1.08, 0.94] : 1 }}
          transition={{ duration: voiceState === VoiceState.Listening ? voiceMotion.listeningWave : voiceMotion.stateTransition, ease: [0.22, 1, 0.36, 1], repeat: voiceState === VoiceState.Listening ? Infinity : 0 }}
        />
        <ParticleField phase={phase} bootActive={bootActive} speedMultiplier={voiceVisual.particleSpeed} />
        <OrbitRing
          className="orbit-ring orbit-ring--outer"
          duration={bootMotion.orbitDuration[0]}
          visible={hasReached(phase, 'outerRing')}
          scale={voiceVisual.ringScale}
        />
        <OrbitRing
          className="orbit-ring orbit-ring--inner"
          duration={bootMotion.orbitDuration[1]}
          direction={-1}
          visible={hasReached(phase, 'innerRing')}
          scale={voiceVisual.ringScale}
        />
        <OrbitParticles active={hasReached(phase, 'outerRing')} speedMultiplier={voiceVisual.orbitSpeed} state={voiceState} />
        {voiceState === VoiceState.Listening && (
          <motion.span
            className="ai-core__listening-ring"
            initial={{ opacity: 0, scale: 0.86 }}
            animate={{ opacity: [0, 0.42, 0], scale: [0.86, 1.24, 1.38] }}
            transition={{ duration: voiceMotion.listeningWave, ease: [0.22, 1, 0.36, 1], repeat: Infinity }}
          />
        )}
        {voiceState === VoiceState.Speaking && (
          <motion.span
            className="ai-core__speaking-ripple"
            initial={{ opacity: 0, scale: 0.82 }}
            animate={{ opacity: [0, 0.28, 0], scale: [0.82, 1.16, 1.32] }}
            transition={{ duration: voiceMotion.speakingRipple, ease: [0.22, 1, 0.36, 1], repeat: Infinity }}
          />
        )}
        <motion.div
          className="ai-core__orb"
          initial={{ scale: bootActive ? 0.68 : 1, opacity: bootActive ? 0 : 1 }}
          animate={{ scale: sphereVisible || !bootActive ? [1, voiceVisual.pulseScale, 1] : 0.68, opacity: sphereVisible || !bootActive ? 1 : 0 }}
          transition={{
            scale: { duration: voiceState === VoiceState.Speaking ? voiceMotion.speakingPulse : bootMotion.coreBreatheDuration, ease: [0.22, 1, 0.36, 1], repeat: Infinity },
            opacity: { duration: bootMotion.ringAppearDuration, ease: [0.22, 1, 0.36, 1] },
          }}
        >
          <motion.span
            className="ai-core__orb-inner"
            initial={{ scale: bootActive ? 0.76 : 1, opacity: bootActive ? 0 : 1 }}
            animate={{ scale: sphereVisible || !bootActive ? [1, voiceVisual.pulseScale, 1] : 0.76, opacity: sphereVisible || !bootActive ? 1 : 0 }}
            transition={{
              scale: { duration: voiceState === VoiceState.Speaking ? voiceMotion.speakingPulse : bootMotion.corePulseDuration, ease: [0.22, 1, 0.36, 1], repeat: Infinity },
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
