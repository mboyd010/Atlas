import { VoiceState, useVoiceState } from './VoiceState'
import { voiceMotion } from './VoiceVisualConfig'

const states = [VoiceState.Idle, VoiceState.Listening, VoiceState.Thinking, VoiceState.Speaking]

export function VoiceControls() {
  const { voiceState, setVoiceState } = useVoiceState()

  return (
    <aside className="voice-controls" aria-label="Voice state development controls">
      <span className="voice-controls__label">Voice State</span>
      <div className="voice-controls__actions">
        {states.map((state) => (
          <button
            key={state}
            className={voiceState === state ? 'voice-controls__button voice-controls__button--active' : 'voice-controls__button'}
            type="button"
            onClick={() => setVoiceState(state)}
            style={{ transitionDuration: `${voiceMotion.developerPanelTransition}s` }}
          >
            {state}
          </button>
        ))}
      </div>
    </aside>
  )
}
