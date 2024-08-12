export const LOAN_TERM_VALUE = {
  ONE_WEEK: 1,
  TWO_WEEK: 2,
  FOUR_WEEK: 4,
  TWELEVE_WEEK: 12,
};

export const LOAN_TERM_DATA = [
  {
    label: '1 week',
    value: LOAN_TERM_VALUE.ONE_WEEK,
  },
  {
    label: '2 weeks',
    value: LOAN_TERM_VALUE.TWO_WEEK,
  },
  {
    label: '4 weeks',
    value: LOAN_TERM_VALUE.FOUR_WEEK,
  },
  {
    label: '12 weeks',
    value: LOAN_TERM_VALUE.TWELEVE_WEEK,
  },
];

export const COLLATERAL_TOKEN_VALUE = {
  USDC: 'USDC',
  USDT: 'USDT',
};

export const BORROW_TOKEN_VALUE = {
  USDC: 'USDC',
  USDT: 'USDT',
};

export const HEADER_ACTIVE_BONDS_KEYS = {
  MATURITY_DATE: 'maturityDate',
  LOAN_TERM: 'loanTerm',
  COLLATERAL_TOKEN: 'collateralTokenType',
  LOAN_TOKEN: 'loanTokenType',
  INTEREST_RATE: 'interestRate',
  ACTION: 'action',
};

export const HEADER_ACTIVE_BONDS_COLUMNS = [
  { key: HEADER_ACTIVE_BONDS_KEYS.MATURITY_DATE, label: 'Maturity' },
  { key: HEADER_ACTIVE_BONDS_KEYS.LOAN_TERM, label: 'Loan Term' },
  { key: HEADER_ACTIVE_BONDS_KEYS.COLLATERAL_TOKEN, label: 'Collateral' },
  { key: HEADER_ACTIVE_BONDS_KEYS.LOAN_TOKEN, label: 'Supply/Borrow' },
  { key: HEADER_ACTIVE_BONDS_KEYS.INTEREST_RATE, label: 'Interest Rate' },
  { key: 'action', label: '' },
];

export const GET_ACTIVE_BONDS_LIMIT = 999999999999999;
