import { useState, type FormEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import { Textarea } from '~/components/ui/textarea'
import { contactSchema } from '~/lib/contact-schema'

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
      className="w-full rounded-lg border border-line-soft bg-surface px-12 pb-16 pt-12"
      noValidate
    >
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <Label htmlFor="name">{t('contact.fullName')}</Label>
          <Input
            id="name"
            name="name"
            placeholder={t('contact.fullNamePlaceholder')}
            autoComplete="name"
          />
          {errors.name && <p className="text-xs text-red-400">{errors.name}</p>}
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
          {errors.email && (
            <p className="text-xs text-red-400">{errors.email}</p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="message">{t('contact.brief')}</Label>
          <Textarea
            id="message"
            name="message"
            placeholder={t('contact.briefPlaceholder')}
          />
          {errors.message && (
            <p className="text-xs text-red-400">{errors.message}</p>
          )}
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

        <Button type="submit" disabled={status.kind === 'submitting'} className="w-full">
          {status.kind === 'submitting' ? t('contact.submitting') : t('contact.submit')}
        </Button>

        {status.kind === 'success' && (
          <p className="text-sm text-success-fg">{t('contact.success')}</p>
        )}
        {status.kind === 'error' && (
          <p className="text-sm text-red-400">{status.message}</p>
        )}
      </div>
    </form>
  )
}
