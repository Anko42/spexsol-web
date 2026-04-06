import { useRouter, useRouterState } from '@tanstack/react-router'
import { SUPPORTED_LANGUAGES, type SupportedLanguage } from '~/i18n/config'
import { useLang } from '~/hooks/useLang'
import { cn } from '~/lib/utils'

export function LangSwitcher() {
  const current = useLang()
  const router = useRouter()
  const pathname = useRouterState({ select: (s) => s.location.pathname })

  const switchTo = (lang: SupportedLanguage) => {
    if (lang === current) return
    const segments = pathname.split('/')
    if (segments.length > 1 && (SUPPORTED_LANGUAGES as readonly string[]).includes(segments[1])) {
      segments[1] = lang
    } else {
      segments.splice(1, 0, lang)
    }
    const next = segments.join('/') || `/${lang}`
    router.navigate({ to: next })
  }

  return (
    <div className="flex items-center gap-2 text-[13px] font-medium uppercase tracking-wider">
      {SUPPORTED_LANGUAGES.map((lang, i) => (
        <span key={lang} className="flex items-center gap-2">
          {i > 0 && <span className="text-fg-muted/40">·</span>}
          <button
            type="button"
            onClick={() => switchTo(lang)}
            className={cn(
              'transition-colors',
              lang === current ? 'text-fg' : 'text-fg-muted hover:text-fg',
            )}
            aria-current={lang === current ? 'true' : undefined}
          >
            {lang}
          </button>
        </span>
      ))}
    </div>
  )
}
