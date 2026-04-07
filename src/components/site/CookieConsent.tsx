import { Cookie } from 'lucide-react'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useGoogleAnalytics } from 'tanstack-router-ga4'
import i18n from '~/i18n/config'

export function showCookiePreferences() {
  import('vanilla-cookieconsent').then((cc) => cc.showPreferences())
}

export function CookieSettingsButton() {
  const { t } = useTranslation('common')
  const label = t('footer.cookieSettings')
  return (
    <button
      type="button"
      onClick={showCookiePreferences}
      aria-label={label}
      title={label}
      className="fixed bottom-4 left-4 z-40 inline-flex h-10 w-10 items-center justify-center rounded-full border border-line bg-card text-fg-muted shadow-lg backdrop-blur transition-colors hover:text-fg hover:border-line/80 focus-visible:outline-none focus-visible:ring-[2px] focus-visible:ring-accent/60"
    >
      <Cookie className="h-5 w-5" />
    </button>
  )
}

export function CookieConsent() {
  const ga = useGoogleAnalytics()
  useEffect(() => {
    let mounted = true
    Promise.all([
      import('vanilla-cookieconsent'),
      import('vanilla-cookieconsent/dist/cookieconsent.css'),
    ]).then(([cc]) => {
      if (!mounted) return
      cc.run({
        guiOptions: {
          consentModal: {
            layout: 'box',
            position: 'bottom right',
            equalWeightButtons: false,
            flipButtons: false,
          },
          preferencesModal: {
            layout: 'box',
            equalWeightButtons: false,
            flipButtons: false,
          },
        },
        categories: {
          necessary: { enabled: true, readOnly: true },
          analytics: {
            enabled: false,
            autoClear: {
              cookies: [
                { name: /^_ga/ },
                { name: '_gid' },
                { name: /^_gat/ },
              ],
            },
          },
        },
        onConsent: ({ cookie }) => {
          ga.consent('update', {
            analytics_storage: cookie.categories.includes('analytics')
              ? 'granted'
              : 'denied',
          })
        },
        onChange: ({ cookie }) => {
          ga.consent('update', {
            analytics_storage: cookie.categories.includes('analytics')
              ? 'granted'
              : 'denied',
          })
        },
        language: {
          default: i18n.language === 'sk' ? 'sk' : 'en',
          autoDetect: 'document',
          translations: {
            en: {
              consentModal: {
                title: 'We use cookies',
                description:
                  'We use essential cookies to run this site and optional analytics cookies to understand how it is used. You can change your choice at any time.',
                acceptAllBtn: 'Accept all',
                acceptNecessaryBtn: 'Reject all',
                showPreferencesBtn: 'Manage preferences',
              },
              preferencesModal: {
                title: 'Cookie preferences',
                acceptAllBtn: 'Accept all',
                acceptNecessaryBtn: 'Reject all',
                savePreferencesBtn: 'Save preferences',
                closeIconLabel: 'Close',
                sections: [
                  {
                    title: 'Strictly necessary',
                    description:
                      'These cookies are required for the site to function and cannot be disabled.',
                    linkedCategory: 'necessary',
                  },
                  {
                    title: 'Analytics',
                    description:
                      'These cookies help us measure traffic and improve the site (Google Analytics).',
                    linkedCategory: 'analytics',
                  },
                  {
                    title: 'More information',
                    description:
                      'See our <a href="/en/privacy-policy">Privacy Policy</a> for details.',
                  },
                ],
              },
            },
            sk: {
              consentModal: {
                title: 'Používame cookies',
                description:
                  'Používame nevyhnutné cookies na fungovanie stránky a voliteľné analytické cookies na pochopenie jej využívania. Svoju voľbu môžete kedykoľvek zmeniť.',
                acceptAllBtn: 'Prijať všetky',
                acceptNecessaryBtn: 'Odmietnuť všetky',
                showPreferencesBtn: 'Spravovať nastavenia',
              },
              preferencesModal: {
                title: 'Nastavenia cookies',
                acceptAllBtn: 'Prijať všetky',
                acceptNecessaryBtn: 'Odmietnuť všetky',
                savePreferencesBtn: 'Uložiť nastavenia',
                closeIconLabel: 'Zavrieť',
                sections: [
                  {
                    title: 'Nevyhnutné',
                    description:
                      'Tieto cookies sú potrebné na fungovanie stránky a nedajú sa vypnúť.',
                    linkedCategory: 'necessary',
                  },
                  {
                    title: 'Analytické',
                    description:
                      'Pomáhajú nám merať návštevnosť a zlepšovať stránku (Google Analytics).',
                    linkedCategory: 'analytics',
                  },
                  {
                    title: 'Viac informácií',
                    description:
                      'Podrobnosti nájdete v <a href="/sk/privacy-policy">Ochrane súkromia</a>.',
                  },
                ],
              },
            },
          },
        },
      })
    })
    return () => {
      mounted = false
    }
  }, [])

  return null
}
