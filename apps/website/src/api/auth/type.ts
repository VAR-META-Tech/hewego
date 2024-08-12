import { IMeta } from '@/utils/common.type';

export interface ILoginRequest {
  wallet: string;
  accountId: string;
}

export interface ILoginResponse {
  meta: IMeta;
  data: ILoginData;
}

export interface ILoginData {
  user: ILoginUserData;
  tokens: ILoginTokens;
}

export interface ILoginUserData {
  walletAddress: string;
  id: number;
  createdAt: string;
  updatedAt: string;
}

export interface ILoginTokens {
  accessToken: string;
  refreshToken: string;
}
