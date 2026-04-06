import { AnimatePresence, motion } from 'motion/react'
import type { Variants } from 'motion/react'
import { useEffect, useState } from 'react'
import { Logo } from '~/components/site/Logo'
import { useSplash } from '~/components/site/SplashContext'

const REVEAL_S = 0.45
const HOLD_S = 1.0
const MORPH_S = 0.7
const BACKDROP_FADE_S = 0.5
const EASE = [0.2, 0, 0, 1] as const
const TOTAL_HOLD_MS = (REVEAL_S + HOLD_S) * 1000

const wordmarkVariants: Variants = {
  hidden: { clipPath: 'inset(-0.25em 100% -0.25em 0)' },
  visible: {
    clipPath: 'inset(-0.25em 0% -0.25em 0)',
    transition: { duration: REVEAL_S, ease: EASE, delay: 0.1 },
  },
}

const lockupVariants: Variants = {
  hidden: {},
  visible: {},
  exit: {},
}

export function Splash() {
  const { markDone, markSettled } = useSplash()
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const dismissTimer = window.setTimeout(() => {
      markDone()
      setVisible(false)
    }, TOTAL_HOLD_MS)
    // After the morph + a small buffer, mark settled so the header drops
    // its layoutId and stops participating in layout animations.
    const settleTimer = window.setTimeout(
      () => markSettled(),
      TOTAL_HOLD_MS + MORPH_S * 1000 + 50,
    )
    return () => {
      window.clearTimeout(dismissTimer)
      window.clearTimeout(settleTimer)
    }
  }, [markDone, markSettled])

  return (
    <AnimatePresence mode="popLayout">
      {visible && (
        <motion.div
          key="splash"
          aria-hidden="true"
          className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-none"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={lockupVariants}
        >
          <motion.div
            className="absolute inset-0 bg-bg"
            variants={{
              hidden: { opacity: 1 },
              visible: { opacity: 1 },
              exit: {
                opacity: 0,
                transition: { duration: BACKDROP_FADE_S, ease: EASE },
              },
            }}
          />
          <div className="relative flex items-center gap-3 font-display text-[56px] leading-none tracking-[-0.05em] text-fg">
            <motion.span
              layoutId="brand-logo"
              className="inline-flex"
              transition={{ layout: { duration: MORPH_S, ease: EASE } }}
            >
              <Logo className="h-[1em] w-auto shrink-0" />
            </motion.span>
            <motion.span
              layoutId="brand-wordmark"
              className="inline-block whitespace-nowrap leading-none"
              variants={wordmarkVariants}
              transition={{ layout: { duration: MORPH_S, ease: EASE } }}
            >
              spexsol.sk
            </motion.span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
