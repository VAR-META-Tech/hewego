import React from 'react';

import { HStack } from '@/components/Utilities';

import SummaryItem from '../SummaryItem';

const BondRequestsSummary = () => {
  return (
    <HStack pos={'center'} spacing={32}>
      <SummaryItem title="Total Loan/ Repayment Amount" firstValue="2,000,000 USDC" secondValue="1,500,000 USDC" />
      <SummaryItem
        title="Total deposited/Repayment collateral"
        firstValue="2,000,000 USDC"
        secondValue="1,500,000 USDC"
      />
      <SummaryItem title="Total Sold / iSSUED BONDS" firstValue="2000" secondValue="5000" />
    </HStack>
  );
};

export default BondRequestsSummary;
