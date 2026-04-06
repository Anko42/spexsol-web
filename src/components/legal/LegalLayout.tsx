import type { ReactNode } from 'react'

interface LegalLayoutProps {
  title: string
  lastUpdatedLabel: string
  lastUpdated: string
  children: ReactNode
}

export function LegalLayout({
  title,
  lastUpdatedLabel,
  lastUpdated,
  children,
}: LegalLayoutProps) {
  return (
    <article className="mx-auto w-full max-w-[800px] px-6 pt-32 pb-16">
      <header className="flex flex-col gap-4">
        <h1 className="font-display text-[48px] leading-[48px] tracking-[-0.05em] text-fg">
          {title}
        </h1>
        <div className="flex items-center gap-3">
          <span
            aria-hidden="true"
            className="block h-px w-8 bg-accent/40"
          />
          <span className="text-[12px] font-medium uppercase tracking-[0.2em] text-fg-muted">
            {lastUpdatedLabel}: {lastUpdated}
          </span>
        </div>
      </header>
      <div className="mt-20 flex flex-col gap-16">{children}</div>
    </article>
  )
}
