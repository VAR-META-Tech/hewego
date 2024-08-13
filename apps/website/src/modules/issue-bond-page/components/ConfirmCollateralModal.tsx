/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { useRouter } from 'next/navigation';
import { HederaWalletsContext } from '@/context/HederaContext';
import { useIssueBondStore } from '@/store/useIssueBondStore';
import { ROUTE } from '@/types';
import {
  approveToken,
  associateToken,
  checkAssociate,
  convertEvmAddressToAccountId,
  prettyNumber,
} from '@/utils/common';
import { CONTRACT_ID, TOKEN_UNIT } from '@/utils/constants';
import { ContractExecuteTransaction, ContractFunctionParameters } from '@hashgraph/sdk';
import { Signer } from '@hashgraph/sdk/lib/Signer';
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/react';
import { useFormContext } from 'react-hook-form';
import { toast } from 'sonner';

import { useGetMetaToken } from '@/hooks/useGetMetaToken';
import { HStack } from '@/components/Utilities';

import { parseUnits } from '../../../utils/common';
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
  const { getCollateralTokenLabel } = useGetMetaToken();
  const [
    collateralToken,
    loanToken,
    minimumCollateralAmount,
    name,
    loanAmount,
    durationBond,
    borrowInterestRate,
    lenderInterestRate,
  ] = watch([
    'collateralToken',
    'loanToken',
    'minimumCollateralAmount',
    'name',
    'loanAmount',
    'durationBond',
    'borrowInterestRate',
    'lenderInterestRate',
  ]);

  const provider = hashConnect?.getProvider('testnet', hashConnect?.hcData?.topic ?? '', accountId ?? '');

  const signer = React.useMemo(() => {
    if (!provider) return null;

    return hashConnect?.getSigner(provider);
  }, [hashConnect, provider]);

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
      return `To create and issue a bond, you need to deposit collateral. Please ensure you have the necessary ${getCollateralTokenLabel(collateralToken)} to complete this process.`;
    }

    return `You are about to deposit ${prettyNumber(minimumCollateralAmount)} ${getCollateralTokenLabel(collateralToken)} as collateral. This amount will be held until the bond matures.`;
  }, [collateralToken, getCollateralTokenLabel, minimumCollateralAmount, step]);

  const collateralTokenId = React.useMemo(() => {
    if (!collateralToken) return '';

    return convertEvmAddressToAccountId(collateralToken);
  }, [collateralToken]);

  // Submit Transaction
  const submitTransaction = async () => {
    try {
      if (!signer) return;

      const contractExecTx = await new ContractExecuteTransaction()
        .setContractId(CONTRACT_ID)
        .setGas(1000000)
        .setFunction(
          'createBond',
          new ContractFunctionParameters()
            .addString(name)
            .addAddress(loanToken) // loan token
            .addUint256(String(parseUnits(Number(loanAmount), TOKEN_UNIT)) as any)
            .addUint256(Number(durationBond?.split(' ')[0]))
            .addUint256(Number(borrowInterestRate * 10))
            .addUint256(Number(lenderInterestRate * 10))
            .addAddress(collateralToken) // collateral token
        )
        .freezeWithSigner(signer as unknown as Signer);

      const contractExecSign = await contractExecTx?.signWithSigner(signer as unknown as Signer);

      const contractExecSubmit = await contractExecSign
        ?.executeWithSigner(signer as unknown as Signer)
        .catch((e) => console.error(e));

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
      toast.error(error as string);
    }
  };

  // Submit
  const handleSubmit = async () => {
    if (step === STEP_DEPOSIT_COLLATERAL.DEPOSIT.value) {
      setStep(STEP_DEPOSIT_COLLATERAL.CONFIRM.value);
      return;
    }

    try {
      setIsLoading(true);
      if (!provider) return;
      const isAssociated = await checkAssociate(collateralTokenId, accountId);

      if (!isAssociated) {
        await associateToken(collateralTokenId, accountId, signer as unknown as Signer);
      }

      const transactionIdApprove = await approveToken({
        accountId,
        contractId: CONTRACT_ID,
        provider,
        signer: signer as unknown as Signer,
        tokenId: collateralTokenId,
        tokenUnit: TOKEN_UNIT,
      });

      if (transactionIdApprove) {
        await submitTransaction();
      }
    } catch (error) {
      toast.error(error as string);
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
                  <span className="text-2xl font-medium">{`${prettyNumber(minimumCollateralAmount)} ${getCollateralTokenLabel(collateralToken)}`}</span>
                </>
              )}
            </ModalBody>

            <ModalFooter>
              <HStack>
                <Button disabled={isLoading} onPress={onClose}>
                  Cancel
                </Button>

                <Button isLoading={isLoading} className="bg-primary-700 text-white" onPress={handleSubmit}>
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
