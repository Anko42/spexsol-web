import i18n, {
  DEFAULT_LANGUAGE,
  SUPPORTED_LANGUAGES,
  isSupportedLanguage,
  type SupportedLanguage,
} from '~/i18n/config'

export const SITE_URL = 'https://spexsol.sk'
const SITE_NAME = 'SpexSol'
const OG_LOCALE: Record<SupportedLanguage, string> = { en: 'en_US', sk: 'sk_SK' }

export const seo = ({
  title,
  description,
  url,
  locale,
  image = `${SITE_URL}/og.png`,
}: {
  title: string
  description?: string
  url?: string
  locale?: SupportedLanguage
  image?: string
}) => [
  { title },
  { name: 'description', content: description },
  { property: 'og:type', content: 'website' },
  { property: 'og:site_name', content: SITE_NAME },
  { property: 'og:title', content: title },
  { property: 'og:description', content: description },
  { property: 'og:url', content: url },
  { property: 'og:locale', content: locale ? OG_LOCALE[locale] : undefined },
  { property: 'og:image', content: image },
  { property: 'og:image:width', content: '1200' },
  { property: 'og:image:height', content: '630' },
  { name: 'twitter:card', content: 'summary_large_image' },
  { name: 'twitter:title', content: title },
  { name: 'twitter:description', content: description },
  { name: 'twitter:image', content: image },
]

/**
 * Head for a `/$lang/...` route. `path` is the part after the language
 * prefix, e.g. '' for home or '/privacy-policy'. Title/description are
 * i18n keys resolved for `lang` explicitly, so SSR never leaks another
 * visitor's language.
 */
export const pageHead = (
  langParam: string,
  path: string,
  keys: { title: string; description: string },
) => {
  const lang = isSupportedLanguage(langParam) ? langParam : DEFAULT_LANGUAGE
  const href = (l: string) => `${SITE_URL}/${l}${path}`
  return {
    meta: seo({
      title: i18n.t(keys.title, { lng: lang }),
      description: i18n.t(keys.description, { lng: lang }),
      url: href(lang),
      locale: lang,
    }),
    links: [
      { rel: 'canonical', href: href(lang) },
      ...SUPPORTED_LANGUAGES.map((l) => ({ rel: 'alternate', hreflang: l, href: href(l) })),
      { rel: 'alternate', hreflang: 'x-default', href: href('en') },
    ],
  }
}
