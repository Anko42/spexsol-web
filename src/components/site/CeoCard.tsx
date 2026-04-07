import { useTranslation } from 'react-i18next'
import { Image } from "@unpic/react";

export function CeoCard() {
  const { t } = useTranslation('home')
  const email = t('ceo.email')
  const linkedin = t('ceo.linkedin')

  return (
    <div className="relative z-10 flex h-full flex-col justify-center gap-4 p-8">
      <div className="flex items-center gap-4">
        <Image
          src="/Andrej (1).png"
          alt={t('ceo.name')}
          width={80}
          height={80}
          className="h-24 w-24 shrink-0 rounded-full border border-white/10 bg-accent/10 object-cover object-top transition-transform duration-150 ease-out hover:scale-[1.35]"
        />
        <div className="flex min-w-0 flex-col">
          <span className="font-display text-[17px] leading-tight text-fg">
            {t('ceo.name')}
          </span>
          <span className="mt-1 text-[10px] font-medium uppercase tracking-[0.12em] text-fg-muted">
            {t('ceo.role')}
          </span>
        </div>
      </div>
      <p className="text-[13px] leading-5 text-fg-muted line-clamp-3">
        {t('ceo.tagline')}
      </p>
      <div className="flex flex-col gap-1.5">
        <a
          href={`mailto:${email}`}
          className="inline-flex items-center gap-1.5 text-[12px] text-accent hover:underline"
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 16 16"
            className="h-3.5 w-3.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <rect x="2" y="3" width="12" height="10" rx="1.5" />
            <path d="m2.5 4.5 5.5 4 5.5-4" strokeLinecap="round" />
          </svg>
          <span className="truncate">{email}</span>
        </a>
        <a
          href={linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-[12px] text-accent hover:underline"
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 16 16"
            className="h-3.5 w-3.5"
            fill="currentColor"
          >
            <path d="M3.5 2a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3ZM2.25 6.25h2.5v7.5h-2.5v-7.5Zm4 0h2.4v1.02h.03c.33-.6 1.14-1.23 2.35-1.23 2.51 0 2.97 1.57 2.97 3.6v4.11h-2.5V10.2c0-.88-.02-2-1.22-2-1.22 0-1.4.93-1.4 1.93v3.62h-2.5v-7.5Z" />
          </svg>
          <span className="truncate">LinkedIn</span>
        </a>
      </div>
    </div>
  )
}
