import { motion } from 'framer-motion'
import { bootMotion, hasReached, type BootPhase } from '../boot/BootTimeline'
import { SystemStatus } from '../SystemStatus'

type HeaderProps = {
  phase: BootPhase
}

export function Header({ phase }: HeaderProps) {
  const visible = hasReached(phase, 'headerWordmark')
  const contentVisible = hasReached(phase, 'headerContent')
  return (
    <motion.header
      className="atlas-header"
      initial={{ opacity: visible ? 1 : 0, y: visible ? 0 : -8 }}
      animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : -8 }}
      transition={{ duration: bootMotion.shellDuration, ease: [0.22, 1, 0.36, 1] }}
    >
      {visible && (
        <motion.span
          layoutId="atlas-wordmark"
          className="atlas-wordmark"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: bootMotion.shellDuration, ease: [0.22, 1, 0.36, 1] }}
        >
          ATLAS
        </motion.span>
      )}
      <motion.div
        className="atlas-header__meta"
        initial={{ opacity: 0, x: 6 }}
        animate={{ opacity: contentVisible ? 1 : 0, x: contentVisible ? 0 : 6 }}
        transition={{ duration: bootMotion.shellDuration, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="atlas-header__status">
          <span>System Status</span>
          <SystemStatus label="Online" />
        </div>
        <span className="atlas-header__time" aria-label="Current time">
          --:--
        </span>
      </motion.div>
    </motion.header>
  )
}
