import { createFileRoute } from '@tanstack/react-router'
import { motion } from 'motion/react'
import { useTranslation } from 'react-i18next'
import { BentoGrid, BentoCard } from '~/components/site/BentoGrid'
import { StatusChip } from '~/components/site/StatusChip'
import { CeoCard } from '~/components/site/CeoCard'
import { ContactForm } from '~/components/site/ContactForm'
import { ShineBorder } from '~/components/ui/shine-border'
import { SystemsIcon } from '~/components/icons/SystemsIcon'
import { ToolingIcon } from '~/components/icons/ToolingIcon'
import { SystemOptimizationIcon } from '~/components/icons/SystemOptimizationIcon'
import { SecurityIntegrityIcon } from '~/components/icons/SecurityIntegrityIcon'
import { useGoogleAnalytics } from 'tanstack-router-ga4'
import { selectContactTopic } from '~/lib/contact-schema'
import { cn } from '~/lib/utils'
import {
  heroBlur,
  staggerContainer,
  staggerItem,
} from '~/lib/motion-presets'

const revealViewport = { once: true, amount: 0.2, margin: '0px 0px -10% 0px' }

export const Route = createFileRoute('/$lang/')({
  component: Home,
})

const cellShell =
  'group relative col-span-3 flex flex-col justify-between overflow-hidden rounded-xl bg-card transform-gpu [box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] [border:1px_solid_rgba(255,255,255,.1)]'

function Home() {
  const { t } = useTranslation('home')
  const ga = useGoogleAnalytics()
  const cardsCta = t('cards.cta')
  const handleCardCta = (topic: 'product' | 'advisory' | 'automation' | 'ai') => {
    ga.event('select_content', {
      content_type: 'service_card',
      item_id: topic,
    })
    selectContactTopic(topic)
  }
  return (
    <div className="mx-auto w-full max-w-6xl px-4 pb-16 pt-28 sm:px-6 sm:pb-24 sm:pt-32">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={revealViewport}
        variants={staggerContainer}
      >
        <BentoGrid>
          {/* Hero */}
          <div className={cn(cellShell, 'lg:col-span-2 lg:row-span-1')}>
            <motion.div
              className="pointer-events-none absolute -top-24 -left-24 h-[28rem] w-[28rem] rounded-full bg-accent/10 blur-3xl"
              aria-hidden="true"
              variants={heroBlur}
              initial="hidden"
              animate="visible"
            />
            <motion.div
              className="relative z-10 flex h-full flex-col justify-center gap-4 p-6 sm:p-8"
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              <motion.div variants={staggerItem}>
                <StatusChip>{t('status.acceptingProjects')}</StatusChip>
              </motion.div>
              <motion.h1
                variants={staggerItem}
                className="font-display text-[32px] leading-[1.05] tracking-[-0.025em] text-balance text-fg break-words sm:text-[44px] lg:text-[56px]"
              >
                {t('hero.title')}
              </motion.h1>
              <motion.p
                variants={staggerItem}
                className="max-w-[420px] text-[18px] leading-7 tracking-[0.015em] text-fg-muted"
              >
                {t('hero.subtitle')}
              </motion.p>
            </motion.div>
          </div>

          {/* CEO */}
          <motion.div
            variants={staggerItem}
            className={cn(cellShell, 'lg:col-span-1')}
          >
            <CeoCard />
          </motion.div>

          {/* Product */}
          <motion.div
            variants={staggerItem}
            className="col-span-3 lg:col-span-1"
          >
            <BentoCard
              name={t('services.product.title')}
              description={t('services.product.description')}
              Icon={SystemsIcon}
              href="#contact"
              cta={cardsCta}
              onCtaClick={() => handleCardCta('product')}
              background={<div aria-hidden="true" />}
              className="h-full"
            />
          </motion.div>

          {/* Advisory */}
          <motion.div
            variants={staggerItem}
            className="col-span-3 lg:col-span-2"
          >
            <BentoCard
              name={t('services.advisory.title')}
              description={t('services.advisory.description')}
              Icon={SecurityIntegrityIcon}
              href="#contact"
              cta={cardsCta}
              onCtaClick={() => handleCardCta('advisory')}
              background={<div aria-hidden="true" />}
              className="h-full"
            />
          </motion.div>

          {/* Automation */}
          <motion.div
            variants={staggerItem}
            className="col-span-3 lg:col-span-1"
          >
            <BentoCard
              name={t('services.automation.title')}
              description={t('services.automation.description')}
              Icon={ToolingIcon}
              href="#contact"
              cta={cardsCta}
              onCtaClick={() => handleCardCta('automation')}
              background={<div aria-hidden="true" />}
              className="h-full"
            />
          </motion.div>

          

          
          {/* Contact (2x2) */}
          <motion.div
            variants={staggerItem}
            id="contact"
            className={cn(
              cellShell,
              'order-last scroll-mt-32 lg:order-none lg:col-span-2 lg:row-span-2 lg:h-auto',
            )}
          >
            <ShineBorder
              borderWidth={1.5}
              duration={10}
              shineColor={['#4ade80', '#38bdf8', '#4ade80']}
            />
            <div
              className="pointer-events-none absolute -bottom-32 -right-24 h-[24rem] w-[24rem] rounded-full bg-accent/5 blur-3xl"
              aria-hidden="true"
            />
            <div className="relative z-10 flex h-full flex-col gap-4 p-6 sm:p-7">
              <div className="flex flex-col gap-2">
                <h2 className="font-display text-[26px] leading-[1.1] tracking-[-0.02em] text-fg lg:text-[30px]">
                  {t('contact.title')}
                </h2>
                <p className="max-w-[420px] text-[14px] leading-5 text-fg-muted">
                  {t('contact.subtitle')}
                </p>
              </div>
              <ContactForm />
            </div>
          </motion.div>

          {/* AI */}
          <motion.div
            variants={staggerItem}
            className="col-span-3 lg:col-span-1"
          >
            <BentoCard
              name={t('services.ai.title')}
              description={t('services.ai.description')}
              Icon={SystemOptimizationIcon}
              href="#contact"
              cta={cardsCta}
              onCtaClick={() => handleCardCta('ai')}
              background={<div aria-hidden="true" />}
              className="h-full"
            />
          </motion.div>

        </BentoGrid>
      </motion.div>
    </div>
  )
}
