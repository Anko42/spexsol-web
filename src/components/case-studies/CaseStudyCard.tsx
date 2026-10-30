import { Link } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import type { CaseStudy } from '~/data/case-studies'
import { useLang } from '~/hooks/useLang'
import { ConceptMark } from './ConceptIllustration'

const tagClass =
  'inline-flex h-6 items-center rounded-[3px] border border-line px-2 font-mono text-[11px] uppercase tracking-[0.06em] text-fg-muted'

/** Case study as a hairline list row, same rhythm as ProductCard. Status chip always visible. */
export function CaseStudyCard({ caseStudy }: { caseStudy: CaseStudy }) {
  const lang = useLang()
  const { t } = useTranslation('caseStudies')
  const k = caseStudy.slug

  return (
    <Link
      to="/$lang/case-studies/$slug"
      params={{ lang, slug: caseStudy.slug }}
      className="group grid grid-cols-[3.5rem_1fr_auto] items-center gap-4 border-t border-line py-5 transition-colors hover:bg-card/60 sm:grid-cols-[4rem_1fr_auto_auto] sm:gap-6 sm:px-2"
    >
      <span
        aria-hidden="true"
        className="well flex size-14 items-center justify-center rounded-[14px] sm:size-16 sm:rounded-[16px]"
      >
        <ConceptMark className="size-7 text-fg sm:size-8" />
      </span>
      <div className="min-w-0">
        <h3 className="truncate text-[20px] font-semibold leading-tight tracking-[-0.02em] text-fg">
          {t(`${k}.name`)}
        </h3>
        <p className="mt-1 line-clamp-2 text-[14px] leading-6 text-fg-muted">{t(`${k}.tagline`)}</p>
        <span className={`${tagClass} mt-2 sm:hidden`}>{t(`status.${caseStudy.status}`)}</span>
      </div>
      <div className="hidden flex-wrap gap-2 sm:flex">
        <span className={tagClass}>{t(`status.${caseStudy.status}`)}</span>
      </div>
      <span
        aria-hidden="true"
        className="text-[20px] text-fg-muted transition-transform duration-200 group-hover:translate-x-1 group-hover:text-fg"
      >
        →
      </span>
    </Link>
  )
}
