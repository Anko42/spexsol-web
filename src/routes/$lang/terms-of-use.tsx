import { createFileRoute } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { LegalLayout } from '~/components/legal/LegalLayout'
import { LegalSection } from '~/components/legal/LegalSection'
import { NumberedList } from '~/components/legal/NumberedList'
import { ContactLegalCTA } from '~/components/legal/ContactLegalCTA'
import { useLang } from '~/hooks/useLang'

export const Route = createFileRoute('/$lang/terms-of-use')({
  component: TermsOfUse,
})

function toNumberedItems(record: Record<string, string>) {
  return Object.entries(record).map(([number, text]) => ({ number, text }))
}

function TermsOfUse() {
  const { t } = useTranslation('legal')
  const lang = useLang()

  const useItems = t('terms.sections.useOfService.items', {
    returnObjects: true,
  }) as Record<string, string>
  const subscriptionParagraphs = t('terms.sections.subscriptions.paragraphs', {
    returnObjects: true,
  }) as ReadonlyArray<string>
  const appleItems = t('terms.sections.appleEula.items', {
    returnObjects: true,
  }) as Record<string, string>
  const disclaimerParagraphs = t('terms.sections.disclaimers.paragraphs', {
    returnObjects: true,
  }) as ReadonlyArray<string>
  const consumerParagraphs = t('terms.sections.consumerRights.paragraphs', {
    returnObjects: true,
  }) as ReadonlyArray<string>

  return (
    <LegalLayout
      title={t('terms.title')}
      lastUpdatedLabel={t('terms.lastUpdatedLabel')}
      lastUpdated={t('terms.lastUpdated')}
    >
      <LegalSection>
        <p>{t('terms.intro')}</p>
      </LegalSection>

      <LegalSection heading={t('terms.sections.acceptance.heading')}>
        <p>{t('terms.sections.acceptance.body')}</p>
      </LegalSection>

      <LegalSection heading={t('terms.sections.useOfService.heading')}>
        <p>{t('terms.sections.useOfService.intro')}</p>
        <NumberedList items={toNumberedItems(useItems)} />
      </LegalSection>

      <LegalSection heading={t('terms.sections.accounts.heading')}>
        <p>{t('terms.sections.accounts.body')}</p>
      </LegalSection>

      <LegalSection heading={t('terms.sections.subscriptions.heading')}>
        {subscriptionParagraphs.map((para, idx) => (
          <p key={idx}>{para}</p>
        ))}
      </LegalSection>

      <LegalSection
        heading={t('terms.sections.intellectualProperty.heading')}
        variant="card"
      >
        <p>{t('terms.sections.intellectualProperty.body')}</p>
      </LegalSection>

      <LegalSection heading={t('terms.sections.appleEula.heading')}>
        <p>{t('terms.sections.appleEula.intro')}</p>
        <NumberedList items={toNumberedItems(appleItems)} />
      </LegalSection>

      <LegalSection heading={t('terms.sections.thirdParty.heading')}>
        <p>{t('terms.sections.thirdParty.body')}</p>
      </LegalSection>

      <LegalSection heading={t('terms.sections.disclaimers.heading')}>
        {disclaimerParagraphs.map((para, idx) => (
          <p key={idx}>{para}</p>
        ))}
      </LegalSection>

      <LegalSection heading={t('terms.sections.indemnification.heading')}>
        <p>{t('terms.sections.indemnification.body')}</p>
      </LegalSection>

      <LegalSection heading={t('terms.sections.termination.heading')}>
        <p>{t('terms.sections.termination.body')}</p>
      </LegalSection>

      <LegalSection heading={t('terms.sections.changes.heading')}>
        <p>{t('terms.sections.changes.body')}</p>
      </LegalSection>

      <LegalSection heading={t('terms.sections.consumerRights.heading')}>
        {consumerParagraphs.map((para, idx) => (
          <p key={idx}>{para}</p>
        ))}
      </LegalSection>

      <LegalSection heading={t('terms.sections.governingLaw.heading')}>
        <p>{t('terms.sections.governingLaw.body')}</p>
      </LegalSection>

      <LegalSection heading={t('terms.sections.general.heading')}>
        <p>{t('terms.sections.general.body')}</p>
      </LegalSection>

      <LegalSection heading={t('terms.sections.contact.heading')}>
        <p>{t('terms.sections.contact.intro')}</p>
        <address className="not-italic flex flex-col gap-1 text-[16px] leading-[1.8] tracking-[0.01em] text-fg-muted">
          <span className="text-fg">
            {t('terms.sections.contact.company')}
          </span>
          <span>{t('terms.sections.contact.address')}</span>
          <span>{t('terms.sections.contact.ico')}</span>
          <span>{t('terms.sections.contact.dic')}</span>
          <span>{t('terms.sections.contact.registry')}</span>
          <span>
            {t('terms.sections.contact.emailLabel')}:{' '}
            <a
              href="mailto:skalicky@spexsol.sk"
              className="text-accent hover:underline"
            >
              skalicky@spexsol.sk
            </a>
          </span>
        </address>
      </LegalSection>

      <ContactLegalCTA
        heading={t('terms.cta.heading')}
        subtitle={t('terms.cta.subtitle')}
        buttonLabel={t('terms.cta.button')}
        lang={lang}
      />
    </LegalLayout>
  )
}
