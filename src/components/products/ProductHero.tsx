import { useLang } from '~/hooks/useLang'
import type { Product } from '~/lib/product-schema'

export function ProductHero({ product }: { product: Product }) {
  const lang = useLang()

  return (
    <div className="flex flex-col gap-8">
      <img
        src={product.icon}
        alt={`${product.name} icon`}
        className="size-24 rounded-[22px] border border-line object-cover sm:size-28 sm:rounded-[26px]"
      />
      <div>
        <h1 className="text-[clamp(2.5rem,5.5vw,4rem)] font-semibold leading-[1.02] tracking-[-0.035em] text-fg">
          {product.name}
        </h1>
        <p className="mt-4 max-w-[48ch] text-[18px] leading-8 text-fg-muted">
          {product.tagline[lang]}
        </p>
      </div>
    </div>
  )
}
