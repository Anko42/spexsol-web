import { createFileRoute } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { ContactCard } from '~/components/products/ContactCard'
import { ProductCard } from '~/components/products/ProductCard'
import { PageHeader } from '~/components/site/PageHeader'
import { products } from '~/data/products'

export const Route = createFileRoute('/$lang/products/')({
  component: ProductsIndex,
})

function ProductsIndex() {
  const { t } = useTranslation('products')

  return (
    <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
      <PageHeader
        title={t('pageTitle')}
        subtitle={t('pageSubtitle')}
      />

      {products.length > 0 ? (
        <ul>
          {products.map((product) => (
            <li key={product.slug}>
              <ProductCard product={product} />
            </li>
          ))}
        </ul>
      ) : (
        <div className="shell">
          <div className="core p-6 sm:p-8">
            <p className="text-[17px] leading-7 text-fg">{t('empty')}</p>
          </div>
        </div>
      )}

      <div className="mt-16">
        <ContactCard />
      </div>
    </div>
  )
}
