import { pageHead } from '~/utils/seo'
import { createFileRoute } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { ContactSection } from '~/components/site/ContactSection'
import { PageHeader } from '~/components/site/PageHeader'

export const Route = createFileRoute('/$lang/automation-assessment')({
  head: ({ params }) =>
    pageHead(params.lang, '/automation-assessment', {
      title: 'contact:assessment.meta.title',
      description: 'contact:assessment.meta.description',
    }),
  component: AutomationAssessmentPage,
})

function AutomationAssessmentPage() {
  const { t } = useTranslation('contact')

  return (
    <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
      <PageHeader title={t('assessment.pageTitle')} subtitle={t('assessment.pageSubtitle')} />
      <ContactSection showTitle={false} defaultTopic="automation" />
    </div>
  )
}
