import React from 'react';
import { FCC } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, type SubmitHandler } from 'react-hook-form';

import { FormWrapper } from '@/components/ui/form';

import { bondHoldingsFilterSchema, BondHoldingsFilterType } from '../types/schema';

const BondHoldingsFilterFormWrapper: FCC = ({ children }) => {
  const form = useForm<BondHoldingsFilterType>({
    resolver: zodResolver(bondHoldingsFilterSchema),
    mode: 'onTouched',
  });

  const handleSubmit: SubmitHandler<BondHoldingsFilterType> = () => {};

  return (
    <FormWrapper form={form} onSubmit={handleSubmit} className="flex flex-col gap-10">
      {children}
    </FormWrapper>
  );
};

export default BondHoldingsFilterFormWrapper;
