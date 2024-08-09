import { request } from '../axios';
import { IGetBondActiveParams, IGetBondActiveResponse } from './type';

export const getActiveBondsRequest = async (params: IGetBondActiveParams): Promise<IGetBondActiveResponse> => {
  const { data } = await request({
    url: '/api/bonds/active',
    method: 'GET',
    params,
  });

  return data;
};
