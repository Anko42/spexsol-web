import { useTranslation } from 'react-i18next'
import { cn } from '~/lib/utils'

const WEEKS = 8
// [start week, span, phase key]
const PHASES: Array<[number, number, string]> = [
  [0, 1, 'list'],
  [1, 2, 'design'],
  [2, 4, 'build'],
  [6, 1, 'test'],
  [7, 1, 'launch'],
]

/** MVP timeline: eight weeks, five phases, v1.0 live at the end. */
export function MvpFigure() {
  const { t } = useTranslation('home')
  return (
    <div aria-hidden="true" className="flex h-full w-full items-center justify-center p-5 sm:p-8">
      <div className="w-full rounded-field border border-line bg-bg p-4 sm:p-5">
        <div className="flex items-baseline justify-between">
          <span className="text-[13px] font-semibold text-fg sm:text-[15px]">
            {t('figures.mvp.title')}
          </span>
          <span className="rounded-full bg-accent px-2 py-0.5 text-[9px] font-semibold text-bg sm:text-[10px]">
            {t('figures.mvp.live')}
          </span>
        </div>
        <div
          className="mt-4 grid gap-1"
          style={{ gridTemplateColumns: `repeat(${WEEKS}, minmax(0, 1fr))` }}
        >
          {Array.from({ length: WEEKS }, (_, i) => (
            <span
              key={i}
              className="text-center font-mono text-[8px] tabular-nums text-fg-muted sm:text-[9px]"
            >
              {t('figures.mvp.week')} {i + 1}
            </span>
          ))}
          {PHASES.map(([start, span, key], i) => (
            <span
              key={key}
              style={{ gridColumn: `${start + 1} / span ${span}` }}
              className={cn(
                'truncate rounded-[4px] px-1.5 text-[8px] font-medium leading-5 sm:text-[10px] sm:leading-6',
                i === PHASES.length - 1
                  ? 'bg-accent text-bg'
                  : 'bg-accent/15 text-fg shadow-[inset_2px_0_0_var(--accent)]',
              )}
            >
              {t(`figures.mvp.${key}`)}
            </span>
          ))}
        </div>
        <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-[9px] text-fg-muted sm:text-[10px]">
          {(t('figures.mvp.facts', { returnObjects: true }) as string[]).map((f) => (
            <li key={f} className="flex items-center gap-1">
              <span className="text-accent">✓</span>
              {f}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
