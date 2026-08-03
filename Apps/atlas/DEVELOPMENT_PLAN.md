# Atlas Development Plan

This document is the implementation blueprint for Atlas, a premium desktop AI application. It is based on the current React project and is intentionally forward-looking; it does not prescribe a UI change.

## 1. Current Project Architecture

Atlas is a React 19 and TypeScript application built with Vite 8. The entry point (`src/main.tsx`) mounts a single `App` component in `StrictMode`. The current UI is a focused application shell in `src/App.tsx`, styled by `src/App.css` and global styles in `src/index.css`.

The project already includes suitable foundation libraries:

- `zustand` for lightweight client state.
- `framer-motion` for declarative UI motion.
- `react-router-dom` for future multi-workspace navigation.
- `lucide-react` for consistent interface icons.
- `three`, `@react-three/fiber`, and `@react-three/drei` for optional immersive visualizations.
- ESLint, TypeScript, and Vite for code quality, type safety, and builds.

Current limitations are expected for an early shell: all UI lives in one component, no domain boundaries exist yet, no persistence or API layer has been defined, and static assets still include unused starter artwork. Future work should address these incrementally rather than introducing abstractions before they have a use.

## 2. Recommended Folder Structure for Long-Term Scalability

Use a feature-oriented structure. Shared primitives remain centralized while product capabilities own their UI, state, and services.

```text
src/
  app/                    # Application composition and providers
    App.tsx
    routes.tsx
    providers.tsx
  features/               # Product domains
    conversation/
      components/
      hooks/
      services/
      store.ts
      types.ts
    voice/
    workspace/
    settings/
  components/             # Reusable, domain-neutral UI
    ui/                    # Buttons, dialogs, inputs, layout primitives
    icons/
  design-system/          # Tokens, themes, and shared motion definitions
    tokens.css
    theme.ts
    motion.ts
  services/               # Cross-feature integrations and infrastructure
    ai/
    audio/
    persistence/
    telemetry/
  stores/                 # Small app-wide Zustand stores only
  hooks/                  # Shared React hooks
  lib/                    # Pure helpers and adapters
  types/                  # Shared domain and API types
  assets/                 # Product assets only
  styles/                 # Global reset and base styles
  main.tsx
```

Use path aliases (for example, `@/features/voice`) once the project gains multiple domains. Keep tests beside the code they exercise (`Component.test.tsx`, `service.test.ts`) and use `e2e/` only for cross-feature desktop workflows.

## 3. Component Hierarchy

The app should compose from stable application boundaries rather than a monolithic dashboard.

```text
App
├── AppProviders
├── AppRouter
│   └── WorkspaceLayout
│       ├── NavigationRail
│       ├── CommandSurface
│       │   ├── ConversationView
│       │   ├── Composer
│       │   └── VoiceControl
│       ├── ContextPanel
│       └── StatusBar
└── GlobalOverlays
    ├── CommandPalette
    ├── DialogHost
    └── ToastRegion
```

At first, `App` may render `WorkspaceLayout` directly. Introduce routes only when separate durable destinations exist, such as a workspace, settings, or onboarding. Feature components should receive narrow props and call feature hooks; they should not reach into unrelated stores.

## 4. State Management Strategy

Use state according to ownership and lifetime:

| State type | Home | Examples |
| --- | --- | --- |
| Ephemeral UI state | Component state | Popover visibility, input focus, local drafts |
| Feature state | Feature-local Zustand store | Active conversation, streaming response state, recording state |
| App-wide client state | Small shared Zustand stores | Theme, selected workspace, command palette |
| Server/provider state | Query/cache layer behind services | Conversations, models, account and sync data |
| Persistent preferences | Typed persistence adapter | Settings, shortcuts, last-opened workspace |

Keep stores organized by domain, expose selector hooks, and derive values rather than duplicating them. Do not place secrets, raw audio, or provider SDK instances in Zustand. Define state machines for workflows with important transitions, especially voice recording and AI streaming.

## 5. Animation Architecture

Use Framer Motion for product motion and CSS for simple hover, focus, and color transitions. Centralize durations, easings, and semantic variants in `design-system/motion.ts` so Atlas feels cohesive.

- Motion should communicate hierarchy, response, and continuity—not decorate empty space.
- Prefer opacity and transforms for smooth, GPU-friendly rendering.
- Animate layout changes with stable keys and explicit exit transitions.
- Honor `prefers-reduced-motion` and offer a user preference that further reduces nonessential motion.
- Reserve Three.js for contained, measurable visualizations; it should never be required to operate the core experience.

