import React from 'react';
import { useGetBondRequestQuery } from '@/api/portfolio/queries';
import { HederaWalletsContext } from '@/context/HederaContext';

import usePaging from '@/hooks/usePaging';

import { BondRequestFilterType } from '../types/schema';
import { GET_BOND_REQUEST_LIMIT } from '../utils/const';

export const useGetBondRequests = () => {
  const { isConnected } = React.useContext(HederaWalletsContext);

  const { paging, filter, onPageChange, handleFilterChange, onTotalItemsChange } = usePaging<BondRequestFilterType>(
    GET_BOND_REQUEST_LIMIT,
    {
      search: '',
      status: '',
      bondDuration: '',
    }
  );

  const { data, ...rest } = useGetBondRequestQuery({
    variables: {
      page: String(paging.page),
      limit: String(paging.limit),
      status: 'ACTIVE',
    },
    enabled: !!isConnected,
  });

  React.useEffect(() => {
    if (!data?.data) return;

    if (data?.data?.length === 0 && paging.page > 1) {
      onPageChange(paging.page - 1);
    } else {
      onTotalItemsChange(data?.meta?.pagination?.totalItems ?? 0);
    }
  }, [data?.data, data?.meta?.pagination?.totalItems, onPageChange, onTotalItemsChange, paging.page]);

  const handleSearchChange = React.useCallback(
    (values: BondRequestFilterType) => {
      (Object.keys(values) as (keyof typeof values)[]).forEach((key) => {
        handleFilterChange(key, values[key]);
      });
      onPageChange(1);
    },
    [handleFilterChange, onPageChange]
  );

  return {
    data,
    paging,
    filter,
    onPageChange,
    handleFilterChange,
    onTotalItemsChange,
    handleSearchChange,
    ...rest,
  };
};
