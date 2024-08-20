import React from 'react';

import { useGetActiveBonds } from '../../hooks/useGetActiveBonds';
import ActiveBondFilter from './ActiveBondFilter';
import ActiveBondTable from './ActiveBondTable';

const ActiveBondList = () => {
  const { bonds, filter, isLoading, handleSearchChange, refetch } = useGetActiveBonds({
    refetchInterval: 5000,
  });

  return (
    <div className="container py-10">
      <div className="grid grid-cols-8 gap-8">
        <ActiveBondFilter filter={filter} handleSearchChange={handleSearchChange} />

        <ActiveBondTable bonds={bonds} isLoading={isLoading} refetch={refetch} />
      </div>
    </div>
  );
};

export default ActiveBondList;
