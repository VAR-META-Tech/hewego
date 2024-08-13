import React from 'react';

import { useGetActiveBonds } from '../../hooks/useGetActiveBonds';
import ActiveBondFilter from './ActiveBondFilter';
import ActiveBondTable from './ActiveBondTable';

const ActiveBondList = () => {
  const { bonds, filter, isLoading, handleSearchChange, refetch } = useGetActiveBonds();

  React.useEffect(() => {
    refetch();

    return () => {
      refetch();
    };
  }, [refetch]);

  return (
    <div className="container">
      <div className="grid grid-cols-5 gap-8">
        <ActiveBondFilter filter={filter} handleSearchChange={handleSearchChange} />

        <ActiveBondTable bonds={bonds} isLoading={isLoading} refetch={refetch} />
      </div>
    </div>
  );
};

export default ActiveBondList;
