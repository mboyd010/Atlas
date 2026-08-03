import { AICore } from '../core/AICore'
import type { BootPhase } from '../boot/BootTimeline'

type MainViewportProps = {
  phase: BootPhase
  bootActive: boolean
}

export function MainViewport({ phase, bootActive }: MainViewportProps) {
  return (
    <main className={`main-viewport${bootActive ? ' main-viewport--boot-active' : ''}`} aria-labelledby="atlas-core-title">
      <AICore phase={phase} bootActive={bootActive} />
    </main>
  )
}
