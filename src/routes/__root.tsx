/// <reference types="vite/client" />
import { HeadContent, Scripts, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { MotionConfig } from 'motion/react'
import * as React from 'react'
import { Toaster } from 'sonner'
import { GoogleAnalytics } from 'tanstack-router-ga4'
import { DefaultCatchBoundary } from '~/components/DefaultCatchBoundary'
import { NotFound } from '~/components/NotFound'
import { RouteTransition } from '~/components/site/RouteTransition'
import { SiteHeader } from '~/components/site/SiteHeader'
import { SiteFooter } from '~/components/site/SiteFooter'
import { CookieConsent } from '~/components/site/CookieConsent'
import { Splash } from '~/components/site/Splash'
import { SplashProvider } from '~/components/site/SplashContext'
import i18n, { DEFAULT_LANGUAGE, isSupportedLanguage } from '~/i18n/config'
import appCss from '~/styles/app.css?url'
import { seo } from '~/utils/seo'

export const Route = createRootRoute({
  beforeLoad: async ({ location }) => {
    const seg = location.pathname.split('/')[1]
    const lang = isSupportedLanguage(seg) ? seg : DEFAULT_LANGUAGE
    if (i18n.language !== lang) {
      await i18n.changeLanguage(lang)
    }
  },
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'theme-color', content: '#f5f3ee', media: '(prefers-color-scheme: light)' },
      { name: 'theme-color', content: '#12110e', media: '(prefers-color-scheme: dark)' },
      ...seo({
        title: 'SpexSol — Software, built with intent',
        description:
          'Small Slovak engineering studio. Web and mobile products, automation, AI integrations and code audits.',
      }),
    ],
    links: [
      { rel: 'stylesheet', href: appCss },
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com',
        crossOrigin: 'anonymous',
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600&family=Geist+Mono:wght@400;500&family=Newsreader:ital,opsz,wght@0,6..72,300..500;1,6..72,300..500&display=swap',
      },
      { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
    ],
  }),
  errorComponent: DefaultCatchBoundary,
  notFoundComponent: () => <NotFound />,
  shellComponent: RootDocument,
})

// Content renders visible from the first byte; the splash curtain covers it
// and lifts away. No opacity gate, so no-JS and slow hydration still show the page.
function MainEntry({ children }: { children: React.ReactNode }) {
  return (
    <main id="main" tabIndex={-1} className="flex-1 outline-none">
      {children}
    </main>
  )
}

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html suppressHydrationWarning>
      <head>
        <HeadContent />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('consent','default',{ad_storage:'denied',analytics_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',wait_for_update:500});`,
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var mq=window.matchMedia('(prefers-color-scheme: dark)');var apply=function(){var s=localStorage.getItem('theme');var d=s?s==='dark':mq.matches;document.documentElement.classList.toggle('dark',d);};apply();mq.addEventListener('change',function(){if(!localStorage.getItem('theme'))apply();});}catch(e){}})();`,
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{if(sessionStorage.getItem('splash-seen')){document.documentElement.classList.add('splash-skip')}else{sessionStorage.setItem('splash-seen','1')}}catch(e){}})();`,
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col relative overflow-x-hidden">
        <GoogleAnalytics measurementId="G-BTY6T00NQ0" />
        <MotionConfig
          reducedMotion="user"
          transition={{ duration: 0.22, ease: [0.2, 0, 0, 1] }}
        >
          <SplashProvider>
            <a
              href="#main"
              className="label fixed left-4 top-4 z-[70] -translate-y-20 bg-fg px-3 py-2 !text-bg focus:translate-y-0"
            >
              {i18n.t('common:skip')}
            </a>
            <SiteHeader />
            <MainEntry>
              <RouteTransition>{children}</RouteTransition>
            </MainEntry>
            <SiteFooter />
            <Splash />
          </SplashProvider>
          <CookieConsent />
        </MotionConfig>
        <Toaster
          position="bottom-right"
          theme="system"
          duration={3000}
          toastOptions={{
            classNames: {
              toast:
                '!rounded-field !border-line !bg-surface !text-fg !font-body !shadow-none',
            },
          }}
        />
        <TanStackRouterDevtools position="bottom-right" />
        <Scripts />
      </body>
    </html>
  )
}
