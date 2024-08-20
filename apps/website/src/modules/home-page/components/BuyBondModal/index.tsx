import React from 'react';
import { useDisclosure } from '@mantine/hooks';
import { Modal, ModalBody, ModalContent } from '@nextui-org/react';

import { HStack } from '@/components/Utilities';

import BuyBondFormWrapper from '../../form/BuyBondFormWrapper';
import { useBuyBondStore } from '../../store/useBuyBondStore';
import BondDetail from './BondDetail';
import BuyBondForm from './BuyBondForm';
import CheckBalanceModal from './CheckBalanceModal';
import SuccessTransactionModal from './SuccessTransactionModal';

interface Props {
  bondId: number;
  refetch: () => void;
}

const BuyBondModal: React.FC<Props> = ({ bondId, refetch }) => {
  const [opened, { open, close }] = useDisclosure(false);
  const bondIdStore = useBuyBondStore.use.bondId();
  const clearBondId = useBuyBondStore.use.clearBondId();

  return (
    <>
      <Modal size="5xl" isOpen={bondId === Number(bondIdStore)} onOpenChange={clearBondId}>
        <ModalContent className="py-10">
          {() => (
            <>
              <ModalBody>
                <BuyBondFormWrapper onOpen={open} refetch={refetch}>
                  <HStack pos={'apart'} align={'start'} spacing={40}>
                    <BondDetail bondId={bondId} />

                    <BuyBondForm bondId={bondId} />

                    <CheckBalanceModal bondId={bondId} />

                    <SuccessTransactionModal bondId={bondId} opened={opened} onClose={close} refetch={refetch} />
                  </HStack>
                </BuyBondFormWrapper>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default BuyBondModal;