## 6. Voice Architecture

Voice should be an independent feature with an adapter boundary between the UI and platform capabilities.

```text
VoiceControl UI
  → voice store / state machine
  → VoiceService interface
  → AudioCapture adapter + Speech-to-Text adapter
  → transcript events → conversation feature
```

Model the lifecycle explicitly: `idle → requestingPermission → listening → processing → idle`, with error and cancellation paths from every active state. The service should expose typed events for volume level, partial transcript, final transcript, and errors. Keep audio capture local where possible, request microphone access only from a clear user action, and disclose when audio leaves the device. Do not record or retain audio by default.

## 7. AI Provider Architecture

Avoid coupling UI components to a specific AI SDK. Create a provider-agnostic service contract that normalizes streaming and tool activity.

```text
Conversation feature
  → AIClient interface
  → Provider adapter (OpenAI, local model, or future provider)
  → secure desktop/backend transport
```

The core interface should accept a typed conversation request and return an async stream of normalized events: `text-delta`, `tool-call`, `tool-result`, `completed`, and `error`. Provider adapters own payload translation, retries, cancellation, and provider-specific metadata. Store API credentials only in the desktop platform’s secure credential store or a backend—never in Vite environment values delivered to the renderer. Add a capability registry so features can determine whether a model supports vision, tools, structured output, or realtime voice without branching on provider names.

## 8. Coding Standards

- Use TypeScript strictly; export explicit types for public feature boundaries.
- Prefer named, small components and pure functions over large files with mixed responsibilities.
- Keep one domain concept per module; avoid generic `utils` files unless a helper is truly cross-domain.
- Use accessible native controls first, semantic landmarks, visible keyboard focus, and ARIA only when native semantics are insufficient.
- Use CSS custom properties for design tokens; do not scatter raw color, spacing, or timing values through feature styles.
- Use `clsx` for conditional classes and Lucide icons through a shared icon convention.
- Run linting, type checks, unit tests, and production builds before review.
- Add tests for behavior and state transitions, not implementation details. Cover high-risk provider and voice adapters with contract tests.

## 9. Git Workflow

Keep `main` releasable. Develop changes in short-lived branches named `feature/voice-capture`, `fix/stream-cancellation`, or `chore/tooling`.

- Make focused conventional commits, such as `feat(voice): add microphone permission flow`.
- Keep generated output, credentials, and local data out of Git.
- Open pull requests with a concise intent statement, test evidence, screenshots for visual work, and migration notes when required.
- Require passing lint, type check, test, and build checks before merge.
- Squash or rebase before merge to preserve a readable `main` history.
- Tag release candidates and versions; maintain concise release notes covering user-facing changes, risks, and rollback considerations.

## 10. Milestone Roadmap: v0.1 to v1.0

| Version | Focus | Exit criteria |
| --- | --- | --- |
| v0.1 | Foundation | App shell, design tokens, route/app composition, lint/type/build baseline, and CI checks are established. |
| v0.2 | Conversation core | Users can create, view, and persist local conversations with streaming text responses through one provider adapter. |
| v0.3 | Voice input | Permission-aware recording, transcription, cancellation, error handling, and accessible interaction states are complete. |
| v0.4 | Workspace | Conversation organization, command palette, preferences, and reliable local persistence are implemented. |
| v0.5 | AI capabilities | Provider abstraction, model selection, tool-event display, and structured error/retry behavior are available. |
| v0.6 | Desktop integration | Secure credential storage, native notifications/shortcuts as appropriate, offline/error resilience, and packaging are validated. |
| v0.7 | Premium interaction | Motion system, responsive states, keyboard-first flows, accessibility audit fixes, and performance profiling are complete. |
| v0.8 | Reliability and privacy | Telemetry controls, redaction policy, recovery paths, test coverage targets, and security review are complete. |
| v0.9 | Release candidate | End-to-end testing, upgrade/migration testing, documentation, beta feedback fixes, and release operations are rehearsed. |
| v1.0 | Public release | Stable cross-platform build, signed distribution, support documentation, monitoring, and a validated rollback plan are ready. |

Each milestone should have a scope owner, measurable acceptance criteria, and an explicit decision on which platforms and AI providers are supported.
