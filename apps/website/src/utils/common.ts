/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { AccountAllowanceApproveTransaction, TokenAssociateTransaction } from '@hashgraph/sdk';
import { Signer } from '@hashgraph/sdk/lib/Signer';
import axios from 'axios';
import { clsx, type ClassValue } from 'clsx';
import { format } from 'date-fns';
import bigDecimal from 'js-big-decimal';
import { RoundingModes } from 'js-big-decimal/dist/node/roundingModes';
import Long from 'long';
import { toast } from 'sonner';
import { extendTailwindMerge } from 'tailwind-merge';
import { parseUnits as ethersParseUnits, formatUnits } from 'viem';

import { getMutateError } from '../lib/getMutateError';
import { AMOUNT_PREVENT_KEYS, DATETIME_FORMAT, env, LOOK_UP, NUMBER_PREVENT_KEYS, TOKEN_UNIT } from './constants';
import * as util from './util';

const twMerge = extendTailwindMerge({});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * @param {Uint8Array} data
 * @returns {string}
 */
export function encode(data: any) {
  return Buffer.from(data).toString('hex');
}

/**
 * @param {string} text
 * @returns {Uint8Array}
 */
export function decode(text: string) {
  const str = text.startsWith('0x') ? text.substring(2) : text;
  return Buffer.from(str, 'hex');
}

export const prettyNumber = (number: number | string, digits = 3, separator = ',') =>
  bigDecimal.getPrettyValue(number, digits, separator);

export const roundNumber = (
  number: string | number,
  round = 2,
  roundMode: RoundingModes = bigDecimal.RoundingModes.DOWN
) => bigDecimal.round(number, round, roundMode);

export const convertHederaAccountIdToEvmAddress = (shard: number, realm: number, account: number): string => {
  const shardHex = shard.toString(16).padStart(2, '0');
  const realmHex = realm.toString(16).padStart(8, '0');
  const accountHex = account.toString(16).padStart(16, '0');

  const evmAddress = '0x' + shardHex + realmHex + accountHex;
  return evmAddress;
};

export const convertEvmAddressToHederaAccountId = (evmAddress: string) => {
  const addr = evmAddress.startsWith('0x') ? decode(evmAddress.slice(2)) : decode(evmAddress);

  if (addr.length !== 20) {
    throw new Error(`Invalid hex encoded solidity evmAddress length:
                expected length 40, got length ${evmAddress.length}`);
  }

  const shard = Long.fromBytesBE([0, 0, 0, 0, ...Array.from(addr.slice(0, 4))]);
  const realm = Long.fromBytesBE(Array.from(addr.slice(4, 12)));
  const num = Long.fromBytesBE(Array.from(addr.slice(12, 20)));

  return [shard, realm, num];
};

export function toSolidityAddress(address: string) {
  const buffer = new Uint8Array(20);
  const view = util.safeView(buffer);
  const [shard, realm, num] = convertEvmAddressToHederaAccountId(address);

  view.setUint32(0, util.convertToNumber(shard));
  view.setUint32(8, util.convertToNumber(realm));
  view.setUint32(16, util.convertToNumber(num));

  return encode(buffer);
}

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

export const parseUnits = (num: any, decimal = 18) => {
  return ethersParseUnits(String(num ?? '0'), decimal);
};

export const formatDate = (date: string | Date | undefined, formatString?: string): string => {
  if (!date) return '';

  const formattedDate = format(new Date(date), formatString || DATETIME_FORMAT.MONTH_DATE_YEAR);

  return formattedDate;
};

export const formatDateRange = (date: Date, time: string) => {
  const formatRange = date ? formatDate(date!, DATETIME_FORMAT.DATE_TIME) : null;
  const formatTimeRange = time && formatRange ? `${formatDate(date!, DATETIME_FORMAT.DATE_TIME)} ${time}` : null;

  return {
    formatRange,
    formatTimeRange,
  };
};

export const formatTime = (date: string | Date, formatString?: string): string => {
  if (!date) return '';

  const formattedTime = format(new Date(date), formatString || 'HH:mm');

  return formattedTime;
};

export const getTokensAssociated = async (accountId: string) => {
  try {
    const response = await axios.get(`${env.HEDERA_URL}/api/v1/accounts/${accountId}/tokens`);

    return response?.data?.tokens;
  } catch (error) {
    throw new Error(error as string);
  }
};

export const checkAssociate = async (tokenId: string, accountId: string) => {
  if (!accountId) return;

  try {
    const tokens = await getTokensAssociated(accountId);

    const token = tokens?.find((token: any) => token?.token_id === tokenId);

    if (token) return true;

    return false;
  } catch (error) {
    throw new Error(error as string);
  }
};

export const associateToken = async (tokenId: string, accountId: string, signer: Signer) => {
  try {
    const transaction = await new TokenAssociateTransaction()
      .setAccountId(accountId)
      .setTokenIds([tokenId])
      .freezeWithSigner(signer);

    const signTx = await transaction.signWithSigner(signer);
    const txResponse = await signTx.executeWithSigner(signer);

    return txResponse?.transactionId;
  } catch (error) {
    throw new Error(error as string);
  }
};

export const convertEvmAddressToAccountId = (address: string) => {
  const [shard, realm, num] = convertEvmAddressToHederaAccountId(address);
  const accountId = `${shard.toString()}.${realm.toString()}.${num.toString()}`;

  return accountId;
};

export const approveToken = async ({
  provider,
  signer,
  accountId,
  tokenId,
  contractId,
  tokenUnit,
}: {
  provider: any;
  signer: Signer;
  accountId: string;
  tokenId: string;
  contractId: string;
  tokenUnit: number;
}) => {
  try {
    if (!provider) return;

    const contractApproveTx = await new AccountAllowanceApproveTransaction()
      .approveTokenAllowance(tokenId, accountId, contractId, Number(parseUnits(Number('99999999999999'), tokenUnit)))
      .freezeWithSigner(signer);

    const contractApproveSign = await contractApproveTx?.signWithSigner(signer);

    const contractApproveSubmit = await contractApproveSign?.executeWithSigner(signer).catch((e) => toast.error(e));

    return (contractApproveSubmit as any)?.transactionId;
  } catch (error) {
    throw new Error(error as string);
  }
};

export const getBalance = async (tokenId: string, accountId: string) => {
  const tokens = await getTokensAssociated(accountId);

  if (tokens?.length) {
    const balance = formatUnits(
      BigInt(tokens?.find((token: any) => token?.token_id === tokenId)?.balance || 0),
      Number(TOKEN_UNIT)
    );

    return balance || 0;
  }

  return 0;
};

export const currentNo = (no: number, page: number, limit: number) => {
  return no + 1 + (Number(page) - 1) * Number(limit);
};

export function nFormatter(num: number, digits = 1) {
  const regexp = /\.0+$|(?<=\.[0-9]*[1-9])0+$/;
  const item = LOOK_UP.findLast((item) => num >= item.value);
  return item ? (num / item.value).toFixed(digits).replace(regexp, '').concat(item.symbol) : '0';
}
