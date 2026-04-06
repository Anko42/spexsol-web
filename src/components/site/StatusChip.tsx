import type { ReactNode } from 'react'

interface StatusChipProps {
  children: ReactNode
}

export function StatusChip({ children }: StatusChipProps) {
  return (
    <span className="inline-flex items-center gap-2 rounded-xl bg-success-bg px-3 py-1">
      <span className="size-1.5 rounded-full bg-success" aria-hidden="true" />
      <span className="text-[10px] font-medium uppercase tracking-[0.1em] text-success-fg">
        {children}
      </span>
    </span>
  )
}
