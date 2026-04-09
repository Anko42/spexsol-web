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
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl bg-card p-6 transform-gpu transition-all duration-300 [box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] [border:1px_solid_rgba(255,255,255,.1)] hover:-translate-y-1 hover:[border:1px_solid_rgba(255,255,255,.2)]"
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
