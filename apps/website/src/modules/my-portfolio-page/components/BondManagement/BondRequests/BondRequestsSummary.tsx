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

  const totalLoan = Number(data?.data?.totalLoanAmount ?? 0);
  const repaymentAmount = Number(data?.data?.totalRepaymentAmount ?? 0);
  const totalDeposited = Number(data?.data?.totalDepositedCollateral ?? 0);
  const liquidatedCollateral = Number(data?.data?.totalRepaymentCollateral ?? 0);
  const totalIssued = Number(data?.data?.totalBondsSold ?? 0);
  const requestBond = Number(data?.data?.totalBondsIssued ?? 0);

  return (
    <div className="grid grid-cols-3 gap-8">
      <SummaryItem
        className="col-span-3 xl:col-span-1 bg-[#007BFF]"
        titleClassName="text-left"
        firstValue={`${nFormatter(totalLoan)} ${loanTokenLabel}`}
        secondValue={`${nFormatter(repaymentAmount)} ${loanTokenLabel}`}
      >
        <HStack align="baseline">
          <span className="text-2xl font-bold">Total loan</span>
          <span className="text-sm">/ Repayment amount</span>
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
        firstValue={nFormatter(totalIssued) + ` ISSUE${totalIssued > 1 ? 'S' : ''}`}
        secondValue={nFormatter(requestBond)}
      >
        <HStack align="baseline">
          <span className="text-2xl font-bold">Total issued</span>
          <span className="text-sm">/ Request bond</span>
        </HStack>
      </SummaryItem>
    </div>
  );
};

export default BondRequestsSummary;
