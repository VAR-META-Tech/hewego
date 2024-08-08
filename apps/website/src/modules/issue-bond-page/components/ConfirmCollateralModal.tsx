import React from 'react';
import { useRouter } from 'next/navigation';
import { HederaWalletsContext } from '@/context/HederaContext';
import { useIssueBondStore } from '@/store/useIssueBondStore';
import { ROUTE } from '@/types';
import { prettyNumber } from '@/utils/common';
import { CONTRACT_ID } from '@/utils/constants';
import { ContractExecuteTransaction, ContractFunctionParameters } from '@hashgraph/sdk';
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/react';
import { useFormContext } from 'react-hook-form';

import { HStack } from '@/components/Utilities';

import { IssueBondFormType } from '../types/schema';
import { STEP_DEPOSIT_COLLATERAL } from '../utils/const';

interface Props {
  isOpen: boolean;
  onOpenChange: () => void;
}

const ConfirmCollateralModal: React.FC<Props> = ({ isOpen, onOpenChange }) => {
  const router = useRouter();
  const [step, setStep] = React.useState(STEP_DEPOSIT_COLLATERAL.DEPOSIT.value);
  const [isLoading, setIsLoading] = React.useState(false);
  const { hashConnect, accountId } = React.useContext(HederaWalletsContext);
  const onCloseModal = useIssueBondStore.use.onCloseModal();
  const { watch, reset } = useFormContext<IssueBondFormType>();
  const [
    collateralToken,
    minimumCollateralAmount,
    name,
    loanAmount,
    durationBond,
    borrowInterestRate,
    lenderInterestRate,
  ] = watch([
    'collateralToken',
    'minimumCollateralAmount',
    'name',
    'loanAmount',
    'durationBond',
    'borrowInterestRate',
    'lenderInterestRate',
  ]);
  const provider = hashConnect?.getProvider('testnet', hashConnect.hcData.topic ?? '', accountId ?? '');

  React.useEffect(() => {
    setStep(STEP_DEPOSIT_COLLATERAL.DEPOSIT.value);
  }, [isOpen]);

  const renderHeader = React.useMemo(() => {
    if (step === STEP_DEPOSIT_COLLATERAL.DEPOSIT.value) {
      return STEP_DEPOSIT_COLLATERAL.DEPOSIT.label;
    }

    return STEP_DEPOSIT_COLLATERAL.CONFIRM.label;
  }, [step]);

  const renderContent = React.useMemo(() => {
    if (step === STEP_DEPOSIT_COLLATERAL.DEPOSIT.value) {
      return `To create and issue a bond, you need to deposit collateral. Please ensure you have the necessary ${collateralToken} to complete this process.`;
    }

    return `You are about to deposit ${prettyNumber(minimumCollateralAmount)} ${collateralToken} as collateral. This amount will be held until the bond matures.`;
  }, [collateralToken, minimumCollateralAmount, step]);

  const handleSubmit = async () => {
    if (step === STEP_DEPOSIT_COLLATERAL.DEPOSIT.value) {
      setStep(STEP_DEPOSIT_COLLATERAL.CONFIRM.value);
      return;
    }

    try {
      setIsLoading(true);
      if (!provider) return;

      const signer = hashConnect?.getSigner(provider);
      const contractExecTx = await new ContractExecuteTransaction()
        .setContractId(CONTRACT_ID)
        .setGas(1000000)
        .setFunction(
          'createBond',
          new ContractFunctionParameters()
            .addString(name)
            .addAddress('0xd4DF47541de73aE50B8622C2B1627c4B7e47e46E') // loan token
            .addUint256(Number(loanAmount))
            .addUint256(Number(durationBond?.split(' ')[0]))
            .addUint256(Number(borrowInterestRate * 10))
            .addUint256(Number(lenderInterestRate * 10))
            .addAddress('0x23f5073D28115B77EaF3203c8DD7355C83c4f61D') // collateral token
        )
        .freezeWithSigner(signer!);

      const contractExecSign = await contractExecTx.signWithSigner(signer!);

      const contractExecSubmit = await contractExecSign.executeWithSigner(signer!).catch((e) => console.log(e, 'loi'));

      if (contractExecSubmit?.transactionId) {
        reset({
          name: '',
          loanAmount: 0,
          durationBond: '',
          borrowInterestRate: 0,
          lenderInterestRate: '',
        });
        onCloseModal();
        router.push(ROUTE.MY_PORTFOLIO);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      size="xl"
      backdrop={'blur'}
      isOpen={isOpen}
      placement={'auto'}
      onOpenChange={isLoading ? () => {} : onOpenChange}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">{renderHeader}</ModalHeader>

            <ModalBody className="pb-10">
              <span>{renderContent}</span>

              {step === STEP_DEPOSIT_COLLATERAL.DEPOSIT.value && (
                <>
                  <span className="font-bold">Required Collateral</span>
                  <span className="text-2xl font-medium">{`${prettyNumber(minimumCollateralAmount)} ${collateralToken}`}</span>
                </>
              )}
            </ModalBody>

            <ModalFooter>
              <HStack>
                <Button disabled={isLoading} onPress={onClose}>
                  Cancel
                </Button>

                <Button isLoading={isLoading} className="bg-primary-900 text-white" onPress={handleSubmit}>
                  {step === STEP_DEPOSIT_COLLATERAL.DEPOSIT.value ? 'Proceed' : 'Confirm Deposit'}
                </Button>
              </HStack>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default ConfirmCollateralModal;
