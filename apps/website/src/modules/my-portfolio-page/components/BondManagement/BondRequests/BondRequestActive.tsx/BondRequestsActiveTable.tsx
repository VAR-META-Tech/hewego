/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useCallback } from 'react';
import { IGetBorrowRequestData } from '@/api/portfolio/type';
import { HederaWalletsContext } from '@/context/HederaContext';
import { cn, prettyNumber } from '@/utils/common';
import { IPagination, IPaging } from '@/utils/common.type';
import { CONTRACT_ID, DATE_FORMAT, env, TOKEN_UNIT } from '@/utils/constants';
import { ContractExecuteTransaction, ContractFunctionParameters } from '@hashgraph/sdk';
import { Signer } from '@hashgraph/sdk/lib/Signer';
import { Button, Spinner, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react';
import { format } from 'date-fns';
import { toast } from 'sonner';
import { formatUnits } from 'viem';

import { useGetMetaToken } from '@/hooks/useGetMetaToken';
import PaginationList from '@/components/ui/paginationList';
import { HStack, VStack } from '@/components/Utilities';

import { BOND_REQUEST_ACTIVE_ACTIONS, BOND_REQUESTS_KEYS, HEADER_COLUMNS_BOND_REQUESTS } from '../../../../utils/const';

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
  const { getLoanTokenLabel } = useGetMetaToken();
  const { hashConnect, accountId } = React.useContext(HederaWalletsContext);

  const provider = hashConnect?.getProvider(env.NETWORK_TYPE, hashConnect?.hcData?.topic ?? '', accountId ?? '');

  const signer = React.useMemo(() => {
    if (!provider) return null;

    return hashConnect?.getSigner(provider);
  }, [hashConnect, provider]);

  const handleClaim = React.useCallback(
    async (bondId: number) => {
      try {
        if (!signer) return;

        const contractExecTx = await new ContractExecuteTransaction()
          .setContractId(CONTRACT_ID)
          .setGas(1000000)
          .setFunction('borrowerClaim', new ContractFunctionParameters().addUint256(bondId))
          .freezeWithSigner(signer as unknown as Signer);

        const contractExecSign = await contractExecTx?.signWithSigner(signer as unknown as Signer);

        const contractExecSubmit = await contractExecSign
          ?.executeWithSigner(signer as unknown as Signer)
          .catch((e) => console.error(e));

        if (contractExecSubmit?.transactionId) {
          console.log('contractExecSubmit', contractExecSubmit?.transactionId);
        }
      } catch (error) {
        toast.error(error as string);
      }
    },
    [signer]
  );

  const handleRepay = React.useCallback(
    async (bondId: number) => {
      try {
        if (!signer) return;

        const contractExecTx = await new ContractExecuteTransaction()
          .setContractId(CONTRACT_ID)
          .setGas(1000000)
          .setFunction('repayBond', new ContractFunctionParameters().addUint256(bondId))
          .freezeWithSigner(signer as unknown as Signer);

        const contractExecSign = await contractExecTx?.signWithSigner(signer as unknown as Signer);

        const contractExecSubmit = await contractExecSign
          ?.executeWithSigner(signer as unknown as Signer)
          .catch((e) => console.error(e));

        if (contractExecSubmit?.transactionId) {
          setTimeout(() => {
            refetch();
          }, 500);
        }
      } catch (error) {
        toast.error(error as string);
      }
    },
    [refetch, signer]
  );

  const renderCell = useCallback(
    (item: IGetBorrowRequestData, columnKey: string) => {
      const loanAmount = Number(formatUnits(BigInt(Number(item?.loanAmount || 0)), Number(TOKEN_UNIT)));
      const loanTokenLabel = getLoanTokenLabel(item?.loanToken);

      // getPriceFeed(item?.loanToken, item?.collateralToken, item?.loanAmount);
      switch (columnKey) {
        case BOND_REQUESTS_KEYS.issuanceDate:
          return (
            <span>
              {item?.issuanceDate && format(new Date(Number(item?.issuanceDate) * 1000), DATE_FORMAT.MMM_DD_YYYY)}
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
                if (item?.action === BOND_REQUEST_ACTIVE_ACTIONS.CLAIM) {
                  handleClaim(item?.bondId);
                  return;
                }
                handleRepay(item?.bondId);
              }}
            >
              {item?.action === BOND_REQUEST_ACTIVE_ACTIONS.CLAIM ? 'Claim' : 'Repay'}
            </Button>
          );
        default:
          return item[columnKey as keyof IGetBorrowRequestData] as React.ReactNode;
      }
    },
    [getLoanTokenLabel, handleClaim, handleRepay]
  );

  return (
    <VStack>
      <Table removeWrapper aria-label="Example table with dynamic content" className="overflow-auto">
        <TableHeader columns={HEADER_COLUMNS_BOND_REQUESTS}>
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
        <TableBody isLoading={isLoading} loadingContent={<Spinner />} items={bonds} emptyContent="No data to display.">
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
