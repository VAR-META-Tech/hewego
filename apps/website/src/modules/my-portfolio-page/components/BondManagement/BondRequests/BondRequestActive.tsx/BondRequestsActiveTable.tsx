/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useCallback } from 'react';
import Link from 'next/link';
import { IGetBorrowRequestData } from '@/api/portfolio/type';
import { useBondRepayStore } from '@/modules/my-portfolio-page/store/useBondRepayStore';
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

import {
  BOND_REQUEST_ACTIVE_ACTIONS,
  BOND_REQUESTS_KEYS,
  HEADER_COLUMNS_BOND_REQUESTS_ACTIVE,
} from '../../../../utils/const';
import RepayModal from './RepayModal';

interface Props {
  bonds: IGetBorrowRequestData[];
  paging: IPaging;
  pagination: IPagination | undefined;
  onPageChange: (newPage: number) => void;
  refetch: () => void;
  isLoading: boolean;
}

const CENTER_COLUMNS = [BOND_REQUESTS_KEYS.action];
const RIGHT_COLUMNS = [BOND_REQUESTS_KEYS.loanAmount, BOND_REQUESTS_KEYS.interestRate];

const BondRequestsActiveTable: React.FC<Props> = ({ bonds, paging, pagination, onPageChange, refetch, isLoading }) => {
  const setBondRepayId = useBondRepayStore.use.setBondRepayId();
  const { getLoanTokenLabel } = useGetMetaToken();

  const renderCell = useCallback(
    (item: IGetBorrowRequestData, columnKey: string) => {
      const loanAmount = Number(formatUnits(BigInt(Number(item?.loanAmount || 0)), Number(TOKEN_UNIT)));
      const loanTokenLabel = getLoanTokenLabel(item?.loanToken);

      // getPriceFeed(item?.loanToken, item?.collateralToken, item?.loanAmount);
      switch (columnKey) {
        case BOND_REQUESTS_KEYS.maturityDate:
          return (
            <span>
              {item?.maturityDate && format(new Date(Number(item?.maturityDate) * 1000), DATE_FORMAT.MMM_DD_YYYY)}
            </span>
          );
        case BOND_REQUESTS_KEYS.loanAmount:
          return <span>{`${prettyNumber(loanAmount || 0)} ${loanTokenLabel}`}</span>;
        case BOND_REQUESTS_KEYS.interestRate:
          return <span>{`${Number(item?.interestRate || 0).toFixed(2)}%`}</span>;
        case BOND_REQUESTS_KEYS.loanTerm:
          return <span>{`${Number(item?.loanTerm || 0)} ${Number(item?.loanTerm || 0) > 1 ? 'weeks' : 'week'}`}</span>;
        case BOND_REQUESTS_KEYS.supply:
          return <span>{`${Number(item?.totalSold || 0)}/${loanAmount / 100}`}</span>;
        case BOND_REQUESTS_KEYS.status:
          return (
            <span
              className={cn('px-2 py-1 text-nowrap rounded-full', {
                'bg-gray-200/50': !!item?.repaidAt,
                'text-green-600 bg-green-400/30': !item?.repaidAt,
              })}
            >
              {item?.repaidAt ? 'Completed' : 'Active'}
            </span>
          );
        case BOND_REQUESTS_KEYS.action:
          return (
            <Button
              className={cn('bg-primary-700 text-white uppercase', {
                'pointer-events-none opacity-50': item?.action === BOND_REQUEST_ACTIVE_ACTIONS.CLOSED,
              })}
              disabled={item?.action === BOND_REQUEST_ACTIVE_ACTIONS.CLOSED}
              onPress={() => {
                setBondRepayId(String(item?.bondId));
              }}
            >
              {item?.action === BOND_REQUEST_ACTIVE_ACTIONS.CLAIM ? 'Claim' : 'Repay'}
            </Button>
          );
        default:
          return item[columnKey as keyof IGetBorrowRequestData] as React.ReactNode;
      }
    },
    [getLoanTokenLabel, setBondRepayId]
  );

  return (
    <VStack>
      <Table removeWrapper aria-label="Example table with dynamic content" className="overflow-auto">
        <TableHeader columns={HEADER_COLUMNS_BOND_REQUESTS_ACTIVE}>
          {(column) => (
            <TableColumn
              className={cn({
                'text-right': RIGHT_COLUMNS.includes(String(column.key)),
                'text-center': CENTER_COLUMNS.includes(String(column.key)),
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
                    'text-right': RIGHT_COLUMNS.includes(String(columnKey)),
                    'text-center': CENTER_COLUMNS.includes(String(columnKey)),
                  })}
                >
                  {renderCell(item, String(columnKey))}
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {bonds?.map((item, index) => (
        <RepayModal
          key={`${item?.bondId}-${index}`}
          bondId={item?.bondId}
          collateralAmount={item?.collateralAmount}
          refetch={refetch}
          collateralToken={item?.collateralToken}
          interestRate={item?.interestRate}
          maturityDate={item?.maturityDate}
        />
      ))}

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

export default BondRequestsActiveTable;
