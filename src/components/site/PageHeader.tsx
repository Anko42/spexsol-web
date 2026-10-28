import { motion } from 'motion/react'
import type { ReactNode } from 'react'
import { staggerContainer, staggerItem } from '~/lib/motion-presets'

interface PageHeaderProps {
  eyebrow?: string
  title: string
  subtitle?: ReactNode
  children?: ReactNode
}

export function PageHeader({ eyebrow, title, subtitle, children }: PageHeaderProps) {
  return (
    <motion.header
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
      className="pb-12 pt-28 sm:pt-36"
    >
      {eyebrow && (
        <motion.p variants={staggerItem} className="eyebrow mb-2">
          {eyebrow}
        </motion.p>
      )}
      <motion.h1
        variants={staggerItem}
        className="mt-4 max-w-[18ch] text-[clamp(2.5rem,5.5vw,4rem)] font-semibold leading-[1.02] tracking-[-0.035em] text-fg"
      >
        {title}
      </motion.h1>
      {subtitle && (
        <motion.p
          variants={staggerItem}
          className="mt-5 max-w-[52ch] text-[17px] leading-7 text-fg-muted sm:text-[18px] sm:leading-8"
        >
          {subtitle}
        </motion.p>
      )}
      {children}
    </motion.header>
  )
}
