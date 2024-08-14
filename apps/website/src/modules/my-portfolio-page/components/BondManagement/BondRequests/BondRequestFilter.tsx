import React from 'react';
import { Icons } from '@/assets/icons';
import { BondRequestFilterType } from '@/modules/my-portfolio-page/types/schema';
import { cn } from '@/utils/common';
import { Button } from '@nextui-org/react';
import { useFormContext } from 'react-hook-form';

import { SelectField } from '@/components/ui/FormField/SelectField';
import { TextField } from '@/components/ui/FormField/TextField';
import { HStack, VStack } from '@/components/Utilities';

interface Props {
  isOpenFilter: boolean;
  setIsOpenFilter: React.Dispatch<React.SetStateAction<boolean>>;
}

const BondRequestFilter: React.FC<Props> = ({ isOpenFilter, setIsOpenFilter }) => {
  const { control } = useFormContext<BondRequestFilterType>();

  return (
    <VStack spacing={20}>
      <HStack pos={'apart'} spacing={20}>
        <VStack>
          <span className="text-3xl font-bold">My Bond Requests</span>
          <span>
            <span className="underline">Note:</span> Confirmed requests will be opened for the lender to supply.
          </span>
        </VStack>

        <HStack spacing={20}>
          <TextField
            name="search"
            control={control}
            placeholder="Search by bond name"
            startContent={<Icons.search />}
            variant="bordered"
          />

          <Button
            variant="bordered"
            endContent={
              <Icons.listFilter
                className={cn('transition-all ease-linear duration-150', {
                  'rotate-180 ': !isOpenFilter,
                })}
              />
            }
            onClick={() => setIsOpenFilter(!isOpenFilter)}
          >
            Filter
          </Button>
        </HStack>
      </HStack>

      <div
        className={cn('grid grid-cols-4 gap-5', {
          hidden: !isOpenFilter,
        })}
      >
        <div className="col-span-1">
          <SelectField
            name="bondDuration"
            variant="bordered"
            control={control}
            placeholder="Select Bond Duration"
            data={[]}
          />
        </div>

        <div className="col-span-1"></div>

        <div className="col-span-1"></div>

        <div className="col-span-1">
          <SelectField name="status" variant="bordered" control={control} placeholder="Select Status" data={[]} />
        </div>
      </div>
    </VStack>
  );
};

export default BondRequestFilter;
