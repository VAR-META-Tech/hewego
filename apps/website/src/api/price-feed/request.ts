import { request } from '../axios';
import { IGetPriceFeedParams, IGetPriceFeedResponse } from './type';

export const getPriceFeedRequest = async (params: IGetPriceFeedParams): Promise<IGetPriceFeedResponse> => {
  const { data } = await request({
    url: '/api/price-feed',
    method: 'GET',
    params,
  });

  return data;
};
