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
}
export enum TokenTypeEnum {
  COLLATERAL = 'COLLATERAL',
  LOAN = 'LOAN',
}

export enum HoldingBondStatus {
  DISABLE_CLAIM = 'DISABLE_CLAIM',
  ENABLE_CLAIM = 'ENABLE_CLAIM',
}
