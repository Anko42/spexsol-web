import { createFileRoute } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { BentoGrid, BentoCard } from '~/components/site/BentoGrid'
import { StatusChip } from '~/components/site/StatusChip'
import { ContactForm } from '~/components/site/ContactForm'
import { SystemsIcon } from '~/components/icons/SystemsIcon'
import { ToolingIcon } from '~/components/icons/ToolingIcon'
import { cn } from '~/lib/utils'

export const Route = createFileRoute('/$lang/')({
  component: Home,
})

const cellShell =
  'group relative col-span-3 flex flex-col justify-between overflow-hidden rounded-xl bg-card transform-gpu [box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] [border:1px_solid_rgba(255,255,255,.1)]'

function Home() {
  const { t } = useTranslation('home')
  return (
    <div className="mx-auto w-full max-w-6xl px-6 pb-24 pt-32">
      <BentoGrid>
        {/* Hero */}
        <div className={cn(cellShell, 'lg:col-span-2 lg:row-span-1')}>
          <div
            className="pointer-events-none absolute -top-24 -left-24 h-[28rem] w-[28rem] rounded-full bg-accent/10 blur-3xl"
            aria-hidden="true"
          />
          <div className="relative z-10 flex h-full flex-col justify-center gap-4 p-8">
            <h1 className="font-display text-[44px] leading-[1.05] tracking-[-0.025em] text-fg lg:text-[56px]">
              {t('hero.title')}
            </h1>
            <p className="max-w-[420px] text-[18px] leading-7 tracking-[0.015em] text-fg-muted">
              {t('hero.subtitle')}
            </p>
          </div>
        </div>

        {/* Status */}
        <div className={cn(cellShell, 'lg:col-span-1')}>
          <div className="relative z-10 flex h-full flex-col items-start justify-center p-8">
            <StatusChip>{t('status.acceptingProjects')}</StatusChip>
          </div>
        </div>

        {/* Systems */}
        <BentoCard
          name={t('services.systems.title')}
          description={t('services.systems.description')}
          Icon={SystemsIcon}
          href="#contact"
          cta="Learn more"
          background={<div aria-hidden="true" />}
          className="lg:col-span-1"
        />

        {/* Contact (2x2) */}
        <div
          id="contact"
          className={cn(
            cellShell,
            'scroll-mt-32 lg:col-span-2 lg:row-span-2 lg:h-auto lg:min-h-[44rem]',
          )}
        >
          <div
            className="pointer-events-none absolute -bottom-32 -right-24 h-[24rem] w-[24rem] rounded-full bg-accent/5 blur-3xl"
            aria-hidden="true"
          />
          <div className="relative z-10 flex h-full flex-col gap-5 p-8">
            <div className="flex flex-col gap-2">
              <h2 className="font-display text-[28px] leading-[1.1] tracking-[-0.02em] text-fg lg:text-[32px]">
                {t('contact.title')}
              </h2>
              <p className="max-w-[420px] text-[15px] leading-6 text-fg-muted">
                {t('contact.subtitle')}
              </p>
            </div>
            <ContactForm />
          </div>
        </div>

        {/* Tooling */}
        <BentoCard
          name={t('services.tooling.title')}
          description={t('services.tooling.description')}
          Icon={ToolingIcon}
          href="#contact"
          cta="Learn more"
          background={<div aria-hidden="true" />}
          className="lg:col-span-1"
        />
      </BentoGrid>
    </div>
  )
}
