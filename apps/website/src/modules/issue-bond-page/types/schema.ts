/* eslint-disable @typescript-eslint/no-explicit-any */
import { z } from 'zod';

import { validationMessages } from '@/lib/validations/validation.utility';

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
    }, 'This field must be greater than 1,000 units')
    .refine((data) => {
      if (Number(data) % 100 !== 0) return false;

      return true;
    }, 'The entered value must be divisible by 100.')
    .refine((data) => {
      if (Number(data) > 1000000) return false;

      return true;
    }, 'This field must be a maximum of 1,000,000 units'),
  volumeBond: z.any(),
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
      if (Number(data) < 3) return false;

      return true;
    }, validationMessages.gte(3))
    .refine((data) => {
      if (Number(data) > 20) return false;

      return true;
    }, validationMessages.lt(20)),
  lenderInterestRate: z.any(),
  minimumCollateralAmount: z.any(),
  collateralToken: z.any(),
  issuanceDate: z.string({
    required_error: validationMessages.required(),
  }),
  maturityDate: z.any(),
  totalRepaymentAmount: z.any(),
});

export type IssueBondFormType = z.infer<typeof issueBondSchema>;
