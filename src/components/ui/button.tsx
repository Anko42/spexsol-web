import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '~/lib/utils'

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap group/btn rounded-full text-[14px] font-medium transition-[background-color,color,box-shadow,transform] duration-300 ease-spring active:scale-[0.98] cursor-pointer disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: 'bg-fg text-bg shadow-[var(--shadow-soft)] hover:bg-fg/90',
        accent:
          'bg-accent text-accent-fg shadow-[inset_0_1px_0_rgba(255,255,255,0.18),var(--shadow-soft)] hover:bg-accent/92',
        outline:
          'bg-surface text-fg shadow-[0_0_0_1px_var(--line),var(--shadow-soft)] hover:shadow-[0_0_0_1px_color-mix(in_srgb,var(--fg)_25%,transparent),var(--shadow-soft)]',
        ghost: 'text-fg hover:bg-fg/5',
        link: 'h-auto px-0 text-fg underline decoration-line underline-offset-4 hover:decoration-fg',
      },
      size: {
        default: 'h-10 px-4',
        sm: 'h-8 gap-1.5 px-3',
        lg: 'h-12 pl-6 pr-6 text-[15px] has-[[data-arrow]]:pr-1.5',
        icon: 'size-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : 'button'

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

/** Trailing icon nested in its own circle. The circle stays put; only the
 *  glyph nudges, in the direction it points. */
function ButtonArrow({ children = '→' }: { children?: React.ReactNode }) {
  const down = children === '↓'
  return (
    <span
      data-arrow
      aria-hidden="true"
      className="ml-2 inline-flex size-9 items-center justify-center overflow-hidden rounded-full bg-current/10"
    >
      <span
        className={cn(
          'text-[15px] leading-none transition-transform duration-200 ease-spring',
          down ? 'group-hover/btn:translate-y-0.5' : 'group-hover/btn:translate-x-0.5',
        )}
      >
        {children}
      </span>
    </span>
  )
}

export { Button, ButtonArrow, buttonVariants }
