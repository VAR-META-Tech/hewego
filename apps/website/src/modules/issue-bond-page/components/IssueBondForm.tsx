import React from 'react';
import { onPreventAmountKeyDown, onPreventNumberKeyDown } from '@/utils/common';
import { useFormContext } from 'react-hook-form';

import { useGetMetaToken } from '@/hooks/useGetMetaToken';
import { SelectField } from '@/components/ui/FormField/SelectField';
import { SliderField } from '@/components/ui/FormField/SliderField';
import { TextField } from '@/components/ui/FormField/TextField';
import { HStack, VStack } from '@/components/Utilities';

import { IssueBondFormType } from '../types/schema';
import { BOND_DURATION_DATA } from '../utils/const';

const IssueBondForm = () => {
  const { control, setValue } = useFormContext<IssueBondFormType>();
  const { borrowTokenData, collateralTokenData, isSuccess } = useGetMetaToken();

  React.useEffect(() => {
    if (isSuccess && !!borrowTokenData?.length) {
      setValue('loanToken', borrowTokenData[0]?.value);
    }
  }, [borrowTokenData, isSuccess, setValue]);

  React.useEffect(() => {
    if (isSuccess && !!collateralTokenData?.length) {
      setValue('collateralToken', collateralTokenData[0]?.value);
    }
  }, [collateralTokenData, isSuccess, setValue]);

  return (
    <VStack spacing={24} className="flex-1">
      <TextField
        size="lg"
        radius="md"
        variant="bordered"
        label="Name of bond"
        placeholder="Enter the name of bond"
        name="name"
        control={control}
        classNames={{
          input: 'text-lg',
          inputWrapper: 'bg-white h-16 shadow-md',
        }}
      />

      <TextField
        classNames={{
          input: 'text-lg font-medium',
          inputWrapper: 'bg-white h-16 shadow-md',
        }}
        size="lg"
        radius="md"
        variant="bordered"
        placeholder="1000"
        type="number"
        label="Loan"
        name="loanAmount"
        control={control}
        onKeyDown={onPreventAmountKeyDown}
        endContent={
          <SelectField
            data={borrowTokenData}
            name="loanToken"
            control={control}
            classNames={{
              trigger: 'w-28',
              popoverContent: 'rounded-sm',
            }}
          />
        }
      />

      <TextField
        disabled
        classNames={{
          input: 'text-lg font-medium bg-gray-200',
          inputWrapper: 'h-16 shadow-md',
        }}
        size="lg"
        radius="md"
        type="number"
        variant="bordered"
        label="Collateral"
        name="minimumCollateralAmount"
        control={control}
        endContent={
          <SelectField
            data={collateralTokenData}
            name="collateralToken"
            control={control}
            classNames={{
              trigger: 'w-28',
              popoverContent: 'rounded-sm',
            }}
          />
        }
      />

      <HStack align={'start'} pos={'apart'} spacing={20} noWrap>
        <div className="flex-1">
          <SelectField
            aria-label="durationBond"
            data={BOND_DURATION_DATA}
            label="Bond Term"
            name="durationBond"
            control={control}
            fullWidth
            className="h-16"
            classNames={{
              trigger: '!h-16 shadow-md bg-white',
              popoverContent: 'rounded-sm',
              mainWrapper: '!h-16',
            }}
            onKeyDown={onPreventNumberKeyDown}
          />
        </div>
        <div className="flex-1">
          <SliderField
            className="flex-1"
            label="Borrower's Interest Rate"
            name="borrowInterestRate"
            control={control}
            step={1}
            maxValue={20}
            minValue={3}
            defaultValue={3}
            size="md"
          />
        </div>
      </HStack>
    </VStack>
  );
};

export default IssueBondForm;
