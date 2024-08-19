/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useCallback } from 'react';
import Link from 'next/link';
import { IGetBorrowRequestData } from '@/api/portfolio/type';
import { useBondCancelStore } from '@/modules/my-portfolio-page/store/useBondCancelStore';
import { ROUTE } from '@/types';
import { cn, prettyNumber } from '@/utils/common';
import { IPagination, IPaging } from '@/utils/common.type';
import { DATE_FORMAT, TOKEN_UNIT } from '@/utils/constants';
import { Button, Spinner, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react';
import { format } from 'date-fns';
import { formatUnits } from 'viem';

import { useGetMetaToken } from '@/hooks/useGetMetaToken';
import PaginationList from '@/components/ui/paginationList';
import { HStack, VStack } from '@/components/Utilities';

import { BOND_REQUESTS_KEYS, HEADER_COLUMNS_BOND_REQUESTS } from '../../../../utils/const';
import CancelModal from './CancelModal';

interface Props {
  bonds: IGetBorrowRequestData[];
  paging: IPaging;
  pagination: IPagination | undefined;
  onPageChange: (newPage: number) => void;
  refetch: () => void;
  isLoading: boolean;
}

const BondRequestsPendingTable: React.FC<Props> = ({ bonds, paging, pagination, onPageChange, refetch, isLoading }) => {
  const { getLoanTokenLabel } = useGetMetaToken();
  const setBondCancelId = useBondCancelStore.use.setBondCancelId();

  const renderCell = useCallback(
    (item: IGetBorrowRequestData, columnKey: string) => {
      const loanAmount = Number(formatUnits(BigInt(Number(item?.loanAmount || 0)), Number(TOKEN_UNIT)));
      const loanTokenLabel = getLoanTokenLabel(item?.loanToken);

      switch (columnKey) {
        case BOND_REQUESTS_KEYS.issuanceDate:
          return (
            <span className="text-nowrap">
              {item?.issuanceDate && format(new Date(Number(item?.issuanceDate) * 1000), DATE_FORMAT.MMM_DD_YYYY)}
            </span>
          );
        case BOND_REQUESTS_KEYS.loanAmount:
          return <span className="text-nowrap">{`${prettyNumber(loanAmount || 0)} ${loanTokenLabel}`}</span>;
        case BOND_REQUESTS_KEYS.interestRate:
          return <span className="text-nowrap">{`${Number(item?.interestRate || 0).toFixed(2)}%`}</span>;
        case BOND_REQUESTS_KEYS.loanTerm:
          return (
            <span className="text-nowrap">{`${Number(item?.loanTerm || 0)} ${Number(item?.loanTerm || 0) > 1 ? 'weeks' : 'week'}`}</span>
          );
        case BOND_REQUESTS_KEYS.supply:
          return <span className="text-nowrap">{`${Number(item?.totalSold || 0)}/${item?.volumeBond}`}</span>;
        case BOND_REQUESTS_KEYS.status:
          return (
            <span
              className={cn('px-2 py-1 text-nowrap rounded-full', {
                ' bg-gray-300/70': !!item?.canceledAt,
                'bg-orange-200/50 text-orange-700': !item?.canceledAt,
              })}
            >
              {item?.canceledAt ? 'Closed' : 'Pending Issuance'}
            </span>
          );
        case BOND_REQUESTS_KEYS.action:
          return (
            <Button
              className={cn('bg-primary-700 text-white uppercase', {
                'pointer-events-none opacity-50': !!item?.canceledAt || !!item?.totalSold,
              })}
              disabled={!!item?.canceledAt || !!item?.totalSold}
              onPress={() => setBondCancelId(String(item?.bondId))}
            >
              Cancel
            </Button>
          );
        default:
          return item[columnKey as keyof IGetBorrowRequestData] as React.ReactNode;
      }
    },
    [getLoanTokenLabel, setBondCancelId]
  );

  const textRightAlignArray = [BOND_REQUESTS_KEYS.loanAmount, BOND_REQUESTS_KEYS.interestRate];

  return (
    <VStack>
      <Table removeWrapper aria-label="Example table with dynamic content" className="overflow-auto">
        <TableHeader columns={HEADER_COLUMNS_BOND_REQUESTS}>
          {(column) => (
            <TableColumn
              className={cn({
                'text-right': textRightAlignArray.includes(String(column?.key)),
                'text-center': String(column?.key) === 'status',
              })}
              key={column.key}
            >
              {column.label}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody
          isLoading={isLoading}
          loadingContent={<Spinner />}
          items={bonds}
          emptyContent={
            <span>
              You have not created any borrow requests yet. Please create a new borrow request to see it listed{' '}
              <Link href={ROUTE.ISSUE_BOND} className="underline text-blue-500 hover:opacity-50">
                here
              </Link>
            </span>
          }
        >
          {bonds?.map((item, index) => (
            <TableRow key={`${item?.bondId}-${index}`}>
              {(columnKey) => (
                <TableCell
                  className={cn({
                    'text-right': textRightAlignArray.includes(String(columnKey)),
                    'text-center': String(columnKey) === 'status',
                  })}
                >
                  {renderCell(item, String(columnKey))}
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {!!bonds?.length &&
        bonds?.map((bond, index) => {
          return (
            <CancelModal
              key={`${bond?.bondId}-${index}`}
              bondId={bond?.bondId}
              refetch={refetch}
              collateralAmount={bond?.collateralAmount}
              loanToken={bond?.loanToken}
            />
          );
        })}

      {!!pagination?.itemCount && (
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
    </VStack>
  );
};

export default BondRequestsPendingTable;
