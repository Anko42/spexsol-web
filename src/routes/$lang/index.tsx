import { createFileRoute } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { Hero } from '~/components/site/Hero'
import { StatusChip } from '~/components/site/StatusChip'
import { ContactForm } from '~/components/site/ContactForm'
import { ServicesBento } from '~/components/site/ServicesBento'

export const Route = createFileRoute('/$lang/')({
  component: Home,
})

function Home() {
  const { t } = useTranslation('home')
  return (
    <div className="mx-auto flex w-full max-w-[640px] flex-col items-center gap-12 px-6 pt-32">
      <Hero title={t('hero.title')} subtitle={t('hero.subtitle')} />
      <div className="pt-12">
        <StatusChip>{t('status.acceptingProjects')}</StatusChip>
      </div>
      <div id="contact" className="w-full scroll-mt-32">
        <ContactForm />
      </div>
      <ServicesBento />
    </div>
  )
}
