import { useEffect } from 'react'
import { LayoutGroup, MotionConfig, useReducedMotion } from 'framer-motion'
import { AppShell } from './components/layout/AppShell'
import { useBootMachine } from './components/boot/useBootMachine'
import { AmbientMotionProvider } from './components/motion/AmbientMotionProvider'
import { VoiceStateProvider } from './components/voice/VoiceStateProvider'
import './styles/atlas.css'

const BOOT_COMPLETED_KEY = 'atlas.boot-sequence.completed'

function readBootCompletion() {
  try {
    return window.localStorage.getItem(BOOT_COMPLETED_KEY) === 'true'
  } catch {
    return false
  }
}

function AtlasApplication() {
  const reduceMotion = useReducedMotion()
  const shouldPlayBoot = import.meta.env.DEV || !readBootCompletion()
  const { phase, complete } = useBootMachine(shouldPlayBoot, Boolean(reduceMotion))

  useEffect(() => {
    if (!complete || import.meta.env.DEV || !shouldPlayBoot) {
      return
    }

    try {
      window.localStorage.setItem(BOOT_COMPLETED_KEY, 'true')
    } catch {
      // Startup remains functional when persistence is unavailable.
    }
  }, [complete, shouldPlayBoot])

  return <AppShell phase={phase} bootActive={shouldPlayBoot && !complete} />
}

function App() {
  return (
    <MotionConfig reducedMotion="user">
      <AmbientMotionProvider>
        <VoiceStateProvider>
          <LayoutGroup id="atlas-shell">
            <AtlasApplication />
          </LayoutGroup>
        </VoiceStateProvider>
      </AmbientMotionProvider>
    </MotionConfig>
  )
}

export default App
