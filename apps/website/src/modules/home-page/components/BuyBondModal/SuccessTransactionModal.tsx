import React from 'react';
import { useRouter } from 'next/navigation';
import { Icons } from '@/assets/icons';
import { ROUTE } from '@/types';
import { prettyNumber } from '@/utils/common';
import { Button, Modal, ModalBody, ModalContent } from '@nextui-org/react';
import { useFormContext } from 'react-hook-form';

import { useGetMetaToken } from '@/hooks/useGetMetaToken';
import { HStack, VStack } from '@/components/Utilities';

import { useGetBondDetail } from '../../hooks/useGetDetailBond';
import { useBuyBondStore } from '../../store/useBuyBondStore';
import { BuyBondFormType } from '../../types/schema';

interface Props {
  bondId: number;
  opened: boolean;
  onClose: () => void;
  refetch: () => void;
}

const SuccessTransactionModal: React.FC<Props> = ({ bondId, opened, onClose, refetch }) => {
  const router = useRouter();
  const { watch } = useFormContext<BuyBondFormType>();
  const { bond } = useGetBondDetail(bondId);
  const { getLoanTokenLabel } = useGetMetaToken();
  const setBondId = useBuyBondStore.use.setBondId();

  const [numberOfBond] = watch(['numberOfBond']);

  const loanTokenLabel = React.useMemo(
    () => (bond ? getLoanTokenLabel(bond.loanToken) : ''),
    [bond, getLoanTokenLabel]
  );

  const handleClear = React.useCallback(() => {
    onClose();
    setBondId('');
    setTimeout(() => {
      refetch();
    }, 500);
  }, [onClose, refetch, setBondId]);

  const renderBody = React.useMemo(() => {
    return (
      <VStack className="px-8" spacing={24}>
        <HStack pos="center" align="center">
          <HStack pos="center" align="center" className="rounded-full border border-primary-500 p-4 w-fit">
            <Icons.check color="#8259EF" />
          </HStack>
        </HStack>

        <span className="text-center font-bold text-2xl">Purchase Successful</span>

        <span className="text-gray-700">Your bond purchase has been successfully completed.</span>

        <ul className="list-disc pl-4">
          <li className="space-x-5">
            <HStack spacing={20} pos={'apart'}>
              <span className="text-gray-700">Bond Name:</span>
              <span className="text-gray-700 font-bold">{bond?.bondName || ''}</span>
            </HStack>
          </li>
          <li className="space-x-5">
            <HStack spacing={20} pos={'apart'}>
              <span className="text-gray-700">Quantity Purchased:</span>
              <span className="text-gray-700 font-bold">{numberOfBond || 0}</span>
            </HStack>
          </li>

          <li className="space-x-5">
            <HStack spacing={20} pos={'apart'}>
              <span className="text-gray-700">Total Amount:</span>
              <span className="text-gray-700 font-bold">{`${prettyNumber(String(Number(numberOfBond || 0) * 100))} ${loanTokenLabel}`}</span>
            </HStack>
          </li>
        </ul>

        <span className="text-gray-700">
          Your bonds will be available for you to claim on the issuance date. You can view them in your account
          portfolio once they are issued.
        </span>
        <HStack pos="center" spacing={20}>
          <Button
            variant="bordered"
            onPress={() => {
              handleClear();
              router.push(ROUTE.MY_PORTFOLIO);
            }}
          >
            View Portfolio
          </Button>

          <Button onPress={handleClear} className="bg-primary-700 text-white">
            Continue Shopping
          </Button>
        </HStack>
      </VStack>
    );
  }, [bond?.bondName, handleClear, loanTokenLabel, numberOfBond, router]);

  return (
    <>
      <Modal size="md" isOpen={opened} onOpenChange={handleClear}>
        <ModalContent className="pb-5">
          <ModalBody>{renderBody} </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default SuccessTransactionModal;
