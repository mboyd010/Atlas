import { motion, useReducedMotion } from 'framer-motion'
import { Mic } from 'lucide-react'
import { bootMotion, hasReached, type BootPhase } from '../boot/BootTimeline'

type VoiceDockProps = {
  phase: BootPhase
}

export function VoiceDock({ phase }: VoiceDockProps) {
  const reduceMotion = useReducedMotion()
  const visible = hasReached(phase, 'dock')

  return (
    <motion.footer
      className="voice-dock"
      initial={{ opacity: visible ? 1 : 0, y: visible ? 0 : 8 }}
      animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 8 }}
      transition={{ duration: bootMotion.shellDuration, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.button
        className="voice-dock__button"
        type="button"
        aria-label="Voice control"
        animate={reduceMotion ? { scale: 1 } : { scale: [1, 1.035, 1] }}
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
    </motion.footer>
  )
}
