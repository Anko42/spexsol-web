import { createFileRoute } from '@tanstack/react-router'
import { motion } from 'motion/react'
import { useTranslation } from 'react-i18next'
import { ContactCard } from '~/components/products/ContactCard'
import { ProductCard } from '~/components/products/ProductCard'
import { products } from '~/data/products'
import {
  staggerContainer,
  staggerItem,
} from '~/lib/motion-presets'

export const Route = createFileRoute('/$lang/products/')({
  component: ProductsIndex,
})

const revealViewport = { once: true, amount: 0.2, margin: '0px 0px -10% 0px' }

function ProductsIndex() {
  const { t } = useTranslation('products')

  return (
    <div className="mx-auto w-full max-w-6xl px-4 pb-16 pt-28 sm:px-6 sm:pb-24 sm:pt-32">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        className="flex flex-col gap-3"
      >
        <motion.h1
          variants={staggerItem}
          className="font-display text-[32px] leading-[1.05] tracking-[-0.025em] text-fg sm:text-[44px] lg:text-[56px]"
        >
          {t('pageTitle')}
        </motion.h1>
        <motion.p
          variants={staggerItem}
          className="max-w-[560px] text-[18px] leading-7 text-fg-muted"
        >
          {t('pageSubtitle')}
        </motion.p>
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={revealViewport}
        variants={staggerContainer}
        className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
      >
        {products.length === 0 ? (
          <motion.div
            variants={staggerItem}
            className="flex min-h-56 items-center justify-center rounded-2xl border border-dashed border-fg/15 bg-fg/[0.02] px-6 py-12 text-center sm:col-span-2 lg:col-span-3"
          >
            <p className="font-display text-[24px] leading-[1.15] tracking-[-0.02em] text-fg sm:text-[32px]">
              {t('empty')}
            </p>
          </motion.div>
        ) : (
          products.map((product) => (
            <motion.div
              key={product.slug}
              variants={staggerItem}
              className="h-full"
            >
              <ProductCard product={product} />
            </motion.div>
          ))
        )}
        <motion.div
          variants={staggerItem}
          className={
            products.length === 0
              ? 'h-full sm:col-span-2 lg:col-span-3'
              : 'h-full'
          }
        >
          <ContactCard />
        </motion.div>
      </motion.div>
    </div>
  )
}
