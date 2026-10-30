import { Link, createFileRoute } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { CaseStudyCard } from '~/components/case-studies/CaseStudyCard'
import { ValueCalculator } from '~/components/case-studies/ValueCalculator'
import { PageHeader } from '~/components/site/PageHeader'
import { Button, ButtonArrow } from '~/components/ui/button'
import { caseStudies } from '~/data/case-studies'
import { useLang } from '~/hooks/useLang'
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
  const lang = useLang()
  const { t } = useTranslation('caseStudies')

  return (
    <div className="mx-auto w-full max-w-6xl px-4 pb-8 sm:px-6">
      <PageHeader eyebrow={t('eyebrow')} title={t('pageTitle')} subtitle={t('pageSubtitle')} />
      <ul className="border-b border-line">
        {caseStudies.map((c) => (
          <li key={c.slug}>
            <CaseStudyCard caseStudy={c} />
          </li>
        ))}
      </ul>
      <ValueCalculator />
      <p className="mt-4 text-sm text-fg-muted">{t('disclosure')}</p>
      <div className="mt-10">
        <Button asChild size="lg">
          <Link to="/$lang/contact" params={{ lang }}>
            {t('indexCta')}
            <ButtonArrow />
          </Link>
        </Button>
      </div>
    </div>
  )
}
