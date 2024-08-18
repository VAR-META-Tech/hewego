import React from 'react';
import { HederaWalletsContext } from '@/context/HederaContext';
import BondHoldingsFilterFormWrapper from '@/modules/my-portfolio-page/form/BondHoldingsFilterFormWrapper';
import { useGetBondHoldings } from '@/modules/my-portfolio-page/hooks/useGetBondHoldings';

import BondHoldingsFilter from './BondHoldingsFilter';
import BondHoldingsSummary from './BondHoldingsSummary';
import BondHoldingsTable from './BondHoldingsTable';

interface Props {
  setTabContainer: React.Dispatch<React.SetStateAction<string>>;
}

const BondHoldings: React.FC<Props> = ({ setTabContainer }) => {
  const { isConnected } = React.useContext(HederaWalletsContext);
  const { bonds, paging, onPageChange, pagination, handleSearchChange, refetch, isLoading } = useGetBondHoldings();

  React.useEffect(() => {
    if (!isConnected) return;

    const refetchInterval = setInterval(() => {
      refetch();
    }, 4000);

    return () => clearInterval(refetchInterval);
  }, [isConnected, refetch]);

  return (
    <BondHoldingsFilterFormWrapper>
      <div className="container">
        <BondHoldingsSummary />
      </div>

      <div className="container space-y-10">
        <BondHoldingsFilter handleSearchChange={handleSearchChange} />

        <BondHoldingsTable
          bonds={bonds}
          paging={paging}
          pagination={pagination}
          onPageChange={onPageChange}
          setTabContainer={setTabContainer}
          refetch={refetch}
          isLoading={isLoading}
        />
      </div>
    </BondHoldingsFilterFormWrapper>
  );
};

export default BondHoldings;
