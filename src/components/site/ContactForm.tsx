import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useState, type FormEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from '@tanstack/react-router'
import { InteractiveHoverButton } from '~/components/magicui/interactive-hover-button'
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

export function ContactForm() {
  const { t } = useTranslation('home')
  const lang = useLang()
  const [status, setStatus] = useState<Status>({ kind: 'idle' })
  const [errors, setErrors] = useState<Partial<Record<FieldError, string>>>({})
  const [topic, setTopic] = useState<ContactTopic>('product')
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
      setTopic('product')
      setPrivacyAccepted(false)
    } catch (err) {
      setStatus({
        kind: 'error',
        message: err instanceof Error ? err.message : t('contact.errorFallback'),
      })
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full" noValidate>
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="flex flex-col gap-2">
            <Label htmlFor="name">{t('contact.fullName')}</Label>
            <Input
              id="name"
              name="name"
              placeholder={t('contact.fullNamePlaceholder')}
              autoComplete="name"
            />
            <AnimatePresence>
              {errors.name && (
                <motion.p
                  key="err-name"
                  variants={fadeUp}
                  initial="hidden"
                  animate="visible"
                  exit={{ opacity: 0, y: -4 }}
                  className="text-xs text-red-400"
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
              type="email"
              placeholder={t('contact.emailPlaceholder')}
              autoComplete="email"
            />
            <AnimatePresence>
              {errors.email && (
                <motion.p
                  key="err-email"
                  variants={fadeUp}
                  initial="hidden"
                  animate="visible"
                  exit={{ opacity: 0, y: -4 }}
                  className="text-xs text-red-400"
                >
                  {errors.email}
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="flex flex-col gap-2">
            <Label htmlFor="phone">{t('contact.phone')}</Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              placeholder={t('contact.phonePlaceholder')}
              autoComplete="tel"
            />
            <AnimatePresence>
              {errors.phone && (
                <motion.p
                  key="err-phone"
                  variants={fadeUp}
                  initial="hidden"
                  animate="visible"
                  exit={{ opacity: 0, y: -4 }}
                  className="text-xs text-red-400"
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
            className="hidden flex-wrap gap-2 sm:flex"
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
                    'cursor-pointer rounded-full border px-3 py-1.5 text-sm transition-colors',
                    'focus-visible:outline-none focus-visible:border-accent focus-visible:ring-2 focus-visible:ring-accent/60 focus-visible:ring-offset-2 focus-visible:ring-offset-card',
                    selected
                      ? 'border-accent/40 bg-accent/15 text-fg'
                      : 'border-white/10 bg-card text-fg-muted hover:border-white/20 hover:text-fg',
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
              'h-10 w-full rounded-md border border-white/10 bg-card px-3 text-sm text-fg',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40',
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
            placeholder={t('contact.briefPlaceholder')}
            className="min-h-[120px]"
          />
          <AnimatePresence>
            {errors.message && (
              <motion.p
                key="err-message"
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, y: -4 }}
                className="text-xs text-red-400"
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
            className="flex items-start gap-2 text-sm text-fg-muted"
          >
            <input
              id="privacy"
              type="checkbox"
              checked={privacyAccepted}
              onChange={(e) => setPrivacyAccepted(e.target.checked)}
              className="mt-0.5 h-4 w-4 rounded border-white/20 bg-card accent-accent"
            />
            <span>
              {t('contact.privacy.labelBefore')}
              <Link
                to="/$lang/privacy-policy"
                params={{ lang }}
                className="text-accent hover:underline"
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
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, y: -4 }}
                className="text-xs text-red-400"
              >
                {errors.privacy}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        <InteractiveHoverButton
          type="submit"
          disabled={status.kind === 'submitting'}
          className="w-full"
        >
          {status.kind === 'submitting'
            ? t('contact.submitting')
            : t('contact.submit')}
        </InteractiveHoverButton>

        <AnimatePresence>
          {status.kind === 'success' && (
            <motion.p
              key="status-success"
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, y: -4 }}
              className="text-sm text-success-fg"
            >
              {t('contact.success')}
            </motion.p>
          )}
          {status.kind === 'error' && (
            <motion.p
              key="status-error"
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, y: -4 }}
              className="text-sm text-red-400"
            >
              {status.message}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </form>
  )
}
