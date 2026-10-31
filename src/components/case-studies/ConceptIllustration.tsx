import type { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { cn } from '~/lib/utils'

type Field = { label: string; value: string; ok?: boolean }
type Figure = { inputTag: string; outputTag: string; outputStatus?: string; inputSteps?: string[]; fields: Field[] }

/** Three-panel schema per concept: input → proposed fields → output. Schematic, not screenshots. Text lives in caseStudies.json `figures`. */
const CONCEPTS: Record<string, { input: (f: Figure) => ReactNode; output: (f: Figure) => ReactNode }> = {
  fieldflow: { input: (f) => <Photo tag={f.inputTag} />, output: (f) => <Doc tag={f.outputTag} /> },
  invoiceflow: { input: (f) => <Inbox tag={f.inputTag} />, output: (f) => <Table tag={f.outputTag} cols={4} rows={5} /> },
  quoteflow: { input: (f) => <Catalog tag={f.inputTag} />, output: (f) => <Doc tag={f.outputTag} status={f.outputStatus} /> },
  shiftflow: { input: (f) => <Phone tag={f.inputTag} />, output: (f) => <Table tag={f.outputTag} cols={5} rows={5} /> },
  stockflow: { input: (f) => <Scan tag={f.inputTag} />, output: (f) => <Levels tag={f.outputTag} /> },
  fixflow: { input: (f) => <Photo tag={f.inputTag} form />, output: (f) => <Ticket tag={f.outputTag} /> },
  'sales-assistant': { input: (f) => <Inbox tag={f.inputTag} />, output: (f) => <Doc tag={f.outputTag} status={f.outputStatus} /> },
  'support-assistant': { input: (f) => <Chat tag={f.inputTag} />, output: (f) => <Doc tag={f.outputTag} status={f.outputStatus} /> },
  'knowledge-assistant': { input: (f) => <Chat tag={f.inputTag} />, output: (f) => <Doc tag={f.outputTag} /> },
  'workflow-coordinator': {
    input: (f) => <Ticket tag={f.inputTag} steps={f.inputSteps} />,
    output: (f) => <Ticket tag={f.outputTag} />,
  },
}

export function ConceptIllustration({ slug, caption }: { slug: string; caption: string }) {
  const { t } = useTranslation('caseStudies')
  const key = slug in CONCEPTS ? slug : 'fieldflow'
  const c = CONCEPTS[key]
  const f = t(`figures.${key}`, { returnObjects: true }) as Figure
  return (
    <figure className="shell">
      <div className="core overflow-hidden p-5 sm:p-8">
        <div
          aria-hidden="true"
          className="grid grid-cols-1 items-center gap-4 md:grid-cols-[1fr_auto_1.2fr_auto_1fr]"
        >
          {c.input(f)}
          <Connector />
          <ul className="well p-3 font-mono text-[11px] sm:text-[12px]">
            {f.fields.map((row) => (
              <li
                key={row.label}
                className="flex items-center gap-3 border-b border-line-soft py-1.5 last:border-b-0"
              >
                <span className="w-[5.5rem] shrink-0 text-fg-muted">{row.label}</span>
                <span className={cn('truncate', row.ok === false ? 'text-fg-muted italic' : 'text-fg')}>
                  {row.value}
                </span>
                <span
                  className={cn(
                    'ml-auto size-1.5 shrink-0 rounded-full',
                    row.ok === false ? 'border border-fg-muted' : 'bg-accent',
                  )}
                />
              </li>
            ))}
          </ul>
          <Connector />
          {c.output(f)}
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

/* ---- Panels ---- */

function Panel({ tag, children, className }: { tag: string; children: ReactNode; className?: string }) {
  return (
    <div className={cn('well relative aspect-[4/3] p-3', className)}>
      {children}
      <span className="absolute left-5 top-5 inline-flex h-5 items-center rounded-[3px] bg-fg px-1.5 font-mono text-[10px] uppercase tracking-[0.06em] text-bg">
        {tag}
      </span>
    </div>
  )
}

const Sheet = ({ className, children }: { className?: string; children: ReactNode }) => (
  <div className={cn('h-full w-full rounded-[6px] border border-line bg-surface p-3 shadow-[var(--shadow-soft)]', className)}>
    {children}
  </div>
)

const Lines = ({ widths, className }: { widths: number[]; className?: string }) => (
  <div className={cn('space-y-1.5', className)}>
    {widths.map((w, i) => (
      <div key={i} className="h-1.5 rounded-full bg-fg/10" style={{ width: `${w}%` }} />
    ))}
  </div>
)

/** Photo of a paper form, slightly rotated. `form` adds a short typed field block under it. */
function Photo({ tag, form }: { tag: string; form?: boolean }) {
  return (
    <Panel tag={tag}>
      <Sheet className={cn('rotate-[-3deg]', form && 'h-3/5')}>
        <div className="h-2 w-1/2 rounded-full bg-fg/20" />
        <Lines widths={form ? [80, 65, 90] : [80, 65, 90, 50, 70]} className="mt-3" />
        {!form && <div className="mt-4 h-1.5 w-1/3 rounded-full bg-fg/15" />}
      </Sheet>
      {form && (
        <div className="mt-3 space-y-1.5">
          {[100, 100].map((w, i) => (
            <div key={i} className="h-4 rounded-[4px] border border-line bg-surface" style={{ width: `${w}%` }} />
          ))}
        </div>
      )}
    </Panel>
  )
}

/** Stack of incoming documents. */
function Inbox({ tag }: { tag: string }) {
  return (
    <Panel tag={tag}>
      <div className="relative h-full w-full">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="absolute inset-x-0 rounded-[6px] border border-line bg-surface p-3 shadow-[var(--shadow-soft)]"
            style={{ top: `${i * 12}%`, bottom: `${(2 - i) * 6}%`, left: `${(2 - i) * 4}%`, right: `${(2 - i) * 4}%` }}
          >
            {i === 2 && (
              <>
                <div className="flex items-center justify-between">
                  <div className="h-2 w-2/5 rounded-full bg-fg/60" />
                  <div className="h-2 w-1/5 rounded-full bg-fg/20" />
                </div>
                <Lines widths={[70, 55, 85]} className="mt-3" />
                <div className="mt-3 ml-auto h-2 w-1/3 rounded-full bg-fg/40" />
              </>
            )}
          </div>
        ))}
      </div>
    </Panel>
  )
}

