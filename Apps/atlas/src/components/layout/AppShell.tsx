import { BootSequence } from '../boot/BootSequence'
import type { BootPhase } from '../boot/BootTimeline'
import { MainViewport } from './MainViewport'
import { Header } from './Header'
import { Sidebar } from '../navigation/Sidebar'
import { VoiceDock } from '../voice/VoiceDock'
import { VoiceControls } from '../voice/VoiceControls'

type AppShellProps = {
  phase: BootPhase
  bootActive: boolean
}

export function AppShell({ phase, bootActive }: AppShellProps) {
  return (
    <div className="atlas-shell">
      <Sidebar phase={phase} />
      <Header phase={phase} />
      <MainViewport phase={phase} bootActive={bootActive} />
      <VoiceDock phase={phase} />
      <VoiceControls />
      {bootActive && <BootSequence phase={phase} />}
    </div>
  )
}
