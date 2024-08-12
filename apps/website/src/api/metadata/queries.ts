/* eslint-disable @typescript-eslint/no-explicit-any */
import { createQuery } from 'react-query-kit';

import { getMetadataTokensRequest } from './request';
import { IGetMetadataTokenResponse } from './type';

export const useGetMetadataTokensQuery = createQuery<IGetMetadataTokenResponse>({
  queryKey: ['/api/meta/tokens'],
  fetcher: getMetadataTokensRequest,
});
