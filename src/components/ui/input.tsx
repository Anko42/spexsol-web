import * as React from 'react'
import { cn } from '~/lib/utils'

export const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, type = 'text', ...props }, ref) => (
  <input
    ref={ref}
    type={type}
    className={cn(
      'h-12 w-full rounded-field border-0 bg-input px-4 text-base text-fg shadow-[inset_0_0_0_1px_var(--line-soft)] transition-[box-shadow,background-color] duration-200 placeholder:text-fg-muted/60 hover:shadow-[inset_0_0_0_1px_var(--line)] focus-visible:bg-surface focus-visible:shadow-[inset_0_0_0_1px_var(--accent),0_0_0_4px_color-mix(in_srgb,var(--accent)_15%,transparent)] focus-visible:outline-none aria-invalid:shadow-[inset_0_0_0_1px_var(--danger)] disabled:cursor-not-allowed disabled:opacity-50',
      className,
    )}
    {...props}
  />
))
Input.displayName = 'Input'
