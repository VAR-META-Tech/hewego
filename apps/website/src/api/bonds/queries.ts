import { createQuery } from 'react-query-kit';

import { getActiveBondsRequest } from './request';
import { IGetBondActiveParams, IGetBondActiveResponse } from './type';

export const useGetActiveBondsQuery = createQuery<IGetBondActiveResponse, IGetBondActiveParams>({
  queryKey: ['/api/bonds/active'],
  fetcher: getActiveBondsRequest,
});
