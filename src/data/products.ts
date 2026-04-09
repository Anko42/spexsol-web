import type { Product } from '~/lib/product-schema'

export const products: Product[] = []

export const getProductBySlug = (slug: string): Product | undefined =>
  products.find((p) => p.slug === slug)
