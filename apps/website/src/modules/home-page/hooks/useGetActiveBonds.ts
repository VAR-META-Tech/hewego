import React from 'react';
import { useGetActiveBondsQuery } from '@/api/bonds/queries';

import usePaging from '@/hooks/usePaging';

import { GET_ACTIVE_BONDS_LIMIT } from '../utils/const';

export interface IGetBondsFilterType {
  loanTerms: string[];
  borrows: string[];
  collaterals: string[];
}
export const useGetActiveBonds = () => {
  const { paging, filter, onPageChange, handleFilterChange, onTotalItemsChange } = usePaging<IGetBondsFilterType>(
    GET_ACTIVE_BONDS_LIMIT,
    {
      loanTerms: [],
      borrows: [],
      collaterals: [],
    }
  );

  const { data, ...rest } = useGetActiveBondsQuery({
    variables: {
      page: paging.page,
      limit: paging.limit,
      loanTerms: filter.loanTerms.join(','),
      borrows: filter.borrows.join(','),
      collaterals: filter.collaterals.join(','),
    },
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
    (values: IGetBondsFilterType) => {
      (Object.keys(values) as (keyof typeof values)[]).forEach((key) => {
        handleFilterChange(key, values[key]);
      });
      onPageChange(1);
    },
    [handleFilterChange, onPageChange]
  );

  const bonds = React.useMemo(() => {
    if (!data?.data) return [];
    return data?.data;
  }, [data?.data]);

  return {
    data,
    bonds,
    paging,
    handleSearchChange,
    filter,
    onPageChange,
    handleFilterChange,
    onTotalItemsChange,
    ...rest,
  };
};
