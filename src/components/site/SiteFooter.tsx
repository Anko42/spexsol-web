import { Link, useRouterState } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { useLang } from '~/hooks/useLang'
import { cn } from '~/lib/utils'
import { Logo } from '~/components/site/Logo'
import { showCookiePreferences } from '~/components/site/CookieConsent'

export function SiteFooter() {
  const { t } = useTranslation('common')
  const { t: tHome } = useTranslation('home')
  const lang = useLang()
  const year = new Date().getFullYear()
  const pathname = useRouterState({ select: (s) => s.location.pathname })

  const linkClass = (active = false) =>
    cn(
      'inline-flex min-h-8 items-center text-[14px] transition-colors hover:text-fg',
      active ? 'text-fg underline decoration-accent underline-offset-4' : 'text-fg-muted',
    )

  return (
    <footer className="mt-24 border-t border-line">
      <div className="mx-auto grid w-full max-w-6xl grid-cols-2 gap-x-6 gap-y-10 px-4 pb-10 pt-12 sm:px-6 md:grid-cols-12">
        <div className="col-span-2 md:col-span-6">
          <Link
            to="/$lang"
            params={{ lang }}
            aria-label="SpexSol — home"
            className="inline-flex items-center gap-3 font-display text-[28px] leading-none tracking-[-0.02em] text-fg"
          >
            <Logo className="h-[0.8em] w-auto" />
            {t('brand')}
          </Link>
          <p className="mt-4 max-w-[36ch] text-[14px] leading-6 text-fg-muted">
            {t('footer.tagline')}
          </p>
        </div>

        <nav aria-label={t('footer.studio')} className="flex flex-col gap-1 md:col-span-2">
          <span className="label mb-2">{t('footer.studio')}</span>
          <Link to="/$lang/products" params={{ lang }} className={linkClass(pathname.includes('/products'))}>
            {t('nav.products')}
          </Link>
          <Link to="/$lang/contact" params={{ lang }} className={linkClass(pathname.endsWith('/contact'))}>
            {t('nav.contact')}
          </Link>
        </nav>

        <nav aria-label={t('footer.legal')} className="flex flex-col gap-1 md:col-span-2">
          <span className="label mb-2">{t('footer.legal')}</span>
          <Link to="/$lang/privacy-policy" params={{ lang }} className={linkClass(pathname.endsWith('/privacy-policy'))}>
            {t('footer.privacyPolicy')}
          </Link>
          <Link to="/$lang/terms-of-use" params={{ lang }} className={linkClass(pathname.endsWith('/terms-of-use'))}>
            {t('footer.termsOfUse')}
          </Link>
          <button type="button" onClick={showCookiePreferences} className={cn(linkClass(), 'cursor-pointer text-left')}>
            {t('footer.cookieSettings')}
          </button>
        </nav>

        <div className="col-span-2 flex flex-col gap-1 md:col-span-2">
          <span className="label mb-2">{t('nav.contact')}</span>
          <a href={`mailto:${tHome('ceo.email')}`} className={linkClass()}>
            {tHome('ceo.email')}
          </a>
          <a href={tHome('ceo.linkedin')} target="_blank" rel="noopener noreferrer" className={linkClass()}>
            LinkedIn ↗
          </a>
        </div>
      </div>

      <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 border-t border-line-soft px-4 py-6 sm:flex-row sm:justify-between sm:px-6">
        <p className="label normal-case tracking-normal">{t('footer.company.legal')}</p>
        <p className="label shrink-0 normal-case tracking-normal">{t('footer.copyright', { year })}</p>
      </div>
    </footer>
  )
}
