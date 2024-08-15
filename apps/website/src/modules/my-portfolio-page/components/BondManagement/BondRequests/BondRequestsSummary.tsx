import React from 'react';
import { useGetBondRequestSummaryQuery } from '@/api/portfolio/queries';
import { HederaWalletsContext } from '@/context/HederaContext';
import { nFormatter } from '@/utils/common';

import { useGetMetaToken } from '@/hooks/useGetMetaToken';
import { HStack } from '@/components/Utilities';

import SummaryItem from '../SummaryItem';

const BondRequestsSummary = () => {
  const { isConnected } = React.useContext(HederaWalletsContext);

  const { data } = useGetBondRequestSummaryQuery({
    enabled: !!isConnected,
  });

  const { getLoanTokenLabel, borrowTokenData } = useGetMetaToken();

  const loanTokenLabel = React.useMemo(() => {
    if (!borrowTokenData?.length) return '';

    const loanToken = borrowTokenData[0]?.value;

    return getLoanTokenLabel(loanToken);
  }, [borrowTokenData, getLoanTokenLabel]);

  return (
    <HStack pos={'center'} spacing={32}>
      <SummaryItem
        title="Total Loan / Repayment Amount"
        firstValue={`${nFormatter(Number(data?.data?.totalLoanAmount || 0))} ${loanTokenLabel}`}
        secondValue={`${nFormatter(Number(data?.data?.totalRepaymentAmount || 0))} ${loanTokenLabel}`}
      />

      <SummaryItem
        title="Total deposited / Repayment collateral"
        firstValue={`${nFormatter(Number(data?.data?.totalDepositedCollateral || 0))} ${loanTokenLabel}`}
        secondValue={`${nFormatter(Number(data?.data?.totalRepaymentCollateral || 0))} ${loanTokenLabel}`}
      />

      <SummaryItem
        title="Total Sold / iSSUED BONDS"
        firstValue={nFormatter(Number(data?.data?.totalBondsSold || 0))}
        secondValue={nFormatter(Number(data?.data?.totalBondsIssued || 0))}
      />
    </HStack>
  );
};

export default BondRequestsSummary;
