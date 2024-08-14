/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { useGetBondRequestQuery } from '@/api/portfolio/queries';
import { HederaWalletsContext } from '@/context/HederaContext';

import usePaging from '@/hooks/usePaging';

import { useBondRequestStore } from '../store/useBondRequestStore';
import { BondRequestActiveFilterType } from '../types/schema';
import { BOND_REQUEST_STATUS, GET_BOND_REQUEST_LIMIT } from '../utils/const';

export const useGetBondRequestsActive = () => {
  const { isConnected } = React.useContext(HederaWalletsContext);
  const activeMaturityDateRange = useBondRequestStore.use.activeMaturityDateRange();

  const { paging, filter, onPageChange, handleFilterChange, onTotalItemsChange } =
    usePaging<BondRequestActiveFilterType>(GET_BOND_REQUEST_LIMIT, {
      search: '',
      bondDuration: '',
    });

  const { data, ...rest } = useGetBondRequestQuery({
    variables: {
      page: String(paging.page),
      limit: String(paging.limit),
      status: BOND_REQUEST_STATUS.ACTIVE,
      name: filter?.search || undefined,
      maturityStartDate: activeMaturityDateRange?.start
        ? new Date(activeMaturityDateRange?.start as any)?.toISOString()
        : undefined,
      maturityEndDate: activeMaturityDateRange?.end
        ? new Date(activeMaturityDateRange?.end as any)?.toISOString()
        : undefined,
      bondDuration: filter?.bondDuration || undefined,
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
    (values: BondRequestActiveFilterType) => {
      (Object.keys(values) as (keyof typeof values)[]).forEach((key) => {
        handleFilterChange(key, values[key]);
      });
      onPageChange(1);
    },
    [handleFilterChange, onPageChange]
  );

  return {
    data,
    bonds: data?.data ?? [],
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
