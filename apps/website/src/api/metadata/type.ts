import { IMeta } from '@/utils/common.type';

export interface IGetMetadataTokenResponse {
  meta: IMeta;
  data: IGetMetadataTokenData[];
}

export interface IGetMetadataTokenData {
  id: number;
  symbol: string;
  type: string;
  address: string;
  createdAt: string;
  updatedAt: string;
}
