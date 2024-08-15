import { request } from '../axios';
import {
  IGetBondHoldingsParams,
  IGetBondHoldingsResponse,
  IGetBondHoldingsSummaryResponse,
  IGetBondRequestSummaryResponse,
  IGetBorrowRequestParams,
  IGetBorrowRequestResponse,
  IGetTransactionHistoryParams,
  IGetTransactionHistoryResponse,
} from './type';

export const getBondRequestSummaryRequest = async (): Promise<IGetBondRequestSummaryResponse> => {
  const { data } = await request({
    url: `/api/portfolio/borrow-requests/summary`,
    method: 'GET',
  });

  return data;
};

export const getBondRequestRequest = async (params: IGetBorrowRequestParams): Promise<IGetBorrowRequestResponse> => {
  const { data } = await request({
    url: `/api/portfolio/borrow-requests`,
    method: 'GET',
    params,
  });

  return data;
};

export const getBondHoldingsRequest = async (params: IGetBondHoldingsParams): Promise<IGetBondHoldingsResponse> => {
  const { data } = await request({
    url: `/api/portfolio/bond-holding`,
    method: 'GET',
    params,
  });

  return data;
};

export const getBondHoldingsSummaryRequest = async (): Promise<IGetBondHoldingsSummaryResponse> => {
  const { data } = await request({
    url: `/api/portfolio/bond-holding/summary`,
    method: 'GET',
  });

  return data;
};

export const getTransactionHistoryRequest = async (
  params: IGetTransactionHistoryParams
): Promise<IGetTransactionHistoryResponse> => {
  const { data } = await request({
    url: `/api/lender-transactions`,
    method: 'GET',
    params,
  });

  return data;
};
