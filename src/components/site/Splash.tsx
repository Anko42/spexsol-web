import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { useEffect, useState } from 'react'
import { AnimatedLogo } from '~/components/site/AnimatedLogo'
import { Logo } from '~/components/site/Logo'
import { useSplash } from '~/components/site/SplashContext'
import {
  CURTAIN_EASE,
  CURTAIN_S,
  EASE,
  SETTLE_MS,
  TOTAL_HOLD_MS,
  WORDMARK_S,
} from '~/components/site/splashTimings'

// Reduced-motion: brief static lockup, no path stagger / wordmark slide / curtain lift.
const REDUCED_HOLD_MS = 300

export function Splash() {
  const { markDone, markSettled } = useSplash()
  const reduce = useReducedMotion()
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const holdMs = reduce ? REDUCED_HOLD_MS : TOTAL_HOLD_MS
    const settleAt = reduce ? REDUCED_HOLD_MS + 50 : SETTLE_MS

    const dismissTimer = window.setTimeout(() => {
      markDone()
      setVisible(false)
    }, holdMs)
    const settleTimer = window.setTimeout(() => markSettled(), settleAt)
    return () => {
      window.clearTimeout(dismissTimer)
      window.clearTimeout(settleTimer)
    }
  }, [markDone, markSettled, reduce])

  return (
    <AnimatePresence mode="wait">
      {visible && (
        <motion.div
          key="splash"
          aria-hidden="true"
          className="fixed inset-0 z-[100] flex items-center justify-center bg-bg pointer-events-none"
          initial={{ y: 0 }}
          animate={{ y: 0 }}
          exit={
            reduce
              ? { opacity: 0, transition: { duration: 0.25, ease: EASE } }
              : { y: '-100%', transition: { duration: CURTAIN_S, ease: CURTAIN_EASE } }
          }
        >
          <div className="relative flex items-center gap-3 px-6 font-display text-[36px] leading-none tracking-[-0.05em] text-fg sm:text-[56px]">
            <span className="inline-flex">
              {reduce ? (
                <Logo className="h-[1em] w-auto shrink-0" />
              ) : (
                <AnimatedLogo className="h-[1em] w-auto shrink-0" />
              )}
            </span>
            {reduce ? (
              <span className="inline-block whitespace-nowrap leading-none">
                spexsol.sk
              </span>
            ) : (
              <span
                className="inline-block overflow-hidden whitespace-nowrap leading-none"
                style={{ paddingBottom: '0.15em', marginBottom: '-0.15em' }}
              >
                <motion.span
                  className="inline-block"
                  initial={{ y: '110%', opacity: 0 }}
                  animate={{ y: '0%', opacity: 1 }}
                  transition={{
                    duration: WORDMARK_S,
                    ease: EASE,
                    delay: 1.0,
                  }}
                >
                  spexsol.sk
                </motion.span>
              </span>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
