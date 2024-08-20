import React from 'react';
import { Icons } from '@/assets/icons';
import { BondHoldingsFilterType } from '@/modules/my-portfolio-page/types/schema';
import { useDebouncedValue } from '@mantine/hooks';
import { useFormContext } from 'react-hook-form';

import { TextField } from '@/components/ui/FormField/TextField';
import { HStack, VStack } from '@/components/Utilities';

interface Props {
  handleSearchChange: (filter: BondHoldingsFilterType) => void;
}

const BondHoldingsFilter: React.FC<Props> = ({ handleSearchChange }) => {
  const { control, watch } = useFormContext<BondHoldingsFilterType>();

  const [search] = watch(['search']);
  const [searchDebounced] = useDebouncedValue(search, 300);

  React.useEffect(() => {
    handleSearchChange({
      search: searchDebounced,
    });
  }, [handleSearchChange, searchDebounced]);

  return (
    <HStack pos={'apart'} align={'center'}>
      <VStack>
        <span className="text-3xl font-bold">Bond Holdings</span>

        <span>
          <span className="underline">Note:</span> Bonds will be available to claim on the issuance date.
        </span>
      </VStack>

      <div>
        <TextField
          variant="bordered"
          name="search"
          control={control}
          placeholder="Search by bond name"
          startContent={<Icons.search />}
        />
      </div>
    </HStack>
  );
};

export default BondHoldingsFilter;
