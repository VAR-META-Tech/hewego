import React from 'react';
import BondHoldingsFilterFormWrapper from '@/modules/my-portfolio-page/form/BondHoldingsFilterFormWrapper';
import { useGetBondHoldings } from '@/modules/my-portfolio-page/hooks/useGetBondHoldings';

import BondHoldingsFilter from './BondHoldingsFilter';
import BondHoldingsSumary from './BondHoldingsSumary';
import BondHoldingsTable from './BondHoldingsTable';

interface Props {
  setTabContainer: React.Dispatch<React.SetStateAction<string>>;
}

const BondHoldings: React.FC<Props> = ({ setTabContainer }) => {
  const { bonds, paging, onPageChange, pagination, handleSearchChange, refetch } = useGetBondHoldings();

  React.useEffect(() => {
    refetch();

    return () => {
      refetch();
    };
  }, [refetch]);

  return (
    <BondHoldingsFilterFormWrapper>
      <BondHoldingsSumary />

      <div className="container space-y-10">
        <BondHoldingsFilter handleSearchChange={handleSearchChange} />

        <BondHoldingsTable
          bonds={bonds}
          paging={paging}
          pagination={pagination}
          onPageChange={onPageChange}
          setTabContainer={setTabContainer}
          refetch={refetch}
        />
      </div>
    </BondHoldingsFilterFormWrapper>
  );
};

export default BondHoldings;
