import { IMeta, IMetaPagination } from '@/utils/common.type';

export interface IGetBondActiveParams {
  page: number;
  limit: number;
  loanTerms: string;
  borrows: string;
  collaterals: string;
}

export interface IGetBondActiveResponse {
  meta: IMetaPagination;
  data: IGetBondActiveData[];
}

export interface IGetBondActiveData {
  bondName: string;
  loanTerm: number;
  loanAmount: string;
  loanToken: string;
  collateralAmount: string;
  collateralToken: string;
  interestRate: string;
  volumeBond: string;
  issuanceDate: string;
  maturityDate: string;
  borrowerAddress: string;
  bondId: number;
  createdAt: string;
  updatedAt: string;
  loanTokenType: string;
  collateralTokenType: string;
  totalSold: number;
}

export interface IGetBondDetailParams {
  id: number;
}

export interface IGetBondDetailResponse {
  meta: IMeta;
  data: IGetBondDetailData;
}

export interface IGetBondDetailData {
  id: number;
  bondName: string;
  loanTerm: number;
  loanAmount: string | null;
  loanToken: string;
  interestRate: string | null;
  collateralToken: string | null;
  volumeBond: number;
  issuanceDate: string;
  maturityDate: string;
  borrowerAddress: string | null;
  bondId: string | null;
  createdAt: string;
  updatedAt: string;
  totalSold: number;
}
