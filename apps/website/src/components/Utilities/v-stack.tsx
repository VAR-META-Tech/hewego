import * as React from 'react';
import { cn } from '@/utils/common';
import { cva, type VariantProps } from 'class-variance-authority';

const vStackVariants = cva('flex flex-col', {
  variants: {
    align: {
      default: 'items-stretch',
      center: 'items-center items',
      start: 'items-start',
      end: 'items-end',
      baseline: 'items-baseline',
    },
    justify: {
      default: 'justify-start',
      center: 'justify-center',
      start: 'justify-start',
      between: 'justify-between',
      end: 'justify-end',
      evenly: 'justify-evenly',
      around: 'justify-around',
    },
    spacing: {
      0: 'gap-0',
      2: 'gap-0.5',
      4: 'gap-1',
      6: 'gap-1.5',
      8: 'gap-2',
      12: 'gap-3',
      16: 'gap-4',
      20: 'gap-5',
      24: 'gap-6',
      32: 'gap-8',
    },
  },
  defaultVariants: {
    spacing: 16,
    align: 'default',
    justify: 'default',
  },
});

export interface VStackProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof vStackVariants> {
  asChild?: boolean;
}

const VStack = React.forwardRef<HTMLDivElement, VStackProps>(
  ({ className, spacing, align, justify, children, ...props }, ref) => {
    return (
      <div className={cn(vStackVariants({ className, spacing, align, justify }))} ref={ref} {...props}>
        {children}
      </div>
    );
  }
);
VStack.displayName = 'VStack';

export { VStack, vStackVariants };
