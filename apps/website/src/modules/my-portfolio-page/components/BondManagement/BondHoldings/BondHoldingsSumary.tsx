import React from 'react';
import { useGetBondHoldingsSummaryQuery } from '@/api/portfolio/queries';
import { HederaWalletsContext } from '@/context/HederaContext';
import { prettyNumber } from '@/utils/common';
import { TOKEN_UNIT } from '@/utils/constants';
import { formatUnits } from 'viem';

import { HStack } from '@/components/Utilities';

import SummaryItem from '../SummaryItem';

const BondHoldingsSumary = () => {
  const { isConnected, loginData } = React.useContext(HederaWalletsContext);

  const { data } = useGetBondHoldingsSummaryQuery({
    enabled: !!isConnected && !!loginData,
  });

  return (
    <HStack spacing={20} pos={'center'}>
      <SummaryItem
        className="py-10"
        title="Total Number of Bonds Purchased"
        firstValue={`${data?.data?.totalBondPurchased || 0} bonds~${prettyNumber(Number(formatUnits(BigInt(data?.data?.totalAmountBondPurchased || 0), TOKEN_UNIT)))} USDC`}
        secondValue={''}
        isShowDevider={false}
      />

      <SummaryItem
        className="py-10"
        title=" Total Capital and Interest Received "
        firstValue={`${prettyNumber(Number(data?.data?.totalCapitalAndInterestRecieved || 0))} USDC`}
        secondValue={''}
        isShowDevider={false}
      />
    </HStack>
  );
};

export default BondHoldingsSumary;
