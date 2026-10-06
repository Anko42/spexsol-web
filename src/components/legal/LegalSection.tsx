import type { ReactNode } from 'react'
import { cn } from '~/lib/utils'

interface LegalSectionProps {
  heading?: string
  variant?: 'plain' | 'card'
  children: ReactNode
}

export function LegalSection({
  heading,
  variant = 'plain',
  children,
}: LegalSectionProps) {
  return (
    <section className="flex w-full flex-col gap-5">
      {heading && (
        <h2 className="text-[22px] font-semibold leading-[1.25] tracking-[-0.02em] text-fg">
          {heading}
        </h2>
      )}
      <div
        className={cn(
          'flex max-w-[68ch] flex-col gap-4 text-[16px] leading-[1.75] text-fg-muted',
          variant === 'card' && 'border-l-2 border-accent pl-6',
        )}
      >
        {children}
      </div>
    </section>
  )
}
