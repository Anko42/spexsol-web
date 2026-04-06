import { AnimatePresence, motion } from 'motion/react'
import { useState, type FormEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { InteractiveHoverButton } from '~/components/magicui/interactive-hover-button'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import { Textarea } from '~/components/ui/textarea'
import { contactSchema } from '~/lib/contact-schema'
import { fadeUp } from '~/lib/motion-presets'

type Status =
  | { kind: 'idle' }
  | { kind: 'submitting' }
  | { kind: 'success' }
  | { kind: 'error'; message: string }

export function ContactForm() {
  const { t } = useTranslation('home')
  const [status, setStatus] = useState<Status>({ kind: 'idle' })
  const [errors, setErrors] = useState<
    Partial<Record<'name' | 'email' | 'message', string>>
  >({})

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const payload = {
      name: String(data.get('name') ?? ''),
      email: String(data.get('email') ?? ''),
      message: String(data.get('message') ?? ''),
      company: String(data.get('company') ?? ''),
    }

    const parsed = contactSchema.safeParse(payload)
    if (!parsed.success) {
      const fieldErrors: typeof errors = {}
      for (const issue of parsed.error.issues) {
        const key = issue.path[0]
        if (key === 'name' || key === 'email' || key === 'message') {
          fieldErrors[key] = issue.message
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
    } catch (err) {
      setStatus({
        kind: 'error',
        message: err instanceof Error ? err.message : t('contact.errorFallback'),
      })
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full"
      noValidate
    >
      <div className="flex flex-col gap-5">
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

        <div className="flex flex-col gap-2">
          <Label htmlFor="message">{t('contact.brief')}</Label>
          <Textarea
            id="message"
            name="message"
            placeholder={t('contact.briefPlaceholder')}
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
          name="company"
          tabIndex={-1}
          autoComplete="off"
          className="hidden"
          aria-hidden="true"
        />

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
