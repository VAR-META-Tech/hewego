import React from 'react';
import Image from 'next/image';

import PreviewRow from '@/components/PreviewRow';
import { VStack } from '@/components/Utilities';

import { MOCK_BOND_DATA } from '../utils/const';

const BondDetail = () => {
  return (
    <VStack align={'center'} className="flex-1">
      <VStack className="shadow-lg p-8 rounded-md w-96">
        <VStack align={'center'}>
          <div className="relative w-52 h-52">
            <Image src="/images/bond.webp" alt="preview" fill priority unoptimized quality={100} />
          </div>

          <span className="text-center font-bold">{MOCK_BOND_DATA.name}</span>
        </VStack>

        <VStack>
          <PreviewRow label="Price" value={MOCK_BOND_DATA.price} />

          <PreviewRow label="Maturity Date" value={MOCK_BOND_DATA.maturityDate} />

          <PreviewRow label="Duration" value={MOCK_BOND_DATA.duration} />

          <PreviewRow label="Collateral" value={MOCK_BOND_DATA.collateral} />

          <PreviewRow label="Supply/Borrow" value={MOCK_BOND_DATA.supplyBorrow} />

          <PreviewRow label="Nominal Value of Bond" value={MOCK_BOND_DATA.nominalValue} />

          <PreviewRow label="Interest Rate" value={MOCK_BOND_DATA.interestRate} />
        </VStack>
      </VStack>
    </VStack>
  );
};

export default BondDetail;
