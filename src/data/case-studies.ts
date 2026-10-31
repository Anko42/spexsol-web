export type CaseStudyStatus = 'concept'

export type CaseStudyGroup = 'workflow' | 'ai'

export interface CaseStudy {
  /** URL slug and i18n key under the `caseStudies` namespace. */
  slug: string
  status: CaseStudyStatus
  /** Index page section. */
  group: CaseStudyGroup
}

// Concepts and case studies. Copy lives in src/i18n/locales/*/caseStudies.json under the slug.
export const caseStudies: CaseStudy[] = [
  { slug: 'fieldflow', status: 'concept', group: 'workflow' },
  { slug: 'invoiceflow', status: 'concept', group: 'workflow' },
  { slug: 'quoteflow', status: 'concept', group: 'workflow' },
  { slug: 'shiftflow', status: 'concept', group: 'workflow' },
  { slug: 'stockflow', status: 'concept', group: 'workflow' },
  { slug: 'fixflow', status: 'concept', group: 'workflow' },
  { slug: 'sales-assistant', status: 'concept', group: 'ai' },
  { slug: 'support-assistant', status: 'concept', group: 'ai' },
  { slug: 'knowledge-assistant', status: 'concept', group: 'ai' },
  { slug: 'workflow-coordinator', status: 'concept', group: 'ai' },
]

export const getCaseStudyBySlug = (slug: string): CaseStudy | undefined =>
  caseStudies.find((c) => c.slug === slug)
