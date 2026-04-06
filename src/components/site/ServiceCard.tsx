import type { ReactNode } from 'react'

interface ServiceCardProps {
  icon: ReactNode
  title: string
  description: string
}

export function ServiceCard({ icon, title, description }: ServiceCardProps) {
  return (
    <div className="flex flex-col items-start gap-1.5 rounded-[4px] bg-card p-6">
      <div className="text-accent">{icon}</div>
      <h3 className="pt-2 font-display text-base leading-6 text-fg">
        {title}
      </h3>
      <p className="text-sm leading-[1.625] text-fg-muted">{description}</p>
    </div>
  )
}
