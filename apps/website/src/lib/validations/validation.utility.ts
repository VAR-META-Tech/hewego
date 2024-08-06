/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ZodTypeAny } from 'zod';
import { z } from 'zod';

const emptyStringToUndefined = z.literal('').transform(() => undefined);

export function asOptionalField<T extends ZodTypeAny>(schema: T) {
  return schema.optional().or(emptyStringToUndefined);
}

export const validationMessages = {
  required: (field?: string) => (field ? `${field} field is required` : 'This field is required'),
  number: (field?: string) => (field ? `${field} must be a number` : 'This field must be a number'),
  between: (min: number, max: number, field?: string) =>
    field
      ? `Sorry, your ${field.toLowerCase()} must be between ${min} and ${max} characters long`
      : `Sorry, this field must be between ${min} and ${max} characters long`,
  max: (max: number, field?: string) =>
    field
      ? `Sorry, your ${field.toLowerCase()} must be at most ${max} characters long`
      : `Sorry, this field must be at most ${max} characters long`,
  gt: (min: number, field?: string) =>
    field ? `${field} must be at least ${min} characters` : `This field must be at least ${min} characters`,
  gte: (min: number, field?: string) =>
    field ? `${field} must be greater than or equal to ${min}` : `This field must be greater than or equal to ${min}`,
  lt: (max: number, field?: string) =>
    field ? `${field} must be smaller than ${max}` : `This field must be smaller than ${max}`,
  lte: (max: number, field?: string) =>
    field ? `${field} must be smaller than or equal to ${max}` : `This field must be smaller than or equal ${max}`,
  specialCharacters: () =>
    "This field can only contain the following special characters: '-', '_', ' '. No other special characters are allowed",
  emoji: () => 'No other emoji characters are allowed',
  invalid: (field?: string) => (field ? `This is not a valid ${field}` : 'This is not a valid field'),
  email: () => 'Please enter your valid email address.',
  ethereumAddress: () => 'Please enter your valid Ethereum Wallet Address.',
};

export const numberRequired = z
  .number({ required_error: validationMessages.required() })
  .or(z.string().transform(Number))
  .refine((data: any) => {
    if (!data || data === '') return false;
    return true;
  }, validationMessages.required())
  .refine((data) => {
    if (Number.isNaN(Number(data))) return false;
    return true;
  }, validationMessages.number());

export function stringRefine<T extends ZodTypeAny>(schema: T) {
  return schema.optional().or(emptyStringToUndefined);
}
