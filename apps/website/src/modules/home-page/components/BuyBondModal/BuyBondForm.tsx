import React from 'react';
import { cn } from '@/utils/common';
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
  const {
    watch,
    control,
    setValue,
    formState: { errors },
  } = useFormContext<BuyBondFormType>();
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

    return (Number(priceValue) * Number(lenderInterestRate)) / 100;
  }, [lenderInterestRate, numberOfBond, priceValue]);

  const receiveMaturityValue = React.useMemo(() => {
    if (!numberOfBond) return 0;

    return priceValue + interestPaymentValue;
  }, [interestPaymentValue, numberOfBond, priceValue]);

  return (
    <HStack pos={'center'} className="flex-1 py-10">
      <VStack className="w-[25rem]">
        <span className="text-xl font-semibold">Summary</span>

        <HStack spacing={0} align={'center'} className="h-16">
          <VStack spacing={0} className="flex-1 border-border border rounded-md px-4 pt-1.5 h-full overflow-hidden">
            <span className="leading-none font-semibold">Number of bond tokens to buy</span>

            <TextField
              control={control}
              name="numberOfBond"
              placeholder={String(volumeLeft)}
              variant="underlined"
              classNames={{
                input: ['placeholder:text-default-700/50'],
                inputWrapper: ['translate-y-1', '!px-0'],
              }}
            />
          </VStack>

          <Button onClick={handleClickMax} className="bg-primary-100 text-primary-700 h-full">
            MAX
          </Button>
        </HStack>
        {errors?.numberOfBond && <span className="text-red-500">{errors?.numberOfBond?.message}</span>}

        <VStack className="pb-6 border-b border-b-border">
          <BuyDetailRow title="Price" value={`${priceValue} ${loanTokenLabel}`} />
          <BuyDetailRow title="Interest Payment" value={`${interestPaymentValue} ${loanTokenLabel}`} />
          <BuyDetailRow title="Receive Maturity " value={`${receiveMaturityValue} ${loanTokenLabel}`} />
        </VStack>

        <BuyDetailRow titleClassName="font-bold" title="Total" value={`${priceValue} ${loanTokenLabel}`} />

        <Button
          isLoading={isLoadingCheckBalance || isLoadingTransaction}
          type="submit"
          radius="sm"
          size="lg"
          className="bg-primary-700 text-white text-lg"
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
