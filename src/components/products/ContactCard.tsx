import { Link } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { ArrowRightIcon } from '~/components/icons/ArrowRightIcon'
import { ShineBorder } from '~/components/ui/shine-border'
import { useLang } from '~/hooks/useLang'

export function ContactCard() {
  const lang = useLang()
  const { t } = useTranslation('products')

  return (
    <Link
      to="/$lang/contact"
      params={{ lang }}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl bg-card p-6 transform-gpu transition-all duration-300 [box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] [border:1px_solid_rgba(255,255,255,.1)] hover:-translate-y-1"
    >
      <ShineBorder
        borderWidth={1.5}
        duration={10}
        shineColor={['#4ade80', '#38bdf8', '#4ade80']}
      />
      <div
        className="pointer-events-none absolute -bottom-24 -right-16 h-64 w-64 rounded-full bg-accent/10 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative z-10 flex h-full flex-col">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-accent/10 text-accent [border:1px_solid_rgba(74,222,128,.3)]">
          <PlusSpark className="h-8 w-8" />
        </div>

        <div className="mt-4 flex flex-col gap-1">
          <h3 className="font-display text-xl text-fg">{t('cta.title')}</h3>
          <p className="text-[13px] leading-5 text-fg-muted">
            {t('cta.subtitle')}
          </p>
        </div>

        <div className="mt-auto pt-6">
          <span className="inline-flex items-center gap-1.5 text-[13px] font-medium text-accent transition-all group-hover:gap-2.5">
            {t('cta.button')}
            <ArrowRightIcon className="h-3.5 w-3.5" />
          </span>
        </div>
      </div>
    </Link>
  )
}

function PlusSpark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M5.6 18.4l2.8-2.8M15.6 8.4l2.8-2.8" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  )
}
