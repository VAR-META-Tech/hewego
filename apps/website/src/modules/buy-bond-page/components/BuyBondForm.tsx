import React from 'react';
import { cn } from '@/utils/common';
import { Button } from '@nextui-org/react';
import { useFormContext } from 'react-hook-form';

import { TextField } from '@/components/ui/FormField/TextField';
import Note from '@/components/Note';
import { HStack, VStack } from '@/components/Utilities';

import { BuyBondFormType } from '../types/schema';

const MAX = 10;

const BuyBondForm = () => {
  const {
    control,
    setValue,
    formState: { errors },
  } = useFormContext<BuyBondFormType>();

  const handleClickMax = () => {
    setValue('numberOfBond', MAX);
  };

  return (
    <HStack pos={'center'} className="flex-1">
      <VStack className="w-[25rem]">
        <HStack pos={'apart'}>
          <span>Summary</span>

          <span className="py-1 px-2.5 bg-primary-900 text-white rounded-full">Fixed</span>
        </HStack>

        <HStack spacing={0} align={'center'} className="h-16">
          <VStack spacing={0} className="flex-1 border-border border rounded-md px-4 pt-1.5 h-full overflow-hidden">
            <span className="leading-none font-semibold">Number of bond tokens to buy</span>

            <TextField
              control={control}
              name="numberOfBond"
              placeholder={String(MAX)}
              variant="underlined"
              classNames={{
                input: ['placeholder:text-default-700/50'],
                inputWrapper: ['translate-y-1', '!px-0'],
              }}
            />
          </VStack>

          <Button onClick={handleClickMax} className="bg-primary-100 text-primary-900 h-full">
            MAX
          </Button>
        </HStack>
        {errors?.numberOfBond && <span className="text-red-500">{errors?.numberOfBond?.message}</span>}

        <VStack className="pb-6 border-b border-b-border">
          <BuyDetailRow title="Price" value="1,000 USDC" />
          <BuyDetailRow title="Receive Maturity" value="100.23 USDC" />
          <BuyDetailRow title="Total Interest Payment" value="2.30 USDC" />

          <Note
            note="On close 90% of the lend side interest is paid from the borrower, and 10% is paid to platform."
            className="bg-[#BCC1CA] text-black py-2"
          />
        </VStack>

        <BuyDetailRow titleClassName="font-bold" title="Total" value="1,000 USDC" />

        <Button type="submit" size="lg" className="bg-primary-900 text-white text-lg">
          Buy
        </Button>
      </VStack>
    </HStack>
  );
};

export default BuyBondForm;

interface BuyDetailRowProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  value: string;
  titleClassName?: string;
  valueClassName?: string;
}

const BuyDetailRow: React.FC<BuyDetailRowProps> = ({ title, value, titleClassName, valueClassName, ...props }) => {
  return (
    <HStack pos={'apart'} {...props}>
      <span className={titleClassName}>{title}</span>

      <span className={cn('text-lg font-bold', valueClassName)}>{value}</span>
    </HStack>
  );
};
