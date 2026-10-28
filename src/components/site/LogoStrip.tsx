import { Link } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { collaborations } from '~/data/collaborations'
import { useLang } from '~/hooks/useLang'
import { cn } from '~/lib/utils'

/** Logo row for the home page. Full list with roles lives on /products. */
export function LogoStrip() {
  const { t } = useTranslation('home')
  const lang = useLang()
  const items = collaborations.filter((c) => !c.hidden && c.logo)
  return (
    <div>
      <p className="text-[14px] font-medium text-fg-muted">{t('logos.title')}</p>
      <ul className="mt-5 flex flex-wrap items-center gap-x-8 gap-y-5 sm:gap-x-10">
        {items.map((c) => (
          <li key={c.name}>
            <img
              src={c.logo}
              alt={c.name}
              title={c.name}
              className={cn(
                'h-8 w-auto max-w-[120px] object-contain opacity-70 grayscale transition hover:opacity-100 hover:grayscale-0 sm:h-9',
                c.invertDark && 'dark:invert',
                c.invertLight && 'invert dark:invert-0',
              )}
              loading="lazy"
            />
          </li>
        ))}
      </ul>
      <Link
        to="/$lang/products"
        params={{ lang }}
        className="link-underline mt-6 inline-block text-[15px] font-medium text-fg"
      >
        {t('logos.all')} <span aria-hidden="true">→</span>
      </Link>
    </div>
  )
}
