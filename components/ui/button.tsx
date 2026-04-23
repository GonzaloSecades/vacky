import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  "focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive inline-flex shrink-0 items-center justify-center gap-2 rounded-full text-sm font-semibold whitespace-nowrap transition-[background-color,border-color,color,box-shadow,transform] outline-none focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default:
          'bg-primary text-primary-foreground shadow-[0_12px_28px_rgba(255,90,95,0.28)] hover:-translate-y-px hover:bg-[var(--primary-strong)] hover:shadow-[0_18px_34px_rgba(255,90,95,0.3)]',
        destructive:
          'bg-destructive hover:bg-destructive/90 text-white shadow-[0_12px_28px_rgba(185,56,45,0.24)] hover:-translate-y-px',
        outline:
          'border-border bg-card text-foreground hover:border-primary/20 hover:bg-accent hover:text-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 shadow-[0_10px_22px_rgba(31,31,31,0.06)] hover:-translate-y-px',
        secondary:
          'bg-secondary text-secondary-foreground shadow-[inset_0_1px_0_rgba(255,255,255,0.9)] hover:-translate-y-px hover:bg-white',
        ghost:
          'text-foreground hover:bg-accent hover:text-foreground dark:hover:bg-accent/50',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-11 px-5 py-2.5 has-[>svg]:px-4',
        sm: 'h-9 gap-1.5 px-3.5 has-[>svg]:px-3',
        lg: 'h-12 px-6 has-[>svg]:px-5',
        icon: 'size-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : 'button';

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
