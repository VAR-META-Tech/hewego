/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import { clsx, type ClassValue } from 'clsx';
import { toast } from 'sonner';
import { extendTailwindMerge } from 'tailwind-merge';

import { getMutateError } from '../lib/getMutateError';
import { HEDERA_URL } from './constants';

const twMerge = extendTailwindMerge({});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const convertHederaAccountIdToEvmAddress = (shard: number, realm: number, account: number): string => {
  const shardHex = shard.toString(16).padStart(2, '0');
  const realmHex = realm.toString(16).padStart(8, '0');
  const accountHex = account.toString(16).padStart(16, '0');

  const evmAddress = '0x' + shardHex + realmHex + accountHex;
  return evmAddress;
};

export const getAccountByAddressOrAccountId = async (value: any) => {
  const { data } = await axios.get(`${HEDERA_URL}/api/v1/accounts/${value}`);

  return data;
};

export const onMutateError = (err: any) => {
  toast.error(getMutateError(err));
};
