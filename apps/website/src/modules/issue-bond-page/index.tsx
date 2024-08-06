import React from 'react';
import { useIssueBondStore } from '@/store/useIssueBondStore';

import Back from '@/components/Back';
import AuthLayout from '@/components/layouts/AuthLayout';
import { HStack, VStack } from '@/components/Utilities';

import BondPreview from './components/BondPreview';
import ConfirmCollateralModal from './components/ConfirmCollateralModal';
import IssueBondAction from './components/IssueBondAction';
import IssueBondForm from './components/IssueBondForm';
import IssueBondFormWrapper from './form/IssueBondFormWrapper';

const IssueBondPage = () => {
  const isOpenModal = useIssueBondStore.use.isOpenModal();
  const onCloseModal = useIssueBondStore.use.onCloseModal();

  return (
    <AuthLayout>
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
    </AuthLayout>
  );
};

export default IssueBondPage;
