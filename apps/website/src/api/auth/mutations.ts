import { createMutation } from 'react-query-kit';

import { loginRequest } from './request';
import { ILoginRequest, ILoginResponse } from './type';

export const useLoginMutation = createMutation<ILoginResponse, ILoginRequest>({
  mutationFn: loginRequest,
});
