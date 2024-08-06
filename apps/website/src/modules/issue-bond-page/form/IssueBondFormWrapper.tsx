import React from 'react';
import { FCC } from '@/types';
import { convertMarutiryDateToISO } from '@/utils/common';
import { DATE_FORMAT } from '@/utils/constants';
import { zodResolver } from '@hookform/resolvers/zod';
import { useDebouncedValue } from '@mantine/hooks';
import { format } from 'date-fns';
import { useForm, type SubmitHandler } from 'react-hook-form';

import { FormWrapper } from '@/components/ui/form';

import { IssueBondFormType, issueBondSchema } from '../types/schema';

const IssueBondFormWrapper: FCC = ({ children }) => {
  const form = useForm<IssueBondFormType>({
    resolver: zodResolver(issueBondSchema),
  });

  const [durationBond, borrowInterestRate] = form.watch(['durationBond', 'borrowInterestRate']);

  const [borrowInterestRateDebounced] = useDebouncedValue(borrowInterestRate, 200);

  React.useEffect(() => {
    if (borrowInterestRateDebounced) {
      form.setValue('lenderInterestRate', borrowInterestRateDebounced);
    }
  }, [borrowInterestRateDebounced, form]);

  React.useEffect(() => {
    form.setValue(
      'issuanceDate',
      format(new Date(new Date().setDate(new Date().getDate() + 7)).toISOString().slice(0, 10), DATE_FORMAT.DD_MM_YYYY)
    );
  }, [form]);

  React.useEffect(() => {
    if (!durationBond) return;

    const type = durationBond.includes('month') ? 'month' : 'week';
    const dayCount = type === 'month' ? 1 : 7;
    const newDate = convertMarutiryDateToISO(Number(durationBond.split(' ')[0]) * dayCount, type);

    form.setValue('matuityDate', format(new Date(newDate).toISOString().slice(0, 10), DATE_FORMAT.DD_MM_YYYY));
  }, [durationBond, form]);

  const handleSubmit: SubmitHandler<IssueBondFormType> = (data) => {
    console.log(data);
  };

  return (
    <FormWrapper form={form} onSubmit={handleSubmit} className="flex flex-col gap-3">
      {children}
    </FormWrapper>
  );
};

export default IssueBondFormWrapper;
