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
    <article className="mx-auto w-full max-w-6xl px-4 pb-8 pt-28 sm:px-6 sm:pt-36">
      <header className="border-b border-line pb-10">
        <h1 className="max-w-[18ch] text-[clamp(2.25rem,5vw,3.5rem)] font-semibold leading-[1.05] tracking-[-0.035em] text-fg">
          {title}
        </h1>
        <p className="label mt-4">
          {lastUpdatedLabel}: <span className="text-fg">{lastUpdated}</span>
        </p>
      </header>
      <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 lg:gap-6">
        <div className="flex flex-col gap-14 lg:col-span-8 lg:col-start-3">
          {children}
        </div>
      </div>
    </article>
  )
}
