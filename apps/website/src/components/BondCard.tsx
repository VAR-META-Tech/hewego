import React from 'react';
import Image from 'next/image';
import { cn } from '@/utils/common';

import { HStack, VStack } from './Utilities';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
  matuityDate: string;
  durationBond: string;
  collateralToken: string;
  loanToken: string;
  volumeBond: string;
  borrowInterestRate: string;
  status?: string;
  action?: React.ReactNode;
}

const BondCard: React.FC<Props> = ({
  name,
  matuityDate,
  durationBond,
  collateralToken,
  loanToken,
  volumeBond,
  borrowInterestRate,
  status,
  action,
  ...props
}) => {
  return (
    <VStack {...props} className={cn('shadow-lg p-8 rounded-md w-full', props.className)}>
      {status && (
        <HStack pos={'right'}>
          <span
            className={cn('text-white text-xs bg-primary-900 px-3 py-1.5 rounded-full', {
              'bg-red-500': status === 'Failed',
            })}
          >
            {status}
          </span>
        </HStack>
      )}
      <VStack align={'center'}>
        <div className="relative w-52 h-52">
          <Image src="/images/bond.webp" alt="preview" fill priority unoptimized quality={100} />
        </div>

        <span className="text-center font-bold">{name}</span>
      </VStack>

      <VStack>
        <PreviewRow label="Matuity Date" value={matuityDate || ''} />

        <PreviewRow label="Duration" value={durationBond} />

        <PreviewRow label="Collateral" value={collateralToken} />

        <PreviewRow label="Supply/Borrow" value={loanToken} />

        <PreviewRow label="Volume" value={volumeBond} />

        <PreviewRow label="Interest Rate" value={borrowInterestRate ? `${borrowInterestRate}%` : ''} />
      </VStack>

      {action && action}
    </VStack>
  );
};

export default BondCard;

interface PreviewRowProps {
  label: string;
  value: string | number;
}

export const PreviewRow: React.FC<PreviewRowProps> = ({ label, value }) => {
  return (
    <HStack pos={'apart'} className="text-sm font-semibold">
      <span>{label}</span>
      <span>{value}</span>
    </HStack>
  );
};
