/// <reference types="vite/client" />
import { HeadContent, Scripts, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { LayoutGroup, MotionConfig } from 'motion/react'
import * as React from 'react'
import { DefaultCatchBoundary } from '~/components/DefaultCatchBoundary'
import { NotFound } from '~/components/NotFound'
import { RouteTransition } from '~/components/site/RouteTransition'
import { SiteHeader } from '~/components/site/SiteHeader'
import { SiteFooter } from '~/components/site/SiteFooter'
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
      { name: 'theme-color', content: '#fafaf8', media: '(prefers-color-scheme: light)' },
      { name: 'theme-color', content: '#0e0e11', media: '(prefers-color-scheme: dark)' },
      ...seo({
        title: 'Spexsol — Digital precision.',
        description: 'Advanced solutions, niche execution.',
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
        href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Manrope:wght@400;500;600&display=swap',
      },
      { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
    ],
  }),
  errorComponent: DefaultCatchBoundary,
  notFoundComponent: () => <NotFound />,
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html suppressHydrationWarning>
      <head>
        <HeadContent />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var s=localStorage.getItem('theme');var d=s?s==='dark':window.matchMedia('(prefers-color-scheme: dark)').matches;if(d)document.documentElement.classList.add('dark');}catch(e){}})();`,
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{sessionStorage.removeItem('splash-seen');}catch(e){}})();`,
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col relative overflow-x-hidden">
        <MotionConfig
          reducedMotion="user"
          transition={{ duration: 0.22, ease: [0.2, 0, 0, 1] }}
        >
          <SplashProvider>
            <LayoutGroup id="brand">
              <SiteHeader />
              <main className="flex-1">
                <RouteTransition>{children}</RouteTransition>
              </main>
              <SiteFooter />
              <Splash />
            </LayoutGroup>
          </SplashProvider>
        </MotionConfig>
        <TanStackRouterDevtools position="bottom-right" />
        <Scripts />
      </body>
    </html>
  )
}
