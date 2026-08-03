import { motion } from 'framer-motion'
import { bootMotion } from '../boot/BootTimeline'

type OrbitRingProps = {
  className: string
  duration: number
  visible: boolean
  direction?: 1 | -1
}

export function OrbitRing({ className, duration, visible, direction = 1 }: OrbitRingProps) {
  return (
    <motion.span
      className={className}
      initial={{ opacity: 0, scale: 0.9, rotate: 0 }}
      animate={{ opacity: visible ? 1 : 0, scale: visible ? 1 : 0.9, rotate: direction * 360 }}
      transition={{
        opacity: { duration: bootMotion.ringAppearDuration, ease: [0.22, 1, 0.36, 1] },
        scale: { duration: bootMotion.ringAppearDuration, ease: [0.22, 1, 0.36, 1] },
        rotate: { duration, ease: [0.45, 0, 0.55, 1], repeat: Infinity },
      }}
    />
  )
}
