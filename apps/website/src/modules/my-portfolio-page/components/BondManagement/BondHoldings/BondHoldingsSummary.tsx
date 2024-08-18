import React from 'react';
import { useGetBondHoldingsSummaryQuery } from '@/api/portfolio/queries';
import { HederaWalletsContext } from '@/context/HederaContext';
import { nFormatter, prettyNumber } from '@/utils/common';
import { TOKEN_UNIT } from '@/utils/constants';
import { formatUnits } from 'viem';

import SummaryItem from '../SummaryItem';

const BondHoldingsSummary = () => {
  const { isConnected, loginData } = React.useContext(HederaWalletsContext);

  const { data, refetch } = useGetBondHoldingsSummaryQuery({
    enabled: !!isConnected && !!loginData,
  });

  React.useEffect(() => {
    if (!isConnected) return;

    const refetchInterval = setInterval(() => {
      refetch();
    }, 4000);

    return () => clearInterval(refetchInterval);
  }, [isConnected, refetch]);

  return (
    <div className="grid grid-cols-2 gap-5">
      <SummaryItem
        titleClassName="text-center"
        className="py-10 col-span-2 xl:col-span-1"
        title="Total Number of Bonds Purchased"
        firstValue={`${data?.data?.totalBondPurchased || 0} bonds~${nFormatter(Number(formatUnits(BigInt(data?.data?.totalAmountBondPurchased || 0), Number(TOKEN_UNIT))))} USDC`}
        secondValue={''}
        isShowDivider={false}
      />

      <SummaryItem
        titleClassName="text-center"
        className="py-10 col-span-2 xl:col-span-1"
        title=" Total Capital and Interest Received "
        firstValue={`${prettyNumber(Number(data?.data?.totalCapitalAndInterestRecieved || 0).toFixed(2))} USDC`}
        secondValue={''}
        isShowDivider={false}
      />
    </div>
  );
};

export default BondHoldingsSummary;
