import { Link } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { Button } from '~/components/ui/button'
import { useLang } from '~/hooks/useLang'

export function ContactCard() {
  const lang = useLang()
  const { t } = useTranslation('products')

  return (
    <div className="flex flex-col gap-6 border-y border-line py-8 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h2 className="text-[24px] font-semibold leading-tight tracking-[-0.025em] text-fg">{t('cta.title')}</h2>
        <p className="mt-1 max-w-[48ch] text-[15px] leading-6 text-fg-muted">
          {t('cta.subtitle')}
        </p>
      </div>
      <Button asChild size="lg" variant="accent" className="self-start sm:self-auto">
        <Link to="/$lang/contact" params={{ lang }}>
          {t('cta.button')} <span aria-hidden="true">→</span>
        </Link>
      </Button>
    </div>
  )
}
