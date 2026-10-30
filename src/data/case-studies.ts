export type CaseStudyStatus = 'concept'

export interface CaseStudy {
  /** URL slug and i18n key under the `caseStudies` namespace. */
  slug: string
  status: CaseStudyStatus
}

// Concepts and case studies. Copy lives in src/i18n/locales/*/caseStudies.json under the slug.
export const caseStudies: CaseStudy[] = [
  { slug: 'fieldflow', status: 'concept' },
  { slug: 'invoiceflow', status: 'concept' },
  { slug: 'quoteflow', status: 'concept' },
  { slug: 'shiftflow', status: 'concept' },
  { slug: 'stockflow', status: 'concept' },
  { slug: 'fixflow', status: 'concept' },
]

export const getCaseStudyBySlug = (slug: string): CaseStudy | undefined =>
  caseStudies.find((c) => c.slug === slug)
