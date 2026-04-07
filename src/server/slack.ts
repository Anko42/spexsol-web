const WEBHOOK_URL = process.env.SLACK_WEBHOOK_URL

type ContactPayload = {
  name: string
  email: string
  phone?: string
  company?: string
  topic: string
  message: string
}

export async function postContactToSlack(p: ContactPayload): Promise<void> {
  if (!WEBHOOK_URL) throw new Error('SLACK_WEBHOOK_URL not set')

  const body = {
    text: `New contact: ${p.name} (${p.topic})`,
    blocks: [
      {
        type: 'header',
        text: { type: 'plain_text', text: 'New contact submission' },
      },
      {
        type: 'section',
        fields: [
          { type: 'mrkdwn', text: `*Name:*\n${p.name}` },
          { type: 'mrkdwn', text: `*Email:*\n${p.email}` },
          { type: 'mrkdwn', text: `*Phone:*\n${p.phone ?? '—'}` },
          { type: 'mrkdwn', text: `*Company:*\n${p.company ?? '—'}` },
          { type: 'mrkdwn', text: `*Topic:*\n${p.topic}` },
        ],
      },
      {
        type: 'section',
        text: { type: 'mrkdwn', text: `*Message:*\n${p.message}` },
      },
    ],
  }

  const res = await fetch(WEBHOOK_URL, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(body),
  })

  if (!res.ok) {
    const text = await res.text().catch(() => '')
    throw new Error(`Slack webhook failed: ${res.status} ${text}`)
  }
}
