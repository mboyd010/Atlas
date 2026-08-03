import { useEffect, useState } from 'react'
import { bootMilestones, type BootPhase } from './BootTimeline'

const COMPLETE_INDEX = bootMilestones.length - 1

export function useBootMachine(enabled: boolean, reduceMotion: boolean) {
  const [phaseIndex, setPhaseIndex] = useState(enabled && !reduceMotion ? 0 : COMPLETE_INDEX)

  useEffect(() => {
    if (!enabled || reduceMotion) {
      return
    }

    let frameId = 0
    let nextMilestone = 1
    const startedAt = performance.now()

    const advance = (now: number) => {
      const elapsedSeconds = (now - startedAt) / 1000

      while (nextMilestone < bootMilestones.length && elapsedSeconds >= bootMilestones[nextMilestone].at) {
        setPhaseIndex(nextMilestone)
        nextMilestone += 1
      }

      if (nextMilestone < bootMilestones.length) {
        frameId = requestAnimationFrame(advance)
      }
    }

    frameId = requestAnimationFrame(advance)
    return () => cancelAnimationFrame(frameId)
  }, [enabled, reduceMotion])

  const resolvedPhaseIndex = enabled && !reduceMotion ? phaseIndex : COMPLETE_INDEX

  return {
    phase: bootMilestones[resolvedPhaseIndex].name as BootPhase,
    complete: resolvedPhaseIndex === COMPLETE_INDEX,
  }
}
