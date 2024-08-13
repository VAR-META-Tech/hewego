/* eslint-disable @typescript-eslint/no-explicit-any */
import { request } from '../axios';
import { IGetBondRequestSummaryResponse } from './type';

export const getBondRequestSummaryRequest = async (): Promise<IGetBondRequestSummaryResponse> => {
  const { data } = await request({
    url: `/api/portfolio/borrow-requests/summary`,
    method: 'GET',
  });

  return data;
};

export const getBondRequestRequest = async (): Promise<any> => {
  const { data } = await request({
    url: `/api/portfolio/borrow-requests`,
    method: 'GET',
  });

  return data;
};
