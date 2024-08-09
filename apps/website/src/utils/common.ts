/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import axios from 'axios';
import { clsx, type ClassValue } from 'clsx';
import bigDecimal from 'js-big-decimal';
import { RoundingModes } from 'js-big-decimal/dist/node/roundingModes';
import { toast } from 'sonner';
import { extendTailwindMerge } from 'tailwind-merge';

import { getMutateError } from '../lib/getMutateError';
import { AMOUNT_PREVENT_KEYS, env, NUMBER_PREVENT_KEYS } from './constants';

const twMerge = extendTailwindMerge({});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const prettyNumber = (number: number | string, digits = 3, separator = ',') =>
  bigDecimal.getPrettyValue(number, digits, separator);

export const roundNumber = (
  number: string | number,
  round = 8,
  roundMode: RoundingModes = bigDecimal.RoundingModes.DOWN
) => bigDecimal.round(number, round, roundMode);

export const convertHederaAccountIdToEvmAddress = (shard: number, realm: number, account: number): string => {
  const shardHex = shard.toString(16).padStart(2, '0');
  const realmHex = realm.toString(16).padStart(8, '0');
  const accountHex = account.toString(16).padStart(16, '0');

  const evmAddress = '0x' + shardHex + realmHex + accountHex;
  return evmAddress;
};

export const getAccountByAddressOrAccountId = async (value: any) => {
  const { data } = await axios.get(`${env.HEDERA_URL}/api/v1/accounts/${value}`);

  return data;
};

export const onMutateError = (err: any) => {
  toast.error(getMutateError(err));
};

export const convertMarutiryDateToISO = (value: number, type: 'month' | 'week' = 'month') => {
  const today = new Date(new Date().setDate(new Date().getDate() + 7));

  const newDate = new Date(today);

  if (type === 'month') {
    newDate.setMonth(newDate.getMonth() + value);
  } else {
    newDate.setDate(newDate.getDate() + value);
  }

  return newDate.toISOString();
};

export const onPreventNumberKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
  NUMBER_PREVENT_KEYS.includes(event.key) && event.preventDefault();
};

export const onPreventAmountKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
  AMOUNT_PREVENT_KEYS.includes(event.key) && event.preventDefault();
};

export const range = (start: number, end: number) => {
  const length = end - start + 1;
  /*
    Create an array of certain length and set the elements within it from
    start value to end value.
  */
  return Array.from({ length }, (_, idx) => idx + start);
};
