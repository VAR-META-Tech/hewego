import { request } from '../axios';
import { IGetMetadataTokenResponse } from './type';

export const getMetadataTokensRequest = async (): Promise<IGetMetadataTokenResponse> => {
  const { data } = await request({
    url: `/api/meta/tokens`,
    method: 'GET',
  });

  return data;
};
