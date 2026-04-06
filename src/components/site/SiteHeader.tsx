import { Link } from '@tanstack/react-router'
import { motion, useScroll, useTransform } from 'motion/react'
import { useTranslation } from 'react-i18next'
import { useLang } from '~/hooks/useLang'
import { Logo } from '~/components/site/Logo'
import { LangSwitcher } from '~/components/site/LangSwitcher'
import { AnimatedThemeToggler } from '~/components/magicui/animated-theme-toggler'
import { useSplash } from '~/components/site/SplashContext'

export function SiteHeader() {
  const { t } = useTranslation('common')
  const lang = useLang()
  const { done: splashDone, settled: splashSettled } = useSplash()
  const { scrollY } = useScroll()
  const backgroundColor = useTransform(
    scrollY,
    [0, 80],
    [
      'color-mix(in srgb, var(--bg) 40%, transparent)',
      'color-mix(in srgb, var(--bg) 85%, transparent)',
    ],
  )
  const borderBottomColor = useTransform(
    scrollY,
    [0, 80],
    ['rgb(255 255 255 / 0)', 'rgb(255 255 255 / 0.08)'],
  )
  return (
    <motion.header
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.2, 0, 0, 1] }}
      style={{ backgroundColor, borderBottomColor }}
      className="fixed top-0 left-0 right-0 z-50 border-b border-transparent backdrop-blur-[12px]"
    >
      <div className="mx-auto flex max-w-[800px] items-center justify-between px-6 py-8">
        <Link
          to="/$lang"
          params={{ lang }}
          className="flex items-center gap-2 font-display text-[18px] leading-none tracking-[-0.05em] text-fg"
        >
          {splashSettled ? (
            <>
              <span className="inline-flex">
                <Logo className="h-[1em] w-auto shrink-0" />
              </span>
              <span className="leading-none">{t('brand')}</span>
            </>
          ) : (
            <>
              <motion.span
                layoutId="brand-logo"
                className="inline-flex"
                style={{ visibility: splashDone ? 'visible' : 'hidden' }}
                transition={{ layout: { duration: 0.7, ease: [0.2, 0, 0, 1] } }}
              >
                <Logo className="h-[1em] w-auto shrink-0" />
              </motion.span>
              <motion.span
                layoutId="brand-wordmark"
                className="leading-none"
                style={{ visibility: splashDone ? 'visible' : 'hidden' }}
                transition={{ layout: { duration: 0.7, ease: [0.2, 0, 0, 1] } }}
              >
                {t('brand')}
              </motion.span>
            </>
          )}
        </Link>
        <div className="flex items-center gap-3">
          <LangSwitcher />
          <AnimatedThemeToggler />
        </div>
      </div>
    </motion.header>
  )
}
