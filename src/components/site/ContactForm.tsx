import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useState, type FormEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'
import { useGoogleAnalytics } from 'tanstack-router-ga4'
import { Link } from '@tanstack/react-router'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import { Textarea } from '~/components/ui/textarea'
import {
  CONTACT_TOPIC_EVENT,
  CONTACT_TOPICS,
  contactSchema,
  type ContactTopic,
} from '~/lib/contact-schema'
import { fadeUp } from '~/lib/motion-presets'
import { useLang } from '~/hooks/useLang'
import { cn } from '~/lib/utils'

type Status =
  | { kind: 'idle' }
  | { kind: 'submitting' }
  | { kind: 'success' }
  | { kind: 'error'; message: string }

type FieldError =
  | 'name'
  | 'email'
  | 'phone'
  | 'company'
  | 'topic'
  | 'message'
  | 'privacy'

export function ContactForm({ defaultTopic = 'product' }: { defaultTopic?: ContactTopic }) {
  const { t } = useTranslation('home')
  const lang = useLang()
  const ga = useGoogleAnalytics()
  const [status, setStatus] = useState<Status>({ kind: 'idle' })
  const [errors, setErrors] = useState<Partial<Record<FieldError, string>>>({})
  const [topic, setTopic] = useState<ContactTopic>(defaultTopic)
  const [privacyAccepted, setPrivacyAccepted] = useState(false)

  useEffect(() => {
    function onSelect(e: Event) {
      const detail = (e as CustomEvent<ContactTopic>).detail
      if (detail) setTopic(detail)
    }
    window.addEventListener(CONTACT_TOPIC_EVENT, onSelect)
    return () => window.removeEventListener(CONTACT_TOPIC_EVENT, onSelect)
  }, [])

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const payload = {
      name: String(data.get('name') ?? ''),
      email: String(data.get('email') ?? ''),
      phone: String(data.get('phone') ?? ''),
      company: String(data.get('company') ?? ''),
      topic,
      message: String(data.get('message') ?? ''),
      privacyAccepted,
      website: String(data.get('website') ?? ''),
    }

    const parsed = contactSchema.safeParse(payload)
    if (!parsed.success) {
      const fieldErrors: typeof errors = {}
      for (const issue of parsed.error.issues) {
        const key = issue.path[0]
        if (key === 'name') {
          fieldErrors.name = t('contact.errors.nameRequired')
        } else if (key === 'email') {
          fieldErrors.email = t('contact.errors.emailInvalid')
        } else if (key === 'phone') {
          fieldErrors.phone = t('contact.errors.phoneInvalid')
        } else if (key === 'message') {
          fieldErrors.message =
            issue.code === 'too_small' && payload.message.trim().length === 0
              ? t('contact.errors.messageRequired')
              : t('contact.errors.messageTooShort')
        } else if (key === 'privacyAccepted') {
          fieldErrors.privacy = t('contact.privacy.error')
        }
      }
      setErrors(fieldErrors)
      setStatus({ kind: 'idle' })
      ga.event('contact_form_validation_error', {
        topic,
        invalid_fields: Object.keys(fieldErrors).join(','),
      })
      return
    }

    setErrors({})
    setStatus({ kind: 'submitting' })
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(parsed.data),
      })
      if (!res.ok) throw new Error(`Request failed (${res.status})`)
      setStatus({ kind: 'success' })
      ;(e.target as HTMLFormElement).reset()
      setTopic(defaultTopic)
      setPrivacyAccepted(false)
      toast.success(t('contact.success'))
      ga.event('generate_lead', {
        currency: 'EUR',
        value: 0,
        topic: parsed.data.topic,
      })
      ga.event('contact_form_submit_success', { topic: parsed.data.topic })
    } catch (err) {
      const message =
        err instanceof Error ? err.message : t('contact.errorFallback')
      setStatus({ kind: 'error', message })
      toast.error(t('contact.errorFallback'), { description: message })
      ga.event('exception', {
        description: `contact_form_submit:${message}`,
        fatal: false,
      })
      ga.event('contact_form_submit_error', {
        topic: parsed.data.topic,
        error_message: message,
      })
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full" noValidate>
      <div className="flex flex-col gap-6">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div className="flex flex-col gap-2">
            <Label htmlFor="name">{t('contact.fullName')}</Label>
            <Input
              id="name"
              name="name"
              aria-invalid={errors.name ? true : undefined}
              aria-describedby={errors.name ? 'err-name' : undefined}
              placeholder={t('contact.fullNamePlaceholder')}
              autoComplete="name"
            />
            <AnimatePresence>
              {errors.name && (
                <motion.p
                  key="err-name"
                  id="err-name"
                  variants={fadeUp}
                  initial="hidden"
                  animate="visible"
                  exit={{ opacity: 0, y: -4 }}
                  className="text-[13px] text-danger"
                >
                  {errors.name}
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="email">{t('contact.email')}</Label>
            <Input
              id="email"
              name="email"
              aria-invalid={errors.email ? true : undefined}
              aria-describedby={errors.email ? 'err-email' : undefined}
              type="email"
              placeholder={t('contact.emailPlaceholder')}
              autoComplete="email"
            />
            <AnimatePresence>
              {errors.email && (
                <motion.p
                  key="err-email"
                  id="err-email"
                  variants={fadeUp}
                  initial="hidden"
                  animate="visible"
                  exit={{ opacity: 0, y: -4 }}
                  className="text-[13px] text-danger"
                >
                  {errors.email}
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div className="flex flex-col gap-2">
            <Label htmlFor="phone">{t('contact.phone')}</Label>
            <Input
              id="phone"
              name="phone"
              aria-invalid={errors.phone ? true : undefined}
              aria-describedby={errors.phone ? 'err-phone' : undefined}
              type="tel"
              placeholder={t('contact.phonePlaceholder')}
              autoComplete="tel"
            />
            <AnimatePresence>
              {errors.phone && (
                <motion.p
                  key="err-phone"
                  id="err-phone"
                  variants={fadeUp}
                  initial="hidden"
                  animate="visible"
                  exit={{ opacity: 0, y: -4 }}
                  className="text-[13px] text-danger"
                >
                  {errors.phone}
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="company">{t('contact.company')}</Label>
            <Input
              id="company"
              name="company"
              placeholder={t('contact.companyPlaceholder')}
              autoComplete="organization"
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="topic-select">{t('contact.topic')}</Label>

          {/* Pills (sm and up) */}
          <div
            role="radiogroup"
            aria-label={t('contact.topic')}
            className="well hidden w-fit max-w-full flex-wrap gap-1 !rounded-[22px] p-1 sm:flex"
          >
            {CONTACT_TOPICS.map((value) => {
              const selected = topic === value
              return (
                <button
                  key={value}
                  type="button"
                  role="radio"
                  aria-checked={selected}
                  onClick={() => setTopic(value)}
                  className={cn(
                    'h-9 cursor-pointer rounded-full px-4 text-[14px] transition-[background-color,color,box-shadow] duration-150',
                    selected
                      ? 'bg-surface font-medium text-fg shadow-[0_0_0_1px_var(--line),var(--shadow-soft)]'
                      : 'text-fg-muted hover:text-fg',
                  )}
                >
                  {t(`contact.topics.${value}`)}
                </button>
              )
            })}
          </div>

          {/* Native select (mobile) */}
          <select
            id="topic-select"
            value={topic}
            onChange={(e) => setTopic(e.target.value as ContactTopic)}
            className={cn(
              'sm:hidden',
              'h-11 w-full rounded-field border border-line bg-input px-3 text-base text-fg',
            )}
          >
            {CONTACT_TOPICS.map((value) => (
              <option key={value} value={value}>
                {t(`contact.topics.${value}`)}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="message">{t('contact.brief')}</Label>
          <Textarea
            id="message"
            name="message"
            aria-invalid={errors.message ? true : undefined}
            aria-describedby={errors.message ? 'err-message' : undefined}
            placeholder={t('contact.briefPlaceholder')}
            className="min-h-[120px]"
          />
          <AnimatePresence>
            {errors.message && (
              <motion.p
                key="err-message"
                id="err-message"
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, y: -4 }}
                className="text-[13px] text-danger"
              >
                {errors.message}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* Honeypot */}
        <input
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          className="hidden"
          aria-hidden="true"
        />

        <div className="flex flex-col gap-2">
          <label
            htmlFor="privacy"
            className="flex cursor-pointer items-start gap-3 text-[14px] leading-6 text-fg-muted"
          >
            <input
              id="privacy"
              type="checkbox"
              checked={privacyAccepted}
              onChange={(e) => setPrivacyAccepted(e.target.checked)}
              className="mt-1 size-4 shrink-0 cursor-pointer accent-[var(--accent)]"
              aria-invalid={errors.privacy ? true : undefined}
              aria-describedby={errors.privacy ? 'err-privacy' : undefined}
            />
            <span>
              {t('contact.privacy.labelBefore')}
              <Link
                to="/$lang/privacy-policy"
                params={{ lang }}
                className="text-fg underline decoration-line underline-offset-4 hover:decoration-fg"
              >
                {t('contact.privacy.linkText')}
              </Link>
              {t('contact.privacy.labelAfter')}
            </span>
          </label>
          <AnimatePresence>
            {errors.privacy && (
              <motion.p
                key="err-privacy"
                id="err-privacy"
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, y: -4 }}
                className="text-[13px] text-danger"
              >
                {errors.privacy}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6">
          <p className="label">{t('contact.replyNote')}</p>
          <Button
            type="submit"
            size="lg"
            variant="accent"
            disabled={status.kind === 'submitting'}
            aria-busy={status.kind === 'submitting'}
            className="w-full sm:w-auto"
          >
            {status.kind === 'submitting'
              ? t('contact.submitting')
              : t('contact.submit')}
            <span aria-hidden="true">→</span>
          </Button>
        </div>

      </div>
    </form>
  )
}
