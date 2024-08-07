import React from 'react';
import { cn } from '@/utils/common';

import { HStack } from './Utilities';

interface PreviewRowProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string;
  value: string | number;
  labelClassName?: string;
  valueClassName?: string;
}

const PreviewRow: React.FC<PreviewRowProps> = ({
  label,
  value,
  labelClassName,
  valueClassName,
  className,
  ...props
}) => {
  return (
    <HStack pos={'apart'} {...props} className={cn('text-sm font-semibold', className)}>
      <span className={labelClassName}>{label}</span>
      <span className={valueClassName}>{value}</span>
    </HStack>
  );
};

export default PreviewRow;
