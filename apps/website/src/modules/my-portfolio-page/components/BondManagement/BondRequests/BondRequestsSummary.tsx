import React from 'react';
import { useGetBondRequestSummaryQuery } from '@/api/portfolio/queries';
import { HederaWalletsContext } from '@/context/HederaContext';
import { nFormatter } from '@/utils/common';

import { useGetMetaToken } from '@/hooks/useGetMetaToken';

import SummaryItem from '../SummaryItem';

const BondRequestsSummary = () => {
  const { isConnected } = React.useContext(HederaWalletsContext);

  const { data, refetch } = useGetBondRequestSummaryQuery({
    enabled: !!isConnected,
  });

  const { getLoanTokenLabel, borrowTokenData } = useGetMetaToken();

  const loanTokenLabel = React.useMemo(() => {
    if (!borrowTokenData?.length) return '';

    const loanToken = borrowTokenData[0]?.value;

    return getLoanTokenLabel(loanToken);
  }, [borrowTokenData, getLoanTokenLabel]);

  React.useEffect(() => {
    const refetchInterval = setInterval(() => {
      refetch();
    }, 4000);

    return () => clearInterval(refetchInterval);
  }, [refetch]);

  return (
    <div className="grid grid-cols-3 gap-5">
      <SummaryItem
        className="col-span-3 xl:col-span-1"
        titleClassName="text-center"
        title="Total Loan / Repayment Amount"
        firstValue={`${nFormatter(Number(data?.data?.totalLoanAmount || 0))} ${loanTokenLabel}`}
        secondValue={`${nFormatter(Number(data?.data?.totalRepaymentAmount || 0))} ${loanTokenLabel}`}
      />

      <SummaryItem
        className="col-span-3 xl:col-span-1"
        titleClassName="text-center"
        title="Total deposited / Repayment collateral"
        firstValue={`${nFormatter(Number(data?.data?.totalDepositedCollateral || 0))} ${loanTokenLabel}`}
        secondValue={`${nFormatter(Number(data?.data?.totalRepaymentCollateral || 0))} ${loanTokenLabel}`}
      />

      <SummaryItem
        className="col-span-3 xl:col-span-1"
        titleClassName="text-center"
        title="Total Sold / iSSUED BONDS"
        firstValue={nFormatter(Number(data?.data?.totalBondsSold || 0))}
        secondValue={nFormatter(Number(data?.data?.totalBondsIssued || 0))}
      />
    </div>
  );
};

export default BondRequestsSummary;
