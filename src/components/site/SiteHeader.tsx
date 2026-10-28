import { Link, useRouterState } from '@tanstack/react-router'
import { motion } from 'motion/react'
import { useTranslation } from 'react-i18next'
import { useLang } from '~/hooks/useLang'
import { Logo } from '~/components/site/Logo'
import { LangSwitcher } from '~/components/site/LangSwitcher'
import { ThemeToggle } from '~/components/site/ThemeToggle'
import { useSplash } from '~/components/site/SplashContext'
import { EASE, HEADER_BRAND_S } from '~/components/site/splashTimings'
import { cn } from '~/lib/utils'

export function SiteHeader() {
  const { t } = useTranslation('common')
  const lang = useLang()
  const { done: splashDone } = useSplash()
  const pathname = useRouterState({ select: (s) => s.location.pathname })

  const navClass = (active: boolean) =>
    cn(
      'label inline-flex h-9 items-center rounded-full px-3 transition-colors duration-150 hover:bg-fg/5 hover:!text-fg',
      active && 'bg-fg/[0.06] !text-fg',
    )

  return (
    <header className="pointer-events-none fixed inset-x-0 top-3 z-50 px-3 sm:top-4">
      <div className="pointer-events-auto mx-auto flex h-14 max-w-3xl items-center justify-between gap-2 rounded-full bg-bg/75 pl-4 pr-2 shadow-[0_0_0_1px_var(--line),var(--shadow-float)] backdrop-blur-md sm:pl-5">
        <Link
          to="/$lang"
          params={{ lang }}
          aria-label="SpexSol — home"
          className="inline-flex h-9 items-center"
        >
          <motion.span
            className="inline-flex items-center gap-2 font-display text-[18px] sm:gap-2.5 sm:text-[20px] leading-none tracking-[-0.02em] text-fg"
            initial={{ opacity: 0 }}
            animate={{ opacity: splashDone ? 1 : 0 }}
            transition={{ duration: HEADER_BRAND_S, ease: EASE }}
          >
            <Logo className="h-[0.8em] w-auto shrink-0" />
            <span className="hidden min-[380px]:inline">{t('brand')}</span>
          </motion.span>
        </Link>

        <nav aria-label="Main" className="flex items-center gap-0.5 sm:gap-1">
          <Link
            to="/$lang/products"
            params={{ lang }}
            className={navClass(pathname.includes('/products'))}
          >
            <span className="sm:hidden">{t('nav.productsShort')}</span>
            <span className="hidden sm:inline">{t('nav.products')}</span>
          </Link>
          <Link
            to="/$lang/contact"
            params={{ lang }}
            className={navClass(pathname.endsWith('/contact'))}
          >
            {t('nav.contact')}
          </Link>
          <span aria-hidden="true" className="mx-1 hidden h-4 w-px bg-line sm:block" />
          <LangSwitcher />
          <ThemeToggle />
        </nav>
      </div>
    </header>
  )
}
