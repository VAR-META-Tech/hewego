/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { useRouter } from 'next/navigation';
import { IGetBondActiveData } from '@/api/bonds/type';
import { Icons } from '@/assets/icons';
import { ROUTE } from '@/types';
import { Button, Spinner, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react';
import { format } from 'date-fns';

import { HStack } from '@/components/Utilities';

import { HEADER_ACTIVE_BONDS_COLUMNS, HEADER_ACTIVE_BONDS_KEYS } from '../../utils/const';

interface Props {
  isLoading: boolean;
  bonds: IGetBondActiveData[];
}

const ActiveBondTable: React.FC<Props> = ({ bonds, isLoading }) => {
  const router = useRouter();
  const renderCell = React.useCallback(
    (item: IGetBondActiveData, columnKey: string) => {
      switch (columnKey) {
        case HEADER_ACTIVE_BONDS_KEYS.MATURITY_DATE:
          return (
            <span className="font-bold">
              {item?.maturityDate && format(new Date(Number(item?.maturityDate) * 1000), 'dd-MMM-yy')}
            </span>
          );
        case HEADER_ACTIVE_BONDS_KEYS.LOAN_TERM:
          return (
            <>
              {item?.loanTerm && (
                <HStack spacing={8} className="py-1 px-2 rounded-lg bg-primary-50 w-fit">
                  <Icons.calendar color="#66d7e6" size={16} />

                  <span className="text-primary-900 text-sm">{`${item?.loanTerm} weeks`}</span>
                </HStack>
              )}
            </>
          );
        case HEADER_ACTIVE_BONDS_KEYS.ACTION:
          return (
            <Button
              onPress={() => router.push(ROUTE.BUY_BOND.replace(':id', String(item?.id)))}
              startContent={<Icons.moveRight />}
              className="bg-primary-900 text-white"
            >
              Buy Bond
            </Button>
          );
        default:
          return item[columnKey as keyof IGetBondActiveData];
      }
    },
    [router]
  );

  return (
    <div className="col-span-1 lg:col-span-4 space-y-10">
      <HStack spacing={8} className="py-2 px-4 bg-primary-50 rounded-sm w-fit ">
        <Icons.circle color="#00bdd6" size={12} />

        <span className="text-primary-900 text-lg">Active</span>
      </HStack>
      <Table removeWrapper aria-label="Example table with dynamic content">
        <TableHeader columns={HEADER_ACTIVE_BONDS_COLUMNS}>
          {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
        </TableHeader>
        <TableBody isLoading={isLoading} loadingContent={<Spinner />} items={bonds} emptyContent="No data to display.">
          {(item) => (
            <TableRow key={1}>{(columnKey) => <TableCell>{renderCell(item, String(columnKey))}</TableCell>}</TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default React.memo(ActiveBondTable);
