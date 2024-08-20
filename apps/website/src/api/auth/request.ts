import { request } from '../axios';
import { ILoginRequest, ILoginResponse } from './type';

export const loginRequest = async (body: ILoginRequest): Promise<ILoginResponse> => {
  const { data } = await request({
    url: '/api/auth/login',
    method: 'POST',
    data: body,
  });

  return data;
};
