import React from 'react';
import BondRequestFilterFormWrapper from '@/modules/my-portfolio-page/form/BondRequestFilterFormWrapper';
import { useGetBondsRequest } from '@/modules/my-portfolio-page/hooks/useGetBondsRequest';

import BondRequestFilter from './BondRequestFilter';
import BondRequestsSummary from './BondRequestsSummary';
import BondRequestsTable from './BondRequestsTable';

const BondRequests = () => {
  const [isOpenFilter, setIsOpenFilter] = React.useState<boolean>(true);
  const { data } = useGetBondsRequest();
  console.log('🚀 ~ BondRequests ~ data:', data);
  return (
    <BondRequestFilterFormWrapper>
      <BondRequestsSummary />

      <div className="container space-y-10">
        <BondRequestFilter isOpenFilter={isOpenFilter} setIsOpenFilter={setIsOpenFilter} />

        <BondRequestsTable />
      </div>
    </BondRequestFilterFormWrapper>
  );
};

export default BondRequests;
