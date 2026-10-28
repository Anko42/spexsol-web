import { useTranslation } from 'react-i18next'
import { useGoogleAnalytics } from 'tanstack-router-ga4'
import { selectContactTopic, type ContactTopic } from '~/lib/contact-schema'

const PERSONAS: Array<{ key: string; topic: ContactTopic }> = [
  { key: 'owners', topic: 'automation' },
  { key: 'founders', topic: 'product' },
  { key: 'teams', topic: 'advisory' },
]

/** Question-led pain cards. Each one preselects a contact topic. */
export function Personas() {
  const { t } = useTranslation('home')
  const ga = useGoogleAnalytics()
  return (
    <ul className="grid grid-cols-1 gap-4 md:grid-cols-3">
      {PERSONAS.map(({ key, topic }) => (
        <li key={key} className="shell">
          <div className="core flex h-full flex-col p-6">
            <p className="eyebrow">{t(`personas.${key}.title`)}</p>
            <h3 className="mt-3 text-[20px] font-semibold leading-7 tracking-[-0.02em] text-fg">
              {t(`personas.${key}.question`)}
            </h3>
            <p className="mt-3 flex-1 text-[15px] leading-6 text-fg-muted">
              {t(`personas.${key}.body`)}
            </p>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault()
                ga.event('select_content', { content_type: 'persona_card', item_id: key })
                selectContactTopic(topic)
              }}
              className="link-underline mt-5 self-start text-[15px] font-medium text-fg"
            >
              {t('personas.cta')} <span aria-hidden="true">→</span>
            </a>
          </div>
        </li>
      ))}
    </ul>
  )
}
