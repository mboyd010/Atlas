import { motion } from 'framer-motion'
import { Command, Settings } from 'lucide-react'
import { bootMotion, hasReached, type BootPhase } from '../boot/BootTimeline'

const navigationItems = [
  { icon: Command, label: 'Command center' },
  { icon: Settings, label: 'Settings' },
]

type SidebarProps = {
  phase: BootPhase
}

export function Sidebar({ phase }: SidebarProps) {
  const visible = hasReached(phase, 'sidebar')
  return (
    <motion.aside
      className="atlas-sidebar"
      initial={{ opacity: visible ? 1 : 0, x: visible ? 0 : -8 }}
      animate={{ opacity: visible ? 1 : 0, x: visible ? 0 : -8 }}
      transition={{
        duration: bootMotion.shellDuration,
        delay: 0,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <nav aria-label="Primary navigation">
        <ul className="atlas-sidebar__list">
          {navigationItems.map(({ icon: Icon, label }) => (
            <li key={label}>
              <button className="atlas-sidebar__button" type="button" aria-label={label}>
                <Icon aria-hidden="true" strokeWidth={1.4} />
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </motion.aside>
  )
}
