import { useTranslation } from 'react-i18next'

/** Objection handling. Native <details>: keyboard and screen-reader support for free. */
export function Faq() {
  const { t } = useTranslation('home')
  const items = t('faq.items', { returnObjects: true }) as Array<{ q: string; a: string }>
  return (
    <div className="divide-y divide-line-soft">
      {items.map(({ q, a }) => (
        <details key={q} className="group py-4">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[17px] font-medium text-fg [&::-webkit-details-marker]:hidden">
            {q}
            <span
              aria-hidden="true"
              className="text-fg-muted transition-transform duration-200 group-open:rotate-45"
            >
              +
            </span>
          </summary>
          <p className="mt-3 max-w-[60ch] text-[15px] leading-7 text-fg-muted">{a}</p>
        </details>
      ))}
    </div>
  )
}
