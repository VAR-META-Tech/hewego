/* eslint-disable @typescript-eslint/no-explicit-any */
import { createQuery } from 'react-query-kit';

import { getNonceRequest } from './request';
import { IGetNonceParams, IGetNonceResponse } from './type';

export const useGetNonceQuery = createQuery<IGetNonceResponse, IGetNonceParams>({
  queryKey: ['/api/auth/nonce'],
  fetcher: getNonceRequest,
});
