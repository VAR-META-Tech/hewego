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

export const HEADER_COLUMNS_BOND_REQUESTS = [
  { key: 'requestId', label: 'Request ID' },
  { key: 'bondName', label: 'Bond Name' },
  { key: 'loanAmount', label: 'Loan Amount' },
  { key: 'interestRate', label: 'Interest Rate' },
  { key: 'bondDuration', label: 'Bond Duration' },
  { key: 'totalSoldBonds', label: 'Total Sold Bonds' },
  { key: 'issuanceDate', label: 'Issuance Date' },
  { key: 'maturityDate', label: 'Maturity' },
  { key: 'status', label: 'Status' },
  { key: 'action', label: 'Action' },
];

export const HEADER_COLUMNS_BOND_HOLDINGS = [
  { key: 'no', label: 'No' },
  { key: 'maturityDate', label: 'Maturity' },
  { key: 'name', label: 'Bond Name' },
  { key: 'bondAmount', label: 'Quantity' },
  { key: 'purchasedAmount', label: 'Total Value' },
  { key: 'receivedAmount', label: 'Total Received Amount ' },
  { key: 'action', label: 'Action' },
];
export const MOCK_DATA_BOND_REQUESTS = [
  {
    requestId: '001',
    bondName: 'Bond DEF',
    loanAmount: '100 USDC',
    interestRate: '3%',
    bondDuration: '4 weeks',
    totalSoldBonds: '0/50',
    issuanceDate: '01/04/2025',
    maturityDate: '01/05/2025',
    status: 'Pending Issuance',
    action: '',
  },
  {
    requestId: '002',
    bondName: 'Bond ABC',
    loanAmount: '100 USDC',
    interestRate: '5%',
    bondDuration: '4 weeks',
    totalSoldBonds: '25/50',
    issuanceDate: '01/04/2025',
    maturityDate: '01/05/2025',
    status: 'Automated Liquidation',
    action: '',
  },
  {
    requestId: '003',
    bondName: 'Bond ABC',
    loanAmount: '100 USDC',
    interestRate: '8%',
    bondDuration: '4 weeks',
    totalSoldBonds: '50/50',
    issuanceDate: '01/04/2025',
    maturityDate: '01/05/2025',
    status: 'Closed',
    action: '',
  },
  {
    requestId: '004',
    bondName: 'Bond ABC',
    loanAmount: '100 USDC',
    interestRate: '10%',
    bondDuration: '4 weeks',
    totalSoldBonds: '50/50',
    issuanceDate: '01/04/2025',
    maturityDate: '01/05/2025',
    status: 'Failed',
    action: '',
  },
  {
    requestId: '005',
    bondName: 'Bond ABC',
    loanAmount: '100 USDC',
    interestRate: '10%',
    bondDuration: '4 weeks',
    totalSoldBonds: '50/50',
    issuanceDate: '01/04/2025',
    maturityDate: '01/05/2025',
    status: 'Active',
    action: '',
  },
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

export const GET_BOND_REQUEST_LIMIT = 5;

export const HOLDING_BOND_STATUS_BUTTON = {
  DISABLE_CLAIM: 'DISABLE_CLAIM',
  ENABLE_CLAIM: 'ENABLE_CLAIM',
};
