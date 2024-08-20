import { useIssueBondStore } from '@/store/useIssueBondStore';

import Back from '@/components/Back';
import AuthLayout from '@/components/layouts/AuthLayout';
import { HStack, VStack } from '@/components/Utilities';

import BondPreview from './components/BondPreview';
import ConfirmCollateralModal from './components/ConfirmCollateralModal';
import IssueBondForm from './components/IssueBondForm';
import IssueBondFormWrapper from './form/IssueBondFormWrapper';

const IssueBondPage = () => {
  const isOpenModal = useIssueBondStore.use.isOpenModal();
  const onCloseModal = useIssueBondStore.use.onCloseModal();

  return (
    <AuthLayout>
      <div className="container py-10 space-y-4">
        <Back title="Issue Bond" />

        <IssueBondFormWrapper>
          <HStack align={'start'} className="mx-auto w-full shadow-lg border bg-gray-50 p-10 rounded-md gap-28">
            <VStack spacing={24} className="flex-1">
              <IssueBondForm />

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
