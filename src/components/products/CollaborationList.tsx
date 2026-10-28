import { useTranslation } from 'react-i18next'
import { useLang } from '~/hooks/useLang'
import type { Collaboration } from '~/data/collaborations'

/** Hairline rows: logo/initial · name + role · period · ongoing badge. */
export function CollaborationList({ items }: { items: Collaboration[] }) {
  const { t } = useTranslation('products')
  const lang = useLang()
  return (
    <ul>
      {items.map((c) => {
        const ongoing = c.to === undefined
        const period = ongoing ? `${c.from} –` : c.from === c.to ? `${c.from}` : `${c.from} – ${c.to}`
        return (
          <li
            key={c.name}
            className="grid grid-cols-[3rem_1fr_auto] items-center gap-4 border-t border-line py-5 sm:grid-cols-[3.5rem_1fr_auto_auto] sm:gap-6 sm:px-2"
          >
            {c.logo ? (
              <img
                src={c.logo}
                alt=""
                className="size-12 rounded-[12px] border border-line bg-card object-contain p-2 sm:size-14"
                loading="lazy"
              />
            ) : (
              <span
                aria-hidden="true"
                className="flex size-12 items-center justify-center rounded-[12px] border border-line bg-card text-[18px] font-semibold text-fg-muted sm:size-14"
              >
                {c.name[0]}
              </span>
            )}
            <div className="min-w-0">
              <h3 className="truncate text-[18px] font-semibold leading-tight tracking-[-0.02em] text-fg">
                {c.url ? (
                  <a href={c.url} target="_blank" rel="noopener noreferrer" className="link-underline">
                    {c.name}
                  </a>
                ) : (
                  c.name
                )}
              </h3>
              <p className="mt-1 line-clamp-2 text-[14px] leading-6 text-fg-muted">{c.role[lang]}</p>
            </div>
            {ongoing && (
              <span className="hidden items-center gap-1.5 rounded-full bg-accent/12 px-2.5 py-1 text-[12px] font-medium text-accent sm:inline-flex">
                <span className="size-1.5 rounded-full bg-accent" />
                {t('collab.ongoing')}
              </span>
            )}
            <span className="font-mono text-[13px] tabular-nums text-fg-muted">{period}</span>
          </li>
        )
      })}
    </ul>
  )
}
