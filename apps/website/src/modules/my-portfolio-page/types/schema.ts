/* eslint-disable @typescript-eslint/no-explicit-any */
import { z } from 'zod';

export const bondRequestFilterSchema = z.object({
  search: z.string().optional(),
  bondDuration: z.string().optional(),
  status: z.string().optional(),
});

export const bondHoldingsFilterSchema = z.object({
  search: z.string().optional(),
});

export type BondRequestFilterType = z.infer<typeof bondRequestFilterSchema>;
export type BondHoldingsFilterType = z.infer<typeof bondHoldingsFilterSchema>;
