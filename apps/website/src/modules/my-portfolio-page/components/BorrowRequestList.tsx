import React from 'react';
import { Button } from '@nextui-org/react';

import BondCard from '@/components/BondCard';
import { HStack } from '@/components/Utilities';

import { MOCK_DATA_BORROW_REQUEST } from '../utils/const';

const StatusBadge = ({ status }: { status: string }) => {
  const badgeClass = status === 'Failed' ? 'bg-red-500' : 'bg-primary-900';

  return (
    <HStack pos="right">
      <span className={`text-white text-xs ${badgeClass} px-3 py-1.5 rounded-full`}>{status}</span>
    </HStack>
  );
};

const CancelButton = () => (
  <HStack pos="center">
    <Button className="bg-primary-900 text-white">Cancel</Button>
  </HStack>
);

const BorrowRequestList = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
      {MOCK_DATA_BORROW_REQUEST.map(
        ({ name, loanToken, volumeBond, durationBond, borrowInterestRate, collateralToken, matuityDate, status }) => (
          <BondCard
            key={name}
            name={name}
            loanToken={loanToken}
            volumeBond={volumeBond}
            durationBond={durationBond}
            borrowInterestRate={borrowInterestRate}
            collateralToken={collateralToken}
            maturityDate={matuityDate}
            className="col-span-1"
            prefix={<StatusBadge status={status} />}
            suffix={<CancelButton />}
          />
        )
      )}
    </div>
  );
};

export default BorrowRequestList;
