import { createFileRoute } from '@tanstack/react-router'
import { motion } from 'motion/react'
import { useTranslation } from 'react-i18next'
import { CeoCard } from '~/components/site/CeoCard'
import { ContactForm } from '~/components/site/ContactForm'
import { StatusChip } from '~/components/site/StatusChip'
import { ShineBorder } from '~/components/ui/shine-border'
import { cn } from '~/lib/utils'
import { staggerContainer, staggerItem } from '~/lib/motion-presets'

export const Route = createFileRoute('/$lang/contact')({
  component: ContactPage,
})

const cellShell =
  'card-shell group relative flex flex-col overflow-hidden transform-gpu'

function ContactPage() {
  const { t } = useTranslation('contact')
  const { t: tHome } = useTranslation('home')

  return (
    <div className="mx-auto w-full max-w-4xl px-4 pb-16 pt-28 sm:px-6 sm:pb-24 sm:pt-32">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        className="flex flex-col gap-4"
      >
        <motion.div variants={staggerItem}>
          <StatusChip>{tHome('status.acceptingProjects')}</StatusChip>
        </motion.div>
        <motion.h1
          variants={staggerItem}
          className="font-display text-[32px] leading-[1.05] tracking-[-0.025em] text-fg sm:text-[44px] lg:text-[56px]"
        >
          {t('pageTitle')}
        </motion.h1>
        <motion.p
          variants={staggerItem}
          className="max-w-[560px] text-[18px] leading-7 text-fg-muted"
        >
          {t('pageSubtitle')}
        </motion.p>
      </motion.div>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        className="mt-12 grid grid-cols-1 gap-4 lg:grid-cols-3"
      >
        <motion.div
          variants={staggerItem}
          className={cn(cellShell, 'lg:col-span-2')}
        >
          <ShineBorder borderWidth={1.5} />
          <div
            className="pointer-events-none absolute -bottom-32 -right-24 h-[24rem] w-[24rem] rounded-full bg-accent/5 blur-3xl"
            aria-hidden="true"
          />
          <div className="relative z-10 flex h-full flex-col gap-4 p-6 sm:p-7">
            <ContactForm />
          </div>
        </motion.div>

        <motion.div variants={staggerItem} className={cn(cellShell, 'lg:col-span-1')}>
          <CeoCard />
        </motion.div>
      </motion.div>
    </div>
  )
}
