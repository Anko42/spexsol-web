import { Link } from '@tanstack/react-router'
import type { SupportedLanguage } from '~/i18n/config'

interface ContactLegalCTAProps {
  heading: string
  subtitle: string
  buttonLabel: string
  lang: SupportedLanguage
}

export function ContactLegalCTA({
  heading,
  subtitle,
  buttonLabel,
  lang,
}: ContactLegalCTAProps) {
  return (
    <div className="flex w-full items-center justify-between gap-6 rounded-lg border border-accent/20 bg-[rgba(85,22,190,0.1)] p-8">
      <div className="flex flex-col gap-1">
        <h3 className="text-[16px] font-bold leading-6 text-[#d9c8ff]">
          {heading}
        </h3>
        <p className="text-[14px] leading-5 text-fg-muted">{subtitle}</p>
      </div>
      <Link
        to="/$lang"
        params={{ lang }}
        hash="contact"
        className="inline-flex items-center justify-center rounded-[4px] bg-accent px-6 py-3 text-[14px] font-bold text-accent-fg transition-colors hover:bg-accent/90"
      >
        {buttonLabel}
      </Link>
    </div>
  )
}
