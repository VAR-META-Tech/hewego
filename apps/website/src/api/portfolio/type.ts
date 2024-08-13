import { IMeta } from '@/utils/common.type';

export interface IGetBondRequestSummaryResponse {
  meta: IMeta;
  data: Data;
}

export interface Data {
  totalLoanAmount: number;
  totalRepaymentAmount: number;
  totalDepositedCollateral: number;
  totalRepaymentCollateral: number;
  totalBondsSold: number;
  totalBondsIssued: number;
}
