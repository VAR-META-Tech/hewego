import React from 'react';

import Back from '@/components/Back';
import { HStack } from '@/components/Utilities';

import BondDetail from './components/BondDetail';
import BuyBondForm from './components/BuyBondForm';
import BuyBondFormWrapper from './form/BuyBondFormWrapper';

const BuyBondPage = () => {
  return (
    <div className="container py-10 space-y-10">
      <Back title="Buy Bond" />

      <BuyBondFormWrapper>
        <HStack pos={'apart'} align={'start'} spacing={40}>
          <BondDetail />

          <BuyBondForm />
        </HStack>
      </BuyBondFormWrapper>
    </div>
  );
};

export default BuyBondPage;
