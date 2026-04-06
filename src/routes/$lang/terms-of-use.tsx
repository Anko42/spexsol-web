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

function TermsOfUse() {
  const { t } = useTranslation('legal')
  const lang = useLang()

  const useItems = t('terms.sections.useOfService.items', {
    returnObjects: true,
  }) as Record<string, string>
  const disclaimerParagraphs = t('terms.sections.disclaimers.paragraphs', {
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
        <NumberedList
          items={Object.entries(useItems).map(([number, text]) => ({
            number,
            text,
          }))}
        />
      </LegalSection>

      <LegalSection
        heading={t('terms.sections.intellectualProperty.heading')}
        variant="card"
      >
        <p>{t('terms.sections.intellectualProperty.body')}</p>
      </LegalSection>

      <LegalSection heading={t('terms.sections.disclaimers.heading')}>
        {disclaimerParagraphs.map((para, idx) => (
          <p key={idx}>{para}</p>
        ))}
      </LegalSection>

      <LegalSection heading={t('terms.sections.termination.heading')}>
        <p>{t('terms.sections.termination.body')}</p>
      </LegalSection>

      <LegalSection heading={t('terms.sections.changes.heading')}>
        <p>{t('terms.sections.changes.body')}</p>
      </LegalSection>

      <LegalSection heading={t('terms.sections.governingLaw.heading')}>
        <p>{t('terms.sections.governingLaw.body')}</p>
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
