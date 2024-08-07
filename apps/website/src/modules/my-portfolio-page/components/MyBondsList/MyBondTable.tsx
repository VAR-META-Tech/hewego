/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useCallback } from 'react';
import { cn } from '@/utils/common';
import { Button, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react';

import { HEADER_COLUMNS_MY_BONDS, MOCK_DATA_MY_BONDS } from '../../utils/const';

const StatusBadge = ({ status }: { status: string }) => {
  const badgeClass = status === 'Claimed' ? 'bg-primary-100 text-primary-900' : 'bg-orange-600 text-white';
  return <span className={`py-1.5 px-3 ${badgeClass} rounded-full`}>{status}</span>;
};

const ActionButton = ({ status }: { status: string }) => {
  const isClaimed = status === 'Claimed';

  return (
    <Button
      size="md"
      radius="sm"
      disabled={isClaimed}
      className={cn('bg-primary-900 text-white', {
        'bg-primary-100 text-primary-900 pointer-events-none': isClaimed,
      })}
    >
      Claim
    </Button>
  );
};

const MyBondTable = () => {
  const renderCell = useCallback((item: any, columnKey: string) => {
    switch (columnKey) {
      case 'status':
        return <StatusBadge status={item.status} />;
      case 'action':
        return <ActionButton status={item.status} />;
      default:
        return item[columnKey];
    }
  }, []);

  return (
    <Table removeWrapper aria-label="Example table with dynamic content">
      <TableHeader columns={HEADER_COLUMNS_MY_BONDS}>
        {(column) => (
          <TableColumn
            className={cn({
              'flex items-center justify-center': column.key === 'status' || column.key === 'action',
            })}
            key={column.key}
          >
            {column.label}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody items={MOCK_DATA_MY_BONDS} emptyContent="No data to display.">
        {(item) => (
          <TableRow key={item.no}>
            {(columnKey) => (
              <TableCell
                className={cn('h-12', {
                  'flex justify-center': columnKey === 'status' || columnKey === 'action',
                })}
              >
                {renderCell(item, String(columnKey))}
              </TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default MyBondTable;
