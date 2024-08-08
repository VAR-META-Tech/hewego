import { request } from '../axios';
import { IGetNonceParams, IGetNonceResponse, ILoginRequest } from './type';

export const getNonceRequest = async (params: IGetNonceParams): Promise<IGetNonceResponse> => {
  const { data } = await request({
    url: '/api/auth/nonce',
    method: 'GET',
    params,
  });

  return data;
};

export const loginRequest = async (body: ILoginRequest) => {
  const { data } = await request({
    url: '/api/auth/login',
    method: 'POST',
    data: body,
  });

  return data;
};
