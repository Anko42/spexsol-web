import { FileIcon } from 'lucide-react'

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
  { label: 'reason', detail: 'gpt-4o · tools=[search,get]', duration: '612ms', status: 'done' },
  { label: 'respond', detail: '{ answer, citations[] }', duration: '8ms', status: 'final' },
]

const dotClass: Record<Status, string> = {
  done: 'bg-fg-muted/40',
  active: 'bg-accent/60 ring-2 ring-accent/20',
  final: 'bg-accent',
}

export function AiBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute right-0 -inset-2 lg:inset-0 overflow-hidden ml-40 lg:ml-0 hidden lg:flex"
    >
      <div className="absolute inset-x-4 top-6 overflow-hidden rounded-md border border-[var(--line)] bg-[var(--surface)] opacity-85 shadow-sm transition-all duration-500 group-hover:-translate-y-1 group-hover:opacity-100">
        <div className="flex items-center gap-2 border-b border-[var(--line)] bg-input px-2 py-1 text-[11px] text-fg-muted">
          <FileIcon className="h-3 w-3" />
          <span className="truncate">agent.trace</span>
          <span className="ml-auto font-mono text-[9px]">5 steps</span>
        </div>

        <ul className="divide-y divide-[var(--line)]/60">
          {STEPS.map((step) => (
            <li
              key={step.label}
              className="flex items-center gap-2 px-2.5 py-1.5"
            >
              <span
                className={`h-1.5 w-1.5 shrink-0 rounded-full ${dotClass[step.status]}`}
              />
              <span className="w-[58px] shrink-0 font-mono text-[11px] text-fg">
                {step.label}
              </span>
              <span className="min-w-0 flex-1 truncate font-mono text-[9px] text-fg-muted">
                {step.detail}
              </span>
              <span className="shrink-0 font-mono text-[9px] tabular-nums text-fg-muted">
                {step.duration}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
