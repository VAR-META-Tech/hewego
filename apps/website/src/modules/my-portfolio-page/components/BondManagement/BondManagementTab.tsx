import React from 'react';
import { cn } from '@/utils/common';
import { IOption } from '@/utils/common.type';
import { motion } from 'framer-motion';

interface BondManagementTabProps<T extends string | number>
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  layoutId: string;
  data: IOption<T>[];
  value: T;
  onChange: (value: T) => void;
}

const BondManagementTab = <T extends string | number>({
  layoutId,
  data,
  value,
  onChange,
  ...props
}: BondManagementTabProps<T>) => {
  return (
    <div className="inline-flex gap-2 p-0.5 md:flex-none overflow-x-auto md:overflow-hidden" {...props}>
      {data.map((tabItem) => (
        <button
          key={tabItem.value}
          onClick={() => onChange(tabItem.value)}
          className={cn(
            'relative z-0 font-bold px-8 py-2 text-nowrap text-primary-700 flex min-w-[8rem] flex-1 items-center justify-center transition-all',
            {
              'text-gray-700': value !== tabItem.value,
            }
          )}
        >
          {tabItem.label}

          {value === tabItem.value && (
            <motion.div layoutId={layoutId} className="absolute z-[-1] h-[.125rem] bottom-0 w-full bg-primary-700" />
          )}
        </button>
      ))}
    </div>
  );
};

export default BondManagementTab;
