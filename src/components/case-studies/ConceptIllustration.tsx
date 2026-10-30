import { cn } from '~/lib/utils'

/** Small glyph for cards: a photo frame handing off to a document. */
export function ConceptMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden="true" className={className}>
      <rect x="3" y="7" width="13" height="11" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M5.5 16l3-3.5 2.5 2.5 2-2 2.5 3" stroke="currentColor" strokeWidth="1.5" />
      <path d="M18 12.5h4" stroke="currentColor" strokeWidth="1.5" strokeDasharray="1.5 1.5" />
      <rect x="20" y="14" width="9" height="12" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M22.5 18h4M22.5 21h4M22.5 24h2.5" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  )
}

const FIELDS = [
  { label: 'job_ref', value: 'SR-2041', ok: true },
  { label: 'date', value: '2026-10-14', ok: true },
  { label: 'customer', value: 'Acme Plant 3', ok: true },
  { label: 'work_done', value: 'Filter swap, seal check', ok: true },
  { label: 'notes', value: '— low confidence', ok: false },
]

/**
 * Abstract three-panel figure: photo of a paper protocol, proposed fields,
 * reviewed report. Deliberately schematic — not a product screenshot.
 */
export function ConceptIllustration({ caption }: { caption: string }) {
  return (
    <figure className="shell">
      <div className="core overflow-hidden p-5 sm:p-8">
        <div
          aria-hidden="true"
          className="grid grid-cols-1 items-center gap-4 md:grid-cols-[1fr_auto_1.2fr_auto_1fr]"
        >
          {/* Photo */}
          <div className="well relative aspect-[4/3] p-3">
            <div className="h-full w-full rotate-[-3deg] rounded-[6px] border border-line bg-surface p-3 shadow-[var(--shadow-soft)]">
              <div className="h-2 w-1/2 rounded-full bg-fg/20" />
              <div className="mt-3 space-y-1.5">
                {[80, 65, 90, 50, 70].map((w, i) => (
                  <div key={i} className="h-1.5 rounded-full bg-fg/10" style={{ width: `${w}%` }} />
                ))}
              </div>
              <div className="mt-4 h-1.5 w-1/3 rounded-full bg-fg/15" />
            </div>
            <span className="absolute left-5 top-5 inline-flex h-5 items-center rounded-[3px] bg-fg px-1.5 font-mono text-[10px] uppercase tracking-[0.06em] text-bg">
              img
            </span>
          </div>

          <Connector />

          {/* Fields */}
          <ul className="well p-3 font-mono text-[11px] sm:text-[12px]">
            {FIELDS.map((f) => (
              <li
                key={f.label}
                className="flex items-center gap-3 border-b border-line-soft py-1.5 last:border-b-0"
              >
                <span className="w-[5.5rem] shrink-0 text-fg-muted">{f.label}</span>
                <span className={cn('truncate', f.ok ? 'text-fg' : 'text-fg-muted italic')}>
                  {f.value}
                </span>
                <span
                  className={cn(
                    'ml-auto size-1.5 shrink-0 rounded-full',
                    f.ok ? 'bg-accent' : 'border border-fg-muted',
                  )}
                />
              </li>
            ))}
          </ul>

          <Connector />

          {/* Report */}
          <div className="well aspect-[4/3] p-3">
            <div className="h-full w-full rounded-[6px] border border-line bg-surface p-3 shadow-[var(--shadow-soft)]">
              <div className="flex items-center justify-between">
                <div className="h-2 w-2/5 rounded-full bg-fg/60" />
                <span className="font-mono text-[9px] uppercase tracking-[0.06em] text-fg-muted">
                  pdf
                </span>
              </div>
              <div className="mt-3 grid grid-cols-2 gap-x-3 gap-y-1.5">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="h-1.5 rounded-full bg-fg/15" />
                ))}
              </div>
              <div className="mt-4 h-1.5 w-full rounded-full bg-fg/10" />
              <div className="mt-1.5 h-1.5 w-4/5 rounded-full bg-fg/10" />
              <div className="mt-4 ml-auto h-4 w-16 rounded-full border border-line" />
            </div>
          </div>
        </div>
      </div>
      <figcaption className="label px-4 pb-2 pt-3 text-center">{caption}</figcaption>
    </figure>
  )
}

function Connector() {
  return (
    <span className="mx-auto h-5 w-px border-l border-dashed border-fg-muted/50 md:h-px md:w-6 md:border-l-0 md:border-t" />
  )
}
