export const production = process.env.NODE_ENV === 'production';

export const HEDERA_CONFIG = {
  name: `hedera`,
  description: 'Description',
  icon: '/favicon.ico',
};

export const NETWORK_TYPE = 'testnet';

export const SIGNATURE_TEXT = process.env.NEXT_PUBLIC_SIGNATURE_TEXT;

export const HEDERA_URL = 'https://testnet.mirrornode.hedera.com';

export const HASHCONNECT_DEBUG_MODE = false;
