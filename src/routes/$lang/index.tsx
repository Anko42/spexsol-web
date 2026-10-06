import { Link, createFileRoute } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { Hero } from '~/components/site/Hero'
import { ContactSection } from '~/components/site/ContactSection'
import { SectionHead } from '~/components/site/SectionHead'
import { ServicesShowcase } from '~/components/site/ServicesShowcase'
import { ProductCard } from '~/components/products/ProductCard'
import { useLang } from '~/hooks/useLang'
import { products } from '~/data/products'

export const Route = createFileRoute('/$lang/')({
  component: Home,
})

function Home() {
  const { t } = useTranslation('home')
  const lang = useLang()

  return (
    <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
      <Hero />

      <section
        id="services"
        aria-labelledby="services-title"
        className="scroll-mt-24 pb-16 pt-8 lg:pb-24"
      >
        <div className="mb-8 lg:mb-10">
          <SectionHead
            id="services-title"
            title={t('services.heading')}
            description={t('services.lead')}
          />
        </div>
        <ServicesShowcase />
      </section>

      {/* Work: shown once there is something to show */}
      {products.length > 0 && (
        <section aria-labelledby="work-title" className="py-16 lg:py-24">
          <SectionHead id="work-title" title={t('work.title')} />
          <ul className="mt-8">
            {products.map((product) => (
              <li key={product.slug}>
                <ProductCard product={product} />
              </li>
            ))}
          </ul>
          <Link
            to="/$lang/products"
            params={{ lang }}
            className="link-underline mt-8 inline-block text-[15px] font-medium text-fg"
          >
            {t('work.all')} <span aria-hidden="true">→</span>
          </Link>
        </section>
      )}

      <section
        id="contact"
        aria-labelledby="contact-title"
        className="scroll-mt-24 pb-8 pt-12 lg:pt-16"
      >
        <ContactSection />
      </section>
    </div>
  )
}
