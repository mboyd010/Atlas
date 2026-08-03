import { AnimatePresence, motion } from 'framer-motion'
import { BootMessages } from './BootMessages'
import { BootScreen } from './BootScreen'
import { bootMotion, hasReached, type BootPhase } from './BootTimeline'

type BootSequenceProps = {
  phase: BootPhase
}

const letterAnimation = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0 },
}

export function BootSequence({ phase }: BootSequenceProps) {
  const pointVisible = hasReached(phase, 'point')
  const bloomVisible = hasReached(phase, 'bloom')
  const wordmarkVisible = hasReached(phase, 'wordmark')
  const handoffWordmark = hasReached(phase, 'headerWordmark')
  const scanVisible = hasReached(phase, 'scan')

  return (
    <BootScreen phase={phase}>
      <div className="boot-sequence__viewport">
        <motion.span
          className="boot-sequence__point"
          initial={{ opacity: 0, scale: 0.4 }}
          animate={{ opacity: pointVisible ? 0.8 : 0, scale: pointVisible ? 1.15 : 0.4 }}
          transition={{ duration: bootMotion.pointDuration, ease: [0.22, 1, 0.36, 1] }}
        />
        <motion.span
          className="boot-sequence__bloom"
          initial={{ opacity: 0, scale: 0.65 }}
          animate={{ opacity: bloomVisible ? 0.56 : 0, scale: bloomVisible ? 1.12 : 0.65 }}
          transition={{ duration: bootMotion.bloomDuration, ease: [0.22, 1, 0.36, 1] }}
        />
        <AnimatePresence>
          {wordmarkVisible && !handoffWordmark && (
            <motion.span
              layoutId="atlas-wordmark"
              className="boot-sequence__wordmark"
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0.12 }}
            >
              {'ATLAS'.split('').map((letter, index) => (
                <motion.span
                  key={`${letter}-${index}`}
                  variants={letterAnimation}
                  transition={{
                    duration: bootMotion.letterDuration,
                    delay: index * bootMotion.letterStagger,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  {letter}
                </motion.span>
              ))}
            </motion.span>
          )}
        </AnimatePresence>
        <motion.span
          className="boot-sequence__scanline"
          initial={{ y: '-10vh', opacity: 0 }}
          animate={scanVisible ? { y: '110vh', opacity: [0, 0.78, 0.78, 0] } : { y: '-10vh', opacity: 0 }}
          transition={{ duration: bootMotion.scanDuration, ease: [0.4, 0, 0.2, 1] }}
        />
        <BootMessages phase={phase} />
      </div>
    </BootScreen>
  )
}
