import { request } from '../axios';
import { IGetPlatformFeeResponse } from './type';

export const getPlatformFeeRequest = async (): Promise<IGetPlatformFeeResponse> => {
  const { data } = await request({
    url: '/api/fee',
    method: 'GET',
  });

  return data;
};
