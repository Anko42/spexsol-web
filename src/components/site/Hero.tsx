interface HeroProps {
  title: string
  subtitle: string
}

export function Hero({ title, subtitle }: HeroProps) {
  return (
    <div className="flex w-full flex-col items-center gap-4">
      <h1 className="font-display text-[48px] leading-[1] tracking-[-0.025em] text-fg text-center">
        {title}
      </h1>
      <p className="max-w-[320px] text-center text-[18px] leading-7 tracking-[0.025em] text-fg-muted">
        {subtitle}
      </p>
    </div>
  )
}
