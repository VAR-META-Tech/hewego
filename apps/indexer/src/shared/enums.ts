export enum OnchainStatus {
  CONFIRMING = "confirming",
  CONFIRMED = "confirmed",
}
export enum BorrowerTransactionStatus {
  COMPLETED = "COMPLETED",
}

export enum TokenStatus {
  ACTIVE = "active",
  INACTIVE = "inactive",
  REQUEST = "request",
}

export enum ItemConfigStatus {
  ACTIVE = "active",
  INACTIVE = "inactive",
  REQUEST = "request",
}

export enum TransactionTag {
  IN_GM_SYSTEM = "in_gm_system",
  OUT_GM_SYSTEM = "out_gm_system",
}

export enum TokenSymbolEnum {
  USDC = "USDC",
  USDT = "USDT",
  BTC = "BTC",
}
export enum TokenTypeEnum {
  COLLATERAL = "COLLATERAL",
  LOAN = "LOAN",
}
export enum EventType {
  BondCreated = "BondCreated",
  LenderParticipated = "LenderParticipated",
  LenderClaimed = "LenderClaimed",
  BorrowerClaimLoanToken = "BorrowerClaimLoanToken",
  BondRepaid = "BondRepaid",
  BorrowerRefundoanToken = "BorrowerRefundoanToken",
  BondLiquidated = "BondLiquidated",
}

export enum BondRequestTransactionType {
  LOAND_CLAIM = "LOAND_CLAIM",
  COLLATERAL_DEPOSIT = "COLLATERAL_DEPOSIT",
  LOAN_REPAYMENT = "LOAN_REPAYMENT",
  COLLATERAL_WITHDRAWAL = "COLLATERAL_WITHDRAWAL",
  REFUND_COLLATERAL = "REFUND_COLLATERAL",
}

export enum LenderTransactionType {
  RECEIVED = "RECEIVED",
}
export enum LenderTransactionStatus {
  COMPLETED = "COMPLETED",
}

export enum BondStatusEnum {
  ACTIVE = "ACTIVE",
  CLOSED = "CLOSED",
  PENDING_ISSUANCE = "PENDING_ISSUANCE",
  GRACE_PERIOD = "GRACE_PERIOD",
  REPAID = "REPAID",
  AUTOMATED_LIQUIDATION = "AUTOMATED_LIQUIDATION",
  CANCELED = "CANCELED",
}
export enum BorrowerTransactionType {
  LOAN_CLAIMED = "LOAN_CLAIMED",
  COLLATERAL_DEPOSITED = "COLLATERAL_DEPOSITED",
  LOAN_REPAYMENT = "LOAN_REPAYMENT",
  COLLATERAL_WITHDRAWN = "COLLATERAL_WITHDRAWN",
  REFUND_COLLATERAL = "REFUND_COLLATERAL",
  LIQUIDATED = "LIQUIDATED",
}

export enum TransactionType {
  LOAN_CLAIMED = "LOAN_CLAIMED",
  COLLATERAL_DEPOSITED = "COLLATERAL_DEPOSITED",
  LOAN_REPAYMENT = "LOAN_REPAYMENT",
  REFUND_COLLATERAL = "REFUND_COLLATERAL",
  COLLATERAL_WITHDRAWAL = "COLLATERAL_WITHDRAWAL",
  RECEIVED = "RECEIVED",
  REPAYMENT_CLAIMED = "REPAYMENT_CLAIMED"
}
export enum TransactionStatus {
  COMPLETED = "COMPLETED"
}
