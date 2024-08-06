import React from 'react';
import { useFormContext } from 'react-hook-form';

import { SelectField } from '@/components/ui/FormField/SelectField';
import { TextField } from '@/components/ui/FormField/TextField';
import TextFieldWithNote from '@/components/ui/FormField/TextFieldWithNote';
import { VStack } from '@/components/Utilities';

import { IssueBondFormType } from '../types/schema';
import { BOND_DURATION_DATA, MOCK_DEFAULT_COLLATERAL_TOKEN, MOCK_DEFAULT_LOAN_TOKEN } from '../utils/const';

const IssueBondForm = () => {
  const { control } = useFormContext<IssueBondFormType>();

  return (
    <VStack spacing={12} className="flex-1">
      <TextField variant="bordered" label="Name" name="name" control={control} required />

      <TextField
        type="number"
        variant="bordered"
        label="Loan Amount"
        name="loanAmount"
        control={control}
        required
        className="overflow-hidden"
        endContent={
          <SelectField
            aria-label="loanToken"
            data={MOCK_DEFAULT_LOAN_TOKEN}
            variant="underlined"
            name="loanToken"
            control={control}
            classNames={{
              trigger: 'w-32 border-b-0',
              listboxWrapper: 'max-h-[400px]',
              popoverContent: 'rounded-sm',
            }}
            listboxProps={{
              itemClasses: {
                base: ['data-[selectable=true]:focus:bg-default-50', 'data-[focus-visible=true]:ring-default-500'],
              },
            }}
          />
        }
      />

      <TextField type="number" variant="bordered" label="Volume Bond" name="volumeBond" control={control} required />

      <SelectField
        aria-label="durationBond"
        data={BOND_DURATION_DATA}
        variant="bordered"
        label="Bond Duration"
        name="durationBond"
        control={control}
        required
        classNames={{
          trigger: 'w-full',
          listboxWrapper: 'max-h-[400px]',
          popoverContent: 'rounded-sm',
        }}
        listboxProps={{
          itemClasses: {
            base: ['data-[selectable=true]:focus:bg-default-50', 'data-[focus-visible=true]:ring-default-500'],
          },
        }}
      />

      <TextFieldWithNote
        type="number"
        variant="bordered"
        label="Borrower's Interest Rate (Yield)"
        name="borrowInterestRate"
        control={control}
        required
        note="On close 90% of the borrow side interest is paid to the lender, and 10% is paid to platform."
      />

      <TextFieldWithNote
        disabled
        type="number"
        variant="bordered"
        label="Lender's Interest Rate (Yield)"
        name="lenderInterestRate"
        control={control}
        note="On close 90% of the borrow side interest is paid to the lender, and 10% is paid to platform."
        className="pointer-events-none bg-[#F3F4F6]"
      />

      <TextField
        type="number"
        variant="bordered"
        label="Minimum Collateral Amount"
        name="minimumCollateralAmount"
        control={control}
        required
        className="overflow-hidden"
        endContent={
          <SelectField
            aria-label="collateralToken"
            data={MOCK_DEFAULT_COLLATERAL_TOKEN}
            variant="underlined"
            name="collateralToken"
            control={control}
            classNames={{
              trigger: 'w-32 border-b-0',
              listboxWrapper: 'max-h-[400px]',
              popoverContent: 'rounded-sm',
            }}
            listboxProps={{
              itemClasses: {
                base: ['data-[selectable=true]:focus:bg-default-50', 'data-[focus-visible=true]:ring-default-500'],
              },
            }}
          />
        }
      />

      <TextFieldWithNote
        disabled
        variant="bordered"
        label="Issuance Date"
        name="issuanceDate"
        control={control}
        className="pointer-events-none bg-[#F3F4F6]"
        note="The issuance date will be 7 days after the creation date"
      />

      <TextFieldWithNote
        disabled
        variant="bordered"
        label="Maturity Date"
        name="matuityDate"
        control={control}
        className="pointer-events-none bg-[#F3F4F6]"
        note="The maturity date of a bond is calculated by adding the bond duration to the issuance date."
      />
    </VStack>
  );
};

export default IssueBondForm;
