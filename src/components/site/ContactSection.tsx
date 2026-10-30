import { useTranslation } from 'react-i18next'
import { CeoCard } from '~/components/site/CeoCard'
import { ContactForm } from '~/components/site/ContactForm'
import { SectionHead } from '~/components/site/SectionHead'
import type { ContactTopic } from '~/lib/contact-schema'

/** Form card beside the person who answers it. Used on home, /contact and /automation-assessment. */
export function ContactSection({
  showTitle = true,
  defaultTopic,
}: {
  showTitle?: boolean
  defaultTopic?: ContactTopic
}) {
  const { t } = useTranslation('home')
  return (
    <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-6">
      <div className="lg:col-span-5">
        <div className="flex flex-col gap-8 lg:sticky lg:top-28">
          {showTitle && (
            <SectionHead
              id="contact-title"
              title={t('contact.title')}
              description={t('contact.subtitle')}
            />
          )}
          <div className="shell">
            <div className="core p-6">
              <h3 className="text-[14px] font-medium text-fg-muted">{t('studio.title')}</h3>
              <div className="mt-4">
                <CeoCard />
              </div>
              <p className="mt-5 border-t border-line-soft pt-4 text-[14px] leading-6 text-fg-muted">
                {t('studio.body')}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="shell lg:col-span-7">
        <div className="core p-6 sm:p-8">
          <ContactForm defaultTopic={defaultTopic} />
        </div>
      </div>
    </div>
  )
}
