import { IMetaPagination } from '@/utils/common.type';

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
  id: number;
  bondName: string;
  loanTerm?: number;
  loanAmount: string | null;
  loanToken?: string;
  interestRate: string | null;
  collateralToken: string | null;
  volumeBond?: number;
  issuanceDate?: string;
  maturityDate?: string;
  borrowerAddress?: string;
  bondId?: number;
  createdAt: string;
  updatedAt: string;
}
