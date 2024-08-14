/* eslint-disable @typescript-eslint/no-explicit-any */
import { z } from 'zod';

// Bond Request
export const bondRequestPendingFilterSchema = z.object({
  search: z.string().optional(),
  bondDuration: z.string().optional(),
});

export type BondRequestPendingFilterType = z.infer<typeof bondRequestPendingFilterSchema>;
export type BondRequestActiveFilterType = z.infer<typeof bondRequestPendingFilterSchema>;

// Bond Holdings
export const bondHoldingsFilterSchema = z.object({
  search: z.string().optional(),
});

export type BondHoldingsFilterType = z.infer<typeof bondHoldingsFilterSchema>;

// Transaction History
export const transactionHistoryFilterSchema = z.object({
  search: z.string().optional(),
  supply: z.string().optional(),
});

export type TransactionHistoryFilterType = z.infer<typeof transactionHistoryFilterSchema>;
