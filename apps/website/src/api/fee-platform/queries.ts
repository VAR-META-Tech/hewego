import { createQuery } from 'react-query-kit';

import { getPlatformFeeRequest } from './request';
import { IGetPlatformFeeResponse } from './type';

export const useGetPlatformFeesQuery = createQuery<IGetPlatformFeeResponse>({
  queryKey: ['/api/fee'],
  fetcher: getPlatformFeeRequest,
});
