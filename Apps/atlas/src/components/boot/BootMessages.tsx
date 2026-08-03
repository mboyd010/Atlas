import { motion } from 'framer-motion'
import { bootMotion, hasReached, initializationMessages, isBetween, type BootPhase } from './BootTimeline'

type BootMessagesProps = {
  phase: BootPhase
}

export function BootMessages({ phase }: BootMessagesProps) {
  return (
    <div className="boot-messages" aria-hidden="true">
      {initializationMessages.flatMap(({ label, phase: start, success, successPhase }, index) => {
        const nextStart = initializationMessages[index + 1]?.phase ?? 'headerContent'

        return [
          <BootMessage key={label} label={label} visible={isBetween(phase, start, successPhase)} />,
          <BootMessage key={success} label={`✓ ${success}`} visible={isBetween(phase, successPhase, nextStart)} complete />,
        ]
      })}
      <BootMessage label="System Online" visible={hasReached(phase, 'systemOnline')} complete />
    </div>
  )
}

function BootMessage({ label, visible, complete = false }: { label: string; visible: boolean; complete?: boolean }) {
  return (
    <motion.p
      className={`boot-messages__item${complete ? ' boot-messages__item--complete' : ''}`}
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : -4 }}
      transition={{ duration: bootMotion.messageDuration, ease: [0.22, 1, 0.36, 1] }}
    >
      {label}
    </motion.p>
  )
}
