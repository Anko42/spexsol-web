import { useTranslation } from 'react-i18next'
import { useLang } from '~/hooks/useLang'
import type { Collaboration } from '~/data/collaborations'
import { cn } from '~/lib/utils'

/** Two groups: through SpexSol, and earlier as employee / freelancer. */
export function CollaborationList({ items }: { items: Collaboration[] }) {
  const { t } = useTranslation('products')
  const visible = items.filter((c) => !c.hidden)
  const groups = [
    { key: 'spexsol', items: visible.filter((c) => c.via === 'spexsol') },
    { key: 'before', items: visible.filter((c) => c.via !== 'spexsol') },
  ].filter((g) => g.items.length > 0)

  return (
    <div className="flex flex-col gap-12">
      {groups.map((g) => (
        <section key={g.key} aria-labelledby={`collab-${g.key}`}>
          <h3 id={`collab-${g.key}`} className="text-[14px] font-medium text-fg-muted">
            {t(`collab.group.${g.key}`)}
          </h3>
          <ul className="mt-3">
            {g.items.map((c) => (
              <Row key={c.name} c={c} />
            ))}
          </ul>
        </section>
      ))}
    </div>
  )
}

function Row({ c }: { c: Collaboration }) {
  const { t } = useTranslation('products')
  const lang = useLang()
  const period =
    c.to === undefined && c.active
      ? `${c.from} –`
      : c.to === undefined || c.from === c.to
        ? `${c.from}`
        : `${c.from} – ${c.to}`
  return (
    <li className="grid grid-cols-[3rem_1fr_auto] items-center gap-4 border-t border-line py-5 sm:grid-cols-[3.5rem_1fr_auto_auto] sm:gap-6 sm:px-2">
      {c.logo ? (
        <img
          src={c.logo}
          alt=""
          className={cn(
            'size-12 rounded-[12px] border border-line object-contain p-2 sm:size-14',
            c.invertDark && 'dark:invert',
            c.invertLight && 'invert dark:invert-0',
            !c.invertDark && !c.invertLight && 'bg-card',
          )}
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
        <h4 className="truncate text-[18px] font-semibold leading-tight tracking-[-0.02em] text-fg">
          {c.url ? (
            <a href={c.url} target="_blank" rel="noopener noreferrer" className="link-underline">
              {c.name}
            </a>
          ) : (
            c.name
          )}
        </h4>
        <p className="mt-1 line-clamp-2 text-[14px] leading-6 text-fg-muted">{c.role[lang]}</p>
      </div>
      <span
        className={cn(
          'hidden items-center gap-1.5 rounded-full px-2.5 py-1 text-[12px] font-medium sm:inline-flex',
          c.active ? 'bg-accent/12 text-accent' : 'bg-fg/[0.05] text-fg-muted',
        )}
      >
        {c.active && <span className="size-1.5 rounded-full bg-accent" />}
        {c.active ? t('collab.ongoing') : t(`collab.via.${c.via}`)}
      </span>
      <span className="font-mono text-[13px] tabular-nums text-fg-muted">{period}</span>
    </li>
  )
}
