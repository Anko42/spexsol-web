interface NumberedListProps {
  items: ReadonlyArray<{ number: string; text: string }>
}

export function NumberedList({ items }: NumberedListProps) {
  return (
    <ul className="flex flex-col border-t border-line-soft">
      {items.map((item) => (
        <li
          key={item.number}
          className="grid grid-cols-[2.5rem_1fr] gap-2 border-b border-line-soft py-3"
        >
          <span className="pt-1.5 font-mono text-[12px] leading-4 tabular-nums text-accent">
            {item.number}
          </span>
          <span className="text-[16px] leading-[1.75] text-fg-muted">{item.text}</span>
        </li>
      ))}
    </ul>
  )
}
