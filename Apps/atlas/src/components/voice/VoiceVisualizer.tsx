import { motion } from 'framer-motion'
import { voiceMotion } from './VoiceVisualConfig'
import { VoiceState, useVoiceState } from './VoiceState'

const bars = [0.45, 0.78, 1, 0.62, 0.9, 0.52, 0.74]

export function VoiceVisualizer() {
  const { voiceState } = useVoiceState()
  const active = voiceState === VoiceState.Listening || voiceState === VoiceState.Speaking

  return (
    <motion.div
      className="voice-visualizer"
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: active ? 1 : 0, y: active ? 0 : 5 }}
      transition={{ duration: voiceMotion.stateTransition, ease: [0.22, 1, 0.36, 1] }}
      aria-hidden="true"
    >
      {bars.map((height, index) => (
        <motion.span
          key={index}
          className="voice-visualizer__bar"
          style={{ height: `${height * 1.25}rem` }}
          animate={active ? { scaleY: [0.45, 1, 0.58, 0.9, 0.45] } : { scaleY: 0.45 }}
          transition={{
            duration: voiceMotion.waveformDuration,
            delay: index * voiceMotion.waveformStagger,
            ease: [0.4, 0, 0.2, 1],
            repeat: active ? Infinity : 0,
          }}
        />
      ))}
    </motion.div>
  )
}
