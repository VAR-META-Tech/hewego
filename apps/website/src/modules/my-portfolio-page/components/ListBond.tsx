import React from 'react';
import { Button } from '@nextui-org/button';

import BondCard from '@/components/BondCard';
import { HStack } from '@/components/Utilities';

const mockDataArray = [
  {
    name: 'Bond 1',
    loanToken: 'USD',
    volumeBond: '10000',
    durationBond: '2 weeks',
    borrowInterestRate: '5.0',
    collateralToken: 'ETH',
    matuityDate: '2024-12-31',
    status: 'Approved',
  },
  {
    name: 'Bond 2',
    loanToken: 'EUR',
    volumeBond: '20000',
    durationBond: '4 weeks',
    borrowInterestRate: '4.5',
    collateralToken: 'BTC',
    matuityDate: '2025-06-30',
    status: 'Pending',
  },
  {
    name: 'Bond 3',
    loanToken: 'USDT',
    volumeBond: '20000',
    durationBond: '4 weeks',
    borrowInterestRate: '4.5',
    collateralToken: 'BTC',
    matuityDate: '2025-06-30',
    status: 'Failed',
  },
];

const ListBond = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
      {mockDataArray.map((data, index) => (
        <BondCard
          key={index}
          name={'name'}
          loanToken={data.loanToken}
          volumeBond={String(data.volumeBond || '')}
          durationBond={data.durationBond}
          borrowInterestRate={String(data.borrowInterestRate || '')}
          collateralToken={data.collateralToken}
          matuityDate={data.matuityDate}
          status={data.status}
          className="col-span-1"
          action={
            <HStack pos={'center'}>
              <Button className="bg-primary-900 text-white">Cancel</Button>
            </HStack>
          }
        />
      ))}
    </div>
  );
};

export default ListBond;
