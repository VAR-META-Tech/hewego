import React from 'react';
import { FCC } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, type SubmitHandler } from 'react-hook-form';

import { FormWrapper } from '@/components/ui/form';

import { transactionHistoryFilterSchema, TransactionHistoryFilterType } from '../types/schema';

const TransactionHistoryFilterFormWrapper: FCC = ({ children }) => {
  const form = useForm<TransactionHistoryFilterType>({
    resolver: zodResolver(transactionHistoryFilterSchema),
    mode: 'onTouched',
  });

  const handleSubmit: SubmitHandler<TransactionHistoryFilterType> = () => {};

  return (
    <FormWrapper form={form} onSubmit={handleSubmit} className="flex flex-col gap-10">
      {children}
    </FormWrapper>
  );
};

export default TransactionHistoryFilterFormWrapper;
