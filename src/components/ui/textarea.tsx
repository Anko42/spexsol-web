import * as React from 'react'
import { cn } from '~/lib/utils'

export const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => (
  <textarea
    ref={ref}
    className={cn(
      'w-full min-h-[170px] rounded-[4px] border border-line bg-input px-[17px] py-[13px] text-base leading-6 text-fg placeholder:text-fg-muted/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent disabled:cursor-not-allowed disabled:opacity-50 resize-y',
      className,
    )}
    {...props}
  />
))
Textarea.displayName = 'Textarea'
