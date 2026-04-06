import { useRouterState } from '@tanstack/react-router'
import { AnimatePresence, motion } from 'motion/react'
import * as React from 'react'
import { SUPPORTED_LANGUAGES } from '~/i18n/config'

const LOCALE_PREFIX = new RegExp(`^/(${SUPPORTED_LANGUAGES.join('|')})`)

function isHomePath(pathname: string): boolean {
  const rest = pathname.replace(LOCALE_PREFIX, '').replace(/\/$/, '')
  return rest === ''
}

export function RouteTransition({ children }: { children: React.ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname })
  const dir = isHomePath(pathname) ? 1 : -1

  return (
    <AnimatePresence mode="popLayout" initial={false}>
      <motion.div
        key={pathname}
        initial={{ x: dir * 75, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: -dir * 75, opacity: 0 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
