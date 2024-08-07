export const TAB_VALUE = {
  BORROW_REQUEST: 'borrow-request',
  MY_BONDS: 'my-bonds',
  HISTORY: 'history',
};

export const TAB_DATA = [
  {
    label: 'Borrow Request',
    value: TAB_VALUE.BORROW_REQUEST,
  },
  {
    label: 'My Bonds',
    value: TAB_VALUE.MY_BONDS,
  },
  {
    label: 'History',
    value: TAB_VALUE.HISTORY,
  },
];

export const HEADER_COLUMNS_MY_BONDS = [
  { key: 'no', label: 'No' },
  { key: 'bondName', label: 'Bond Name' },
  { key: 'quantity', label: 'Quantity' },
  { key: 'purchaseDate', label: 'Purchase Date' },
  { key: 'issuanceDate', label: 'Issuance Date' },
  { key: 'maturity', label: 'Maturity' },
  { key: 'status', label: 'Status' },
  { key: 'nominalValue', label: 'Nominal Value' },
  { key: 'totalValue', label: 'Total Value' },
  { key: 'action', label: 'Action' },
];

export const MOCK_DATA_MY_BONDS = [
  {
    no: 1,
    bondName: 'Bond ABC',
    quantity: 10,
    purchaseDate: '01/03/2025',
    issuanceDate: '01/04/2025',
    maturity: '08-Aug-24',
    status: 'Pending Claim',
    nominalValue: '100 USDC',
    totalValue: '1000 USDC',
  },
  {
    no: 2,
    bondName: 'Bond XYZ',
    quantity: 5,
    purchaseDate: '01/03/2025',
    issuanceDate: '01/04/2025',
    maturity: '13-Aug-24',
    status: 'Claimed',
    nominalValue: '100 USDC',
    totalValue: '500 USDC',
  },
  {
    no: 3,
    bondName: 'Bond ABC',
    quantity: 10,
    purchaseDate: '01/03/2025',
    issuanceDate: '01/04/2025',
    maturity: '18-Aug-24',
    status: 'Pending Claim',
    nominalValue: '100 USDC',
    totalValue: '1000 USDC',
  },
  {
    no: 4,
    bondName: 'Bond ABC',
    quantity: 5,
    purchaseDate: '01/03/2025',
    issuanceDate: '01/04/2025',
    maturity: '23-Aug-24',
    status: 'Pending Claim',
    nominalValue: '100 USDC',
    totalValue: '500 USDC',
  },
  {
    no: 5,
    bondName: 'Bond ABC',
    quantity: 10,
    purchaseDate: '01/03/2025',
    issuanceDate: '01/04/2025',
    maturity: '28-Aug-24',
    status: 'Pending Claim',
    nominalValue: '100 USDC',
    totalValue: '1000 USDC',
  },
];

export const MOCK_DATA_BORROW_REQUEST = [
  {
    name: 'Bond 1',
    loanToken: 'USD',
    volumeBond: '10000',
    durationBond: '2 weeks',
    borrowInterestRate: '5.0',
    collateralToken: 'ETH',
    matuityDate: '2024-12-31',
    status: 'Approved',
  },
  {
    name: 'Bond 2',
    loanToken: 'EUR',
    volumeBond: '20000',
    durationBond: '4 weeks',
    borrowInterestRate: '4.5',
    collateralToken: 'BTC',
    matuityDate: '2025-06-30',
    status: 'Pending',
  },
  {
    name: 'Bond 3',
    loanToken: 'USDT',
    volumeBond: '20000',
    durationBond: '4 weeks',
    borrowInterestRate: '4.5',
    collateralToken: 'BTC',
    matuityDate: '2025-06-30',
    status: 'Failed',
  },
];
