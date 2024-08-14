import { IMeta, IMetaPagination } from '@/utils/common.type';

export interface IGetBondRequestSummaryResponse {
  meta: IMeta;
  data: IGetBondRequestSummaryData;
}

export interface IGetBondRequestSummaryData {
  totalLoanAmount: number;
  totalRepaymentAmount: number;
  totalDepositedCollateral: number;
  totalRepaymentCollateral: number;
  totalBondsSold: number;
  totalBondsIssued: number;
}

export interface IGetBorrowRequestParams {
  status: string;
  page?: string;
  limit?: string;
}

export interface IGetBorrowRequestResponse {
  meta: IMetaPagination;
  data: IGetBorrowRequestData[];
}

export interface IGetBorrowRequestData {
  name: string;
  loanterm: number;
  loanamount: string;
  loantoken: string;
  collateralamount: string;
  collateraltoken: string;
  volumebond: string;
  interestrate: string;
  issuancedate: string;
  maturitydate: string;
  borroweraddress: string;
  createdat: string;
  updatedat: string;
  totalsold: number;
  loanTokenType: string;
  collateralTokenType: string;
  status: string;
  canceledat: string | null;
  repaidat: string | null;
  claimedloanat: string | null;
  liquidatedat: string | null;
  graceperiodendsat: string | null;
}

export interface IGetBondHoldingsParams {
  page?: string;
  limit?: string;
  name: string;
}

export interface IGetBondHoldingsResponse {
  meta: IMetaPagination;
  data: IGetBondHoldingsData[];
}

export interface IGetBondHoldingsData {
  bondAmount: number;
  purchasedAmount: string;
  purchaseDate: string;
  claimedAt: string | null;
  lenderWalletAddress: string;
  id: number;
  lenderAccountId: string;
  bondInfo: BondInfo;
  status: string;
}

export interface BondInfo {
  name: string;
  maturityDate: number;
  loanToken: string;
  bondId: number;
  interestRate: number;
  loanTerm: number;
  issuanceDate: number;
  status?: string;
}

export interface IGetBondHoldingsSummaryResponse {
  meta: IMeta;
  data: IGetBondHoldingsSummaryData;
}

export interface IGetBondHoldingsSummaryData {
  totalCapitalAndInterestRecieved: string;
  totalAmountBondPurchased: string;
  totalBondPurchased: number;
}
