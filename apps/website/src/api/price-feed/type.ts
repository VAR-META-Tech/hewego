import { IMeta } from '@/utils/common.type';

export interface IGetPriceFeedParams {
  collateralToken: string;
  loanToken: string;
  loanAmount: string;
}

export interface IGetPriceFeedResponse {
  meta: IMeta;
  data: IGetPriceFeedData;
}

export interface IGetPriceFeedData {
  collateralPrice: string;
}
