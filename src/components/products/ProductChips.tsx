import { useTranslation } from 'react-i18next'
import { cn } from '~/lib/utils'
import type { Product } from '~/lib/product-schema'

const neutralChip = 'bg-card text-fg-muted border border-line'

const accentChip = 'bg-accent/10 text-accent border border-accent/30'

export function categoryChipClass(): string {
  return neutralChip
}

export function platformChipClass(): string {
  return accentChip
}

interface ChipProps {
  className?: string
  variant: 'sm' | 'md'
  children: React.ReactNode
}

export function Chip({ className, variant, children }: ChipProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full font-medium',
        variant === 'sm' ? 'px-2.5 py-1 text-[11px]' : 'px-3 py-1 text-[12px]',
        className,
      )}
    >
      {children}
    </span>
  )
}

interface ProductChipsProps {
  product: Product
  size?: 'sm' | 'md'
}

export function ProductChips({ product, size = 'sm' }: ProductChipsProps) {
  const { t } = useTranslation('products')
  return (
    <>
      <Chip variant={size} className={categoryChipClass()}>
        {product.category}
      </Chip>
      <Chip variant={size} className={platformChipClass()}>
        {t(`platform.${product.platform}`)}
      </Chip>
    </>
  )
}
