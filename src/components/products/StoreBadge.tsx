import { useTranslation } from 'react-i18next'
import type { ProductLink } from '~/lib/product-schema'

interface StoreBadgeProps {
  link: ProductLink
}

export function StoreBadge({ link }: StoreBadgeProps) {
  const { t } = useTranslation('products')
  const label = t(`links.${link.type}`)

  if (link.type === 'appStore') {
    return (
      <a
        href={link.url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={label}
        className="inline-block transition-transform hover:-translate-y-0.5"
      >
        <img
          src="/store-badges/Download_on_the_App_Store_Badge_US-UK_RGB_blk_092917.svg"
          alt={label}
          className="block h-12 w-auto dark:hidden"
        />
        <img
          src="/store-badges/Download_on_the_App_Store_Badge_US-UK_RGB_wht_092917.svg"
          alt={label}
          className="hidden h-12 w-auto dark:block"
        />
      </a>
    )
  }

  if (link.type === 'playStore') {
    return (
      <a
        href={link.url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={label}
        className="inline-block transition-transform hover:-translate-y-0.5"
      >
        <img
          src="/store-badges/badge-example-preferred_2x.png"
          alt={label}
          className="block h-12 w-auto dark:hidden"
        />
        <img
          src="/store-badges/badge-example-alternate_2x.png"
          alt={label}
          className="hidden h-12 w-auto dark:block"
        />
      </a>
    )
  }

  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="inline-flex h-12 items-center gap-2 rounded-xl bg-accent/10 px-5 text-accent transition-all hover:-translate-y-0.5 hover:bg-accent/20 [border:1px_solid_rgba(74,222,128,.3)]"
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        className="h-5 w-5"
      >
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
      </svg>
      <span className="font-display text-[15px]">{label}</span>
    </a>
  )
}
