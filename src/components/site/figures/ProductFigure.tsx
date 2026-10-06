import { useTranslation } from 'react-i18next'
import { cn } from '~/lib/utils'

const TIMES = ['9:00', '10:00', '11:00', '12:00']
// [day, time] cells that are booked; one is the slot the phone just picked.
const BOOKED = new Set(['0-0', '1-2', '2-1', '3-3', '4-0', '4-2'])
const PICKED = '3-0'
const PHONE_SLOTS = ['9:00', '9:30', '10:00', '10:30', '11:00', '11:30']

/** Booking product: admin calendar on the web, booking flow on the phone. */
export function ProductFigure() {
  const { t } = useTranslation('home')
  const days = t('figures.product.days', { returnObjects: true }) as string[]

  return (
    <div aria-hidden="true" className="flex h-full w-full items-center justify-center p-5 sm:p-8">
      <div className="relative w-full">
        {/* Browser: content kept in the left 78%, the phone only covers its gutter */}
        <div className="w-full overflow-hidden rounded-field sm:w-[82%] border border-line bg-bg transition-transform duration-500 ease-out group-hover:-translate-y-1">
          <div className="flex items-center gap-1.5 border-b border-line px-3 py-2">
            <span className="size-2 rounded-full border border-line" />
            <span className="size-2 rounded-full border border-line" />
            <span className="size-2 rounded-full border border-line" />
            <span className="mx-auto rounded-[4px] bg-card px-5 py-0.5 font-mono text-[9px] text-fg-muted">
              {t('figures.product.url')}
            </span>
          </div>
          <div className="p-3 sm:w-[88%] sm:p-4">
            <div className="flex items-baseline justify-between">
              <span className="text-[13px] font-semibold text-fg sm:text-[15px]">
                {t('figures.product.title')}
              </span>
              <span className="font-mono text-[9px] text-fg-muted sm:text-[10px]">
                {t('figures.product.week')}
              </span>
            </div>
            <div className="mt-3 grid grid-cols-[2.25rem_repeat(5,1fr)] gap-1 sm:gap-1.5">
              <span />
              {days.map((d) => (
                <span key={d} className="text-center text-[9px] font-medium text-fg-muted sm:text-[10px]">
                  {d}
                </span>
              ))}
              {TIMES.map((time, ti) => (
                <div key={time} className="contents">
                  <span className="font-mono text-[8px] tabular-nums leading-5 text-fg-muted sm:text-[9px] sm:leading-6">
                    {time}
                  </span>
                  {days.map((_, di) => {
                    const id = `${di}-${ti}`
                    return (
                      <span
                        key={id}
                        className={cn(
                          'h-5 rounded-[4px] sm:h-6',
                          id === PICKED
                            ? 'bg-accent'
                            : BOOKED.has(id)
                              ? 'bg-accent/15 shadow-[inset_2px_0_0_var(--accent)]'
                              : 'bg-fg/[0.04]',
                        )}
                      />
                    )
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Phone (sm+; too cramped beside the calendar on phones) */}
        <div className="absolute -top-3 right-0 hidden w-[26%] sm:block min-w-[96px] rounded-[18px] border border-fg/20 bg-bg p-1.5 shadow-[var(--shadow-float)] transition-transform duration-500 ease-out group-hover:-translate-y-2 sm:top-[-6%]">
          <div className="rounded-[13px] border border-line-soft px-2 pb-2.5 pt-3 sm:px-2.5">
            <span className="mx-auto mb-2.5 block h-1 w-6 rounded-full bg-fg/15" />
            <p className="text-[10px] font-semibold leading-tight text-fg sm:text-[12px]">
              {t('figures.product.book')}
            </p>
            <span className="mt-1.5 inline-block rounded-full bg-fg/[0.06] px-1.5 py-0.5 text-[7px] text-fg-muted sm:text-[8px]">
              {t('figures.product.day')}
            </span>
            <div className="mt-2 grid grid-cols-2 gap-1">
              {PHONE_SLOTS.map((s) => (
                <span
                  key={s}
                  className={cn(
                    'rounded-[5px] py-1 text-center font-mono text-[7px] tabular-nums sm:text-[8px]',
                    s === '9:00'
                      ? 'bg-accent text-accent-fg'
                      : 'border border-line-soft text-fg-muted',
                  )}
                >
                  {s}
                </span>
              ))}
            </div>
            <span className="mt-2.5 block rounded-[6px] bg-accent py-1 text-center text-[8px] font-medium text-accent-fg sm:text-[9px]">
              {t('figures.product.confirm')}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
