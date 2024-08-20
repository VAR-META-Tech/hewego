/* eslint-disable @typescript-eslint/no-explicit-any */
import { z } from 'zod';

import { validationMessages } from '@/lib/validations/validation.utility';

export const buyBondSchema = (maxNumberOfBond: number) => {
  return z.object({
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
      }, 'Minimum number of bonds is 10')
      .refine((data) => {
        if (Number(data) > Number(maxNumberOfBond)) return false;
        return true;
      }, `The entered value exceeds the maximum allowed limit of ${maxNumberOfBond}`),
  });
};

export type BuyBondFormType = z.infer<ReturnType<typeof buyBondSchema>>;
