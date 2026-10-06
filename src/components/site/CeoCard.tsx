import { useTranslation } from 'react-i18next'
import { Image } from '@unpic/react'

export function CeoCard() {
  const { t } = useTranslation('home')
  const email = t('ceo.email')

  return (
    <figure className="flex items-start gap-5">
      <Image
        src="/andrej.png"
        alt={t('ceo.name')}
        width={112}
        height={112}
        className="size-24 shrink-0 rounded-card border border-line bg-card object-cover object-top sm:size-28"
      />
      <figcaption className="flex min-w-0 flex-col gap-1">
        <span className="text-[20px] font-semibold leading-tight tracking-[-0.02em] text-fg">
          {t('ceo.name')}
        </span>
        <span className="label">{t('ceo.role')}</span>
        <p className="mt-2 max-w-[38ch] text-[15px] leading-6 text-fg-muted">
          {t('ceo.tagline')}
        </p>
        <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1 font-mono text-[13px]">
          <a href={`mailto:${email}`} className="link-underline text-fg">
            {email}
          </a>
          <a
            href={t('ceo.linkedin')}
            target="_blank"
            rel="noopener noreferrer"
            className="link-underline text-fg"
          >
            LinkedIn ↗
          </a>
        </div>
      </figcaption>
    </figure>
  )
}
