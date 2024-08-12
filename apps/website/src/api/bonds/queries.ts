/* eslint-disable @typescript-eslint/no-explicit-any */
import { createQuery } from 'react-query-kit';

import { getActiveBondsRequest, getDetailBondRequest } from './request';
import { IGetBondActiveParams, IGetBondActiveResponse, IGetBondDetailParams, IGetBondDetailResponse } from './type';

export const useGetActiveBondsQuery = createQuery<IGetBondActiveResponse, IGetBondActiveParams>({
  queryKey: ['/api/bonds/active'],
  fetcher: getActiveBondsRequest,
});

export const useGetDetailBondQuery = createQuery<IGetBondDetailResponse, IGetBondDetailParams>({
  queryKey: ['/api/bonds/:id'],
  fetcher: getDetailBondRequest,
});
