// TODO: wire delivery (Resend / SMTP / Formspree / DB) — see docs/context/contact-form.md
import { createFileRoute } from '@tanstack/react-router'
import { contactSchema } from '~/lib/contact-schema'

export const Route = createFileRoute('/api/contact')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let body: unknown
        try {
          body = await request.json()
        } catch {
          return Response.json({ error: 'Invalid JSON' }, { status: 400 })
        }

        const parsed = contactSchema.safeParse(body)
        if (!parsed.success) {
          return Response.json(
            { error: 'Validation failed', issues: parsed.error.flatten() },
            { status: 400 },
          )
        }

        // Stub: log and pretend to deliver
        console.info('[contact] new submission', {
          name: parsed.data.name,
          email: parsed.data.email,
          messageLength: parsed.data.message.length,
        })

        return Response.json({ ok: true })
      },
    },
  },
})
