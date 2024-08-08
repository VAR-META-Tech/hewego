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
  ACCOUNT_ID: process.env.NEXT_PUBLIC_ACCOUNT_ID || '',
};

export const HASHCONNECT_DEBUG_MODE = false;

export const DATE_FORMAT = {
  DD_MM_YYYY: 'dd/MM/yyyy',
  YYYY_MM_DD: 'YYYY-MM-dd',
};

export const COOKIES_KEY = {
  ACCESS_TOKEN: 'access_token',
  REFRESH_TOKEN: 'refresh_token',
};
