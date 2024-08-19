import React from 'react';
import { Icons } from '@/assets/icons';
import { TransactionHistoryFilterType } from '@/modules/my-portfolio-page/types/schema';
import { TRANSACTION_TYPE_DATA } from '@/modules/my-portfolio-page/utils/const';
import { useDebouncedValue } from '@mantine/hooks';
import { useFormContext } from 'react-hook-form';

import { useGetMetaToken } from '@/hooks/useGetMetaToken';
import { SelectField } from '@/components/ui/FormField/SelectField';
import { TextField } from '@/components/ui/FormField/TextField';
import { HStack, VStack } from '@/components/Utilities';

interface Props {
  handleSearchChange: (values: TransactionHistoryFilterType) => void;
}

const TransactionHistoryFilter: React.FC<Props> = ({ handleSearchChange }) => {
  const { control, watch } = useFormContext<TransactionHistoryFilterType>();
  const { tokenData } = useGetMetaToken();
  const [token, setToken] = React.useState(new Set([]));
  const [type, setType] = React.useState(new Set([]));

  const [search] = watch(['search']);

  const [searchDebounced] = useDebouncedValue(search, 300);

  React.useEffect(() => {
    handleSearchChange({
      search: searchDebounced,
    });
  }, [handleSearchChange, searchDebounced]);

  React.useEffect(() => {
    handleSearchChange({
      token: Array.from(token).join(', '),
    });
  }, [handleSearchChange, token]);

  React.useEffect(() => {
    handleSearchChange({
      transactionType: Array.from(type).join(', '),
    });
  }, [handleSearchChange, type]);

  return (
    <HStack pos={'apart'} spacing={20}>
      <VStack>
        <span className="text-3xl font-bold">Transaction History</span>
        <span>View your loan claims, collateral deposits, and repayments</span>
      </VStack>

      <HStack noWrap spacing={20} pos={'apart'} className="w-full">
        <TextField
          name="search"
          control={control}
          placeholder="Search by transaction hash/transaction ID"
          variant="bordered"
          startContent={<Icons.search />}
          className="w-96"
        />

        <HStack>
          <SelectField
            aria-label="transactionType"
            selectionMode="multiple"
            data={TRANSACTION_TYPE_DATA}
            variant="bordered"
            name="transactionType"
            control={control}
            placeholder="Select Transaction Type"
            selectedKeys={type}
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onSelectionChange={setType as any}
            classNames={{
              trigger: 'w-60',
              listboxWrapper: 'max-h-[400px]',
              popoverContent: 'rounded-sm',
            }}
            listboxProps={{
              itemClasses: {
                base: ['data-[selectable=true]:focus:bg-default-50', 'data-[focus-visible=true]:ring-default-500'],
              },
            }}
          />
          <SelectField
            aria-label="token"
            selectionMode="multiple"
            name="token"
            variant="bordered"
            control={control}
            placeholder="Asset Type"
            data={tokenData}
            selectedKeys={token}
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onSelectionChange={setToken as any}
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
          />
        </HStack>
      </HStack>
    </HStack>
  );
};

export default React.memo(TransactionHistoryFilter);
