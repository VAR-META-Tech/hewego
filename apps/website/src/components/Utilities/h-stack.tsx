import * as React from 'react';
import { cn } from '@/utils/common';
import { cva, type VariantProps } from 'class-variance-authority';

const hStackVariants = cva('flex flex-wrap items-center', {
  variants: {
    pos: {
      left: 'justify-start ',
      right: 'justify-end ',
      center: 'justify-center ',
      apart: 'justify-between',
      around: 'justify-around',
      evenly: 'justify-evenly',
    },
    align: {
      default: 'items-stretch',
      center: 'items-center items',
      start: 'items-start',
      end: 'items-end',
      baseline: 'items-baseline',
    },
    spacing: {
      0: 'gap-0',
      4: 'gap-1',
      8: 'gap-2',
      12: 'gap-3',
      16: 'gap-4',
      20: 'gap-5',
      24: 'gap-6',
      32: 'gap-8',
      48: 'gap-12',
    },
  },
  defaultVariants: {
    spacing: 4,
    pos: 'left',
  },
});

export interface HStackProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof hStackVariants> {
  asChild?: boolean;
  noWrap?: boolean;
}

const HStack = React.forwardRef<HTMLDivElement, HStackProps>(
  ({ className, noWrap, pos, align, spacing, children, ...props }, ref) => {
    return (
      <div
        className={cn(hStackVariants({ spacing, align, className, pos }), { 'flex-nowrap': noWrap })}
        ref={ref}
        {...props}
      >
        {children}
      </div>
    );
  }
);

HStack.displayName = 'HStack';

export { HStack, hStackVariants };
