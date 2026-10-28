import { createFileRoute } from '@tanstack/react-router'
import { Trans, useTranslation } from 'react-i18next'
import { ContactCard } from '~/components/products/ContactCard'
import { ProductCard } from '~/components/products/ProductCard'
import { PageHeader } from '~/components/site/PageHeader'
import { products } from '~/data/products'
import { collaborations } from '~/data/collaborations'
import { CollaborationList } from '~/components/products/CollaborationList'
import { SectionHead } from '~/components/site/SectionHead'

export const Route = createFileRoute('/$lang/products/')({
  component: ProductsIndex,
})

function ProductsIndex() {
  const { t } = useTranslation('products')

  return (
    <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
      <PageHeader
        title={t('pageTitle')}
        subtitle={
          <Trans
            t={t}
            i18nKey="pageSubtitle"
            components={{
              name: (
                <a
                  href={t('home:ceo.linkedin')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline text-fg"
                />
              ),
            }}
          />
        }
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

      {collaborations.length > 0 && (
        <section aria-labelledby="collab-title" className="mt-16">
          <div className="max-w-[40rem]">
            <h2
              id="collab-title"
              className="text-[clamp(1.75rem,3.5vw,2.5rem)] font-semibold leading-[1.1] tracking-[-0.03em] text-fg"
            >
              <Trans
                t={t}
                i18nKey="collab.title"
                components={{
                  name: (
                    <a
                      href={t('home:ceo.linkedin')}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-underline"
                    />
                  ),
                }}
              />
            </h2>
            <p className="mt-3 text-[16px] leading-7 text-fg-muted sm:text-[17px]">{t('collab.subtitle')}</p>
          </div>
          <div className="mt-8">
            <CollaborationList items={collaborations} />
          </div>
        </section>
      )}

      <div className="mt-16">
        <ContactCard />
      </div>
    </div>
  )
}
