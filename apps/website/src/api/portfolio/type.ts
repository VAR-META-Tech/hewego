import { IMeta, IMetaPagination } from '@/utils/common.type';

export interface IGetBondRequestSummaryResponse {
  meta: IMeta;
  data: IGetBondRequestSummaryData;
}

export interface IGetBondRequestSummaryData {
  totalBondsIssued: number;
  totalBondIssuedValue: number;
  totalDepositedCollateral: number;
  totalLiquidatedAmount: number;
  totalRepaymentInterestRate: number;
}

export interface IGetBorrowRequestParams {
  status: string;
  page?: string;
  limit?: string;
  bondDuration?: string;
  issuanceStartDate?: string;
  issuanceEndDate?: string;
  maturityStartDate?: string;
  maturityEndDate?: string;
  name?: string;
}

export interface IGetBorrowRequestResponse {
  meta: IMetaPagination;
  data: IGetBorrowRequestData[];
}

export interface IGetBorrowRequestData {
  name: string;
  bondId: number;
  loanTerm: number;
  loanAmount: string;
  loanToken: string;
  collateralAmount: string;
  collateralToken: string;
  volumeBond: string;
  interestRate: string;
  issuanceDate: string;
  maturityDate: string;
  borrowerAddress: string;
  createdAt: string;
  updatedAt: string;
  totalSold: number;
  loanTokenType: string;
  collateralTokenType: string;
  canceledAt: string | null;
  repaidAt: string | null;
  claimedLoanAt: string | null;
  liquidatedAt: string | null;
  gracePeriodEndsAt: string | null;
  action?: string;
}

export interface IGetBondHoldingsParams {
  page?: string;
  limit?: string;
  name?: string;
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
  totalSold: number;
  volumeBond: number;
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

export interface IGetTransactionHistoryParams {
  page?: string;
  limit?: string;
  supplies?: string;
  searchTransactionHash?: string;
}

export interface IGetTransactionHistoryResponse {
  meta: IMetaPagination;
  data: IGetTransactionHistoryData[];
}
export interface IGetTransactionHistoryData {
  id: number;
  transactionType: string;
  lenderAddress: string;
  loanAmount: string;
  interestPayment: string;
  receivedAmount: string;
  status: string;
  transactionHash: string;
  createdAt: string;
  bondName: string;
  bondId: number;
  loanToken: string;
  loanTokenType: string;
}

export interface IGetAllTransactionHistoryParams {
  page: string;
  limit: string;
  searchTransactionHash?: string;
  transactionTypes?: string;
  assets?: string;
}

export interface IGetAllTransactionHistoryResponse {
  meta: IMetaPagination;
  data: IGetAllTransactionHistoryData[];
}

export interface IGetAllTransactionHistoryData {
  id: number;
  transactionType: string;
  userWalletAddress: string;
  amount: string;
  status: string;
  transactionHash: string;
  createdAt: string;
  bondName: string;
  bondId: number;
  loanToken: string;
  loanTokenType: string;
  collateralToken: string;
  collateralTokenType: string;
  masterAsset: string;
}
