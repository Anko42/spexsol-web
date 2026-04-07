import { Link } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { Button } from '~/components/ui/button'

export function NotFound({ children }: { children?: React.ReactNode }) {
  const { t, i18n } = useTranslation('common')
  const lang = i18n.language || 'en'
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col items-start gap-6 px-4 pb-24 pt-32 sm:px-6 sm:pt-40">
      <p className="font-mono text-sm uppercase tracking-[0.2em] text-fg-muted">
        404
      </p>
      <h1 className="font-display text-[40px] leading-[1.05] tracking-[-0.025em] text-fg sm:text-[56px]">
        {t('notFound.title', 'Page not found.')}
      </h1>
      <p className="max-w-[520px] text-[18px] leading-7 text-fg-muted">
        {children ||
          t(
            'notFound.description',
            'The page you are looking for does not exist or has moved.',
          )}
      </p>
      <div className="flex flex-wrap items-center gap-3 pt-2">
        <Button
          variant="outline"
          onClick={() => window.history.back()}
          className="hover:bg-card hover:text-fg dark:hover:bg-input/50"
        >
          {t('notFound.back', 'Go back')}
        </Button>
        <Button asChild>
          <Link to="/$lang" params={{ lang }}>
            {t('notFound.home', 'Back to home')}
          </Link>
        </Button>
      </div>
    </div>
  )
}
