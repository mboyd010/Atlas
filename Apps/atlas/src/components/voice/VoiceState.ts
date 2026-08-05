import { createContext, useContext } from 'react'

export const VoiceState = {
  Idle: 'idle',
  Listening: 'listening',
  Thinking: 'thinking',
  Speaking: 'speaking',
} as const

export type VoiceState = (typeof VoiceState)[keyof typeof VoiceState]

export type VoiceStateContextValue = {
  voiceState: VoiceState
  setVoiceState: (state: VoiceState) => void
}

export const VoiceStateContext = createContext<VoiceStateContextValue | null>(null)

export function useVoiceState() {
  const context = useContext(VoiceStateContext)

  if (!context) {
    throw new Error('useVoiceState must be used within VoiceStateProvider')
  }

  return context
}
