import { useTranslation } from 'react-i18next'
import type { Product } from '~/lib/product-schema'

const tagClass =
  'inline-flex h-6 items-center rounded-[3px] border border-line px-2 font-mono text-[11px] uppercase tracking-[0.06em] text-fg-muted'

export function ProductChips({ product }: { product: Product }) {
  const { t } = useTranslation('products')
  return (
    <>
      <span className={tagClass}>{product.category}</span>
      <span className={tagClass}>{t(`platform.${product.platform}`)}</span>
    </>
  )
}
