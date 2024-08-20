import React from 'react';
import { Icons } from '@/assets/icons';
import { cn } from '@/utils/common';
import { Tooltip } from '@nextui-org/react';

import { HStack } from './Utilities';

interface PreviewRowProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string;
  value: string | number;
  labelClassName?: string;
  valueClassName?: string;
  tooltip?: React.ReactNode;
}

const PreviewRow: React.FC<PreviewRowProps> = ({
  label,
  value,
  labelClassName,
  valueClassName,
  className,
  tooltip,
  ...props
}) => {
  return (
    <HStack pos={'apart'} {...props} className={cn('', className)}>
      <div className="inline-flex items-center gap-2">
        <span className={cn(labelClassName, 'text-gray-500 text-sm')}>{label}</span>

        {tooltip ? (
          <Tooltip color="warning" content={<div>{tooltip}</div>}>
            <Icons.circleAlert rotate={180} size={16} color="#8259EF" />
          </Tooltip>
        ) : null}
      </div>

      <span className={cn(valueClassName, 'font-semibold')}>{value}</span>
    </HStack>
  );
};

export default PreviewRow;
