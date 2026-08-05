import { VoiceState } from './VoiceState'

export const voiceVisualConfig = {
  [VoiceState.Idle]: { coreScale: 1, glowOpacity: 0, ringScale: 1, orbitSpeed: 1, particleSpeed: 1, pulseScale: 1.018 },
  [VoiceState.Listening]: { coreScale: 1.015, glowOpacity: 0.34, ringScale: 0.955, orbitSpeed: 1, particleSpeed: 1, pulseScale: 1.028 },
  [VoiceState.Thinking]: { coreScale: 1.01, glowOpacity: 0.22, ringScale: 0.98, orbitSpeed: 1.14, particleSpeed: 1.1, pulseScale: 1.055 },
  [VoiceState.Speaking]: { coreScale: 1.02, glowOpacity: 0.3, ringScale: 1, orbitSpeed: 1.07, particleSpeed: 1.04, pulseScale: 1.07 },
} as const

export const voiceMotion = {
  stateTransition: 0.6,
  listeningWave: 1.5,
  speakingRipple: 3.4,
  speakingPulse: 1.25,
  waveformDuration: 0.72,
  waveformStagger: 0.09,
  developerPanelTransition: 0.18,
} as const
