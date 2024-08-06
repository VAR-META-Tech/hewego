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
      className="flex flex-1 gap-2 rounded-lg bg-primary-900 p-0.5 shadow-[0rem_0rem_1.25rem_.125rem_rgba(185_185_185_0.25)] md:flex-none overflow-x-auto md:overflow-hidden"
      {...props}
    >
      {data.map((tabItem) => (
        <button
          key={tabItem.value}
          onClick={() => onChange(tabItem.value)}
          className={cn(
            'relative z-0 py-2 text-nowrap text-primary-900 flex min-w-[8rem] flex-1 items-center justify-center shadow-[0px_0px_20px_2px_rgba(185_185_185_0.25)] transition-all',
            {
              'text-white': value !== tabItem.value,
            }
          )}
        >
          {tabItem.label}

          {value === tabItem.value && (
            <motion.div layoutId={layoutId} className="absolute z-[-1] h-full w-full rounded-md bg-white" />
          )}
        </button>
      ))}
    </div>
  );
};

export default Tabs;
