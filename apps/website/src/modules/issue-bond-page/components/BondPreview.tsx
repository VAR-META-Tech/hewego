import React from 'react';
import { useFormContext } from 'react-hook-form';

import { useGetMetaToken } from '@/hooks/useGetMetaToken';
import BondCard from '@/components/BondCard';

import { IssueBondFormType } from '../types/schema';

const BondPreview = () => {
  const { watch } = useFormContext<IssueBondFormType>();
  const { getCollateralTokenLabel, getLoanTokenLabel } = useGetMetaToken();

  const [
    name,
    loanToken,
    volumeBond,
    durationBond,
    borrowInterestRate,
    collateralToken,
    maturityDate,
    totalRepaymentAmount,
    issuanceDate,
    lenderInterestRate,
    minimumCollateralAmount,
  ] = watch([
    'name',
    'loanToken',
    'volumeBond',
    'durationBond',
    'borrowInterestRate',
    'collateralToken',
    'maturityDate',
    'totalRepaymentAmount',
    'issuanceDate',
    'lenderInterestRate',
    'minimumCollateralAmount',
  ]);

  const loanTokenLabel = React.useMemo(() => {
    return getLoanTokenLabel(loanToken);
  }, [getLoanTokenLabel, loanToken]);

  const collateralTokenLabel = React.useMemo(() => {
    return getCollateralTokenLabel(collateralToken);
  }, [getCollateralTokenLabel, collateralToken]);

  return (
    <BondCard
      name={name}
      loanToken={loanTokenLabel || ''}
      volumeBond={String(volumeBond || '')}
      durationBond={durationBond}
      borrowInterestRate={String(borrowInterestRate ?? 0)}
      lenderInterestRate={String(lenderInterestRate ?? 0)}
      collateralToken={collateralTokenLabel || ''}
      maturityDate={maturityDate}
      issuanceDate={issuanceDate}
      className="w-96"
      totalRepaymentAmount={totalRepaymentAmount}
      minimumCollateralAmount={minimumCollateralAmount ?? 0}
    />
  );
};

export default BondPreview;
