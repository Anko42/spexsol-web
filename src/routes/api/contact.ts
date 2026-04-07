import { createFileRoute } from '@tanstack/react-router'
import { contactSchema } from '~/lib/contact-schema'
import { postContactToSlack } from '~/server/slack'

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

        try {
          await postContactToSlack(parsed.data)
        } catch (e) {
          console.error('[contact] slack delivery failed', e)
          return Response.json({ error: 'Delivery failed' }, { status: 502 })
        }

        return Response.json({ ok: true })
      },
    },
  },
})
