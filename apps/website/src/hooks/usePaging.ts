import React from 'react';
import { IPaging } from '@/utils/common.type';

interface State<T extends object> {
  paging: IPaging;
  filter: T;
}

const usePaging = <T extends object>(limit: number, initFilter: T) => {
  const [state, setState] = React.useState<State<T>>({
    paging: {
      limit,
      page: 1,
      total: 0,
    },
    filter: initFilter,
  });

  const onTotalItemsChange = React.useCallback((totalItems: number) => {
    setState((pre) => ({
      ...pre,
      paging: {
        ...pre.paging,
        total: totalItems,
      },
    }));
  }, []);

  const onPageChange = React.useCallback((currentPage: number) => {
    setState((pre) => ({
      ...pre,
      paging: {
        ...pre.paging,
        page: currentPage,
      },
    }));
  }, []);

  const onPageSizeChange = React.useCallback((currentSize: number) => {
    setState((pre) => ({
      ...pre,
      paging: {
        ...pre.paging,
        limit: currentSize,
        page: 1,
      },
    }));
  }, []);

  const handleFilterChange = React.useCallback(<TKey extends keyof T>(key: TKey, value: T[TKey]) => {
    setState((pre) => ({
      ...pre,
      filter: {
        ...pre.filter,
        [key]: value,
      },
    }));
  }, []);

  return {
    paging: state.paging,
    filter: state.filter,
    onPageChange,
    onPageSizeChange,
    onTotalItemsChange,
    handleFilterChange,
  };
};

export default usePaging;
