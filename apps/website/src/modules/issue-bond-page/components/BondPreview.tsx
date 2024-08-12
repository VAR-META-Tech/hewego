import React from 'react';
import { useFormContext } from 'react-hook-form';

import { useGetMetaToken } from '@/hooks/useGetMetaToken';
import BondCard from '@/components/BondCard';
import { HStack } from '@/components/Utilities';

import { IssueBondFormType } from '../types/schema';

const BondPreview = () => {
  const { watch } = useFormContext<IssueBondFormType>();
  const { getCollateralTokenLabel, getLoanTokenLabel } = useGetMetaToken();

  const [name, loanToken, volumeBond, durationBond, borrowInterestRate, collateralToken, matuityDate] = watch([
    'name',
    'loanToken',
    'volumeBond',
    'durationBond',
    'borrowInterestRate',
    'collateralToken',
    'matuityDate',
  ]);

  const loanTokenLabel = React.useMemo(() => {
    return getLoanTokenLabel(loanToken);
  }, [getLoanTokenLabel, loanToken]);

  const collateralTokenLabel = React.useMemo(() => {
    return getCollateralTokenLabel(collateralToken);
  }, [getCollateralTokenLabel, collateralToken]);

  return (
    <HStack className="flex-1" align={'start'} pos={'center'}>
      <BondCard
        name={name}
        loanToken={loanTokenLabel || ''}
        volumeBond={String(volumeBond || '')}
        durationBond={durationBond}
        borrowInterestRate={String(borrowInterestRate || '')}
        collateralToken={collateralTokenLabel || ''}
        maturityDate={matuityDate}
        className="w-96"
      />
    </HStack>
  );
};

export default BondPreview;