/** Shared item catalog with quantities. */
function Catalog({ tag }: { tag: string }) {
  return (
    <Panel tag={tag}>
      <Sheet className="pt-9">
        {[70, 50, 85, 60].map((w, i) => (
          <div key={i} className="flex items-center gap-2 border-b border-line-soft py-1.5 last:border-b-0">
            <div className="size-3 shrink-0 rounded-[2px] border border-line" />
            <div className="h-1.5 rounded-full bg-fg/15" style={{ width: `${w}%` }} />
            <div className="ml-auto h-1.5 w-4 shrink-0 rounded-full bg-fg/30" />
          </div>
        ))}
      </Sheet>
    </Panel>
  )
}

/** Phone with a short form. */
function Phone({ tag }: { tag: string }) {
  return (
    <Panel tag={tag}>
      <div className="mx-auto h-full w-[62%] rounded-[10px] border border-line bg-surface p-2 shadow-[var(--shadow-soft)]">
        <div className="mx-auto h-1 w-1/3 rounded-full bg-fg/20" />
        <div className="mt-3 space-y-2">
          {[0, 1, 2].map((i) => (
            <div key={i}>
              <div className="h-1 w-1/2 rounded-full bg-fg/15" />
              <div className="mt-1 h-3.5 rounded-[3px] border border-line" />
            </div>
          ))}
        </div>
        <div className="mt-3 h-4 rounded-full bg-fg" />
      </div>
    </Panel>
  )
}

