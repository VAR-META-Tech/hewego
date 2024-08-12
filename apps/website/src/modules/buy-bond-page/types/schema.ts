/* eslint-disable @typescript-eslint/no-explicit-any */
import { z } from 'zod';

import { validationMessages } from '@/lib/validations/validation.utility';

export const buyBondSchema = z.object({
  numberOfBond: z
    .number({ required_error: validationMessages.required() })
    .or(z.string().transform(Number))
    .refine((data: any) => {
      if (!data || data === '') return false;
      return true;
    }, validationMessages.required())
    .refine((data) => {
      if (Number.isNaN(Number(data))) return false;
      return true;
    }, validationMessages.number())
    .refine((data) => {
      if (Number(data) < 10) return false;
      return true;
    }, 'Minimum number of bonds is 10'),
});

export type BuyBondFormType = z.infer<typeof buyBondSchema>;
