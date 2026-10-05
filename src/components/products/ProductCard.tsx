import { Link } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { useLang } from '~/hooks/useLang'
import type { Product } from '~/lib/product-schema'
import { ProductChips } from './ProductChips'

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const lang = useLang()
  const { t } = useTranslation('products')

  return (
    <Link
      to="/$lang/products/$slug"
      params={{ lang, slug: product.slug }}
      className="card-shell group relative flex h-full flex-col overflow-hidden p-6 transform-gpu transition-all duration-300 hover:-translate-y-1 hover:[border-color:var(--card-line-hover)]"
    >
      <div className="flex items-start gap-4">
        <img
          src={product.icon}
          alt={`${product.name} icon`}
          className="h-16 w-16 shrink-0 rounded-2xl object-cover"
          loading="lazy"
        />
        <div className="flex min-w-0 flex-1 flex-col gap-1">
          <h3 className="font-display text-xl text-fg truncate">
            {product.name}
          </h3>
          <p className="text-[13px] leading-5 text-fg-muted line-clamp-2">
            {product.tagline[lang]}
          </p>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <ProductChips product={product} size="sm" />
      </div>

      <div className="mt-auto pt-6">
        <span className="text-[13px] font-medium text-accent transition-all group-hover:underline">
          {t('viewDetails')} →
        </span>
      </div>
    </Link>
  )
}
