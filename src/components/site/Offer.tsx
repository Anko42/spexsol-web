import { useTranslation } from 'react-i18next'
import { useGoogleAnalytics } from 'tanstack-router-ga4'
import { Button, ButtonArrow } from '~/components/ui/button'
import { selectContactTopic, type ContactTopic } from '~/lib/contact-schema'

const PLANS: Array<{ key: string; topic: ContactTopic }> = [
  { key: 'fixed', topic: 'product' },
  { key: 'monthly', topic: 'retainer' },
]

/** Two engagement models, fixed first (bounded work is what we sell first). No prices. */
export function Offer() {
  const { t } = useTranslation('home')
  const ga = useGoogleAnalytics()
  return (
    <div className="well grid grid-cols-1 gap-2 !rounded-[22px] p-2 md:grid-cols-2">
      {PLANS.map(({ key, topic }) => (
        <div
          key={key}
          className="flex flex-col rounded-[16px] bg-surface p-6 shadow-[0_0_0_1px_var(--line-soft)] sm:p-8"
        >
          <p className="eyebrow">{t(`offer.${key}.tag`)}</p>
          <h3 className="mt-3 text-[24px] font-semibold leading-8 tracking-[-0.02em] text-fg">
            {t(`offer.${key}.title`)}
          </h3>
          <p className="mt-3 text-[15px] leading-6 text-fg-muted">
            {t(`offer.${key}.description`)}
          </p>
          <ul className="mt-6 flex flex-1 flex-col gap-2.5">
            {(t(`offer.${key}.points`, { returnObjects: true }) as string[]).map((p) => (
              <li key={p} className="flex gap-2.5 text-[15px] leading-6 text-fg">
                <span aria-hidden="true" className="mt-px text-[12px] text-accent">
                  ✓
                </span>
                {p}
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <Button asChild size="lg" variant={key === 'fixed' ? 'accent' : 'outline'}>
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault()
                  ga.event('select_content', { content_type: 'offer_card', item_id: key })
                  selectContactTopic(topic)
                }}
              >
                {t(`offer.${key}.cta`)}
                <ButtonArrow>↓</ButtonArrow>
              </a>
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}
