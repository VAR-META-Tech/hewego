/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useCallback } from 'react';
import { cn } from '@/utils/common';
import { Button, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react';

import { HEADER_COLUMNS_BOND_REQUESTS, MOCK_DATA_BOND_REQUESTS } from '../../../utils/const';

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

const BondRequestsTable = () => {
  const renderCell = useCallback((item: any, columnKey: string) => {
    switch (columnKey) {
      case 'action':
        return <ActionButton status={item.status} />;
      default:
        return item[columnKey];
    }
  }, []);

  return (
    <Table removeWrapper aria-label="Example table with dynamic content">
      <TableHeader columns={HEADER_COLUMNS_BOND_REQUESTS}>
        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
      </TableHeader>
      <TableBody items={MOCK_DATA_BOND_REQUESTS} emptyContent="No data to display.">
        {(item) => (
          <TableRow key={item.requestId}>
            {(columnKey) => <TableCell>{renderCell(item, String(columnKey))}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default BondRequestsTable;
