import { Link } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { Button } from '~/components/ui/button'
import { isSupportedLanguage, DEFAULT_LANGUAGE } from '~/i18n/config'

export function NotFound({ children }: { children?: React.ReactNode }) {
  const { t, i18n } = useTranslation('common')
  const lang = isSupportedLanguage(i18n.language) ? i18n.language : DEFAULT_LANGUAGE
  return (
    <div className="mx-auto w-full max-w-6xl px-4 pb-16 pt-32 sm:px-6 sm:pt-40">
      <p className="eyebrow">404</p>
      <h1 className="mt-4 max-w-[16ch] text-[clamp(2.5rem,5.5vw,4rem)] font-semibold leading-[1.02] tracking-[-0.035em] text-fg">
        {t('notFound.title', 'Page not found.')}
      </h1>
      <p className="mt-6 max-w-[48ch] text-[18px] leading-8 text-fg-muted">
        {children ||
          t(
            'notFound.description',
            'The page you are looking for does not exist or has moved.',
          )}
      </p>
      <div className="mt-10 flex flex-wrap items-center gap-3">
        <Button asChild size="lg">
          <Link to="/$lang" params={{ lang }}>
            {t('notFound.home', 'Back to home')}
          </Link>
        </Button>
        <Button variant="outline" size="lg" onClick={() => window.history.back()}>
          {t('notFound.back', 'Go back')}
        </Button>
      </div>
    </div>
  )
}
