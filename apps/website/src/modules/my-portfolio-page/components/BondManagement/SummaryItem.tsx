import React from 'react';
import { FCC } from '@/types';
import { cn } from '@/utils/common';

import { VStack } from '@/components/Utilities';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  titleClassName?: string;
  firstValue: string;
  secondValue: string;
  isShowDivider?: boolean;
}

const SummaryItem: FCC<Props> = ({
  children,
  title,
  firstValue,
  secondValue,
  titleClassName,
  isShowDivider = true,
  ...props
}) => {
  const titleElement = children || title;

  return (
    <VStack
      {...props}
      align={'center'}
      justify={'between'}
      className={cn('bg-primary-700 py-5 px-10 rounded-md text-white uppercase', props.className)}
    >
      <span className={cn('text-xl font-semibold', titleClassName)}>{titleElement}</span>

      <VStack justify={'center'} className="w-fit" spacing={4}>
        <span className="text-center text-2xl font-semibold">{firstValue}</span>
        {isShowDivider && <span className="bg-border w-full h-[1px]" />}
        <span className="text-center text-2xl font-semibold">{secondValue}</span>
      </VStack>
    </VStack>
  );
};

export default React.memo(SummaryItem);
