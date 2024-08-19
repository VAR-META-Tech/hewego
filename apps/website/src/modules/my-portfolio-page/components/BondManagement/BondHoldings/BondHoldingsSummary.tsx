import React from 'react';
import { useGetBondHoldingsSummaryQuery } from '@/api/portfolio/queries';
import { HederaWalletsContext } from '@/context/HederaContext';
import { nFormatter, prettyNumber } from '@/utils/common';

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

  const totalBondPurchased = Number(data?.data?.totalBondPurchased ?? 0);

  return (
    <div className="grid grid-cols-3 gap-8">
      <SummaryItem
        titleClassName="text-left text-2xl font-bold text-white"
        className="col-span-3 transition-all bg-[#007BFF] xl:col-span-1"
        title="Total Bond Purchases"
        firstValue={`${totalBondPurchased} BOND${totalBondPurchased > 1 ? 'S' : ''}`}
        secondValue={
          <div className="text-[#FFFFFF] font-semibold text-xl">
            {`~ ${nFormatter(Number(data?.data?.totalAmountBondPurchased || 0))} USDC`}
          </div>
        }
      />

      <SummaryItem
        titleClassName="text-left text-2xl font-bold text-white"
        className="col-span-3 transition-all bg-[#32CD32] xl:col-span-1"
        title="Capital & Interest Received"
        firstValue={`${prettyNumber(Number(data?.data?.totalCapitalAndInterestRecieved || 0).toFixed(2))} USDC`}
        secondValue={null}
      />
    </div>
  );
};

export default BondHoldingsSummary;
