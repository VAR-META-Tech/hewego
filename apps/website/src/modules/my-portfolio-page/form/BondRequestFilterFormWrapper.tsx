import React from 'react';
import { FCC } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, type SubmitHandler } from 'react-hook-form';

import { FormWrapper } from '@/components/ui/form';

import { bondRequestFilterSchema, BondRequestFilterType } from '../types/schema';

const BondRequestFilterFormWrapper: FCC = ({ children }) => {
  const form = useForm<BondRequestFilterType>({
    resolver: zodResolver(bondRequestFilterSchema),
    mode: 'onTouched',
  });

  const handleSubmit: SubmitHandler<BondRequestFilterType> = () => {};

  return (
    <FormWrapper form={form} onSubmit={handleSubmit} className="flex flex-col gap-3">
      {children}
    </FormWrapper>
  );
};

export default BondRequestFilterFormWrapper;
