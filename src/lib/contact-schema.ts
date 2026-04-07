import { z } from 'zod'

export const CONTACT_TOPICS = [
  'product',
  'automation',
  'ai',
  'advisory',
  'other',
] as const
export type ContactTopic = (typeof CONTACT_TOPICS)[number]

export const contactSchema = z.object({
  name: z.string().trim().min(1, 'Name is required').max(120),
  email: z.string().trim().email('Enter a valid email'),
  topic: z.enum(CONTACT_TOPICS).default('product'),
  message: z
    .string()
    .trim()
    .min(10, 'Message must be at least 10 characters')
    .max(4000),
  privacyAccepted: z.literal(true, {
    errorMap: () => ({ message: 'You must accept the privacy policy' }),
  }),
  // Honeypot — must be empty
  company: z.string().max(0).optional().or(z.literal('')),
})

export type ContactInput = z.infer<typeof contactSchema>

export const CONTACT_TOPIC_EVENT = 'contact:select-topic'

export function selectContactTopic(topic: ContactTopic) {
  if (typeof window === 'undefined') return
  window.dispatchEvent(
    new CustomEvent<ContactTopic>(CONTACT_TOPIC_EVENT, { detail: topic }),
  )
  const el = document.getElementById('contact')
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  // Focus the name field once the smooth scroll has settled.
  // preventScroll keeps the in-flight smooth scroll from snapping.
  setTimeout(() => {
    const name = document.getElementById('name') as HTMLInputElement | null
    name?.focus({ preventScroll: true })
  }, 600)
}
