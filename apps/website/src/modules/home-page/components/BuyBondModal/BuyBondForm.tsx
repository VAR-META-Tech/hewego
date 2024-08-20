import React from 'react';
import { cn, prettyNumber } from '@/utils/common';
import { Button } from '@nextui-org/react';
import { useFormContext } from 'react-hook-form';

import { useGetMetaToken } from '@/hooks/useGetMetaToken';
import { TextField } from '@/components/ui/FormField/TextField';
import { HStack, VStack } from '@/components/Utilities';

import { useGetBondDetail } from '../../hooks/useGetDetailBond';
import { useBuyBondStore } from '../../store/useBuyBondStore';
import { BuyBondFormType } from '../../types/schema';

interface Props {
  bondId: number;
}

const BuyBondForm: React.FC<Props> = ({ bondId }) => {
  const { watch, control, setValue } = useFormContext<BuyBondFormType>();
  const { getLoanTokenLabel } = useGetMetaToken();
  const { volumeLeft, lenderInterestRate, bond, refetch } = useGetBondDetail(bondId);
  const isLoadingCheckBalance = useBuyBondStore.use.isLoadingCheckBalance();
  const isLoadingTransaction = useBuyBondStore.use.isLoadingTransaction();

  React.useEffect(() => {
    refetch();

    return () => {
      refetch();
    };
  }, [refetch]);

  const loanTokenLabel = React.useMemo(() => {
    if (!bond) return '';

    return getLoanTokenLabel(bond?.loanToken);
  }, [bond, getLoanTokenLabel]);

  const handleClickMax = () => {
    setValue('numberOfBond', Number(volumeLeft));
  };

  const [numberOfBond] = watch(['numberOfBond']);

  const priceValue = React.useMemo(() => {
    if (!numberOfBond) return 0;

    return Number(numberOfBond) * 100;
  }, [numberOfBond]);

  const interestPaymentValue = React.useMemo(() => {
    if (!numberOfBond) return 0;

    const interestRate = Number(lenderInterestRate || 0) / 100;
    const duration = Number(bond?.loanTerm || 0) / 52;

    return Number(Number(priceValue) * interestRate * duration).toFixed(2);
  }, [bond?.loanTerm, lenderInterestRate, numberOfBond, priceValue]);

  const receiveMaturityValue = React.useMemo(() => {
    if (!numberOfBond) return 0;

    return priceValue + Number(interestPaymentValue);
  }, [interestPaymentValue, numberOfBond, priceValue]);

  return (
    <HStack pos={'center'} className="flex-1 py-10">
      <VStack className="w-[25rem]">
        <p className="text-xl font-semibold">Summary</p>

        <TextField
          control={control}
          name="numberOfBond"
          placeholder={String(volumeLeft)}
          className="w-full"
          inputLabel="Number of bond tokens to buy"
          prefix="/^\d+$/"
          classNames={{
            input: ['placeholder:text-default-700/50 text-xl font-medium'],
            inputWrapper: ['!h-16 bg-white border shadow-md'],
          }}
          endContent={
            <Button onClick={handleClickMax} className="bg-primary-100 text-primary-700 ">
              MAX
            </Button>
          }
          onChange={(e) => {
            const value = e.target.value;
            if (!value || /^\d+$/.test(value)) setValue('numberOfBond', Number(value), { shouldValidate: true });
          }}
        />

        <VStack className="pb-6 border-b border-b-border">
          <BuyDetailRow title="Price" value={`${prettyNumber(Number(priceValue).toFixed(2))} ${loanTokenLabel}`} />
          <BuyDetailRow
            title="Interest Payment"
            value={`${prettyNumber(Number(interestPaymentValue).toFixed(2))} ${loanTokenLabel}`}
          />
          <BuyDetailRow
            title="Receive Maturity "
            value={`${prettyNumber(Number(receiveMaturityValue).toFixed(2))} ${loanTokenLabel}`}
          />
        </VStack>

        <BuyDetailRow
          titleClassName="font-bold"
          title="Total"
          value={`${prettyNumber(Number(priceValue).toFixed(2))} ${loanTokenLabel}`}
        />

        <Button
          isLoading={isLoadingCheckBalance || isLoadingTransaction}
          type="submit"
          radius="full"
          size="lg"
          className="bg-primary-700 text-white text-lg h-16"
        >
          Supply
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
