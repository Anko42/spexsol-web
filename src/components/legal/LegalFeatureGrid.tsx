import type { ReactNode } from 'react'

export interface LegalFeatureGridItem {
  icon: ReactNode
  heading: string
  description: string
}

interface LegalFeatureGridProps {
  items: ReadonlyArray<LegalFeatureGridItem>
}

export function LegalFeatureGrid({ items }: LegalFeatureGridProps) {
  return (
    <div className="grid grid-cols-1 gap-4 py-4 sm:grid-cols-2">
      {items.map((item, idx) => (
        <div
          key={idx}
          className="flex flex-col gap-2 rounded-lg border border-line-soft bg-surface p-6"
        >
          <div className="h-5">{item.icon}</div>
          <h3 className="font-display text-[14px] leading-5 text-fg/90">
            {item.heading}
          </h3>
          <p className="text-[12px] leading-[1.625] text-fg-muted">
            {item.description}
          </p>
        </div>
      ))}
    </div>
  )
}
