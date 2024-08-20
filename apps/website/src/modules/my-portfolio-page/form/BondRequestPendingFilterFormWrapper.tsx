import React from 'react';
import { FCC } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, type SubmitHandler } from 'react-hook-form';

import { FormWrapper } from '@/components/ui/form';

import { bondRequestPendingFilterSchema, BondRequestPendingFilterType } from '../types/schema';

const BondRequestPendingFilterFormWrapper: FCC = ({ children }) => {
  const form = useForm<BondRequestPendingFilterType>({
    resolver: zodResolver(bondRequestPendingFilterSchema),
    mode: 'onTouched',
  });

  const handleSubmit: SubmitHandler<BondRequestPendingFilterType> = () => {};

  return (
    <FormWrapper form={form} onSubmit={handleSubmit} className="flex flex-col gap-10">
      {children}
    </FormWrapper>
  );
};

export default BondRequestPendingFilterFormWrapper;
