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
  ISSUANCE_DATE: 'issuanceDate',
  MATURITY_DATE: 'maturityDate',
  LOAN_TERM: 'loanTerm',
  LOAN_TOKEN: 'loanTokenType',
  INTEREST_RATE: 'interestRate',
  SOLD_AND_VOLUME: 'soldAndVolume',
  ACTION: 'action',
};

export const HEADER_ACTIVE_BONDS_COLUMNS = [
  { key: HEADER_ACTIVE_BONDS_KEYS.ISSUANCE_DATE, label: 'Issuance Date' },
  { key: HEADER_ACTIVE_BONDS_KEYS.MATURITY_DATE, label: 'Maturity' },
  { key: HEADER_ACTIVE_BONDS_KEYS.LOAN_TERM, label: 'Loan Term' },
  { key: HEADER_ACTIVE_BONDS_KEYS.LOAN_TOKEN, label: 'Supply/Borrow' },
  { key: HEADER_ACTIVE_BONDS_KEYS.INTEREST_RATE, label: 'Interest Rate' },
  { key: HEADER_ACTIVE_BONDS_KEYS.SOLD_AND_VOLUME, label: 'Sold/Volume' },
  { key: 'action', label: '' },
];

export const GET_ACTIVE_BONDS_LIMIT = 999999999999999;
