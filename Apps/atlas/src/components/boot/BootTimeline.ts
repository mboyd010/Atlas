export const bootMilestones = [
  { name: 'black', at: 0 },
  { name: 'point', at: 0.5 },
  { name: 'bloom', at: 1 },
  { name: 'wordmark', at: 1.3 },
  { name: 'scan', at: 1.8 },
  { name: 'initializingCore', at: 2 },
  { name: 'coreOnline', at: 2.32 },
  { name: 'initializingVoice', at: 2.62 },
  { name: 'voiceOnline', at: 2.94 },
  { name: 'coreAssembly', at: 3.2 },
  { name: 'headerWordmark', at: 3.2 },
  { name: 'initializingMemory', at: 3.24 },
  { name: 'sphere', at: 3.43 },
  { name: 'memoryReady', at: 3.54 },
  { name: 'outerRing', at: 3.64 },
  { name: 'initializingIntelligence', at: 3.78 },
  { name: 'innerRing', at: 3.84 },
  { name: 'linkEstablished', at: 4.08 },
  { name: 'background', at: 4.1 },
  { name: 'identity', at: 4.1 },
  { name: 'headerContent', at: 4.5 },
  { name: 'sidebar', at: 4.62 },
  { name: 'dock', at: 4.74 },
  { name: 'systemOnline', at: 4.75 },
  { name: 'complete', at: 5.5 },
] as const

export type BootPhase = (typeof bootMilestones)[number]['name']

export const bootMotion = {
  pointDuration: 1.15,
  bloomDuration: 2.5,
  letterDuration: 0.32,
  letterStagger: 0.1,
  scanDuration: 1.35,
  messageDuration: 0.49,
  coreAssemblyDuration: 1.1,
  ringAppearDuration: 0.7,
  shellDuration: 0.62,
  systemOnlineDuration: 0.75,
  coreBreatheDuration: 7,
  corePulseDuration: 5.6,
  orbitDuration: [44, 32] as const,
  dockBreatheDuration: 3.6,
  background: {
    radialDuration: 2.5,
    gridDuration: 1.2,
    particleFadeDuration: 0.75,
    particleCount: 16,
    particleDurationBase: 16,
    particleDurationStep: 1.8,
  },
  interaction: { hoverDuration: 0.18, pressDuration: 0.12 },
  reducedMotionDuration: 0.1,
} as const

export const initializationMessages = [
  { label: 'Initializing Core...', phase: 'initializingCore', success: 'Core Online', successPhase: 'coreOnline' },
  { label: 'Initializing Voice...', phase: 'initializingVoice', success: 'Voice Online', successPhase: 'voiceOnline' },
  { label: 'Initializing Memory...', phase: 'initializingMemory', success: 'Memory Ready', successPhase: 'memoryReady' },
  { label: 'Connecting Intelligence...', phase: 'initializingIntelligence', success: 'Link Established', successPhase: 'linkEstablished' },
] as const

const phaseIndex = new Map(bootMilestones.map(({ name }, index) => [name, index]))

export function hasReached(phase: BootPhase, target: BootPhase) {
  return (phaseIndex.get(phase) ?? 0) >= (phaseIndex.get(target) ?? 0)
}

export function isBetween(phase: BootPhase, start: BootPhase, end: BootPhase) {
  return hasReached(phase, start) && !hasReached(phase, end)
}

export const bootParticles = Array.from({ length: 52 }, (_, index) => {
  const angle = (index / 52) * Math.PI * 2
  const radius = 58 + ((index * 19) % 106)

  return {
    id: index,
    x: Math.cos(angle) * radius,
    y: Math.sin(angle) * radius,
    size: 1.35 + (index % 3) * 0.42,
  }
})

export const ambientParticleMotion = {
  count: 56,
  durationBase: 18,
  durationStep: 2.6,
  delayStep: 1.2,
} as const
