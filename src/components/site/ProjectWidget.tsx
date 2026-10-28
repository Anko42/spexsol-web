import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { useTranslation } from 'react-i18next'
import { cn } from '~/lib/utils'

type StepState = 'done' | 'active' | 'todo'

const STEPS: Array<{ key: string; state: StepState; meta: string }> = [
  { key: 'discovery', state: 'done', meta: 'done' },
  { key: 'design', state: 'done', meta: 'done' },
  { key: 'build', state: 'active', meta: 'progress' },
  { key: 'launch', state: 'todo', meta: 'store' },
]

function StepDot({ state }: { state: StepState }) {
  return (
    <span
      className={cn(
        'relative size-3 shrink-0 rounded-full',
        state === 'done' && 'bg-accent',
        state === 'active' && 'border-2 border-accent',
        state === 'todo' && 'border border-fg-muted/50',
      )}
    >
      {state === 'active' && (
        <span className="absolute inset-y-0 left-0 w-1/2 rounded-l-full bg-accent" />
      )}
    </span>
  )
}

const chipClass =
  'eyebrow !h-8 whitespace-nowrap !shadow-[0_0_0_1px_var(--line),var(--shadow-float)]'

/** Decorative "project tracker" card for the hero. Everything here is an example. */
export function ProjectWidget({ word }: { word: string }) {
  const { t } = useTranslation('home')
  const reduce = useReducedMotion()

  return (
    <div aria-hidden="true" className="relative mx-auto w-full max-w-[440px]">
      {/* Replaces chip, synced with the headline word */}
      <div
        className={cn(
          chipClass,
          'mb-3 lg:absolute lg:-left-6 lg:-top-5 lg:z-10 lg:mb-0',
        )}
      >
        <span className="text-fg-muted">{t('hero.widget.replaces')}</span>
        <span className="relative inline-flex overflow-hidden text-fg">
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.span
              key={word}
              initial={{ opacity: 0, filter: 'blur(4px)' }}
              animate={{ opacity: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, transition: { duration: 0.2 } }}
              transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
              className="line-through decoration-accent decoration-2"
            >
              {word}
            </motion.span>
          </AnimatePresence>
        </span>
      </div>

      <div className="shell">
        <div className="core p-5">
          <div className="flex items-center gap-3">
            <img
              src="/andrej.png"
              alt=""
              width={28}
              height={28}
              className="size-7 rounded-full object-cover object-top outline outline-1 -outline-offset-1 outline-[oklch(0_0_0/0.1)] dark:outline-[oklch(1_0_0/0.1)]"
            />
            <span className="text-[14px] font-medium text-fg">{t('hero.widget.title')}</span>
            <span className="ml-auto font-mono text-[11px] text-fg-muted">#014</span>
          </div>

          <ol className="well mt-4 divide-y divide-line-soft">
            {STEPS.map((step) => (
              <li key={step.key} className="px-4 py-3">
                <div className="flex items-center gap-3">
                  <StepDot state={step.state} />
                  <span
                    className={cn(
                      'text-[14px]',
                      step.state === 'todo' ? 'text-fg-muted' : 'text-fg',
                      step.state === 'active' && 'font-medium',
                    )}
                  >
                    {t(`hero.widget.${step.key}`)}
                  </span>
                  <span className="ml-auto text-[12px] tabular-nums text-fg-muted">
                    {t(`hero.widget.${step.meta}`)}
                  </span>
                </div>
                {step.state === 'active' && (
                  <div className="ml-6 mt-2.5 h-1.5 overflow-hidden rounded-full bg-fg/[0.07]">
                    <motion.div
                      className="h-full w-1/2 origin-left rounded-full bg-accent"
                      initial={reduce ? false : { scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 1.2, ease: [0.32, 0.72, 0, 1], delay: 0.6 }}
                    />
                  </div>
                )}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  )
}
