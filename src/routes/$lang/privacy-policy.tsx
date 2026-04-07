import { createFileRoute } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { LegalLayout } from '~/components/legal/LegalLayout'
import { LegalSection } from '~/components/legal/LegalSection'
import { NumberedList } from '~/components/legal/NumberedList'
import { ContactLegalCTA } from '~/components/legal/ContactLegalCTA'
import { useLang } from '~/hooks/useLang'

export const Route = createFileRoute('/$lang/privacy-policy')({
  component: PrivacyPolicy,
})

function toNumberedItems(record: Record<string, string>) {
  return Object.entries(record).map(([number, text]) => ({ number, text }))
}

function PrivacyPolicy() {
  const { t } = useTranslation('legal')
  const lang = useLang()

  const collectionItems = t('privacy.sections.collection.items', {
    returnObjects: true,
  }) as Record<string, string>
  const useItems = t('privacy.sections.use.items', {
    returnObjects: true,
  }) as Record<string, string>
  const thirdPartyItems = t('privacy.sections.thirdParties.items', {
    returnObjects: true,
  }) as Record<string, string>
  const thirdPartyProviders = t('privacy.sections.thirdParties.providers', {
    returnObjects: true,
  }) as Record<string, string>
  const rightsItems = t('privacy.sections.rights.items', {
    returnObjects: true,
  }) as Record<string, string>
  const gdprLegalBases = t('privacy.sections.gdpr.legalBases', {
    returnObjects: true,
  }) as Record<string, string>
  const gdprRights = t('privacy.sections.gdpr.rights', {
    returnObjects: true,
  }) as Record<string, string>

  const subHeadingClass =
    'font-display text-[16px] font-semibold leading-6 tracking-[-0.01em] text-fg'

  return (
    <LegalLayout
      title={t('privacy.title')}
      lastUpdatedLabel={t('privacy.lastUpdatedLabel')}
      lastUpdated={t('privacy.lastUpdated')}
    >
      <LegalSection heading={t('privacy.sections.overview.heading')}>
        <p>
          {t('privacy.sections.overview.bodyBefore')}
          <span className="text-accent">
            {t('privacy.sections.overview.brand')}
          </span>
          {t('privacy.sections.overview.bodyAfter')}
        </p>
      </LegalSection>

      <LegalSection heading={t('privacy.sections.collection.heading')}>
        <p>{t('privacy.sections.collection.intro')}</p>
        <h3 className={subHeadingClass}>
          {t('privacy.sections.collection.logDataHeading')}
        </h3>
        <p>{t('privacy.sections.collection.logDataBody')}</p>
        <h3 className={subHeadingClass}>
          {t('privacy.sections.collection.personalHeading')}
        </h3>
        <p>{t('privacy.sections.collection.personalIntro')}</p>
        <NumberedList items={toNumberedItems(collectionItems)} />
        <h3 className={subHeadingClass}>
          {t('privacy.sections.collection.iosHeading')}
        </h3>
        <p>{t('privacy.sections.collection.iosBody')}</p>
      </LegalSection>

      <LegalSection heading={t('privacy.sections.legitimateReasons.heading')}>
        <p>{t('privacy.sections.legitimateReasons.body')}</p>
      </LegalSection>

      <LegalSection heading={t('privacy.sections.use.heading')}>
        <p>{t('privacy.sections.use.intro')}</p>
        <NumberedList items={toNumberedItems(useItems)} />
      </LegalSection>

      <LegalSection heading={t('privacy.sections.security.heading')}>
        <p>{t('privacy.sections.security.body')}</p>
      </LegalSection>

      <LegalSection heading={t('privacy.sections.retention.heading')}>
        <p>{t('privacy.sections.retention.body')}</p>
      </LegalSection>

      <LegalSection heading={t('privacy.sections.children.heading')}>
        <p>{t('privacy.sections.children.body')}</p>
      </LegalSection>

      <LegalSection heading={t('privacy.sections.thirdParties.heading')}>
        <p>{t('privacy.sections.thirdParties.intro')}</p>
        <NumberedList items={toNumberedItems(thirdPartyItems)} />
        <p>{t('privacy.sections.thirdParties.providersIntro')}</p>
        <NumberedList items={toNumberedItems(thirdPartyProviders)} />
        <p className="text-[14px] italic leading-5 text-fg-muted">
          {t('privacy.sections.thirdParties.providersNote')}
        </p>
      </LegalSection>

      <LegalSection heading={t('privacy.sections.cookies.heading')}>
        <p>{t('privacy.sections.cookies.body')}</p>
      </LegalSection>

      <LegalSection heading={t('privacy.sections.rights.heading')}>
        <p>{t('privacy.sections.rights.intro')}</p>
        <NumberedList items={toNumberedItems(rightsItems)} />
      </LegalSection>

      <LegalSection heading={t('privacy.sections.businessTransfers.heading')}>
        <p>{t('privacy.sections.businessTransfers.body')}</p>
      </LegalSection>

      <LegalSection heading={t('privacy.sections.limits.heading')}>
        <p>{t('privacy.sections.limits.body')}</p>
      </LegalSection>

      <LegalSection heading={t('privacy.sections.changes.heading')}>
        <p>{t('privacy.sections.changes.body')}</p>
      </LegalSection>

      <LegalSection heading={t('privacy.sections.gdpr.heading')}>
        <h3 className={subHeadingClass}>
          {t('privacy.sections.gdpr.controllerHeading')}
        </h3>
        <p>{t('privacy.sections.gdpr.controllerBody')}</p>
        <h3 className={subHeadingClass}>
          {t('privacy.sections.gdpr.legalBasesHeading')}
        </h3>
        <p>{t('privacy.sections.gdpr.legalBasesIntro')}</p>
        <NumberedList items={toNumberedItems(gdprLegalBases)} />
        <h3 className={subHeadingClass}>
          {t('privacy.sections.gdpr.transfersHeading')}
        </h3>
        <p>{t('privacy.sections.gdpr.transfersBody')}</p>
        <h3 className={subHeadingClass}>
          {t('privacy.sections.gdpr.dpoHeading')}
        </h3>
        <p>{t('privacy.sections.gdpr.dpoBody')}</p>
        <h3 className={subHeadingClass}>
          {t('privacy.sections.gdpr.rightsHeading')}
        </h3>
        <p>{t('privacy.sections.gdpr.rightsIntro')}</p>
        <NumberedList items={toNumberedItems(gdprRights)} />
      </LegalSection>

      <LegalSection heading={t('privacy.sections.ccpa.heading')}>
        <h3 className={subHeadingClass}>
          {t('privacy.sections.ccpa.dntHeading')}
        </h3>
        <p>{t('privacy.sections.ccpa.dntBody')}</p>
        <h3 className={subHeadingClass}>
          {t('privacy.sections.ccpa.noticeHeading')}
        </h3>
        <p>{t('privacy.sections.ccpa.noticeBody')}</p>
        <h3 className={subHeadingClass}>
          {t('privacy.sections.ccpa.rightsHeading')}
        </h3>
        <p>{t('privacy.sections.ccpa.rightsBody')}</p>
        <h3 className={subHeadingClass}>
          {t('privacy.sections.ccpa.shineHeading')}
        </h3>
        <p>{t('privacy.sections.ccpa.shineBody')}</p>
      </LegalSection>

      <LegalSection heading={t('privacy.sections.contact.heading')}>
        <p>{t('privacy.sections.contact.intro')}</p>
        <address className="not-italic flex flex-col gap-1 text-[16px] leading-[1.8] tracking-[0.01em] text-fg-muted">
          <span className="text-fg">
            {t('privacy.sections.contact.company')}
          </span>
          <span>{t('privacy.sections.contact.address')}</span>
          <span>{t('privacy.sections.contact.ico')}</span>
          <span>{t('privacy.sections.contact.dic')}</span>
          <span>{t('privacy.sections.contact.registry')}</span>
          <span>
            {t('privacy.sections.contact.emailLabel')}:{' '}
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
        heading={t('privacy.cta.heading')}
        subtitle={t('privacy.cta.subtitle')}
        buttonLabel={t('privacy.cta.button')}
        lang={lang}
      />
    </LegalLayout>
  )
}
