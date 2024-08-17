/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Icons } from '@/assets/icons';
import { useBondRequestStore } from '@/modules/my-portfolio-page/store/useBondRequestStore';
import { BondRequestPendingFilterType } from '@/modules/my-portfolio-page/types/schema';
import { LOAN_TERM_FILTER_DATA } from '@/modules/my-portfolio-page/utils/const';
import { useDebouncedValue } from '@mantine/hooks';
import { DateRangePicker } from '@nextui-org/react';
import { useFormContext } from 'react-hook-form';

import { SelectField } from '@/components/ui/FormField/SelectField';
import { TextField } from '@/components/ui/FormField/TextField';
import { VStack } from '@/components/Utilities';

interface Props {
  handleSearchChange: (filter: BondRequestPendingFilterType) => void;
}

const BondRequestsPendingFilter: React.FC<Props> = ({ handleSearchChange }) => {
  const setPendingIssuanceDateRange = useBondRequestStore.use.setPendingIssuanceDateRange();
  const { control, watch } = useFormContext<BondRequestPendingFilterType>();
  const [bondDuration, setBondDuration] = React.useState(new Set([]));

  const [search] = watch(['search']);

  const [searchDebounced] = useDebouncedValue(search, 300);

  React.useEffect(() => {
    handleSearchChange({
      search: searchDebounced,
    });
  }, [handleSearchChange, searchDebounced]);

  React.useEffect(() => {
    handleSearchChange({
      bondDuration: Array.from(bondDuration).join(', '),
    });
  }, [bondDuration, handleSearchChange]);

  return (
    <VStack spacing={20}>
      <div className="grid grid-cols-4 gap-5">
        <div className="col-span-4 md:col-span-4 xl:col-span-1">
          <TextField
            name="search"
            control={control}
            placeholder="Search by bond name"
            startContent={<Icons.search />}
            variant="bordered"
          />
        </div>
        <div className="hidden xl:block xl:col-span-1"></div>

        <div className="col-span-4 md:col-span-2 xl:col-span-1">
          <SelectField
            aria-label="Bond Duration"
            selectionMode="multiple"
            name="bondDuration"
            variant="bordered"
            control={control}
            placeholder="Select Bond Duration"
            data={LOAN_TERM_FILTER_DATA}
            selectedKeys={bondDuration}
            onSelectionChange={setBondDuration as any}
          />
        </div>

        <div className="col-span-4 md:col-span-2 xl:col-span-1">
          <DateRangePicker
            variant="bordered"
            placeholder="Select Issuance Date Range"
            onChange={(date) => {
              setPendingIssuanceDateRange({
                start: date?.start as any,
                end: date.end as any,
              });
            }}
          />
        </div>
      </div>
    </VStack>
  );
};

export default BondRequestsPendingFilter;
