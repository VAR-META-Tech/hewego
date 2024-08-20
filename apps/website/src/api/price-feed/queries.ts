/* eslint-disable @typescript-eslint/no-explicit-any */
import { createQuery } from 'react-query-kit';

import { getPriceFeedRequest } from './request';
import { IGetPriceFeedParams, IGetPriceFeedResponse } from './type';

export const useGetPriceFeedQuery = createQuery<IGetPriceFeedResponse, IGetPriceFeedParams>({
  queryKey: ['/api/price-feed'],
  fetcher: getPriceFeedRequest,
});
