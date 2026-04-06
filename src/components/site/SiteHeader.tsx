import { Link } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { useLang } from '~/hooks/useLang'
import { Logo } from '~/components/site/Logo'

export function SiteHeader() {
  const { t } = useTranslation('common')
  const lang = useLang()
  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-[12px] bg-bg/70">
      <div className="mx-auto flex max-w-[800px] items-center justify-center px-6 py-8">
        <Link
          to="/$lang"
          params={{ lang }}
          className="flex items-center gap-2 font-display text-[18px] leading-none tracking-[-0.05em] text-fg"
        >
          <Logo className="h-[1em] w-auto shrink-0" />
          <span className="leading-none">{t('brand')}</span>
        </Link>
      </div>
    </header>
  )
}
