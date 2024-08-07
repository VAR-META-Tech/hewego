/* eslint-disable @typescript-eslint/no-explicit-any */
import { z } from 'zod';

import { numberRequired } from '@/lib/validations/validation.utility';

export const buyBondSchema = z.object({
  numberOfBond: numberRequired,
});

export type BuyBondFormType = z.infer<typeof buyBondSchema>;
