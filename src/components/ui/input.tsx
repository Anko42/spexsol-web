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
      'w-full rounded-[4px] border border-line bg-input px-[17px] py-[15px] text-base text-fg placeholder:text-fg-muted/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent disabled:cursor-not-allowed disabled:opacity-50',
      className,
    )}
    {...props}
  />
))
Input.displayName = 'Input'
