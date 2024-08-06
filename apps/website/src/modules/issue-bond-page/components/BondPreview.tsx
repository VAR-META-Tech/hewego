import React from 'react';
import Image from 'next/image';
import { useFormContext } from 'react-hook-form';

import { HStack, VStack } from '@/components/Utilities';

const BondPreview = () => {
  const { watch } = useFormContext();

  const [name, loanToken, volumeBond, durationBond, borrowInterestRate, collateralToken, matuityDate] = watch([
    'name',
    'loanToken',
    'volumeBond',
    'durationBond',
    'borrowInterestRate',
    'collateralToken',
    'matuityDate',
  ]);

  return (
    <HStack className="flex-1" align={'start'} pos={'center'}>
      <VStack className="shadow-2xl p-8 rounded-md w-96">
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
      </VStack>
    </HStack>
  );
};

export default BondPreview;

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
