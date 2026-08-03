type SystemStatusProps = {
  label: string
  subtle?: boolean
}

export function SystemStatus({ label, subtle = false }: SystemStatusProps) {
  return (
    <span className={`atlas-status${subtle ? ' atlas-status--subtle' : ''}`}>
      <span className="atlas-status__indicator" aria-hidden="true" />
      {label}
    </span>
  )
}
