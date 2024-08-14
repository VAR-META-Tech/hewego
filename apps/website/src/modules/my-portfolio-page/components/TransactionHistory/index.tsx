import React from 'react';

import TransactionHistoryFilterFormWrapper from '../../form/TransactionHistoryFilterFormWrapper';
import { useGetTransactionHistory } from '../../hooks/useGetTransactionHistory';
import TransactionHistoryFilter from './components/TransactionHistoryFilter';

// import TransactionHistoryTable from './components/TransactionHistoryTable';

const TransactionHistory = () => {
  const { data } = useGetTransactionHistory();
  console.log('🚀 ~ TransactionHistory ~ data:', data);
  return (
    <TransactionHistoryFilterFormWrapper>
      <div className="container space-y-10">
        <TransactionHistoryFilter />

        {/* <TransactionHistoryTable /> */}
      </div>
    </TransactionHistoryFilterFormWrapper>
  );
};

export default TransactionHistory;