/** QR code inside a scanner viewfinder. */
function Scan({ tag }: { tag: string }) {
  const cells = [0, 1, 1, 0, 1, 1, 0, 0, 1, 0, 1, 1, 1, 0, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1]
  return (
    <Panel tag={tag}>
      <div className="relative flex h-full w-full items-center justify-center">
        {['left-0 top-0 border-l border-t', 'right-0 top-0 border-r border-t', 'left-0 bottom-0 border-l border-b', 'right-0 bottom-0 border-r border-b'].map((c) => (
          <span key={c} className={cn('absolute size-5 border-fg', c)} />
        ))}
        <div className="grid grid-cols-5 gap-0.5 rounded-[6px] border border-line bg-surface p-2 shadow-[var(--shadow-soft)]">
          {cells.map((on, i) => (
            <span key={i} className={cn('size-2 rounded-[1px]', on ? 'bg-fg' : 'bg-fg/10')} />
          ))}
        </div>
        <span className="absolute inset-x-6 top-1/2 h-px bg-accent" />
      </div>
    </Panel>
  )
}

/** Chat thread: question bubble, short reply bubble. */
function Chat({ tag }: { tag: string }) {
  return (
    <Panel tag={tag}>
      <div className="flex h-full flex-col justify-end gap-2 pt-6">
        <div className="ml-auto w-[70%] rounded-[8px] rounded-br-[2px] bg-fg p-2">
          <Lines widths={[85, 55]} className="[&>div]:bg-bg/40" />
        </div>
        <div className="w-[78%] rounded-[8px] rounded-bl-[2px] border border-line bg-surface p-2 shadow-[var(--shadow-soft)]">
          <Lines widths={[90, 70, 40]} />
          <div className="mt-2 h-1 w-1/3 rounded-full bg-accent/70" />
        </div>
      </div>
    </Panel>
  )
}

/** Generated document. */
function Doc({ tag, status }: { tag: string; status?: string }) {
  return (
    <div className="well aspect-[4/3] p-3">
      <Sheet>
        <div className="flex items-center justify-between">
          <div className="h-2 w-2/5 rounded-full bg-fg/60" />
          <span className="font-mono text-[9px] uppercase tracking-[0.06em] text-fg-muted">{tag}</span>
        </div>
        <div className="mt-3 grid grid-cols-2 gap-x-3 gap-y-1.5">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-1.5 rounded-full bg-fg/15" />
          ))}
        </div>
        <Lines widths={[100, 80]} className="mt-4" />
        {status ? (
          <span className="mt-4 ml-auto inline-flex h-4 items-center rounded-full border border-accent px-1.5 font-mono text-[8px] uppercase tracking-[0.06em] text-fg">
            {status}
          </span>
        ) : (
          <div className="mt-4 ml-auto h-4 w-16 rounded-full border border-line" />
        )}
      </Sheet>
    </div>
  )
}

/** Structured export table. */
function Table({ tag, cols, rows }: { tag: string; cols: number; rows: number }) {
  return (
    <div className="well aspect-[4/3] p-3">
      <Sheet className="overflow-hidden">
        <div className="flex items-center justify-between">
          <div className="h-2 w-2/5 rounded-full bg-fg/60" />
          <span className="font-mono text-[9px] uppercase tracking-[0.06em] text-fg-muted">{tag}</span>
        </div>
        <div className="mt-3 grid gap-px bg-line-soft" style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}>
          {Array.from({ length: cols * (rows + 1) }).map((_, i) => (
            <div key={i} className={cn('flex h-4 items-center bg-surface px-1', i < cols && 'bg-fg/5')}>
              <div className={cn('h-1 rounded-full', i < cols ? 'w-3/5 bg-fg/40' : 'w-4/5 bg-fg/15')} />
            </div>
          ))}
        </div>
      </Sheet>
    </div>
  )
}

/** Shared stock view: bars with a threshold line, one below it. */
function Levels({ tag }: { tag: string }) {
  const bars = [78, 55, 90, 22, 64]
  return (
    <div className="well aspect-[4/3] p-3">
      <Sheet>
        <div className="flex items-center justify-between">
          <div className="h-2 w-2/5 rounded-full bg-fg/60" />
          <span className="font-mono text-[9px] uppercase tracking-[0.06em] text-fg-muted">{tag}</span>
        </div>
        <div className="relative mt-3 flex h-[60%] items-end gap-2">
          <span className="absolute inset-x-0 bottom-[30%] border-t border-dashed border-fg-muted/60" />
          {bars.map((h, i) => (
            <div
              key={i}
              className={cn('flex-1 rounded-t-[3px]', h < 30 ? 'bg-accent' : 'bg-fg/20')}
              style={{ height: `${h}%` }}
            />
          ))}
        </div>
        <Lines widths={[60]} className="mt-3" />
      </Sheet>
    </div>
  )
}

