import React from 'react';
import { useGetAllTransactionHistoryQuery } from '@/api/portfolio/queries';
import { HederaWalletsContext } from '@/context/HederaContext';

import usePaging from '@/hooks/usePaging';

import { TransactionHistoryFilterType } from '../types/schema';
import { GET_BOND_TRANSACTION_HISTORY_LIMIT } from '../utils/const';

export const useGetTransactionHistory = () => {
  const { isConnected, loginData } = React.useContext(HederaWalletsContext);

  const { paging, filter, onPageChange, handleFilterChange, onTotalItemsChange } =
    usePaging<TransactionHistoryFilterType>(GET_BOND_TRANSACTION_HISTORY_LIMIT, {
      search: '',
      token: '',
      transactionType: '',
    });

  const { data, ...rest } = useGetAllTransactionHistoryQuery({
    variables: {
      page: String(paging.page),
      limit: String(paging.limit),
      searchTransactionHash: filter?.search || undefined,
      transactionTypes: filter?.transactionType || undefined,
      assets: filter?.token || undefined,
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
    (values: TransactionHistoryFilterType) => {
      (Object.keys(values) as (keyof typeof values)[]).forEach((key) => {
        handleFilterChange(key, values[key]);
      });
      onPageChange(1);
    },
    [handleFilterChange, onPageChange]
  );

  return {
    data,
    transactions: data?.data || [],
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
