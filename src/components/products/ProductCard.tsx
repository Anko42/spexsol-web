import { Link } from '@tanstack/react-router'
import { useLang } from '~/hooks/useLang'
import type { Product } from '~/lib/product-schema'
import { ProductChips } from './ProductChips'

interface ProductCardProps {
  product: Product
}

/** Product as a hairline list row: icon · name + tagline · tags · arrow. */
export function ProductCard({ product }: ProductCardProps) {
  const lang = useLang()

  return (
    <Link
      to="/$lang/products/$slug"
      params={{ lang, slug: product.slug }}
      className="group grid grid-cols-[3.5rem_1fr_auto] items-center gap-4 border-t border-line py-5 transition-colors hover:bg-card/60 sm:grid-cols-[4rem_1fr_auto_auto] sm:gap-6 sm:px-2"
    >
      <img
        src={product.icon}
        alt=""
        className="size-14 rounded-[14px] border border-line object-cover sm:size-16 sm:rounded-[16px]"
        loading="lazy"
      />
      <div className="min-w-0">
        <h3 className="truncate text-[20px] font-semibold leading-tight tracking-[-0.02em] text-fg">
          {product.name}
        </h3>
        <p className="mt-1 line-clamp-2 text-[14px] leading-6 text-fg-muted">
          {product.tagline[lang]}
        </p>
      </div>
      <div className="hidden flex-wrap gap-2 sm:flex">
        <ProductChips product={product} />
      </div>
      <span
        aria-hidden="true"
        className="text-[20px] text-fg-muted transition-transform duration-200 group-hover:translate-x-1 group-hover:text-fg"
      >
        →
      </span>
    </Link>
  )
}
