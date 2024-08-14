import React from 'react';
import { Icons } from '@/assets/icons';
import { TransactionHistoryFilterType } from '@/modules/my-portfolio-page/types/schema';
import { useFormContext } from 'react-hook-form';

import { useGetMetaToken } from '@/hooks/useGetMetaToken';
import { SelectField } from '@/components/ui/FormField/SelectField';
import { TextField } from '@/components/ui/FormField/TextField';
import { HStack, VStack } from '@/components/Utilities';

const TransactionHistoryFilter = () => {
  const { control } = useFormContext<TransactionHistoryFilterType>();
  const { borrowTokenData } = useGetMetaToken();

  return (
    <HStack pos={'apart'} spacing={20}>
      <VStack>
        <span className="text-3xl font-bold">Transaction History </span>
        <span className="underline">Track your interest and loan maturity payments</span>
      </VStack>

      <HStack noWrap spacing={20}>
        <TextField
          name="search"
          control={control}
          placeholder="Search by transaction hash/transaction ID"
          variant="bordered"
          startContent={<Icons.search />}
          className="w-96"
          onValueChange={(value) => {
            console.log(value);
          }}
        />

        <SelectField
          aria-label="supply"
          data={borrowTokenData}
          variant="bordered"
          name="supply"
          control={control}
          placeholder="Supply"
          classNames={{
            trigger: 'w-40',
            listboxWrapper: 'max-h-[400px]',
            popoverContent: 'rounded-sm',
          }}
          listboxProps={{
            itemClasses: {
              base: ['data-[selectable=true]:focus:bg-default-50', 'data-[focus-visible=true]:ring-default-500'],
            },
          }}
          onSelectionChange={(value) => {
            console.log(value?.currentKey);
          }}
        />
      </HStack>
    </HStack>
  );
};

export default TransactionHistoryFilter;
