import { Link, createFileRoute, notFound } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { ConceptIllustration } from '~/components/case-studies/ConceptIllustration'
import { WorkflowSteps } from '~/components/case-studies/WorkflowSteps'
import { ContactLegalCTA } from '~/components/legal/ContactLegalCTA'
import { PageHeader } from '~/components/site/PageHeader'
import { SectionHead } from '~/components/site/SectionHead'
import { Button, ButtonArrow } from '~/components/ui/button'
import { getCaseStudyBySlug } from '~/data/case-studies'
import { useLang } from '~/hooks/useLang'
import { pageHead } from '~/utils/seo'

export const Route = createFileRoute('/$lang/case-studies/$slug')({
  beforeLoad: ({ params }) => {
    if (!getCaseStudyBySlug(params.slug)) throw notFound()
  },
  head: ({ params }) =>
    pageHead(params.lang, `/case-studies/${params.slug}`, {
      title: `caseStudies:${params.slug}.meta.title`,
      description: `caseStudies:${params.slug}.meta.description`,
    }),
  component: CaseStudyDetail,
})

function CaseStudyDetail() {
  const { slug } = Route.useParams()
  const lang = useLang()
  const { t } = useTranslation('caseStudies')
  const caseStudy = getCaseStudyBySlug(slug)
  if (!caseStudy) return null

  const k = caseStudy.slug
  const steps = t(`${k}.workflow.steps`, { returnObjects: true }) as { title: string; body: string }[]
  const valueItems = t(`${k}.value.items`, { returnObjects: true }) as string[]
  const principles = t(`${k}.principles.items`, { returnObjects: true }) as string[]
  const status = t(`status.${caseStudy.status}`)

  return (
    <div className="mx-auto w-full max-w-6xl px-4 pb-8 sm:px-6">
      <PageHeader eyebrow={t(`${k}.eyebrow`)} title={t(`${k}.title`)} subtitle={t(`${k}.intro`)}>
        <div className="mt-8 flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <Button asChild size="lg">
            <Link to="/$lang/contact" params={{ lang }}>
              {t(`${k}.cta`)}
              <ButtonArrow />
            </Link>
          </Button>
          <dl className="w-full border-b border-line lg:max-w-md">
            <Spec term={t(`${k}.spec.status`)}>
              <span className="inline-flex h-6 items-center rounded-[3px] border border-line px-2 font-mono text-[11px] uppercase tracking-[0.06em] text-fg">
                {status}
              </span>
            </Spec>
            <Spec term={t(`${k}.spec.category`)}>{t(`${k}.category`)}</Spec>
            <Spec term={t(`${k}.spec.audience`)}>{t(`${k}.spec.audienceValue`)}</Spec>
          </dl>
        </div>
      </PageHeader>

      <ConceptIllustration caption={t('conceptIllustration')} />

      <Section id="challenge" label={t('sections.challenge')} heading={t(`${k}.challenge.heading`)}>
        <Prose>{t(`${k}.challenge.body`)}</Prose>
      </Section>

      <Section id="solution" label={t('sections.solution')} heading={t(`${k}.solution.heading`)}>
        <Prose>{t(`${k}.solution.body`)}</Prose>
      </Section>

      <section aria-labelledby="workflow-title" className="mt-24">
        <SectionHead id="workflow-title" title={t('sections.workflow')} />
        <div className="mt-8">
          <WorkflowSteps steps={steps} />
        </div>
      </section>

      <Section id="value" label={t('sections.value')} heading={t(`${k}.value.heading`)}>
        <Bullets items={valueItems} />
        <p className="mt-6 max-w-[68ch] border-l-2 border-line pl-4 text-[14px] leading-6 text-fg-muted">
          {t(`${k}.value.disclaimer`)}
        </p>
      </Section>

      <Section
        id="principles"
        label={t('sections.principles')}
        heading={t(`${k}.principles.heading`)}
      >
        <Bullets items={principles} />
      </Section>

      <Section id="next" label={t('sections.nextSteps')} heading={t(`${k}.nextSteps.heading`)}>
        <Prose>{t(`${k}.nextSteps.body`)}</Prose>
      </Section>

      <div className="mt-24">
        <ContactLegalCTA
          heading={t(`${k}.closing.heading`)}
          subtitle={t(`${k}.closing.body`)}
          buttonLabel={t(`${k}.closing.cta`)}
          lang={lang}
        />
      </div>

      <Link
        to="/$lang/case-studies"
        params={{ lang }}
        className="label mt-8 inline-flex h-9 items-center gap-2 transition-colors hover:!text-fg"
      >
        <span aria-hidden="true">←</span> {t('backToList')}
      </Link>
    </div>
  )
}

function Spec({ term, children }: { term: string; children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-[7.5rem_1fr] gap-4 border-t border-line py-3">
      <dt className="label pt-0.5">{term}</dt>
      <dd className="text-[14px] leading-6 text-fg">{children}</dd>
    </div>
  )
}

function Section({
  id,
  label,
  heading,
  children,
}: {
  id: string
  label: string
  heading: string
  children: React.ReactNode
}) {
  return (
    <section aria-labelledby={`${id}-title`} className="mt-24 grid grid-cols-1 gap-6 lg:grid-cols-12">
      <p className="label lg:col-span-3">{label}</p>
      <div className="lg:col-span-8">
        <h2
          id={`${id}-title`}
          className="max-w-[24ch] text-[clamp(1.75rem,3.5vw,2.5rem)] font-semibold leading-[1.1] tracking-[-0.03em] text-fg"
        >
          {heading}
        </h2>
        <div className="mt-6">{children}</div>
      </div>
    </section>
  )
}

function Prose({ children }: { children: string }) {
  return <p className="max-w-[68ch] text-[17px] leading-8 text-fg-muted">{children}</p>
}

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="max-w-[68ch] divide-y divide-line border-y border-line">
      {items.map((item) => (
        <li key={item} className="flex gap-4 py-3 text-[16px] leading-7 text-fg">
          <span aria-hidden="true" className="mt-3 size-1.5 shrink-0 rounded-full bg-accent" />
          {item}
        </li>
      ))}
    </ul>
  )
}
