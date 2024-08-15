import React from 'react';
import { useGetBondHoldingsSummaryQuery } from '@/api/portfolio/queries';
import { HederaWalletsContext } from '@/context/HederaContext';
import { nFormatter, prettyNumber } from '@/utils/common';
import { TOKEN_UNIT } from '@/utils/constants';
import { formatUnits } from 'viem';

import { HStack } from '@/components/Utilities';

import SummaryItem from '../SummaryItem';

const BondHoldingsSumary = () => {
  const { isConnected, loginData } = React.useContext(HederaWalletsContext);

  const { data, refetch } = useGetBondHoldingsSummaryQuery({
    enabled: !!isConnected && !!loginData,
  });

  React.useEffect(() => {
    const refetchInterval = setInterval(() => {
      refetch();
    }, 4000);

    return () => clearInterval(refetchInterval);
  }, [refetch]);

  return (
    <HStack spacing={20} pos={'center'}>
      <SummaryItem
        className="py-10"
        title="Total Number of Bonds Purchased"
        firstValue={`${data?.data?.totalBondPurchased || 0} bonds~${nFormatter(Number(formatUnits(BigInt(data?.data?.totalAmountBondPurchased || 0), Number(TOKEN_UNIT))))} USDC`}
        secondValue={''}
        isShowDivider={false}
      />

      <SummaryItem
        className="py-10"
        title=" Total Capital and Interest Received "
        firstValue={`${prettyNumber(Number(data?.data?.totalCapitalAndInterestRecieved || 0).toFixed(2))} USDC`}
        secondValue={''}
        isShowDivider={false}
      />
    </HStack>
  );
};

export default BondHoldingsSumary;
