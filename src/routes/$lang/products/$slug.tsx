import { Link, createFileRoute, notFound } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { ProductGallery } from '~/components/products/ProductGallery'
import { ProductHero } from '~/components/products/ProductHero'
import { getProductBySlug } from '~/data/products'
import { useLang } from '~/hooks/useLang'

export const Route = createFileRoute('/$lang/products/$slug')({
  beforeLoad: ({ params }) => {
    if (!getProductBySlug(params.slug)) {
      throw notFound()
    }
  },
  component: ProductDetail,
})

function ProductDetail() {
  const { slug } = Route.useParams()
  const lang = useLang()
  const { t } = useTranslation('products')
  const product = getProductBySlug(slug)

  if (!product) return null

  const descriptionParagraphs = product.description[lang].split(/\n{2,}/)

  return (
    <div className="mx-auto w-full max-w-4xl px-4 pb-16 pt-28 sm:px-6 sm:pb-24 sm:pt-32">
      <Link
        to="/$lang/products"
        params={{ lang }}
        className="text-[13px] text-fg-muted transition-colors hover:text-fg"
      >
        ← {t('backToProducts')}
      </Link>

      <div className="mt-8">
        <ProductHero product={product} />
      </div>

      <section className="mt-12 flex flex-col gap-3">
        <h2 className="font-display text-[22px] leading-[1.2] tracking-[-0.015em] text-fg">
          {t('sections.about')}
        </h2>
        <div className="flex flex-col gap-4 text-[16px] leading-7 text-fg-muted">
          {descriptionParagraphs.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
      </section>

      {product.screenshots.length > 0 && (
        <section className="mt-12 flex flex-col gap-4">
          <h2 className="font-display text-[22px] leading-[1.2] tracking-[-0.015em] text-fg">
            {t('sections.screenshots')}
          </h2>
          <ProductGallery
            screenshots={product.screenshots}
            productName={product.name}
          />
        </section>
      )}
    </div>
  )
}
