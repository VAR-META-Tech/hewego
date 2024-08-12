import React from 'react';
import Image from 'next/image';
import { DATE_FORMAT, TOKEN_UNIT } from '@/utils/constants';
import { format } from 'date-fns';
import { formatUnits } from 'viem';

import { useGetMetaToken } from '@/hooks/useGetMetaToken';
import PreviewRow from '@/components/PreviewRow';
import { HStack, VStack } from '@/components/Utilities';

import { useGetBondDetail } from '../hooks/useGetDetailBond';

const BondDetail = () => {
  const { bond, maxBondValue } = useGetBondDetail();
  const { getCollateralTokenLabel, getLoanTokenLabel } = useGetMetaToken();

  const loanTokenLabel = React.useMemo(() => {
    if (!bond) return '';

    return getLoanTokenLabel(bond?.loanToken);
  }, [bond, getLoanTokenLabel]);

  const collateralTokenLabel = React.useMemo(() => {
    if (!bond || !bond?.collateralToken) return '';

    return getCollateralTokenLabel(bond?.collateralToken);
  }, [bond, getCollateralTokenLabel]);

  return (
    <VStack align={'center'} className="flex-1">
      <VStack className="shadow-lg p-8 rounded-md w-96">
        <HStack pos={'right'} className="w-full">
          <span className="text-white bg-[#555c69] px-2 py-1 rounded-full text-sm">{`${bond?.totalSales}/${formatUnits(BigInt(maxBondValue || 0), TOKEN_UNIT)}`}</span>
        </HStack>
        <VStack align={'center'}>
          <div className="relative w-52 h-52">
            <Image src="/images/bond.webp" alt="preview" fill priority unoptimized quality={100} />
          </div>

          <span className="text-center font-bold">{bond?.bondName}</span>
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
            value={bond?.interestRate ? `${Number(bond?.interestRate).toFixed(1)}%` : ''}
          />
        </VStack>
      </VStack>
    </VStack>
  );
};

export default BondDetail;
