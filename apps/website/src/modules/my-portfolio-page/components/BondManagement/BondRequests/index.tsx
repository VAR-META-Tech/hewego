import React from 'react';
import BondRequestActiveFilterFormWrapper from '@/modules/my-portfolio-page/form/BondRequestActiveFilterFormWrapper';
import BondRequestPendingFilterFormWrapper from '@/modules/my-portfolio-page/form/BondRequestPendingFilterFormWrapper';
import { useGetBondRequestsActive } from '@/modules/my-portfolio-page/hooks/useGetBondRequestsActive';
import { useGetBondRequestsPending } from '@/modules/my-portfolio-page/hooks/useGetBondRequestsPending';

import { HStack, VStack } from '@/components/Utilities';

import BondRequestsActiveFilter from './BondRequestActive.tsx/BondRequestsActiveFilter';
import BondRequestsActiveTable from './BondRequestActive.tsx/BondRequestsActiveTable';
import BondRequestsPendingFilter from './BondRequestPending.tsx/BondRequestsPendingFilter';
import BondRequestsPendingTable from './BondRequestPending.tsx/BondRequestsPendingTable';
import BondRequestsSummary from './BondRequestsSummary';

const BondRequests = () => {
  const { bonds, refetch, handleSearchChange, onPageChange, pagination, paging, isLoading } =
    useGetBondRequestsPending();
  const {
    bonds: bondsActive,
    refetch: refetchActive,
    handleSearchChange: handleSearchChangeActive,
    onPageChange: onPageChangeActive,
    pagination: paginationActive,
    paging: pagingActive,
    isLoading: isLoadingActive,
  } = useGetBondRequestsActive();

  const handleRefetch = React.useCallback(() => {
    refetch();
    refetchActive();
  }, [refetch, refetchActive]);

  React.useEffect(() => {
    handleRefetch();

    return () => {
      handleRefetch();
    };
  }, [handleRefetch]);

  React.useEffect(() => {
    const refetchInterval = setInterval(() => {
      handleRefetch();
    }, 4000);

    return () => clearInterval(refetchInterval);
  }, [handleRefetch]);

  return (
    <div className="space-y-10">
      <div className="container">
        <BondRequestsSummary />
      </div>

      <div className="container space-y-10">
        <VStack>
          <span className="text-3xl font-bold">My Bond Requests</span>
          <span>
            <span className="underline">Note:</span> Confirmed requests will be opened for the lender to supply.
          </span>
        </VStack>

        <BondRequestPendingFilterFormWrapper>
          <HStack spacing={12}>
            <span className="border-primary-500 border rounded-full w-2 h-2" />
            <span className="text-primary-500">Requests Pending Bond Issuance</span>
          </HStack>

          <BondRequestsPendingFilter handleSearchChange={handleSearchChange} />

          <BondRequestsPendingTable
            bonds={bonds}
            pagination={pagination}
            onPageChange={onPageChange}
            paging={paging}
            refetch={refetch}
            isLoading={isLoading}
          />
        </BondRequestPendingFilterFormWrapper>

        <BondRequestActiveFilterFormWrapper>
          <HStack spacing={12}>
            <span className="border-primary-500 border rounded-full w-2 h-2" />
            <span className="text-primary-500">Requests with Issued Bonds</span>
          </HStack>
          <BondRequestsActiveFilter handleSearchChange={handleSearchChangeActive} />

          <BondRequestsActiveTable
            bonds={bondsActive}
            pagination={paginationActive}
            onPageChange={onPageChangeActive}
            paging={pagingActive}
            refetch={refetchActive}
            isLoading={isLoadingActive}
          />
        </BondRequestActiveFilterFormWrapper>
      </div>
    </div>
  );
};

export default BondRequests;
