import React from 'react';
import { useGetBondHoldingsQuery } from '@/api/portfolio/queries';
import { HederaWalletsContext } from '@/context/HederaContext';

import usePaging from '@/hooks/usePaging';

import { BondHoldingsFilterType } from '../types/schema';
import { GET_BOND_REQUEST_LIMIT } from '../utils/const';

export const useGetBondHoldings = () => {
  const { isConnected, loginData } = React.useContext(HederaWalletsContext);

  const { paging, filter, onPageChange, handleFilterChange, onTotalItemsChange } = usePaging<BondHoldingsFilterType>(
    GET_BOND_REQUEST_LIMIT,
    {
      search: '',
    }
  );

  const { data, ...rest } = useGetBondHoldingsQuery({
    variables: {
      page: String(paging.page),
      limit: String(paging.limit),
      name: filter?.search || '',
    },
    enabled: !!isConnected && !!loginData,
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
    (values: BondHoldingsFilterType) => {
      (Object.keys(values) as (keyof typeof values)[]).forEach((key) => {
        handleFilterChange(key, values[key]);
      });
      onPageChange(1);
    },
    [handleFilterChange, onPageChange]
  );

  return {
    data,
    bonds: data?.data || [],
    pagination: data?.meta?.pagination,
    paging,
    filter,
    onPageChange,
    handleFilterChange,
    onTotalItemsChange,
    handleSearchChange,
    ...rest,
  };
};
