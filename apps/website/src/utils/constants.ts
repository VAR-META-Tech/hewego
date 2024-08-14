const isProduction = process.env.NODE_ENV === 'production';

export const HEDERA_CONFIG = {
  name: `hedera`,
  description: 'Description',
  icon: '/favicon.ico',
};

export const env = {
  isProduction,
  APP_URL: process.env.NEXT_PUBLIC_APP_URL || '',
  API_URL: process.env.NEXT_PUBLIC_API_URL || '',
  NETWORK_TYPE: (process.env.NEXT_PUBLIC_NETWORK_TYPE || 'testnet') as 'testnet' | 'mainnet' | 'previewnet',
  SIGNATURE_TEXT: process.env.NEXT_PUBLIC_SIGNATURE_TEXT || '',
  HEDERA_URL: process.env.NEXT_PUBLIC_HEDERA_URL || '',
};

export const HASHCONNECT_DEBUG_MODE = false;

export const DATE_FORMAT = {
  DD_MM_YYYY: 'dd/MM/yyyy',
  YYYY_MM_DD: 'YYYY-MM-dd',
  MMM_DD_YYYY: 'MMM dd, yyyy',
};

export const COOKIES_KEY = {
  ACCESS_TOKEN: 'access_token',
  REFRESH_TOKEN: 'refresh_token',
};

export const TOKEN_TYPE = {
  LOAN: 'LOAN',
  COLLATERAL: 'COLLATERAL',
};

export const DATETIME_FORMAT = {
  FULL_DATE_TIME: "yyyy-M-dd'T'HH:mm:ss.SSSX",
  DATETIME_SECONDS: 'dd/MM/yyyy HH:mm:ss',
  DATETIME_SECONDS_GTM: 'DD/MM/yyyy HH:mm:ss [GMT]Z',
  MONTH_DATE_YEAR: 'LLL dd, y',
  DATE_MONTH_YEAR: 'dd LLL yyyy',
  DATETIME_MINUTES: 'dd/MM/yyyy HH:mm',
  REVERT_DATETIME: 'yyyy-MM-dd HH:mm',
  DATETIME_MINUTES_HYPHEN: 'DD-MM-YYYY HH:mm',
  DATE_TIME: 'yyyy-MM-dd',
  DATE_YEAR: 'dd-MM-yyyy',
  DATE_TIME_SECONDS: 'YYYY-MM-DD HH:mm:ss',
  HOUR_MINUTES: 'HH:mm',
  MONTH_YEAR: 'MMM yyyy',
};

export const TIME_FORMAT = {
  HOUR_MIN: 'hh:mm a',
};

export const NUMBER_PREVENT_KEYS = ['e', 'E', '+', '-'];
export const AMOUNT_PREVENT_KEYS = [...NUMBER_PREVENT_KEYS, '.'];

export const TOKEN_UNIT = 8;

export const PLATFORM_FEE = 5;

export const CONTRACT_ID = process.env.NEXT_PUBLIC_CONTRACT_ID || '0.0.4673119';
export const COLLATERAL_CONTRACT_ID = process.env.NEXT_PUBLIC_COLLATERAL_CONTRACT_ID || '0.0.4673010';
export const LOAN_CONTRACT_ID = process.env.NEXT_PUBLIC_LOAN_CONTRACT_ID || '0.0.4673011';

export const CONTRACT_ADDRESS =
  process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || '0xCCCdc46d7930c89517817e14B6c79262f8984202';
