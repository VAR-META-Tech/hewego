/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { HEADER_COLUMNS_TRANSACTION_HISTORY } from '@/modules/my-portfolio-page/utils/const';
import { IPagination, IPaging } from '@/utils/common.type';
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react';

import PaginationList from '@/components/ui/paginationList';
import { HStack } from '@/components/Utilities';

interface Props {
  pagination: IPagination;
  paging: IPaging;
  onPageChange: (newPage: number) => void;
}

const TransactionHistoryTable: React.FC<Props> = ({ pagination, paging, onPageChange }) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const renderCell = React.useCallback((item: any, columnKey: string, index: number) => {
    switch (columnKey) {
      default:
        return item[columnKey];
    }
  }, []);
  return (
    <>
      <Table removeWrapper aria-label="Example table with dynamic content">
        <TableHeader columns={HEADER_COLUMNS_TRANSACTION_HISTORY}>
          {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
        </TableHeader>
        <TableBody items={[]} emptyContent="No data to display.">
          {(item) => (
            <TableRow key={1}>
              {(columnKey) => <TableCell>{renderCell(item, String(columnKey), 1)}</TableCell>}
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

export default TransactionHistoryTable;
