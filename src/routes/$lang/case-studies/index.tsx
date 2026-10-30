import { createFileRoute } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { CaseStudyCard } from '~/components/case-studies/CaseStudyCard'
import { PageHeader } from '~/components/site/PageHeader'
import { caseStudies } from '~/data/case-studies'
import { pageHead } from '~/utils/seo'

export const Route = createFileRoute('/$lang/case-studies/')({
  head: ({ params }) =>
    pageHead(params.lang, '/case-studies', {
      title: 'caseStudies:meta.title',
      description: 'caseStudies:meta.description',
    }),
  component: CaseStudiesIndex,
})

function CaseStudiesIndex() {
  const { t } = useTranslation('caseStudies')

  return (
    <div className="mx-auto w-full max-w-6xl px-4 pb-8 sm:px-6">
      <PageHeader title={t('pageTitle')} subtitle={t('pageSubtitle')} />
      <ul className="border-b border-line">
        {caseStudies.map((c) => (
          <li key={c.slug}>
            <CaseStudyCard caseStudy={c} />
          </li>
        ))}
      </ul>
    </div>
  )
}
