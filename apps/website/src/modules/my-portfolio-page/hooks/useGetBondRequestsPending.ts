/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { useGetBondRequestQuery } from '@/api/portfolio/queries';
import { HederaWalletsContext } from '@/context/HederaContext';

import usePaging from '@/hooks/usePaging';

import { useBondRequestStore } from '../store/useBondRequestStore';
import { BondRequestPendingFilterType } from '../types/schema';
import { BOND_REQUEST_STATUS, GET_BOND_REQUEST_LIMIT } from '../utils/const';

export const useGetBondRequestsPending = () => {
  const { isConnected } = React.useContext(HederaWalletsContext);
  const pendingIssuanceDateRange = useBondRequestStore.use.pendingIssuanceDateRange();

  const { paging, filter, onPageChange, handleFilterChange, onTotalItemsChange } =
    usePaging<BondRequestPendingFilterType>(GET_BOND_REQUEST_LIMIT, {
      search: '',
      bondDuration: '',
    });

  const { data, ...rest } = useGetBondRequestQuery({
    variables: {
      page: String(paging.page),
      limit: String(paging.limit),
      status: BOND_REQUEST_STATUS.PENDING_ISSUANCE,
      name: filter?.search || undefined,
      issuanceStartDate: pendingIssuanceDateRange?.start
        ? new Date(pendingIssuanceDateRange?.start as any)?.toISOString()
        : undefined,
      issuanceEndDate: pendingIssuanceDateRange?.end
        ? new Date(pendingIssuanceDateRange?.end as any)?.toISOString()
        : undefined,
      bondDuration: filter.bondDuration || undefined,
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
    (values: BondRequestPendingFilterType) => {
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
