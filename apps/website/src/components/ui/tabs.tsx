import React from 'react';
import { cn } from '@/utils/common';
import { IOption } from '@/utils/common.type';
import { motion } from 'framer-motion';

interface TabsProps<T extends string | number> extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  layoutId: string;
  data: IOption<T>[];
  value: T;
  onChange: (value: T) => void;
}

const Tabs = <T extends string | number>({ layoutId, data, value, onChange, ...props }: TabsProps<T>) => {
  return (
    <div
      className="inline-flex gap-2 rounded-lg bg-gray-100 p-1 shadow-sm md:flex-none overflow-x-auto md:overflow-hidden"
      {...props}
    >
      {data.map((tabItem) => (
        <button
          key={tabItem.value}
          onClick={() => onChange(tabItem.value)}
          className={cn(
            'relative z-0 text-gray-400 py-2 px-8 text-nowrap font-semibold flex min-w-[8rem] flex-1 items-center justify-center transition-all',
            {
              'text-gray-700': value === tabItem.value,
            }
          )}
        >
          {tabItem.label}

          {value === tabItem.value && (
            <motion.div layoutId={layoutId} className="absolute z-[-1] h-full w-full shadow-md rounded-md bg-white" />
          )}
        </button>
      ))}
    </div>
  );
};

export default Tabs;
