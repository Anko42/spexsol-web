const NODES = [
  { label: 'Trigger', sub: 'cron · 9:00' },
  { label: 'Fetch', sub: 'sheets.get' },
  { label: 'Transform', sub: 'map → CRM' },
  { label: 'Notify', sub: 'slack #ops' },
]

export function AutomationBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <div className="absolute inset-x-4 top-6 flex flex-col gap-2 opacity-80 transition-all duration-500 group-hover:-translate-y-1 group-hover:opacity-100">
        {NODES.map((node, i) => (
          <div key={node.label} className="flex flex-col items-stretch">
            <div
              className="flex items-center gap-2 rounded-md border border-[var(--line)] bg-[var(--surface)] px-3 py-2 shadow-sm"
              style={{ marginLeft: `${i * 10}px` }}
            >
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-[var(--line)] bg-input text-[10px] font-mono text-fg-muted">
                {i + 1}
              </span>
              <div className="min-w-0 flex-1">
                <div className="font-mono text-[11px] leading-tight text-fg">
                  {node.label}
                </div>
                <div className="font-mono text-[9px] leading-tight text-fg-muted">
                  {node.sub}
                </div>
              </div>
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            </div>
            {i < NODES.length - 1 && (
              <svg
                className="ml-4 h-4 w-3 text-fg-muted/40"
                viewBox="0 0 12 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
              >
                <path d="M 6 0 L 6 12" strokeDasharray="2 2" />
                <path d="M 3 10 L 6 13 L 9 10" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </div>
        ))}
      </div>

    </div>
  )
}
