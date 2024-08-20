import React from 'react';
import { HederaWalletsContext } from '@/context/HederaContext';
import { useBondCancelStore } from '@/modules/my-portfolio-page/store/useBondCancelStore';
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
  collateralAmount: string;
  loanToken: string;
  refetch: () => void;
}
const STEP_VALUE = {
  CONFIRM: 'CONFIRM',
  CANCELLED: 'CANCELLED',
};

const CancelModal: React.FC<Props> = ({ bondId, refetch, collateralAmount, loanToken }) => {
  const [step, setStep] = React.useState(STEP_VALUE.CONFIRM);
  const [isLoading, setIsLoading] = React.useState(false);
  const bondCancelId = useBondCancelStore.use.bondCancelId();
  const setBondCancelId = useBondCancelStore.use.setBondCancelId();

  const { getLoanTokenLabel } = useGetMetaToken();

  const loanTokenLabel = React.useMemo(() => {
    if (!loanToken) return '';

    return getLoanTokenLabel(loanToken);
  }, [getLoanTokenLabel, loanToken]);

  const handleClear = () => {
    setBondCancelId('');
    setStep(STEP_VALUE.CONFIRM);
  };

  const { hashConnect, accountId } = React.useContext(HederaWalletsContext);

  const provider = hashConnect?.getProvider(env.NETWORK_TYPE, hashConnect?.hcData?.topic ?? '', accountId ?? '');

  const signer = React.useMemo(() => {
    if (!provider) return null;

    return hashConnect?.getSigner(provider);
  }, [hashConnect, provider]);

  const handleCancel = React.useCallback(async () => {
    try {
      setIsLoading(true);
      if (!signer) return;

      const contractExecTx = await new ContractExecuteTransaction()
        .setContractId(CONTRACT_ID)
        .setGas(1000000)
        .setFunction('borrowerRefund', new ContractFunctionParameters().addUint256(bondId))
        .freezeWithSigner(signer as unknown as Signer);

      const contractExecSign = await contractExecTx?.signWithSigner(signer as unknown as Signer);

      const contractExecSubmit = await contractExecSign
        ?.executeWithSigner(signer as unknown as Signer)
        .catch((e) => console.error(e));

      if (contractExecSubmit?.transactionId) {
        setStep(STEP_VALUE.CANCELLED);
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
  }, [bondId, refetch, signer, setStep]);

  const renderContent = React.useMemo(() => {
    if (step === STEP_VALUE.CANCELLED) {
      return (
        <VStack>
          <span>
            Your borrow request has been successfully canceled. The collateral has been unlocked and returned to your
            account
          </span>

          <ul className="list-disc pl-2">
            <li>
              Collateral Returned:{' '}
              {`${prettyNumber(Number(formatUnits(BigInt(collateralAmount || 0), Number(TOKEN_UNIT))).toFixed(2))} ${loanTokenLabel}`}
            </li>
            <li>Cancellation Date: {format(new Date(new Date()), DATE_FORMAT.YYYY_MM_DD_HH_MM)}</li>
          </ul>
        </VStack>
      );
    }

    return (
      <span>
        Your borrow request has not received any lender supply. You may cancel this request or leave it open for more
        time. If you choose to cancel, all collateral associated with this request will be unlocked and returned to your
        account
      </span>
    );
  }, [collateralAmount, loanTokenLabel, step]);

  return (
    <Modal
      size="xl"
      backdrop={'blur'}
      isOpen={Number(bondCancelId) === Number(bondId)}
      placement={'auto'}
      onOpenChange={isLoading ? () => {} : handleClear}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              {step === STEP_VALUE.CANCELLED ? 'Borrow Request Canceled' : 'Cancel Borrow Request'}
            </ModalHeader>

            <ModalBody className="pb-10">{renderContent}</ModalBody>

            <ModalFooter>
              <HStack>
                <Button variant="bordered" disabled={isLoading} onPress={onClose}>
                  Close
                </Button>

                {step === STEP_VALUE.CONFIRM && (
                  <Button isLoading={isLoading} className="bg-primary-700 text-white" onPress={handleCancel}>
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

export default CancelModal;
