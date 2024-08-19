import React, { ReactNode } from 'react';
import { FCC } from '@/types';
import { cn } from '@/utils/common';

import { HStack, VStack } from '@/components/Utilities';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  titleClassName?: string;
  firstValue: string;
  secondValue: string | ReactNode;
}

const SummaryItem: FCC<Props> = ({ children, title, firstValue, secondValue, titleClassName, ...props }) => {
  const titleElement = children || title;

  return (
    <VStack
      {...props}
      justify={'between'}
      className={cn('py-5 min-h-40 px-8 rounded-xl shadow-md text-white', props.className)}
    >
      <div className={cn('text-left', titleClassName)}>{titleElement}</div>

      <HStack align={'end'} spacing={16}>
        <span className="text-3xl font-bold bg-white text-primary-700 rounded-md p-1 shadow-md">{firstValue}</span>

        {!!secondValue && typeof secondValue === 'string' ? (
          <HStack>
            <span className="text-center text-base font-semibold">/</span>

            <span className="text-center text-2xl font-semibold">{secondValue}</span>
          </HStack>
        ) : (
          secondValue
        )}
      </HStack>
    </VStack>
  );
};

export default React.memo(SummaryItem);
