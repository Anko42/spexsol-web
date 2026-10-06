import { Link, createFileRoute, notFound } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { ProductGallery } from '~/components/products/ProductGallery'
import { ProductHero } from '~/components/products/ProductHero'
import { StoreBadge } from '~/components/products/StoreBadge'
import { SectionHead } from '~/components/site/SectionHead'
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
    <div className="mx-auto w-full max-w-6xl px-4 pb-8 pt-28 sm:px-6 sm:pt-32">
      <Link
        to="/$lang/products"
        params={{ lang }}
        className="label inline-flex h-9 items-center gap-2 transition-colors hover:!text-fg"
      >
        <span aria-hidden="true">←</span> {t('backToProducts')}
      </Link>

      <div className="mt-8 grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-6">
        <div className="lg:col-span-7">
          <ProductHero product={product} />
        </div>

        <aside className="lg:col-span-4 lg:col-start-9 lg:self-end">
          <dl className="border-b border-line">
            <div className="grid grid-cols-[7.5rem_1fr] gap-4 border-t border-line py-3">
              <dt className="label pt-0.5">{t('spec.category')}</dt>
              <dd className="text-[14px] leading-6 text-fg">{product.category}</dd>
            </div>
            <div className="grid grid-cols-[7.5rem_1fr] gap-4 border-t border-line py-3">
              <dt className="label pt-0.5">{t('spec.platform')}</dt>
              <dd className="text-[14px] leading-6 text-fg">
                {t(`platform.${product.platform}`)}
              </dd>
            </div>
          </dl>
          {product.links.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-3">
              {product.links.map((link) => (
                <StoreBadge key={link.url} link={link} />
              ))}
            </div>
          )}
        </aside>
      </div>

      <section aria-labelledby="about-title" className="mt-24">
        <SectionHead id="about-title" title={t('sections.about')} />
        <div className="mt-8 flex max-w-[68ch] flex-col gap-5 text-[17px] leading-8 text-fg-muted">
          {descriptionParagraphs.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
      </section>

      {product.screenshots.length > 0 && (
        <section aria-labelledby="screens-title" className="mt-24">
          <SectionHead id="screens-title" title={t('sections.screenshots')} />
          <div className="mt-8">
            <ProductGallery screenshots={product.screenshots} productName={product.name} />
          </div>
        </section>
      )}
    </div>
  )
}
