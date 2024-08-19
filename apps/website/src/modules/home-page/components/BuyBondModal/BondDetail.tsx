import React from 'react';
import { DATE_FORMAT } from '@/utils/constants';
import { format } from 'date-fns';

import { useGetMetaToken } from '@/hooks/useGetMetaToken';
import PreviewRow from '@/components/PreviewRow';
import { VStack } from '@/components/Utilities';

import { useGetBondDetail } from '../../hooks/useGetDetailBond';
import { SupplyProgress } from './SupplyProgress';

interface Props {
  bondId: number;
}

const BondDetail: React.FC<Props> = ({ bondId }) => {
  const { bond, refetch } = useGetBondDetail(bondId);
  const { getCollateralTokenLabel, getLoanTokenLabel } = useGetMetaToken();

  const loanTokenLabel = React.useMemo(() => {
    if (!bond) return '';

    return getLoanTokenLabel(bond?.loanToken);
  }, [bond, getLoanTokenLabel]);

  const collateralTokenLabel = React.useMemo(() => {
    if (!bond || !bond?.collateralToken) return '';

    return getCollateralTokenLabel(bond?.collateralToken);
  }, [bond, getCollateralTokenLabel]);

  React.useEffect(() => {
    refetch();

    return () => {
      refetch();
    };
  }, [refetch]);

  return (
    <VStack align={'center'} className="flex-1">
      <VStack className="shadow-lg p-8 rounded-md w-96 bg-gray-50 border">
        <VStack align={'center'}>
          <SupplyProgress progress={Number(bond?.totalSold ?? 0)} total={bond?.volumeBond ?? 0} />

          <p className="text-center font-bold">{bond?.bondName}</p>
        </VStack>

        <VStack>
          <PreviewRow label="Price" value={`100 ${loanTokenLabel}`} />

          <PreviewRow
            label="Maturity Date"
            value={
              bond?.maturityDate ? format(new Date(Number(bond?.maturityDate) * 1000), DATE_FORMAT.DD_MM_YYYY) : ''
            }
          />

          <PreviewRow label="Duration" value={bond?.loanTerm ? `${bond?.loanTerm} weeks` : ''} />

          <PreviewRow label="Collateral" value={collateralTokenLabel || ''} />

          <PreviewRow label="Supply/Borrow" value={loanTokenLabel || ''} />

          <PreviewRow
            label="Interest Rate"
            value={bond?.lenderInterestRate ? `${Number(bond?.lenderInterestRate || 0).toFixed(1)}%` : ''}
          />
        </VStack>
      </VStack>
    </VStack>
  );
};

export default BondDetail;
