import { motion, useReducedMotion } from 'framer-motion'
import { Mic } from 'lucide-react'
import { bootMotion, hasReached, type BootPhase } from '../boot/BootTimeline'
import { VoiceState, useVoiceState } from './VoiceState'
import { VoiceVisualizer } from './VoiceVisualizer'

type VoiceDockProps = {
  phase: BootPhase
}

export function VoiceDock({ phase }: VoiceDockProps) {
  const reduceMotion = useReducedMotion()
  const { voiceState } = useVoiceState()
  const visible = hasReached(phase, 'dock')
  const active = voiceState === VoiceState.Listening || voiceState === VoiceState.Speaking

  return (
    <motion.footer
      className={`voice-dock${active ? ' voice-dock--active' : ''}`}
      initial={{ opacity: visible ? 1 : 0, y: visible ? 0 : 8 }}
      animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 8 }}
      transition={{ duration: bootMotion.shellDuration, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="voice-dock__control">
        <VoiceVisualizer />
        <motion.button
          className="voice-dock__button"
          type="button"
          aria-label="Voice control"
          animate={reduceMotion ? { scale: 1 } : { scale: active ? [1, 1.06, 1] : [1, 1.035, 1] }}
          transition={{ duration: bootMotion.dockBreatheDuration, ease: 'easeInOut', repeat: Infinity }}
          whileHover={
            reduceMotion
              ? undefined
              : { scale: 1.08, transition: { duration: bootMotion.interaction.hoverDuration } }
          }
          whileTap={{ scale: 0.97, transition: { duration: bootMotion.interaction.pressDuration } }}
        >
          <Mic aria-hidden="true" strokeWidth={1.5} />
        </motion.button>
      </div>
    </motion.footer>
  )
}
