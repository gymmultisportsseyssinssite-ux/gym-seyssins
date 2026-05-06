import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { Slot } from 'radix-ui'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
  [
    'inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap',
    'rounded-md font-medium text-base',
    'transition-colors outline-none',
    'focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
    'disabled:pointer-events-none disabled:opacity-50',
    "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-5",
  ].join(' '),
  {
    variants: {
      variant: {
        // Terracotta plein — CTA principal
        primary:
          'bg-primary text-primary-foreground hover:bg-[var(--color-primary-hover)] active:scale-[0.98]',
        // Sauge en outline — actions secondaires
        secondary:
          'border-2 border-secondary bg-transparent text-secondary hover:bg-secondary hover:text-secondary-foreground active:scale-[0.98]',
        // Transparent, hover muted — tertiaire / nav
        ghost: 'bg-transparent text-foreground hover:bg-muted hover:text-foreground',
        // Lien souligné au hover
        link: 'h-auto px-0 py-0 text-primary underline-offset-4 hover:underline focus-visible:ring-offset-0',
        destructive:
          'bg-destructive text-destructive-foreground hover:bg-destructive/90 active:scale-[0.98]',
      },
      size: {
        sm: 'h-11 px-4 text-sm',
        default: 'h-12 px-6',
        lg: 'h-14 px-8 text-lg',
        icon: 'size-11',
      },
    },
    defaultVariants: {
      variant: 'primary',
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
  const Comp = asChild ? Slot.Root : 'button'

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
