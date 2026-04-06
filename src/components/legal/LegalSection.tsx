import type { ReactNode } from 'react'
import { cn } from '~/lib/utils'

interface LegalSectionProps {
  heading?: string
  variant?: 'plain' | 'card'
  topBorder?: boolean
  children: ReactNode
}

export function LegalSection({
  heading,
  variant = 'plain',
  topBorder = false,
  children,
}: LegalSectionProps) {
  return (
    <section
      className={cn(
        'flex w-full flex-col gap-6',
        topBorder && 'border-t border-line pt-8',
      )}
    >
      {heading && (
        <h2 className="font-display text-[20px] leading-7 tracking-[-0.025em] text-accent">
          {heading}
        </h2>
      )}
      <div
        className={cn(
          'flex flex-col gap-4 text-[16px] leading-[1.8] tracking-[0.01em] text-fg-muted',
          variant === 'card' &&
            'rounded-lg border border-line-soft bg-surface p-8',
        )}
      >
        {children}
      </div>
    </section>
  )
}
