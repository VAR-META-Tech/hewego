import { IMeta } from '@/utils/common.type';

export interface IGetPlatformFeeResponse {
  meta: IMeta;
  data: IGetPlatformFeeData;
}

export interface IGetPlatformFeeData {
  platformFee: number;
}
