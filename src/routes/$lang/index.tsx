import { Link, createFileRoute } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { Hero } from '~/components/site/Hero'
import { ContactSection } from '~/components/site/ContactSection'
import { SectionHead } from '~/components/site/SectionHead'
import { ServicesShowcase } from '~/components/site/ServicesShowcase'
import { Offer } from '~/components/site/Offer'
import { Faq } from '~/components/site/Faq'
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

      <section id="offer" aria-labelledby="offer-title" className="scroll-mt-24 py-16 lg:py-24">
        <div className="mb-8 lg:mb-10">
          <SectionHead
            id="offer-title"
            title={t('offer.heading')}
            description={t('offer.lead')}
          />
        </div>
        <Offer />
      </section>

      <section aria-labelledby="faq-title" className="pb-16 lg:pb-24">
        <div className="mb-6 lg:mb-8">
          <SectionHead id="faq-title" title={t('faq.heading')} />
        </div>
        <Faq />
      </section>

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
