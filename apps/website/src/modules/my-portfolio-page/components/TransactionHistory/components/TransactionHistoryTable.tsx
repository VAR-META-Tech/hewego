/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import Link from 'next/link';
import { IGetAllTransactionHistoryData } from '@/api/portfolio/type';
import {
  HEADER_COLUMNS_TRANSACTION_HISTORY,
  TRANSACTION_HISTORY_KEYS,
  TRANSACTION_TYPE_LABEL,
  TRANSACTION_TYPE_VALUE,
} from '@/modules/my-portfolio-page/utils/const';
import { cn, prettyNumber } from '@/utils/common';
import { IPagination, IPaging } from '@/utils/common.type';
import { DATE_FORMAT, env, TOKEN_UNIT } from '@/utils/constants';
import { Spinner, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react';
import { format } from 'date-fns';
import { formatUnits } from 'viem';

import PaginationList from '@/components/ui/paginationList';
import { HStack } from '@/components/Utilities';

interface Props {
  pagination: IPagination | undefined;
  paging: IPaging;
  onPageChange: (newPage: number) => void;
  transactions: IGetAllTransactionHistoryData[];
  isLoading: boolean;
}

const CENTER_COLUMNS = [TRANSACTION_HISTORY_KEYS.status];

const TransactionHistoryTable: React.FC<Props> = ({ pagination, paging, onPageChange, transactions, isLoading }) => {
  const renderCell = React.useCallback((item: IGetAllTransactionHistoryData, columnKey: string) => {
    const transactionType = item?.transactionType || '';

    const typeKey: keyof typeof TRANSACTION_TYPE_VALUE = transactionType as keyof typeof TRANSACTION_TYPE_VALUE;
    const type: keyof typeof TRANSACTION_TYPE_LABEL = TRANSACTION_TYPE_VALUE[
      typeKey
    ] as keyof typeof TRANSACTION_TYPE_LABEL;

    const typeLabel = TRANSACTION_TYPE_LABEL[type];
    switch (columnKey) {
      case TRANSACTION_HISTORY_KEYS.dateTime:
        return <span>{!!item?.createdAt && format(new Date(item?.createdAt), DATE_FORMAT.YYYY_MM_DD_HH_MM)}</span>;
      case TRANSACTION_HISTORY_KEYS.transactionType:
        return <span>{!!transactionType && typeLabel}</span>;
      case TRANSACTION_HISTORY_KEYS.amount:
        return (
          <span>
            {!!item?.amount &&
              prettyNumber(Number(Number(formatUnits(BigInt(item?.amount), Number(TOKEN_UNIT))).toFixed(2)))}
          </span>
        );
      case TRANSACTION_HISTORY_KEYS.asset:
        return <span>{!!item?.masterAsset && item?.masterAsset}</span>;
      case TRANSACTION_HISTORY_KEYS.status:
        return (
          <span className="bg-green-600 text-white py-1 px-2 rounded-full">
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
        return item[columnKey as keyof IGetAllTransactionHistoryData] as React.ReactNode;
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
              })}
            >
              {column.label}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody
          isLoading={isLoading}
          loadingContent={<Spinner />}
          items={transactions}
          emptyContent="No data to display."
        >
          {(item) => (
            <TableRow key={1}>
              {(columnKey) => (
                <TableCell
                  className={cn({
                    'text-center': CENTER_COLUMNS.includes(String(columnKey)),
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
