import React from 'react';

import { useGetActiveBonds } from '../../hooks/useGetActiveBonds';
import ActiveBondFilter from './ActiveBondFilter';
import ActiveBondTable from './ActiveBondTable';

const ActiveBondList = () => {
  const { bonds, filter, isLoading, handleSearchChange } = useGetActiveBonds();

  return (
    <div className="container">
      <div className="grid grid-cols-5 gap-8">
        <ActiveBondFilter filter={filter} handleSearchChange={handleSearchChange} />

        <ActiveBondTable bonds={bonds} isLoading={isLoading} />
      </div>
    </div>
  );
};

export default ActiveBondList;
