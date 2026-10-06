import { Link } from '@tanstack/react-router'
import { Button } from '~/components/ui/button'
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
    <div className="flex flex-col items-start gap-6 border-y border-line py-8 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h2 className="text-[20px] font-semibold leading-tight tracking-[-0.02em] text-fg">{heading}</h2>
        <p className="mt-1 text-[15px] leading-6 text-fg-muted">{subtitle}</p>
      </div>
      <Button asChild size="lg" className="shrink-0">
        <Link to="/$lang/contact" params={{ lang }}>
          {buttonLabel} <span aria-hidden="true">→</span>
        </Link>
      </Button>
    </div>
  )
}
