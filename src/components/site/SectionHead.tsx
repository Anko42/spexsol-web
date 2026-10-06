interface SectionHeadProps {
  id: string
  title: string
  description?: string
}

/** Section title + optional one-line lead. Same type family as the hero. */
export function SectionHead({ id, title, description }: SectionHeadProps) {
  return (
    <div className="max-w-[40rem]">
      <h2
        id={id}
        className="text-[clamp(1.75rem,3.5vw,2.5rem)] font-semibold leading-[1.1] tracking-[-0.03em] text-fg"
      >
        {title}
      </h2>
      {description && (
        <p className="mt-3 text-[16px] leading-7 text-fg-muted sm:text-[17px]">{description}</p>
      )}
    </div>
  )
}
