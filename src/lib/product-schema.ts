import { z } from 'zod'

const localizedString = z.object({
  en: z.string(),
  sk: z.string(),
})

export type LocalizedString = z.infer<typeof localizedString>

export const productLinkSchema = z.object({
  type: z.enum(['appStore', 'playStore', 'website']),
  url: z.string().url(),
})

export type ProductLink = z.infer<typeof productLinkSchema>

export const productSchema = z.object({
  slug: z.string(),
  name: z.string(),
  tagline: localizedString,
  description: localizedString,
  category: z.string(),
  platform: z.enum(['ios', 'android', 'web', 'cross-platform']),
  icon: z.string(),
  screenshots: z.array(z.string()),
  links: z.array(productLinkSchema),
})

export type Product = z.infer<typeof productSchema>
