import React from 'react';

import TransactionHistoryFilterFormWrapper from '../../form/TransactionHistoryFilterFormWrapper';
import { useGetTransactionHistory } from '../../hooks/useGetTransactionHistory';
import TransactionHistoryFilter from './components/TransactionHistoryFilter';
import TransactionHistoryTable from './components/TransactionHistoryTable';

const TransactionHistory = () => {
  const { refetch, handleSearchChange, paging, pagination, onPageChange, transactions, isLoading } =
    useGetTransactionHistory();

  React.useEffect(() => {
    refetch();

    return () => {
      refetch();
    };
  }, [refetch]);

  React.useEffect(() => {
    const refetchInterval = setInterval(() => {
      refetch();
    }, 4000);

    return () => clearInterval(refetchInterval);
  }, [refetch]);

  return (
    <TransactionHistoryFilterFormWrapper>
      <div className="container space-y-10">
        <TransactionHistoryFilter handleSearchChange={handleSearchChange} />

        <TransactionHistoryTable
          transactions={transactions}
          pagination={pagination}
          paging={paging}
          onPageChange={onPageChange}
          isLoading={isLoading}
        />
      </div>
    </TransactionHistoryFilterFormWrapper>
  );
};

export default TransactionHistory;
