import React from 'react';
import { useRouter } from 'next/navigation';
import { useBondClaimStore } from '@/modules/my-portfolio-page/store/useBondClaimStore';
import { ROUTE } from '@/types';
import { prettyNumber } from '@/utils/common';
import { TOKEN_UNIT } from '@/utils/constants';
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/react';
import { formatUnits } from 'viem';

import { useGetMetaToken } from '@/hooks/useGetMetaToken';
import { HStack, VStack } from '@/components/Utilities';

interface Props {
  bondId: number;
  loanAmount: string;
  loanToken: string;
  interestRate: string;
  duration: number;
  refetch: () => void;
}

const BondClaimModal: React.FC<Props> = ({ bondId, loanAmount, loanToken, interestRate, refetch, duration }) => {
  const router = useRouter();
  const bondClaimId = useBondClaimStore.use.bondClaimId();
  const setBondClaimId = useBondClaimStore.use.setBondClaimId();

  const { getLoanTokenLabel } = useGetMetaToken();

  const loanTokenLabel = React.useMemo(() => {
    if (!loanToken) return '';

    return getLoanTokenLabel(loanToken);
  }, [getLoanTokenLabel, loanToken]);

  const handleClear = () => {
    refetch();
    setBondClaimId('');
  };

  const handleContinue = () => {
    router.push(ROUTE.HOME);
  };

  const interestAmount = React.useMemo(() => {
    if (!loanAmount || !interestRate || !duration) return 0;

    const loanAmountValue = Number(formatUnits(BigInt(loanAmount || 0), Number(TOKEN_UNIT)));
    const interestRateValue = Number(interestRate || 0);
    const durationRate = Number(duration || 0) / 52;

    const value = (loanAmountValue * interestRateValue * durationRate) / 100;

    return Number(value);
  }, [loanAmount, interestRate, duration]);

  const totalAmount = React.useMemo(() => {
    if (!loanAmount || !interestRate || !duration) return 0;

    const loanAmountValue = Number(formatUnits(BigInt(loanAmount || 0), Number(TOKEN_UNIT)));

    const value = loanAmountValue + Number(interestAmount);

    return Number(value);
  }, [duration, interestAmount, interestRate, loanAmount]);

  return (
    <Modal
      size="xl"
      backdrop={'blur'}
      isOpen={Number(bondClaimId) === Number(bondId)}
      placement={'auto'}
      onOpenChange={handleClear}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">Claim Successful</ModalHeader>

            <ModalBody className="pb-10">
              <VStack spacing={20}>
                <VStack spacing={8}>
                  <span>
                    Your claim has been successful. You have claimed a total of{' '}
                    {prettyNumber(Number(Number(totalAmount).toFixed(2)))} {loanTokenLabel}, which includes:
                  </span>
                  <span>
                    Interest Amount: {prettyNumber(Number(Number(interestAmount).toFixed(2)))} {loanTokenLabel}
                  </span>
                  <span>
                    {' '}
                    Total Amount: {prettyNumber(Number(Number(totalAmount).toFixed(2)))} {loanTokenLabel}
                  </span>
                </VStack>

                <span>You can view the details in your account portfolio</span>
              </VStack>
            </ModalBody>

            <ModalFooter>
              <HStack>
                <Button variant="bordered" onPress={onClose}>
                  Close
                </Button>

                <Button className="bg-primary-700 text-white" onPress={handleContinue}>
                  Continue Shopping
                </Button>
              </HStack>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default BondClaimModal;
