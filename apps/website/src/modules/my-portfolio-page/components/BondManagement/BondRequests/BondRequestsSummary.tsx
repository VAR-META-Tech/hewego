import React from 'react';
import { useGetBondRequestSummaryQuery } from '@/api/portfolio/queries';
import { HederaWalletsContext } from '@/context/HederaContext';
import { nFormatter } from '@/utils/common';

import { useGetMetaToken } from '@/hooks/useGetMetaToken';
import { HStack } from '@/components/Utilities';

import SummaryItem from '../SummaryItem';

const BondRequestsSummary = () => {
  const { isConnected } = React.useContext(HederaWalletsContext);

  const { data, refetch } = useGetBondRequestSummaryQuery({
    enabled: !!isConnected,
  });

  const { getCollateralTokenLabel, collateralTokenData, borrowTokenData, getLoanTokenLabel } = useGetMetaToken();

  const collateralTokenLabel = React.useMemo(() => {
    if (!collateralTokenData?.length) return '';

    const loanToken = collateralTokenData[0]?.value;

    return getCollateralTokenLabel(loanToken);
  }, [collateralTokenData, getCollateralTokenLabel]);

  const loanTokenLabel = React.useMemo(() => {
    if (!borrowTokenData?.length) return '';

    const loanToken = borrowTokenData[0]?.value;

    return getLoanTokenLabel(loanToken);
  }, [borrowTokenData, getLoanTokenLabel]);

  React.useEffect(() => {
    if (!isConnected) return;

    const refetchInterval = setInterval(() => {
      refetch();
    }, 4000);

    return () => clearInterval(refetchInterval);
  }, [isConnected, refetch]);

  const totalDeposited = Number(data?.data?.totalDepositedCollateral ?? 0);
  const liquidatedCollateral = Number(data?.data?.totalLiquidatedAmount ?? 0);
  const totalIssuedBonds = Number(data?.data?.totalBondsIssued ?? 0);
  const totalBondIssuedValue = Number(data?.data?.totalBondIssuedValue ?? 0);
  const totalRepaymentInterestRate = Number(data?.data?.totalRepaymentInterestRate ?? 0);

  return (
    <div className="grid grid-cols-3 gap-8">
      <SummaryItem
        className="col-span-3 xl:col-span-1 bg-[#007BFF]"
        titleClassName="text-left"
        firstValue={`${nFormatter(totalIssuedBonds)}`}
        secondValue={`~ ${nFormatter(totalBondIssuedValue)} ${loanTokenLabel}`}
        isShowDivider={false}
      >
        <HStack align="baseline">
          <span className="text-2xl font-bold">Total issued bonds</span>
        </HStack>
      </SummaryItem>

      <SummaryItem
        className="col-span-3 xl:col-span-1 bg-[#32CD32]"
        titleClassName="text-center"
        firstValue={`${nFormatter(Number(totalDeposited))} ${collateralTokenLabel}`}
        secondValue={`${nFormatter(liquidatedCollateral)} ${collateralTokenLabel}`}
      >
        <HStack align="baseline">
          <span className="text-2xl font-bold">Total deposited</span>
          <span className="text-sm">/ Liquidated collateral</span>
        </HStack>
      </SummaryItem>

      <SummaryItem
        className="col-span-3 xl:col-span-1 bg-[#FFA500]"
        titleClassName="text-center"
        firstValue={`${nFormatter(totalRepaymentInterestRate)} ${loanTokenLabel}`}
        secondValue={''}
      >
        <HStack align="baseline">
          <span className="text-2xl font-bold">Total Repayment Interest Rate</span>
        </HStack>
      </SummaryItem>
    </div>
  );
};

export default BondRequestsSummary;
