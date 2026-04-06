import { createFileRoute, redirect } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import { getRequestHeader } from '@tanstack/react-start/server'
import {
  DEFAULT_LANGUAGE,
  SUPPORTED_LANGUAGES,
  type SupportedLanguage,
} from '~/i18n/config'

const detectLocale = createServerFn({ method: 'GET' }).handler(
  (): SupportedLanguage => {
    const acceptLanguage = getRequestHeader('accept-language') ?? ''
    for (const part of acceptLanguage.split(',')) {
      const tag = part.trim().split(';')[0]?.toLowerCase() ?? ''
      const primary = tag.split('-')[0] as SupportedLanguage
      if ((SUPPORTED_LANGUAGES as readonly string[]).includes(primary)) {
        return primary
      }
    }
    return DEFAULT_LANGUAGE
  },
)

export const Route = createFileRoute('/')({
  beforeLoad: async () => {
    let lang: SupportedLanguage = DEFAULT_LANGUAGE
    try {
      lang = await detectLocale()
    } catch {
      lang = DEFAULT_LANGUAGE
    }
    throw redirect({ to: '/$lang', params: { lang } })
  },
})
