import * as React from 'react'
import { cn } from '~/lib/utils'

export const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => (
  <textarea
    ref={ref}
    className={cn(
      'min-h-[150px] resize-y py-3 leading-6 w-full rounded-field border-0 bg-input px-4 text-base text-fg shadow-[inset_0_0_0_1px_var(--line-soft)] transition-[box-shadow,background-color] duration-200 placeholder:text-fg-muted/60 hover:shadow-[inset_0_0_0_1px_var(--line)] focus-visible:bg-surface focus-visible:shadow-[inset_0_0_0_1px_var(--accent),0_0_0_4px_color-mix(in_srgb,var(--accent)_15%,transparent)] focus-visible:outline-none aria-invalid:shadow-[inset_0_0_0_1px_var(--danger)] disabled:cursor-not-allowed disabled:opacity-50',
      className,
    )}
    {...props}
  />
))
Textarea.displayName = 'Textarea'
