import React from 'react';
import { FCC } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, type SubmitHandler } from 'react-hook-form';

import { FormWrapper } from '@/components/ui/form';

import { BondRequestActiveFilterType, bondRequestPendingFilterSchema } from '../types/schema';

const BondRequestActiveFilterFormWrapper: FCC = ({ children }) => {
  const form = useForm<BondRequestActiveFilterType>({
    resolver: zodResolver(bondRequestPendingFilterSchema),
    mode: 'onTouched',
  });

  const handleSubmit: SubmitHandler<BondRequestActiveFilterType> = () => {};

  return (
    <FormWrapper form={form} onSubmit={handleSubmit} className="flex flex-col gap-10">
      {children}
    </FormWrapper>
  );
};

export default BondRequestActiveFilterFormWrapper;
