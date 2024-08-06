import React from 'react';
import { HederaWalletsContext } from '@/context/HederaContext';
import { useConnectWalletStore } from '@/store/useConnectWalletStore';
import { useIssueBondStore } from '@/store/useIssueBondStore';

import Back from '@/components/Back';
import { HStack, VStack } from '@/components/Utilities';

import BondPreview from './components/BondPreview';
import ConfirmCollateralModal from './components/ConfirmCollateralModal';
import IssueBondAction from './components/IssueBondAction';
import IssueBondForm from './components/IssueBondForm';
import IssueBondFormWrapper from './form/IssueBondFormWrapper';

const IssueBondPage = () => {
  const { isConnected } = React.useContext(HederaWalletsContext);
  const onOpen = useConnectWalletStore.use.onOpen();
  const setIsAbleClose = useConnectWalletStore.use.setIsAbleClose();
  const isOpenModal = useIssueBondStore.use.isOpenModal();
  const onCloseModal = useIssueBondStore.use.onCloseModal();

  React.useLayoutEffect(() => {
    if (!isConnected) {
      setIsAbleClose(false);
      onOpen();
    }

    return () => {
      setIsAbleClose(true);
    };
  }, [isConnected, onOpen, setIsAbleClose]);

  return (
    <div className="container py-10 space-y-5">
      <Back title="Issue Bond" />

      <IssueBondFormWrapper>
        <HStack spacing={20} align={'start'}>
          <VStack spacing={24}>
            <IssueBondForm />

            <IssueBondAction />

            <ConfirmCollateralModal isOpen={isOpenModal} onOpenChange={onCloseModal} />
          </VStack>

          <BondPreview />
        </HStack>
      </IssueBondFormWrapper>
    </div>
  );
};

export default IssueBondPage;
