interface NumberedListProps {
  items: ReadonlyArray<{ number: string; text: string }>
}

export function NumberedList({ items }: NumberedListProps) {
  return (
    <ul className="flex flex-col gap-3 border-l border-line pl-[9px]">
      {items.map((item) => (
        <li key={item.number} className="flex items-start gap-4">
          <span className="pt-1 font-mono text-[12px] leading-4 tracking-[0.01em] text-success">
            {item.number}
          </span>
          <span className="flex-1 text-[16px] leading-[1.8] tracking-[0.01em] text-fg-muted">
            {item.text}
          </span>
        </li>
      ))}
    </ul>
  )
}
