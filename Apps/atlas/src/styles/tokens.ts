import type { CSSProperties } from 'react'

export const colors = {
  background: '#05070A',
  text: '#EDF8FA',
  muted: '#71808D',
  line: 'rgba(166, 220, 226, 0.08)',
  cyan: '#77F1FC',
  cyanBright: '#BDFBFF',
  cyanSoft: '#A6B7C0',
  icon: '#61717C',
  iconHover: '#BEEEF2',
  headerTime: '#94A5AF',
  coreText: '#F2FBFC',
  coreMuted: '#A6B7C0',
  statusSubtle: '#687883',
  coreAssembly: '#9BF8FF',
  voiceText: '#C4FCFF',
  controlText: '#82919A',
  controlTextActive: '#D0FBFF',
  controlBorder: 'rgba(148, 224, 234, 0.1)',
  controlBorderActive: 'rgba(127, 242, 253, 0.34)',
  controlBackground: 'rgba(120, 228, 240, 0.025)',
  controlBackgroundActive: 'rgba(115, 238, 250, 0.1)',
} as const

export const spacing = {
  rail: '4.5rem',
  header: '5rem',
  dock: '7.5rem',
  railPadding: '1.35rem',
  headerPadding: '2.5rem',
  content: '2rem',
  sidebarButton: '2.5rem',
  coreIdentity: '2.35rem',
} as const

export const radius = {
  small: '0.35rem',
  control: '0.55rem',
  panel: '0.65rem',
  round: '50%',
  pill: '99px',
} as const

export const motion = {
  state: 0.6,
  interaction: 0.18,
  press: 0.12,
  waveform: 0.72,
  waveformStagger: 0.09,
  listeningWave: 1.5,
  speakingRipple: 3.4,
  dockBreathe: 3.6,
  coreBreathe: 7,
  corePulse: 5.6,
  ringAppear: 0.7,
  shellReveal: 0.62,
  reduced: 0.1,
  easing: [0.22, 1, 0.36, 1] as const,
  scanEasing: [0.4, 0, 0.2, 1] as const,
} as const

export const glow = {
  coreAmbient: 'rgba(74, 223, 239, 0.18)',
  coreVoice: 'rgba(87, 235, 247, 0.2)',
  status: '0 0 0.55rem rgba(119, 241, 252, 0.7)',
  particle: '0 0 0.3rem rgba(105, 240, 251, 0.65)',
  particleSoft: '0 0 0.3rem rgba(101, 236, 249, 0.45)',
  microphone: '0 0 2rem rgba(54, 221, 241, 0.28)',
} as const

export const shadows = {
  core: '0 0 0 0.7rem rgba(91, 230, 244, 0.022), 0 0 3.5rem rgba(45, 213, 232, 0.16), inset 0 0 2.5rem rgba(93, 237, 250, 0.13)',
  coreInner: '0 0 2.45rem rgba(75, 232, 247, 0.37)',
  microphone: '0 0 0 0.35rem rgba(82, 229, 246, 0.03), 0 0 2rem rgba(54, 221, 241, 0.28), inset 0 0 1rem rgba(82, 232, 247, 0.1)',
  panel: '0 0.9rem 2.4rem rgba(0, 0, 0, 0.2)',
} as const

export const typography = {
  body: "'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  heading: "'Orbitron', 'Arial Narrow', sans-serif",
  wordmarkSize: '0.82rem',
  uiSize: '0.62rem',
  statusSize: '0.62rem',
  coreSubtitle: '0.72rem',
} as const

export const opacity = {
  grid: 0.018,
  gridBoot: 0.024,
  line: 0.08,
  particle: 0.13,
  vignette: 0.24,
} as const

export const zIndex = {
  base: 0,
  shell: 1,
  coreEffects: 2,
  boot: 20,
  bootCore: 30,
  controls: 10,
} as const

export const tokenCssVars = {
  '--atlas-background': colors.background,
  '--atlas-text': colors.text,
  '--atlas-muted': colors.muted,
  '--atlas-line': colors.line,
  '--atlas-cyan': colors.cyan,
  '--atlas-heading': typography.heading,
  '--atlas-spacing-rail': spacing.rail,
  '--atlas-spacing-header': spacing.header,
  '--atlas-spacing-dock': spacing.dock,
  '--atlas-radius-control': radius.control,
  '--atlas-radius-panel': radius.panel,
  '--atlas-radius-round': radius.round,
  '--atlas-color-icon': colors.icon,
  '--atlas-color-icon-hover': colors.iconHover,
  '--atlas-color-header-time': colors.headerTime,
  '--atlas-color-core-text': colors.coreText,
  '--atlas-color-core-muted': colors.coreMuted,
  '--atlas-color-status-subtle': colors.statusSubtle,
  '--atlas-color-core-particle': colors.coreAssembly,
  '--atlas-color-voice-text': colors.voiceText,
  '--atlas-color-control-text': colors.controlText,
  '--atlas-color-control-text-active': colors.controlTextActive,
  '--atlas-color-control-border': colors.controlBorder,
  '--atlas-color-control-border-active': colors.controlBorderActive,
  '--atlas-color-control-background': colors.controlBackground,
  '--atlas-color-control-background-active': colors.controlBackgroundActive,
  '--atlas-glow-core-ambient': glow.coreAmbient,
  '--atlas-glow-core-voice': glow.coreVoice,
  '--atlas-glow-status': glow.status,
  '--atlas-glow-particle': glow.particle,
  '--atlas-glow-particle-soft': glow.particleSoft,
  '--atlas-glow-microphone': glow.microphone,
  '--atlas-shadow-core': shadows.core,
  '--atlas-shadow-core-inner': shadows.coreInner,
  '--atlas-shadow-microphone': shadows.microphone,
  '--atlas-shadow-panel': shadows.panel,
  '--atlas-opacity-grid': String(opacity.grid),
  '--atlas-opacity-grid-boot': String(opacity.gridBoot),
  '--atlas-opacity-vignette': String(opacity.vignette),
  '--atlas-z-base': String(zIndex.base),
  '--atlas-z-shell': String(zIndex.shell),
  '--atlas-z-core-effects': String(zIndex.coreEffects),
  '--atlas-z-boot': String(zIndex.boot),
  '--atlas-z-boot-core': String(zIndex.bootCore),
  '--atlas-z-controls': String(zIndex.controls),
} as const satisfies Record<`--${string}`, string>

export type AtlasTokenStyles = CSSProperties & typeof tokenCssVars

