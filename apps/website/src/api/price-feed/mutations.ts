import { createMutation } from 'react-query-kit';

import { getPriceFeedRequest } from './request';
import { IGetPriceFeedParams, IGetPriceFeedResponse } from './type';

export const useGetPriceFeedMutation = createMutation<IGetPriceFeedResponse, IGetPriceFeedParams>({
  mutationFn: getPriceFeedRequest,
});
