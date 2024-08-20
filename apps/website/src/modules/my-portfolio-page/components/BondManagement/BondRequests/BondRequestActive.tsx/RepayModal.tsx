import React from 'react';
import { HederaWalletsContext } from '@/context/HederaContext';
import { useBondRepayStore } from '@/modules/my-portfolio-page/store/useBondRepayStore';
import { prettyNumber } from '@/utils/common';
import { CONTRACT_ID, DATE_FORMAT, env, TOKEN_UNIT } from '@/utils/constants';
import { ContractExecuteTransaction, ContractFunctionParameters } from '@hashgraph/sdk';
import { Signer } from '@hashgraph/sdk/lib/Signer';
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/react';
import { format } from 'date-fns';
import { toast } from 'sonner';
import { formatUnits } from 'viem';

import { useGetMetaToken } from '@/hooks/useGetMetaToken';
import { HStack, VStack } from '@/components/Utilities';

interface Props {
  bondId: number;
  maturityDate: string;
  interestRate: string;
  refetch: () => void;
  loanAmount: string;
  loanToken: string;
  loanTerm: number;
}

const STEP_VALUE = {
  CONFIRM: 'CONFIRM',
  REPAY: 'REPAY',
};

const RepayModal: React.FC<Props> = ({
  bondId,
  refetch,
  maturityDate,
  interestRate,
  loanAmount,
  loanToken,
  loanTerm,
}) => {
  const [step, setStep] = React.useState(STEP_VALUE.CONFIRM);
  const [isLoading, setIsLoading] = React.useState(false);
  const bondRepayId = useBondRepayStore.use.bondRepayId();
  const setBondRepayId = useBondRepayStore.use.setBondRepayId();

  const { getLoanTokenLabel } = useGetMetaToken();

  const loanTokenLabel = React.useMemo(() => {
    if (!loanToken) return '';

    return getLoanTokenLabel(loanToken);
  }, [getLoanTokenLabel, loanToken]);

  const handleClear = () => {
    setBondRepayId('');
    setStep(STEP_VALUE.CONFIRM);
  };

  const { hashConnect, accountId } = React.useContext(HederaWalletsContext);

  const provider = hashConnect?.getProvider(env.NETWORK_TYPE, hashConnect?.hcData?.topic ?? '', accountId ?? '');

  const signer = React.useMemo(() => {
    if (!provider) return null;

    return hashConnect?.getSigner(provider);
  }, [hashConnect, provider]);

  const handleRepay = React.useCallback(async () => {
    try {
      setIsLoading(true);

      if (!signer) return;

      const contractExecTx = await new ContractExecuteTransaction()
        .setContractId(CONTRACT_ID)
        .setGas(1000000)
        .setFunction('repayBond', new ContractFunctionParameters().addUint256(bondId))
        .freezeWithSigner(signer as unknown as Signer);

      const contractExecSign = await contractExecTx?.signWithSigner(signer as unknown as Signer);

      const contractExecSubmit = await contractExecSign
        ?.executeWithSigner(signer as unknown as Signer)
        .catch((e) => console.error(e));

      if (contractExecSubmit?.transactionId) {
        setStep(STEP_VALUE.REPAY);
        setTimeout(() => {
          refetch();
        }, 500);
      }
    } catch (error) {
      toast.error(error as string);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  }, [bondId, refetch, signer]);

  const loanAmountValue = Number(formatUnits(BigInt(loanAmount || 0), Number(TOKEN_UNIT)));

  const interestRateValue = Number(interestRate || 0) / 100;

  const durationRate = Number(loanTerm || 0) / 52;

  const totalAmount = React.useMemo(() => {
    if (!loanAmountValue || !interestRateValue || !durationRate) return 0;

    return loanAmountValue + loanAmountValue * interestRateValue * durationRate;
  }, [durationRate, interestRateValue, loanAmountValue]);

  const renderContent = React.useMemo(() => {
    if (step === STEP_VALUE.CONFIRM) {
      return (
        <VStack>
          <span>You are about to repay your loan. Please review the details below:</span>

          <ul className="list-disc pl-2">
            <li>Total Amount Paid: {`${prettyNumber(Number(Number(totalAmount).toFixed(2)))} ${loanTokenLabel}`}</li>
            <li>Total Interest: {`${Number(interestRate || 0).toFixed(2)}%`}</li>
            <li>Maturity Date: {format(new Date(Number(maturityDate) * 1000), DATE_FORMAT.YYYY_MM_DD_HH_MM)}</li>
          </ul>

          <span>Are you sure you want to proceed with this payment?</span>
        </VStack>
      );
    }

    return (
      <VStack>
        <span>Repayment has been successfully processed!</span>
        <span>Your collateral has been already. Please claim it into your portfolio</span>
      </VStack>
    );
  }, [interestRate, loanTokenLabel, maturityDate, step, totalAmount]);

  return (
    <Modal
      size="xl"
      backdrop={'blur'}
      isOpen={Number(bondRepayId) === Number(bondId)}
      placement={'auto'}
      onOpenChange={isLoading ? () => {} : handleClear}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              {step === STEP_VALUE.CONFIRM ? 'Repayment Confirmation' : 'Repayment Success'}
            </ModalHeader>

            <ModalBody className="pb-10">{renderContent}</ModalBody>

            <ModalFooter>
              <HStack>
                <Button variant="bordered" disabled={isLoading} onPress={onClose}>
                  Cancel
                </Button>

                {step === STEP_VALUE.CONFIRM && (
                  <Button isLoading={isLoading} className="bg-primary-700 text-white" onPress={handleRepay}>
                    Proceed
                  </Button>
                )}
              </HStack>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default RepayModal;
