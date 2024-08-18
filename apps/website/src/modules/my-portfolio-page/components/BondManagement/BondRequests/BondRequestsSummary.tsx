import React from 'react';
import { useGetBondRequestSummaryQuery } from '@/api/portfolio/queries';
import { HederaWalletsContext } from '@/context/HederaContext';
import { nFormatter } from '@/utils/common';

import { useGetMetaToken } from '@/hooks/useGetMetaToken';
import { VStack } from '@/components/Utilities';

import SummaryItem from '../SummaryItem';

const BondRequestsSummary = () => {
  const { isConnected } = React.useContext(HederaWalletsContext);

  const { data, refetch } = useGetBondRequestSummaryQuery({
    enabled: !!isConnected,
  });

  const { getCollateralTokenLabel, collateralTokenData } = useGetMetaToken();

  const collateralTokenLabel = React.useMemo(() => {
    if (!collateralTokenData?.length) return '';

    const loanToken = collateralTokenData[0]?.value;

    return getCollateralTokenLabel(loanToken);
  }, [collateralTokenData, getCollateralTokenLabel]);

  React.useEffect(() => {
    if (!isConnected) return;

    const refetchInterval = setInterval(() => {
      refetch();
    }, 4000);

    return () => clearInterval(refetchInterval);
  }, [isConnected, refetch]);

  return (
    <div className="grid grid-cols-3 gap-5">
      <SummaryItem
        className="col-span-3 xl:col-span-1"
        titleClassName="text-center"
        firstValue={`${nFormatter(Number(data?.data?.totalLoanAmount || 0))} ${collateralTokenLabel}`}
        secondValue={`${nFormatter(Number(data?.data?.totalRepaymentAmount || 0))} ${collateralTokenLabel}`}
      >
        <VStack align={'center'} spacing={2} className="text-base">
          <span>Total Loan</span>
          <span>Repayment Amount</span>
        </VStack>
      </SummaryItem>

      <SummaryItem
        className="col-span-3 xl:col-span-1"
        titleClassName="text-center"
        firstValue={`${nFormatter(Number(data?.data?.totalDepositedCollateral || 0))} ${collateralTokenLabel}`}
        secondValue={`${nFormatter(Number(data?.data?.totalRepaymentCollateral || 0))} ${collateralTokenLabel}`}
      >
        <VStack align={'center'} spacing={2} className="text-base">
          <span>Total Deposited</span>
          <span>Liquidated Collateral</span>
        </VStack>
      </SummaryItem>

      <SummaryItem
        className="col-span-3 xl:col-span-1"
        titleClassName="text-center"
        firstValue={nFormatter(Number(data?.data?.totalBondsSold || 0))}
        secondValue={nFormatter(Number(data?.data?.totalBondsIssued || 0))}
      >
        <VStack align={'center'} spacing={2} className="text-base">
          <span>Total issued</span>
          <span>Request bond</span>
        </VStack>
      </SummaryItem>
    </div>
  );
};

export default BondRequestsSummary;
