import { IMeta } from '@/utils/common.type';

export interface IGetNonceParams {
  wallet: string;
}

export interface IGetNonceResponse {
  meta: IMeta;
  data: number;
}

export interface ILoginRequest {
  wallet: string;
  signature: string;
}
