import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import enCommon from './locales/en/common.json'
import enHome from './locales/en/home.json'
import enLegal from './locales/en/legal.json'
import skCommon from './locales/sk/common.json'
import skHome from './locales/sk/home.json'
import skLegal from './locales/sk/legal.json'

export const SUPPORTED_LANGUAGES = ['en', 'sk'] as const
export type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number]
export const DEFAULT_LANGUAGE: SupportedLanguage = 'en'

export function isSupportedLanguage(value: unknown): value is SupportedLanguage {
  return (
    typeof value === 'string' &&
    (SUPPORTED_LANGUAGES as readonly string[]).includes(value)
  )
}

function detectInitialLanguage(): SupportedLanguage {
  if (typeof window === 'undefined') return DEFAULT_LANGUAGE
  const seg = window.location.pathname.split('/')[1]
  return isSupportedLanguage(seg) ? seg : DEFAULT_LANGUAGE
}

if (!i18n.isInitialized) {
  i18n.use(initReactI18next).init({
    resources: {
      en: { common: enCommon, home: enHome, legal: enLegal },
      sk: { common: skCommon, home: skHome, legal: skLegal },
    },
    lng: detectInitialLanguage(),
    fallbackLng: DEFAULT_LANGUAGE,
    defaultNS: 'common',
    ns: ['common', 'home', 'legal'],
    initImmediate: false,
    interpolation: { escapeValue: false },
    react: { useSuspense: false },
  })
}

export default i18n
