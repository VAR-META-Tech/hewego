export const TAB_VALUE = {
  BOND_MANAGEMENT: 'bond-management',
  HISTORY: 'history',
};

export const TAB_DATA = [
  {
    label: 'Bond Management',
    value: TAB_VALUE.BOND_MANAGEMENT,
  },
  {
    label: 'Transaction History',
    value: TAB_VALUE.HISTORY,
  },
];

export const BOND_REQUEST_STATUS = {
  ACTIVE: 'ACTIVE',
  CLOSED: 'CLOSED',
  PENDING_ISSUANCE: 'PENDING_ISSUANCE',
  GRACE_PERIOD: 'GRACE_PERIOD',
  REPAID: 'REPAID',
  AUTOMATED_LIQUIDATION: 'AUTOMATED_LIQUIDATION',
  CANCELED: 'CANCELED',
};

export const BOND_REQUESTS_KEYS = {
  issuanceDate: 'issuanceDate',
  name: 'name',
  loanAmount: 'loanAmount',
  interestRate: 'interestRate',
  loanTerm: 'loanTerm',
  supply: 'supply',
  healthFactor: 'healthFactor',
  action: 'action',
};

export const BOND_HOLDINGS_KEYS = {
  no: 'no',
  maturityDate: 'maturityDate',
  name: 'name',
  bondAmount: 'bondAmount',
  purchasedAmount: 'purchasedAmount',
  receivedAmount: 'receivedAmount',
  action: 'action',
};

export const TRANSACTION_HISTORY_KEYS = {
  transactionId: 'id',
  dateTime: 'createdAt',
  transactionType: 'transactionType',
  loanAmount: 'loanAmount',
  interestPayment: 'interestPayment',
  receivedAmount: 'receivedAmount',
  status: 'status',
  action: 'action',
};

export const HEADER_COLUMNS_BOND_REQUESTS = [
  { key: BOND_REQUESTS_KEYS.issuanceDate, label: 'Issuance Date' },
  { key: BOND_REQUESTS_KEYS.name, label: 'Bond Name' },
  { key: BOND_REQUESTS_KEYS.loanAmount, label: 'Loan Amount' },
  { key: BOND_REQUESTS_KEYS.interestRate, label: 'Interest Rate' },
  { key: BOND_REQUESTS_KEYS.loanTerm, label: 'Bond Duration' },
  { key: BOND_REQUESTS_KEYS.supply, label: 'Total Supply / Amount' },
  // { key: BOND_REQUESTS_KEYS.healthFactor, label: 'Health Factor' },
  { key: BOND_REQUESTS_KEYS.action, label: 'Action' },
];

export const HEADER_COLUMNS_BOND_HOLDINGS = [
  { key: BOND_HOLDINGS_KEYS.no, label: 'No' },
  { key: BOND_HOLDINGS_KEYS.maturityDate, label: 'Maturity' },
  { key: BOND_HOLDINGS_KEYS.name, label: 'Bond Name' },
  { key: BOND_HOLDINGS_KEYS.bondAmount, label: 'Quantity' },
  { key: BOND_HOLDINGS_KEYS.purchasedAmount, label: 'Total Value' },
  { key: BOND_HOLDINGS_KEYS.receivedAmount, label: 'Total Received Amount ' },
  { key: BOND_HOLDINGS_KEYS.action, label: 'Action' },
];

export const HEADER_COLUMNS_TRANSACTION_HISTORY = [
  { key: TRANSACTION_HISTORY_KEYS.transactionId, label: 'Transaction ID' },
  { key: TRANSACTION_HISTORY_KEYS.dateTime, label: 'Date & Time' },
  { key: TRANSACTION_HISTORY_KEYS.transactionType, label: 'Transaction Type' },
  { key: TRANSACTION_HISTORY_KEYS.loanAmount, label: 'Loan Amount' },
  { key: TRANSACTION_HISTORY_KEYS.interestPayment, label: 'Interest Payment' },
  { key: TRANSACTION_HISTORY_KEYS.receivedAmount, label: 'Received Amount' },
  { key: TRANSACTION_HISTORY_KEYS.status, label: 'Status' },
  { key: TRANSACTION_HISTORY_KEYS.action, label: '' },
];

export const BOND_MANAGEMENT_TAB_VALUE = {
  BOND_HOLDINGS: 'bond-holdings',
  BOND_REQUESTS: 'bond-requests',
};

export const BOND_MANAGEMENT_TAB_DATA = [
  {
    label: 'Bond Holdings',
    value: BOND_MANAGEMENT_TAB_VALUE.BOND_HOLDINGS,
  },
  {
    label: 'Bond Requests',
    value: BOND_MANAGEMENT_TAB_VALUE.BOND_REQUESTS,
  },
];

export const GET_BOND_REQUEST_LIMIT = 3;
export const GET_BOND_HOLDING_LIMIT = 5;
export const GET_BOND_TRANSACTION_HISTORY_LIMIT = 10;

export const HOLDING_BOND_STATUS_BUTTON = {
  DISABLE_CLAIM: 'DISABLE_CLAIM',
  ENABLE_CLAIM: 'ENABLE_CLAIM',
};

export const LOAN_TERM_FILTER_VALUE = {
  ONE_WEEK: '1',
  TWO_WEEK: '2',
  FOUR_WEEK: '4',
  TWELEVE_WEEK: '12',
};

export const LOAN_TERM_FILTER_DATA = [
  {
    label: '1 week',
    value: LOAN_TERM_FILTER_VALUE.ONE_WEEK,
  },
  {
    label: '2 weeks',
    value: LOAN_TERM_FILTER_VALUE.TWO_WEEK,
  },
  {
    label: '4 weeks',
    value: LOAN_TERM_FILTER_VALUE.FOUR_WEEK,
  },
  {
    label: '12 weeks',
    value: LOAN_TERM_FILTER_VALUE.TWELEVE_WEEK,
  },
];

export const BOND_REQUEST_ACTIVE_ACTIONS = {
  CLAIM: 'CLAIM',
  REPAY: 'REPAY',
  CLOSED: 'CLOSE',
};
