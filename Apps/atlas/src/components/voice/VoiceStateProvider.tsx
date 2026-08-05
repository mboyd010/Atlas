import { type ReactNode, useMemo, useState } from 'react'
import { type VoiceState, VoiceStateContext, VoiceState as VoiceStates } from './VoiceState'

export function VoiceStateProvider({ children }: { children: ReactNode }) {
  const [voiceState, setVoiceState] = useState<VoiceState>(VoiceStates.Idle)
  const value = useMemo(() => ({ voiceState, setVoiceState }), [voiceState])

  return <VoiceStateContext.Provider value={value}>{children}</VoiceStateContext.Provider>
}
