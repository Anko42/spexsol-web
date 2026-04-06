import { Link, useRouterState } from '@tanstack/react-router'
import { motion } from 'motion/react'
import { useTranslation } from 'react-i18next'
import { useLang } from '~/hooks/useLang'
import { fadeIn } from '~/lib/motion-presets'
import { cn } from '~/lib/utils'
import { Logo } from '~/components/site/Logo'

export function SiteFooter() {
  const { t } = useTranslation('common')
  const lang = useLang()
  const year = new Date().getFullYear()
  const pathname = useRouterState({ select: (s) => s.location.pathname })

  const isPrivacy = pathname.endsWith('/privacy-policy')
  const isTerms = pathname.endsWith('/terms-of-use')

  const linkClass = (active: boolean) =>
    cn(
      'whitespace-nowrap text-xs tracking-[0.025em] opacity-80 hover:opacity-100',
      active ? 'text-accent underline' : 'text-fg-muted',
    )

  return (
    <motion.footer
      variants={fadeIn}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      className="mx-auto flex w-full max-w-[800px] flex-col gap-6 border-t border-line-soft px-6 pb-16 pt-32 sm:flex-row sm:items-center sm:justify-between"
    >
      <Link
        to="/$lang"
        params={{ lang }}
        className="flex items-center gap-2 text-sm font-semibold leading-none text-fg"
      >
        <Logo className="h-[1em] w-auto shrink-0" />
        <span className="leading-none">{t('brand')}</span>
      </Link>
      <nav className="flex items-center gap-6">
        <Link
          to="/$lang/privacy-policy"
          params={{ lang }}
          className={linkClass(isPrivacy)}
        >
          {t('footer.privacyPolicy')}
        </Link>
        <Link
          to="/$lang/terms-of-use"
          params={{ lang }}
          className={linkClass(isTerms)}
        >
          {t('footer.termsOfUse')}
        </Link>
      </nav>
      <span className="whitespace-nowrap text-xs text-fg-muted tracking-[0.025em]">
        {t('footer.copyright', { year })}
      </span>
    </motion.footer>
  )
}
