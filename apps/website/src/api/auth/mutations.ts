/* eslint-disable @typescript-eslint/no-explicit-any */
import { createMutation } from 'react-query-kit';

import { getNonceRequest, loginRequest } from './request';
import { IGetNonceParams, IGetNonceResponse, ILoginRequest } from './type';

export const useGetNonceMutation = createMutation<IGetNonceResponse, IGetNonceParams>({
  mutationFn: getNonceRequest,
});

export const useLoginMutation = createMutation<any, ILoginRequest>({
  mutationFn: loginRequest,
});
