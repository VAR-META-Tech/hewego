import React from 'react';
import Image from 'next/image';
import { cn } from '@/utils/common';

import PreviewRow from './PreviewRow';
import { VStack } from './Utilities';

interface Props extends Omit<React.HTMLAttributes<HTMLDivElement>, 'prefix' | 'suffix'> {
  name: string;
  maturityDate: string;
  durationBond: string;
  collateralToken: string;
  loanToken: string;
  volumeBond: string;
  borrowInterestRate: string;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
}

const BondCard: React.FC<Props> = ({
  name,
  maturityDate,
  durationBond,
  collateralToken,
  loanToken,
  volumeBond,
  borrowInterestRate,
  prefix,
  suffix,
  ...props
}) => {
  return (
    <VStack {...props} className={cn('shadow-lg p-8 rounded-md w-full', props.className)}>
      {prefix && prefix}

      <VStack align={'center'}>
        <div className="relative w-52 h-52">
          <Image src="/images/bond.webp" alt="preview" fill priority unoptimized quality={100} />
        </div>

        <span className="text-center font-bold">{name}</span>
      </VStack>

      <VStack>
        <PreviewRow label="Maturity Date" value={maturityDate || ''} />

        <PreviewRow label="Duration" value={durationBond} />

        <PreviewRow label="Collateral" value={collateralToken} />

        <PreviewRow label="Supply/Borrow" value={loanToken} />

        <PreviewRow label="Volume" value={volumeBond} />

        <PreviewRow label="Interest Rate" value={borrowInterestRate ? `${borrowInterestRate}%` : ''} />
      </VStack>

      {suffix && suffix}
    </VStack>
  );
};

export default BondCard;
