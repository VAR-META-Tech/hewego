/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import Link from 'next/link';
import { IGetTransactionHistoryData } from '@/api/portfolio/type';
import { HEADER_COLUMNS_TRANSACTION_HISTORY, TRANSACTION_HISTORY_KEYS } from '@/modules/my-portfolio-page/utils/const';
import { cn, prettyNumber } from '@/utils/common';
import { IPagination, IPaging } from '@/utils/common.type';
import { DATE_FORMAT, env, TOKEN_UNIT } from '@/utils/constants';
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react';
import { format } from 'date-fns';
import { formatUnits } from 'viem';

import PaginationList from '@/components/ui/paginationList';
import { HStack } from '@/components/Utilities';

interface Props {
  pagination: IPagination | undefined;
  paging: IPaging;
  onPageChange: (newPage: number) => void;
  transactions: IGetTransactionHistoryData[];
}

const CENTER_COLUMNS = [TRANSACTION_HISTORY_KEYS.transactionId, TRANSACTION_HISTORY_KEYS.status];
const RIGHT_COLUMNS = [
  TRANSACTION_HISTORY_KEYS.loanAmount,
  TRANSACTION_HISTORY_KEYS.interestPayment,
  TRANSACTION_HISTORY_KEYS.receivedAmount,
];

const TransactionHistoryTable: React.FC<Props> = ({ pagination, paging, onPageChange, transactions }) => {
  const renderCell = React.useCallback((item: IGetTransactionHistoryData, columnKey: string) => {
    switch (columnKey) {
      case TRANSACTION_HISTORY_KEYS.dateTime:
        return <span>{item?.createdAt && format(new Date(item?.createdAt), DATE_FORMAT.YYYY_MM_DD_HH_MM)}</span>;
      case TRANSACTION_HISTORY_KEYS.transactionType:
        return <span>Receive Loan Amount </span>;
      case TRANSACTION_HISTORY_KEYS.loanAmount:
        return (
          <span>{`${prettyNumber(Number(formatUnits(BigInt(item?.loanAmount || 0), Number(TOKEN_UNIT))))} ${item?.loanTokenType || ''}`}</span>
        );
      case TRANSACTION_HISTORY_KEYS.interestPayment:
        return (
          <span>{`${prettyNumber(Number(formatUnits(BigInt(item?.receivedAmount || 0), Number(TOKEN_UNIT))))} ${item?.loanTokenType || ''}`}</span>
        );
      case TRANSACTION_HISTORY_KEYS.receivedAmount:
        return (
          <span>{`${prettyNumber(Number(formatUnits(BigInt(item?.receivedAmount || 0), Number(TOKEN_UNIT))))} ${item?.loanTokenType || ''}`}</span>
        );
      case TRANSACTION_HISTORY_KEYS.status:
        return (
          <span className="text-white py-1 px-2 bg-green-700 rounded-full">
            {item?.status === 'COMPLETED' ? 'Completed' : 'Failed'}
          </span>
        );
      case TRANSACTION_HISTORY_KEYS.action:
        return (
          <Link
            href={`${env.HASHSCAN_URL}/${env.NETWORK_TYPE}/transaction/${item?.transactionHash}`}
            className="text-blue-400 underline hover:opacity-50"
            target="_blank"
          >
            Transaction Hash
          </Link>
        );
      default:
        return item[columnKey as keyof IGetTransactionHistoryData] as React.ReactNode;
    }
  }, []);

  return (
    <>
      <Table removeWrapper aria-label="Example table with dynamic content">
        <TableHeader columns={HEADER_COLUMNS_TRANSACTION_HISTORY}>
          {(column) => (
            <TableColumn
              key={column.key}
              className={cn({
                'text-center': CENTER_COLUMNS.includes(column.key),
                'text-right': RIGHT_COLUMNS.includes(column.key),
              })}
            >
              {column.label}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={transactions} emptyContent="No data to display.">
          {(item) => (
            <TableRow key={1}>
              {(columnKey) => (
                <TableCell
                  className={cn({
                    'text-center': CENTER_COLUMNS.includes(String(columnKey)),
                    'text-right': RIGHT_COLUMNS.includes(String(columnKey)),
                  })}
                >
                  {renderCell(item, String(columnKey))}
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>

      {pagination && (
        <HStack pos={'center'}>
          <PaginationList
            pageSize={paging?.limit}
            currentPage={paging?.page}
            onPageChange={(newPage) => {
              onPageChange(newPage);
            }}
            siblingCount={1}
            totalCount={paging?.total || 0}
          />
        </HStack>
      )}
    </>
  );
};

export default React.memo(TransactionHistoryTable);
