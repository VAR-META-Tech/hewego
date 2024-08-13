/* eslint-disable @typescript-eslint/no-explicit-any */
import { createQuery } from 'react-query-kit';

import { getBondRequestRequest, getBondRequestSummaryRequest } from './request';
import { IGetBondRequestSummaryResponse } from './type';

export const useGetBondRequestSummaryQuery = createQuery<IGetBondRequestSummaryResponse>({
  queryKey: ['/api/portfolio/borrow-requests/summary'],
  fetcher: getBondRequestSummaryRequest,
});

export const useGetBondRequestQuery = createQuery<any>({
  queryKey: ['/api/portfolio/borrow-requests'],
  fetcher: getBondRequestRequest,
});
