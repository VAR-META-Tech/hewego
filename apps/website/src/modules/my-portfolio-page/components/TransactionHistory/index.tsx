import React from 'react';
import { HederaWalletsContext } from '@/context/HederaContext';

import TransactionHistoryFilterFormWrapper from '../../form/TransactionHistoryFilterFormWrapper';
import { useGetTransactionHistory } from '../../hooks/useGetTransactionHistory';
import TransactionHistoryFilter from './components/TransactionHistoryFilter';
import TransactionHistoryTable from './components/TransactionHistoryTable';

const TransactionHistory = () => {
  const { isConnected } = React.useContext(HederaWalletsContext);
  const { refetch, handleSearchChange, paging, pagination, onPageChange, transactions, isLoading } =
    useGetTransactionHistory();

  React.useEffect(() => {
    if (!isConnected) return;

    const refetchInterval = setInterval(() => {
      refetch();
    }, 4000);

    return () => clearInterval(refetchInterval);
  }, [isConnected, refetch]);

  return (
    <TransactionHistoryFilterFormWrapper>
      <div className="container space-y-8">
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
