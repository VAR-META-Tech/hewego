import React from 'react';

import Back from '@/components/Back';
import { HStack, VStack } from '@/components/Utilities';

import BondPreview from './components/BondPreview';
import IssueBondAction from './components/IssueBondAction';
import IssueBondForm from './components/IssueBondForm';
import IssueBondFormWrapper from './form/IssueBondFormWrapper';

const IssueBondPage = () => {
  return (
    <div className="container py-10 space-y-5">
      <Back title="Issue Bond" />

      <IssueBondFormWrapper>
        <HStack spacing={20} align={'start'}>
          <VStack spacing={24}>
            <IssueBondForm />

            <IssueBondAction />
          </VStack>

          <BondPreview />
        </HStack>
      </IssueBondFormWrapper>
    </div>
  );
};

export default IssueBondPage;
