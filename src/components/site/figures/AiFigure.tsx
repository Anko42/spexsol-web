type Status = 'done' | 'active' | 'final'

const STEPS: Array<{
  label: string
  detail: string
  duration: string
  status: Status
}> = [
  { label: 'plan', detail: 'decompose(query)', duration: '42ms', status: 'done' },
  { label: 'retrieve', detail: 'vector.search("policies")', duration: '118ms', status: 'done' },
  { label: 'fetch', detail: 'gdrive.get("handbook.pdf")', duration: '204ms', status: 'active' },
  { label: 'reason', detail: 'llm · tools=[search, get]', duration: '612ms', status: 'done' },
  { label: 'respond', detail: '{ answer, citations[] }', duration: '8ms', status: 'final' },
]

const dotClass: Record<Status, string> = {
  done: 'bg-fg-muted/40',
  active: 'bg-accent/60 ring-2 ring-accent/20',
  final: 'bg-accent',
}

export function AiFigure() {
  return (
    <div aria-hidden="true" className="flex h-full w-full items-center p-4 sm:p-6">
      <div className="w-full overflow-hidden rounded-field border border-line bg-surface">
        <div className="flex items-center gap-2 border-b border-line px-3 py-1.5 font-mono text-[11px] text-fg-muted">
          <span>agent.trace</span>
          <span className="ml-auto tabular-nums">5 steps · 984ms</span>
        </div>
        <ul className="divide-y divide-line-soft">
          {STEPS.map((step) => (
            <li key={step.label} className="flex items-center gap-3 px-3 py-2">
              <span className={`size-1.5 shrink-0 rounded-full ${dotClass[step.status]}`} />
              <span className="w-16 shrink-0 font-mono text-[12px] text-fg">
                {step.label}
              </span>
              <span className="min-w-0 flex-1 truncate font-mono text-[11px] text-fg-muted">
                {step.detail}
              </span>
              <span className="shrink-0 font-mono text-[11px] tabular-nums text-fg-muted">
                {step.duration}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
