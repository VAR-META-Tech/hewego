import React from 'react';
import { prettyNumber } from '@/utils/common';
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
  const [step, setStep] = React.useState(STEP_DEPOSIT_COLLATERAL.DEPOSIT.value);
  const { watch } = useFormContext<IssueBondFormType>();
  const [collateralToken, minimumCollateralAmount] = watch(['collateralToken', 'minimumCollateralAmount']);

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

  const handleSubmit = () => {
    if (step === STEP_DEPOSIT_COLLATERAL.DEPOSIT.value) {
      setStep(STEP_DEPOSIT_COLLATERAL.CONFIRM.value);
    }
  };

  return (
    <Modal size="xl" backdrop={'blur'} isOpen={isOpen} placement={'auto'} onOpenChange={onOpenChange}>
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
                <Button onPress={onClose}>Cancel</Button>
                <Button className="bg-primary-900 text-white" onPress={handleSubmit}>
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
