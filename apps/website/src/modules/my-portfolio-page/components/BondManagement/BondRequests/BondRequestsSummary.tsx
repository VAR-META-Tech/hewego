import React from 'react';
import { useGetBondRequestSummaryQuery } from '@/api/portfolio/queries';
import { prettyNumber } from '@/utils/common';

import { useGetMetaToken } from '@/hooks/useGetMetaToken';
import { HStack } from '@/components/Utilities';

import SummaryItem from '../SummaryItem';

const BondRequestsSummary = () => {
  const { data } = useGetBondRequestSummaryQuery();
  const { getLoanTokenLabel, borrowTokenData } = useGetMetaToken();

  const loanTokenlabel = React.useMemo(() => {
    if (!borrowTokenData?.length) return '';

    const loanToken = borrowTokenData[0]?.value;

    return getLoanTokenLabel(loanToken);
  }, [borrowTokenData, getLoanTokenLabel]);

  console.log('🚀 ~ BondRequestsSummary ~ data:', data?.data);
  return (
    <HStack pos={'center'} spacing={32}>
      <SummaryItem
        title="Total Loan/ Repayment Amount"
        firstValue={`${prettyNumber(String(data?.data?.totalLoanAmount || 0))} ${loanTokenlabel}`}
        secondValue={`${prettyNumber(String(data?.data?.totalRepaymentAmount || 0))} ${loanTokenlabel}`}
      />

      <SummaryItem
        title="Total deposited/Repayment collateral"
        firstValue={`${prettyNumber(String(data?.data?.totalDepositedCollateral || 0))} ${loanTokenlabel}`}
        secondValue={`${prettyNumber(String(data?.data?.totalRepaymentCollateral || 0))} ${loanTokenlabel}`}
      />

      <SummaryItem
        title="Total Sold / iSSUED BONDS"
        firstValue={prettyNumber(String(data?.data?.totalBondsSold || 0))}
        secondValue={prettyNumber(String(data?.data?.totalBondsIssued || 0))}
      />
    </HStack>
  );
};

export default BondRequestsSummary;
