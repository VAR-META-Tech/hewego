import React from 'react';
import { FCC } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, type SubmitHandler } from 'react-hook-form';

import { FormWrapper } from '@/components/ui/form';

import { BuyBondFormType, buyBondSchema } from '../types/schema';

const BuyBondFormWrapper: FCC = ({ children }) => {
  const form = useForm<BuyBondFormType>({
    resolver: zodResolver(buyBondSchema),
  });

  const handleSubmit: SubmitHandler<BuyBondFormType> = (data) => {
    console.log('🚀 ~ data:', data);
  };

  return (
    <FormWrapper form={form} onSubmit={handleSubmit} className="flex flex-col gap-3">
      {children}
    </FormWrapper>
  );
};

export default BuyBondFormWrapper;
