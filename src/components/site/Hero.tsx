import { motion, useReducedMotion } from 'motion/react'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Button, ButtonArrow } from '~/components/ui/button'
import { ProjectWidget } from '~/components/site/ProjectWidget'
import { useSplash } from '~/components/site/SplashContext'
import { staggerContainer, staggerItem } from '~/lib/motion-presets'

// Words sit on the faces of a cube that rolls a quarter turn per swap,
// forever. Runs past WCAG 2.2.2's 5s limit, so it ships a pause button.
// The cube has exactly four faces: hero.words must hold four entries.
const SWAP_MS = 3000
// Cube face height; half of it is the distance from the axis to each face.
const FACE_EM = 1.15

function useRollingIndex(paused: boolean) {
  const reduce = useReducedMotion()
  // wait for the splash curtain so the first roll isn't missed
  const { done: started } = useSplash()
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (reduce || !started || paused) return
    const id = window.setInterval(() => {
      if (!document.hidden) setIndex((i) => i + 1)
    }, SWAP_MS)
    return () => window.clearInterval(id)
  }, [reduce, started, paused])

  return { index, animating: !reduce }
}

export function Hero() {
  const { t } = useTranslation('home')
  const words = t('hero.words', { returnObjects: true }) as string[]
  const [paused, setPaused] = useState(false)
  const { index, animating } = useRollingIndex(paused)
  const face = index % words.length
  const word = words[face]
  const longest = words.reduce((a, b) => (b.length > a.length ? b : a), '')

  return (
    <section
      aria-labelledby="hero-title"
      className="grid grid-cols-1 items-center gap-14 pb-20 pt-28 sm:pt-36 lg:grid-cols-12 lg:gap-8 lg:pb-28"
    >
      <motion.div
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        className="lg:col-span-7"
      >
        <motion.div variants={staggerItem} className="flex items-center gap-2">
          <p className="eyebrow">
            <span className="relative flex size-2" aria-hidden="true">
              <span className="absolute inset-0 animate-ping rounded-full bg-accent opacity-40 motion-reduce:hidden" />
              <span className="relative size-2 rounded-full bg-accent" />
            </span>
            {t('hero.status')}
          </p>
          {animating && (
            <button
              type="button"
              onClick={() => setPaused((p) => !p)}
              aria-pressed={paused}
              aria-label={t('hero.pauseAnimation')}
              title={t('hero.pauseAnimation')}
              className="inline-flex size-7 cursor-pointer items-center justify-center rounded-full text-fg-muted transition-colors duration-150 hover:bg-fg/5 hover:text-fg"
            >
              <svg viewBox="0 0 16 16" className="size-3.5" fill="currentColor" aria-hidden="true">
                {paused ? (
                  <path d="M5 3.5v9l7-4.5-7-4.5Z" />
                ) : (
                  <path d="M5 3.5h2v9H5zM9 3.5h2v9H9z" />
                )}
              </svg>
            </button>
          )}
        </motion.div>

        <motion.h1
          id="hero-title"
          variants={staggerItem}
          className="mt-6 text-[clamp(2.5rem,5.5vw,4.25rem)] font-semibold leading-[1.02] tracking-[-0.035em] text-fg"
        >
          <span className="sr-only">{t('hero.titleFull')}</span>
          <span aria-hidden="true">
            {t('hero.titleBefore')}{' '}
            <span
              className="relative block font-display font-normal italic tracking-[-0.02em] text-accent"
              style={{ height: `${FACE_EM}em`, perspective: '10em' }}
            >
              {/* reserves the widest face so the line never jumps */}
              <span className="invisible">
                {longest}
                {t('hero.titleAfter')}
              </span>
              <motion.span
                className="absolute inset-0 [transform-style:preserve-3d]"
                style={{ transformOrigin: `50% 50% -${FACE_EM / 2}em` }}
                initial={false}
                animate={{ rotateX: animating ? index * 90 : 0 }}
                transition={{ type: 'spring', duration: 0.9, bounce: 0.15 }}
              >
                {words.map((w, i) => (
                  <motion.span
                    key={w}
                    className="absolute inset-0 flex items-center whitespace-nowrap [backface-visibility:hidden]"
                    style={{
                      transform: `rotateX(${-90 * i}deg)`,
                      transformOrigin: `50% 50% -${FACE_EM / 2}em`,
                    }}
                    initial={false}
                    animate={{ opacity: i === face ? 1 : 0.25 }}
                    transition={{ duration: 0.5 }}
                  >
                    {w}
                    <span className="not-italic font-body font-semibold tracking-[-0.035em] text-fg">
                      {t('hero.titleAfter')}
                    </span>
                  </motion.span>
                ))}
              </motion.span>
            </span>
          </span>
        </motion.h1>

        <motion.p
          variants={staggerItem}
          className="mt-6 max-w-[50ch] text-[17px] leading-7 text-fg-muted sm:text-[18px] sm:leading-8"
        >
          {t('hero.subtitle')}
        </motion.p>

        <motion.div variants={staggerItem} className="mt-9 flex flex-wrap items-center gap-3">
          <Button asChild size="lg" variant="accent">
            <a href="#contact">
              {t('hero.cta')}
              <ButtonArrow>↓</ButtonArrow>
            </a>
          </Button>
          <Button asChild size="lg" variant="outline">
            <a href="#services">{t('hero.ctaSecondary')}</a>
          </Button>
        </motion.div>
        <motion.ul
          variants={staggerItem}
          className="label mt-5 flex flex-wrap gap-x-5 gap-y-1"
        >
          {(t('hero.trust', { returnObjects: true }) as string[]).map((item) => (
            <li key={item} className="flex items-center gap-1.5">
              <span aria-hidden="true" className="text-accent">✓</span>
              {item}
            </li>
          ))}
        </motion.ul>
        <motion.p variants={staggerItem} className="label mt-2">
          {t('hero.note')}
        </motion.p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.32, 0.72, 0, 1], delay: 0.25 }}
        className="lg:col-span-5"
      >
        <ProjectWidget word={word} />
      </motion.div>
    </section>
  )
}