/** Request ticket with a status timeline. */
function Ticket({ tag, steps }: { tag: string; steps?: string[] }) {
  const { t } = useTranslation('caseStudies')
  const list = steps ?? (t('figures.ticketSteps', { returnObjects: true }) as string[])
  return (
    <div className="well relative aspect-[4/3] p-3">
      <Sheet>
        <div className="flex items-center justify-between">
          <div className="h-2 w-2/5 rounded-full bg-fg/60" />
          <span className="font-mono text-[9px] uppercase tracking-[0.06em] text-fg-muted">{tag}</span>
        </div>
        <Lines widths={[90, 70]} className="mt-3" />
        <ol className="mt-4 space-y-2">
          {list.map((s, i) => (
            <li key={s} className="flex items-center gap-2">
              <span className={cn('size-2 shrink-0 rounded-full', i < 3 ? 'bg-accent' : 'border border-fg-muted')} />
              <span className="font-mono text-[9px] uppercase tracking-[0.06em] text-fg-muted">{s}</span>
              {i < 3 && <span className="ml-auto h-1 w-1/3 rounded-full bg-fg/15" />}
            </li>
          ))}
        </ol>
      </Sheet>
    </div>
  )
}

/* ---- Card marks (32×32, 1.5 stroke) ---- */

const MARKS: Record<string, ReactNode> = {
  // photo frame handing off to a document
  fieldflow: (
    <>
      <rect x="3" y="7" width="13" height="11" rx="2" />
      <path d="M5.5 16l3-3.5 2.5 2.5 2-2 2.5 3" />
      <path d="M18 12.5h4" strokeDasharray="1.5 1.5" />
      <rect x="20" y="14" width="9" height="12" rx="1.5" />
      <path d="M22.5 18h4M22.5 21h4M22.5 24h2.5" strokeWidth="1.2" />
    </>
  ),
  // inbox tray handing off to a checked invoice
  invoiceflow: (
    <>
      <path d="M3 15v6a2 2 0 002 2h8a2 2 0 002-2v-6" />
      <path d="M3 15l2.5-7h7l2.5 7H11l-1 2H8l-1-2z" />
      <path d="M18 12.5h4" strokeDasharray="1.5 1.5" />
      <rect x="20" y="8" width="9" height="12" rx="1.5" />
      <path d="M22.5 12h4M22.5 15h2.5" strokeWidth="1.2" />
      <path d="M26.5 23.5l1.5 1.5 3-3" />
    </>
  ),
  // catalog list handing off to a priced document
  quoteflow: (
    <>
      <rect x="3" y="7" width="13" height="18" rx="2" />
      <path d="M6 11.5h2M10 11.5h3M6 15.5h2M10 15.5h3M6 19.5h2M10 19.5h3" strokeWidth="1.2" />
      <path d="M18 16h4" strokeDasharray="1.5 1.5" />
      <rect x="20" y="10" width="9" height="12" rx="1.5" />
      <path d="M22.5 14h4M22.5 17h4" strokeWidth="1.2" />
      <circle cx="26.5" cy="20.5" r="1" fill="currentColor" stroke="none" />
    </>
  ),
  // phone handing off to a clock
  shiftflow: (
    <>
      <rect x="4" y="4" width="11" height="24" rx="2.5" />
      <path d="M8 24.5h3" strokeWidth="1.2" />
      <path d="M17 16h3" strokeDasharray="1.5 1.5" />
      <circle cx="25" cy="16" r="5" />
      <path d="M25 13.5V16l1.8 1.5" strokeWidth="1.2" />
    </>
  ),
  // scanned box handing off to a stock bar
  stockflow: (
    <>
      <path d="M3 10.5l6.5-3.5 6.5 3.5-6.5 3.5z" />
      <path d="M3 10.5v8l6.5 3.5 6.5-3.5v-8M9.5 14v8" />
      <path d="M18 16h3" strokeDasharray="1.5 1.5" />
      <path d="M23 24V11M26.5 24v-7M30 24v-4" />
    </>
  ),
  // wrench handing off to a closed ticket
  fixflow: (
    <>
      <path d="M12.5 7.5a4 4 0 00-5.3 5.3L4 16l2.5 2.5 3.2-3.2a4 4 0 005.3-5.3l-2.2 2.2-1.8-1.8z" />
      <path d="M17 12.5h3" strokeDasharray="1.5 1.5" />
      <rect x="21" y="8" width="8" height="16" rx="1.5" />
      <path d="M23.5 12h3M23.5 15h3" strokeWidth="1.2" />
      <path d="M23.5 19.5l1.5 1.5 2.5-2.5" />
    </>
  ),
  // envelope handing off to a sparkle-marked draft
  'sales-assistant': (
    <>
      <rect x="3" y="9" width="13" height="10" rx="1.5" />
      <path d="M3 10.5l6.5 4.5 6.5-4.5" />
      <path d="M18 14h3" strokeDasharray="1.5 1.5" />
      <rect x="21" y="8" width="8" height="16" rx="1.5" />
      <path d="M23.5 12h3M23.5 15h3M23.5 18h2" strokeWidth="1.2" />
      <path d="M26.5 20.5v3M25 22h3" strokeWidth="1.2" />
    </>
  ),
  // chat bubble handing off to a cited reply
  'support-assistant': (
    <>
      <path d="M3 8.5A2.5 2.5 0 015.5 6h7A2.5 2.5 0 0115 8.5v5a2.5 2.5 0 01-2.5 2.5H8l-3.5 3v-3A2.5 2.5 0 013 13.5z" />
      <path d="M18 14h3" strokeDasharray="1.5 1.5" />
      <path d="M21 25.5a2.5 2.5 0 012.5-2.5h0M29 13.5A2.5 2.5 0 0026.5 11h-3A2.5 2.5 0 0021 13.5v7l3-2.5h2.5a2.5 2.5 0 002.5-2.5z" />
      <path d="M23.5 15h3" strokeWidth="1.2" />
    </>
  ),
  // folder stack handing off to a cited answer
  'knowledge-assistant': (
    <>
      <path d="M3 9.5A1.5 1.5 0 014.5 8H8l1.5 2h4A1.5 1.5 0 0115 11.5v8A1.5 1.5 0 0113.5 21h-9A1.5 1.5 0 013 19.5z" />
      <path d="M6 24h8" strokeWidth="1.2" />
      <path d="M18 14h3" strokeDasharray="1.5 1.5" />
      <circle cx="25" cy="14" r="4" />
      <path d="M27.8 16.8L30 19" />
      <path d="M24 13.5h2M24 15h1" strokeWidth="1.2" />
    </>
  ),
  // scattered events handing off to one ordered checklist
  'workflow-coordinator': (
    <>
      <circle cx="5.5" cy="8" r="1.5" />
      <circle cx="12" cy="12.5" r="1.5" />
      <circle cx="6" cy="18.5" r="1.5" />
      <circle cx="12.5" cy="23.5" r="1.5" />
      <path d="M7 8.8l3.7 2.8M7.3 17.8l3.4-4.2M7.4 19.3l3.8 3.4" strokeWidth="1.2" />
      <path d="M17 16h3" strokeDasharray="1.5 1.5" />
      <path d="M22 9.5l1.5 1.5 2.5-2.5M22 16l1.5 1.5 2.5-2.5M22 22.5l1.5 1.5 2.5-2.5" />
      <path d="M28 9.5h2M28 16h2M28 22.5h2" strokeWidth="1.2" />
    </>
  ),
}

export function ConceptMark({ slug, className }: { slug: string; className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      {MARKS[slug] ?? MARKS.fieldflow}
    </svg>
  )
}
