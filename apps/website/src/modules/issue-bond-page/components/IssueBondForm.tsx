import React from 'react';
import { onPreventAmountKeyDown, onPreventNumberKeyDown } from '@/utils/common';
import { useFormContext } from 'react-hook-form';

import { useGetMetaToken } from '@/hooks/useGetMetaToken';
import { SelectField } from '@/components/ui/FormField/SelectField';
import { TextField } from '@/components/ui/FormField/TextField';
import TextFieldWithNote from '@/components/ui/FormField/TextFieldWithNote';
import { VStack } from '@/components/Utilities';

import { IssueBondFormType } from '../types/schema';
import { BOND_DURATION_DATA } from '../utils/const';

const IssueBondForm = () => {
  const { control, setValue, clearErrors, watch } = useFormContext<IssueBondFormType>();
  const { borrowTokenData, collateralTokenData, isSuccess, getLoanTokenLabel } = useGetMetaToken();

  const [loanToken] = watch(['loanToken']);

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

  const loanTokenLabel = React.useMemo(() => {
    if (!loanToken) return '';

    return getLoanTokenLabel(loanToken);
  }, [getLoanTokenLabel, loanToken]);

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
        onKeyDown={onPreventAmountKeyDown}
        endContent={
          <SelectField
            aria-label="loanToken"
            data={borrowTokenData}
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

      <TextField
        disabled
        type="number"
        variant="bordered"
        label="Bond Volume"
        name="volumeBond"
        control={control}
        required
        className="pointer-events-none bg-[#F3F4F6]"
      />

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
        onKeyDown={onPreventNumberKeyDown}
      />

      <TextFieldWithNote
        type="number"
        variant="bordered"
        label="Borrower's Interest Rate (Yield)"
        name="borrowInterestRate"
        control={control}
        required
        note="On close 90% of the borrow side interest is paid to the lender, and 10% is paid to platform."
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          if (
            e?.target.value &&
            String(e?.target.value).includes('.') &&
            String(e?.target.value).split('.')[1].length > 1
          )
            return;
          clearErrors('borrowInterestRate');
          setValue('borrowInterestRate', Number(e.target.value));
        }}
      />

      <TextFieldWithNote
        disabled
        type="number"
        variant="bordered"
        label="Lender's Interest Rate (Yield)"
        name="lenderInterestRate"
        control={control}
        className="pointer-events-none bg-[#F3F4F6]"
      />

      <TextField
        disabled
        type="number"
        variant="bordered"
        label="Minimum Collateral Amount"
        name="minimumCollateralAmount"
        control={control}
        required
        className="overflow-hidden group bg-[#F3F4F6]"
        endContent={
          <SelectField
            aria-label="collateralToken"
            data={collateralTokenData}
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
        name="maturityDate"
        control={control}
        className="pointer-events-none bg-[#F3F4F6]"
        note="The maturity date of a bond is calculated by adding the bond duration to the issuance date."
      />

      <TextFieldWithNote
        disabled
        variant="bordered"
        label="Total Repayment Amount"
        name="totalRepaymentAmount"
        control={control}
        className="pointer-events-none bg-[#F3F4F6]"
        endContent={<span>{loanTokenLabel}</span>}
      />
    </VStack>
  );
};

export default IssueBondForm;
