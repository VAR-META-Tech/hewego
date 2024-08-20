import { request } from '../axios';
import { IGetBondActiveParams, IGetBondActiveResponse, IGetBondDetailParams, IGetBondDetailResponse } from './type';

export const getActiveBondsRequest = async (params: IGetBondActiveParams): Promise<IGetBondActiveResponse> => {
  const { data } = await request({
    url: '/api/bonds/active',
    method: 'GET',
    params,
  });

  return data;
};

export const getDetailBondRequest = async (params: IGetBondDetailParams): Promise<IGetBondDetailResponse> => {
  const { data } = await request({
    url: `/api/bonds/${params.id}`,
    method: 'GET',
    params,
  });

  return data;
};
