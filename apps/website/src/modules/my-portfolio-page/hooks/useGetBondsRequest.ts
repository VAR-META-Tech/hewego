import usePaging from '@/hooks/usePaging';

import { BondRequestFilterType } from '../types/schema';
import { GET_BOND_REQUEST_LIMIT } from '../utils/const';

export interface IGetBondsFilterType {
  loanTerms: string[];
  borrows: string[];
  collaterals: string[];
}
export const useGetActiveBonds = () => {
  const { paging, filter, onPageChange, handleFilterChange, onTotalItemsChange } = usePaging<BondRequestFilterType>(
    GET_BOND_REQUEST_LIMIT,
    {
      search: '',
      status: '',
      bondDuration: '',
    }
  );
  // React.useEffect(() => {
  //   if (!data?.data) return;

  //   if (data?.data?.length === 0 && paging.page > 1) {
  //     onPageChange(paging.page - 1);
  //   } else {
  //     onTotalItemsChange(data?.meta?.pagination?.totalItems ?? 0);
  //   }
  // }, [data?.data, data?.meta?.pagination?.totalItems, onPageChange, onTotalItemsChange, paging.page]);

  // const handleSearchChange = React.useCallback(
  //   (values: BondRequestFilterType) => {
  //     (Object.keys(values) as (keyof typeof values)[]).forEach((key) => {
  //       handleFilterChange(key, values[key]);
  //     });
  //     onPageChange(1);
  //   },
  //   [handleFilterChange, onPageChange]
  // );

  return {
    paging,
    filter,
    onPageChange,
    handleFilterChange,
    onTotalItemsChange,
  };
};
