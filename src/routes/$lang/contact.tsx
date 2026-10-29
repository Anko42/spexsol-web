import { pageHead } from '~/utils/seo'
import { createFileRoute } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { ContactSection } from '~/components/site/ContactSection'
import { PageHeader } from '~/components/site/PageHeader'

export const Route = createFileRoute('/$lang/contact')({
  head: ({ params }) =>
    pageHead(params.lang, '/contact', {
      title: 'contact:meta.title',
      description: 'contact:meta.description',
    }),
  component: ContactPage,
})

function ContactPage() {
  const { t } = useTranslation('contact')

  return (
    <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
      <PageHeader title={t('pageTitle')} subtitle={t('pageSubtitle')} />
      <ContactSection showTitle={false} />
    </div>
  )
}
