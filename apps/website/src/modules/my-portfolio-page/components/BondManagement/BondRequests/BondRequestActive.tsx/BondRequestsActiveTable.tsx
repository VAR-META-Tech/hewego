/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useCallback } from 'react';
import { IGetBorrowRequestData } from '@/api/portfolio/type';
import { HederaWalletsContext } from '@/context/HederaContext';
import { cn, prettyNumber } from '@/utils/common';
import { CONTRACT_ID, DATE_FORMAT, TOKEN_UNIT } from '@/utils/constants';
import { ContractExecuteTransaction, ContractFunctionParameters } from '@hashgraph/sdk';
import { Signer } from '@hashgraph/sdk/lib/Signer';
import { Button, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react';
import { format } from 'date-fns';
import { toast } from 'sonner';
import { formatUnits } from 'viem';

import { useGetMetaToken } from '@/hooks/useGetMetaToken';
import { HStack, VStack } from '@/components/Utilities';

import { BOND_REQUEST_ACTIVE_ACTIONS, BOND_REQUESTS_KEYS, HEADER_COLUMNS_BOND_REQUESTS } from '../../../../utils/const';

interface Props {
  bonds: IGetBorrowRequestData[];
}

const BondRequestsActiveTable: React.FC<Props> = ({ bonds }) => {
  const { getLoanTokenLabel } = useGetMetaToken();
  const { hashConnect, accountId } = React.useContext(HederaWalletsContext);

  const provider = hashConnect?.getProvider('testnet', hashConnect?.hcData?.topic ?? '', accountId ?? '');

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
          console.log('contractExecSubmit', contractExecSubmit?.transactionId);
        }
      } catch (error) {
        toast.error(error as string);
      }
    },
    [signer]
  );

  const renderCell = useCallback(
    (item: IGetBorrowRequestData, columnKey: string) => {
      const loanAmount = Number(formatUnits(BigInt(Number(item?.loanAmount || 0)), TOKEN_UNIT));
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

  const textRightAlignArray = [BOND_REQUESTS_KEYS.loanAmount, BOND_REQUESTS_KEYS.interestRate];

  return (
    <VStack>
      <HStack spacing={12}>
        <span className="border-primary-500 border rounded-full w-2 h-2" />
        <span className="text-primary-500">Requests with Issued Bonds</span>
      </HStack>

      <Table removeWrapper aria-label="Example table with dynamic content">
        <TableHeader columns={HEADER_COLUMNS_BOND_REQUESTS}>
          {(column) => (
            <TableColumn
              className={cn({
                'text-right': textRightAlignArray.includes(String(column.key)),
              })}
              key={column.key}
            >
              {column.label}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={bonds} emptyContent="No data to display.">
          {bonds?.map((item, index) => (
            <TableRow key={`${item?.bondId}-${index}`}>
              {(columnKey) => (
                <TableCell
                  className={cn({
                    'text-right': textRightAlignArray.includes(String(columnKey)),
                  })}
                >
                  {renderCell(item, String(columnKey))}
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </VStack>
  );
};

export default BondRequestsActiveTable;
