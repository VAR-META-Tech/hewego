export enum LoanTermEnum {
  ONE_WEEK = 1,
  TWO_WEEK = 2,
  FOUR_WEEK = 4,
  TWELVE_WEEK = 12,
}
export enum CollateralEnum {
  USDC = 'USDC',
  USDT = 'USDT',
}
export enum BorrowEnum {
  USDC = 'USDC',
  USDT = 'USDT',
}

export enum BondStatusEnum {
  ACTIVE = 'ACTIVE',
  CLOSED = 'CLOSED',
  PENDING_ISSUANCE = 'PENDING_ISSUANCE',
  GRACE_PERIOD = 'GRACE_PERIOD',
  REPAID = 'REPAID',
  AUTOMATED_LIQUIDATION = 'AUTOMATED_LIQUIDATION',
  CANCELED = 'CANCELED',
}
export enum TokenSymbolEnum {
  USDC = 'USDC',
  USDT = 'USDT',
  BTC = 'BTC',
}
export enum TokenTypeEnum {
  COLLATERAL = 'COLLATERAL',
  LOAN = 'LOAN',
}

export enum HoldingBondStatus {
  DISABLE_CLAIM = 'DISABLE_CLAIM',
  ENABLE_CLAIM = 'ENABLE_CLAIM',
}

export enum LenderTransactionType {
  RECEIVED = 'RECEIVED',
}
export enum LenderTransactionStatus {
  COMPLETED = 'COMPLETED',
}

export enum BorrowerTransactionType {
  LOAN_CLAIMED = 'LOAN_CLAIMED',
  COLLATERAL_DEPOSITED = 'COLLATERAL_DEPOSITED',
  LOAN_REPAYMENT = 'LOAN_REPAYMENT',
  COLLATERAL_WITHDRAWN = 'COLLATERAL_WITHDRAWN',
  REFUND_COLLATERAL = 'REFUND_COLLATERAL',
}
export enum RequestBondAction {
  CLAIM = 'CLAIM',
  REPAY = 'REPAY',
  CLOSED = 'CLOSE',
  TO_BE_CANCEL = 'TO_BE_CANCEL',
}

// export enum TransactionType {
//   LOAN_CLAIMED = 'LOAN_CLAIMED',
//   COLLATERAL_DEPOSITED = 'COLLATERAL_DEPOSITED',
//   LOAN_REPAYMENT = 'LOAN_REPAYMENT',
//   REFUND_COLLATERAL = 'REFUND_COLLATERAL',
//   COLLATERAL_WITHDRAWAL = 'COLLATERAL_WITHDRAWAL',
//   RECEIVED = 'RECEIVED',
//   COLLATERAL_DEPOSIT = 'COLLATERAL_DEPOSIT',
// }
export enum TransactionType {
  LOAN_CLAIMED = 'LOAN_CLAIMED',
  COLLATERAL_DEPOSITED = 'COLLATERAL_DEPOSITED',
  LOAN_REPAYMENT = 'LOAN_REPAYMENT',
  REFUND_COLLATERAL = 'REFUND_COLLATERAL',
  COLLATERAL_WITHDRAWAL = 'COLLATERAL_WITHDRAWAL',
  RECEIVED = 'RECEIVED',
  REPAYMENT_CLAIMED = 'REPAYMENT_CLAIMED',
}
