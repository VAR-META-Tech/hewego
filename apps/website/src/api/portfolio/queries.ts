/* eslint-disable @typescript-eslint/no-explicit-any */
import { createQuery } from 'react-query-kit';

import {
  getBondHoldingsRequest,
  getBondHoldingsSummaryRequest,
  getBondRequestRequest,
  getBondRequestSummaryRequest,
} from './request';
import {
  IGetBondHoldingsParams,
  IGetBondHoldingsResponse,
  IGetBondHoldingsSummaryResponse,
  IGetBondRequestSummaryResponse,
  IGetBorrowRequestParams,
  IGetBorrowRequestResponse,
} from './type';

export const useGetBondRequestSummaryQuery = createQuery<IGetBondRequestSummaryResponse>({
  queryKey: ['/api/portfolio/borrow-requests/summary'],
  fetcher: getBondRequestSummaryRequest,
});

export const useGetBondRequestQuery = createQuery<IGetBorrowRequestResponse, IGetBorrowRequestParams>({
  queryKey: ['/api/portfolio/borrow-requests'],
  fetcher: getBondRequestRequest,
});

export const useGetBondHoldingsQuery = createQuery<IGetBondHoldingsResponse, IGetBondHoldingsParams>({
  queryKey: ['/api/portfolio/bond-holding'],
  fetcher: getBondHoldingsRequest,
});

export const useGetBondHoldingsSummaryQuery = createQuery<IGetBondHoldingsSummaryResponse>({
  queryKey: ['/api/portfolio/bond-holding/summary'],
  fetcher: getBondHoldingsSummaryRequest,
});
