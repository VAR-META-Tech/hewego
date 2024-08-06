/* eslint-disable @typescript-eslint/no-explicit-any */
import { z } from 'zod';

import { numberRequired, validationMessages } from '@/lib/validations/validation.utility';

export const issueBondSchema = z.object({
  name: z.string({
    required_error: validationMessages.required(),
  }),
  loanToken: z.any(),
  loanAmount: z
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
      if (Number(data) < 1000) return false;

      return true;
    }, 'This field must be greater than 1000 units'),
  volumeBond: numberRequired,
  durationBond: z.string({
    required_error: validationMessages.required(),
  }),
  borrowInterestRate: z
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
      if (Number(data) > 20) return false;

      return true;
    }, validationMessages.lt(20)),
  lenderInterestRate: numberRequired,
  minimumCollateralAmount: numberRequired,
  collateralToken: z.any(),
  issuanceDate: z.string({
    required_error: validationMessages.required(),
  }),
  matuityDate: z.string({
    required_error: validationMessages.required(),
  }),
});

export type IssueBondFormType = z.infer<typeof issueBondSchema>;
