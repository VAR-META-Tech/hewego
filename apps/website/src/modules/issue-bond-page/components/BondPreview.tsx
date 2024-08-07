import React from 'react';
import { useFormContext } from 'react-hook-form';

import BondCard from '@/components/BondCard';
import { HStack } from '@/components/Utilities';

import { IssueBondFormType } from '../types/schema';

const BondPreview = () => {
  const { watch } = useFormContext<IssueBondFormType>();

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
      <BondCard
        name={name}
        loanToken={loanToken}
        volumeBond={String(volumeBond || '')}
        durationBond={durationBond}
        borrowInterestRate={String(borrowInterestRate || '')}
        collateralToken={collateralToken}
        maturityDate={matuityDate}
        className="w-96"
      />
    </HStack>
  );
};

export default BondPreview;
