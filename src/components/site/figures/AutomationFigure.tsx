const NODES = [
  { label: 'Trigger', sub: 'cron · 9:00' },
  { label: 'Fetch', sub: 'sheets.get' },
  { label: 'Transform', sub: 'map → CRM' },
  { label: 'Notify', sub: 'slack #ops' },
]

export function AutomationFigure() {
  return (
    <ol
      aria-hidden="true"
      className="flex h-full w-full flex-col justify-center gap-0 px-6 py-6 sm:px-10"
    >
      {NODES.map((node, i) => (
        <li key={node.label} className="flex flex-col">
          <div
            className="flex items-center gap-3 rounded-field border border-line bg-surface px-3 py-2 transition-transform duration-500 ease-out group-hover:translate-x-1"
            style={{ marginLeft: `${i * 6}%`, transitionDelay: `${i * 40}ms` }}
          >
            <span className="font-mono text-[10px] tabular-nums text-fg-muted">
              {String(i + 1).padStart(2, '0')}
            </span>
            <span className="font-mono text-[12px] text-fg">{node.label}</span>
            <span className="ml-auto truncate font-mono text-[11px] text-fg-muted">
              {node.sub}
            </span>
            {i === NODES.length - 1 && (
              <span className="size-1.5 shrink-0 rounded-full bg-accent" />
            )}
          </div>
          {i < NODES.length - 1 && (
            <span
              className="h-4 w-px border-l border-dashed border-fg-muted/50"
              style={{ marginLeft: `calc(${i * 6}% + 1.25rem)` }}
            />
          )}
        </li>
      ))}
    </ol>
  )
}
