import { Link } from '@tanstack/react-router'
import { motion } from 'motion/react'
import { useTranslation } from 'react-i18next'
import { useLang } from '~/hooks/useLang'
import { Logo } from '~/components/site/Logo'
import { LangSwitcher } from '~/components/site/LangSwitcher'
import { AnimatedThemeToggler } from '~/components/magicui/animated-theme-toggler'

export function SiteHeader() {
  const { t } = useTranslation('common')
  const lang = useLang()
  return (
    <motion.header
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-[12px] bg-bg/70"
    >
      <div className="mx-auto flex max-w-[800px] items-center justify-between px-6 py-8">
        <Link
          to="/$lang"
          params={{ lang }}
          className="flex items-center gap-2 font-display text-[18px] leading-none tracking-[-0.05em] text-fg"
        >
          <Logo className="h-[1em] w-auto shrink-0" />
          <span className="leading-none">{t('brand')}</span>
        </Link>
        <div className="flex items-center gap-3">
          <LangSwitcher />
          <AnimatedThemeToggler />
        </div>
      </div>
    </motion.header>
  )
}
