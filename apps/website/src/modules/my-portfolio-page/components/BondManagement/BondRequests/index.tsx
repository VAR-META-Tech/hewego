import React from 'react';
import BondRequestActiveFilterFormWrapper from '@/modules/my-portfolio-page/form/BondRequestActiveFilterFormWrapper';
import BondRequestPendingFilterFormWrapper from '@/modules/my-portfolio-page/form/BondRequestPendingFilterFormWrapper';
import { useGetBondRequestsActive } from '@/modules/my-portfolio-page/hooks/useGetBondRequestsActive';
import { useGetBondRequestsPending } from '@/modules/my-portfolio-page/hooks/useGetBondRequestsPending';

import { VStack } from '@/components/Utilities';

import BondRequestsActiveFilter from './BondRequestActive.tsx/BondRequestsActiveFilter';
import BondRequestsActiveTable from './BondRequestActive.tsx/BondRequestsActiveTable';
import BondRequestsPendingFilter from './BondRequestPending.tsx/BondRequestsPendingFilter';
import BondRequestsPendingTable from './BondRequestPending.tsx/BondRequestsPendingTable';
import BondRequestsSummary from './BondRequestsSummary';

const BondRequests = () => {
  const { bonds, refetch, handleSearchChange } = useGetBondRequestsPending();
  const {
    bonds: bondsActive,
    refetch: refetchAtive,
    handleSearchChange: handleSearchChangeActive,
  } = useGetBondRequestsActive();

  React.useEffect(() => {
    refetch();
    refetchAtive();

    return () => {
      refetch();
      refetchAtive();
    };
  }, [refetch, refetchAtive]);

  return (
    <div className="space-y-10">
      <BondRequestsSummary />

      <div className="container space-y-10">
        <VStack>
          <span className="text-3xl font-bold">My Bond Requests</span>
          <span>
            <span className="underline">Note:</span> Confirmed requests will be opened for the lender to supply.
          </span>
        </VStack>

        <BondRequestPendingFilterFormWrapper>
          <BondRequestsPendingFilter handleSearchChange={handleSearchChange} />

          <BondRequestsPendingTable bonds={bonds} />
        </BondRequestPendingFilterFormWrapper>

        <BondRequestActiveFilterFormWrapper>
          <BondRequestsActiveFilter handleSearchChange={handleSearchChangeActive} />

          <BondRequestsActiveTable bonds={bondsActive} />
        </BondRequestActiveFilterFormWrapper>
      </div>
    </div>
  );
};

export default BondRequests;
