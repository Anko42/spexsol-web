import { useLang } from '~/hooks/useLang'
import type { Product } from '~/lib/product-schema'
import { ProductChips } from './ProductChips'
import { StoreBadge } from './StoreBadge'

interface ProductHeroProps {
  product: Product
}

export function ProductHero({ product }: ProductHeroProps) {
  const lang = useLang()

  return (
    <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:gap-8">
      <img
        src={product.icon}
        alt={`${product.name} icon`}
        className="h-28 w-28 shrink-0 rounded-3xl object-cover sm:h-32 sm:w-32"
      />
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <h1 className="font-display text-[32px] leading-[1.05] tracking-[-0.025em] text-fg sm:text-[44px]">
            {product.name}
          </h1>
          <p className="max-w-[560px] text-[18px] leading-7 text-fg-muted">
            {product.tagline[lang]}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <ProductChips product={product} size="md" />
        </div>

        {product.links.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-3">
            {product.links.map((link) => (
              <StoreBadge key={link.url} link={link} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
