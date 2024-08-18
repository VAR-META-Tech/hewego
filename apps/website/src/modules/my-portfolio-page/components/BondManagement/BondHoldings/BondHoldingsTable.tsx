/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { IGetBondHoldingsData } from '@/api/portfolio/type';
import { HederaWalletsContext } from '@/context/HederaContext';
import { useBondClaimStore } from '@/modules/my-portfolio-page/store/useBondClaimStore';
import { useBondHoldingsStore } from '@/modules/my-portfolio-page/store/useBondHoldingsStore';
import { cn, currentNo, prettyNumber, roundNumber } from '@/utils/common';
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
import { HStack } from '@/components/Utilities';

import { BOND_HOLDINGS_KEYS, HEADER_COLUMNS_BOND_HOLDINGS, HOLDING_BOND_STATUS_BUTTON } from '../../../utils/const';
import BondClaimModal from './BondClaimModal';
import DetailBondModal from './DetailBondModal';

interface Props {
  paging: IPaging;
  onPageChange: (newPage: number) => void;
  bonds: IGetBondHoldingsData[];
  pagination: IPagination | undefined;
  setTabContainer: React.Dispatch<React.SetStateAction<string>>;
  refetch: () => void;
  isLoading: boolean;
}

const CENTER_COLUMNS = [BOND_HOLDINGS_KEYS.no, BOND_HOLDINGS_KEYS.action];
const RIGHT_COLUMNS = [BOND_HOLDINGS_KEYS.purchasedAmount, BOND_HOLDINGS_KEYS.receivedAmount];

const BondHoldingsTable: React.FC<Props> = ({
  paging,
  onPageChange,
  bonds,
  pagination,
  setTabContainer,
  refetch,
  isLoading,
}) => {
  const { getLoanTokenLabel } = useGetMetaToken();
  const { hashConnect, accountId } = React.useContext(HederaWalletsContext);
  const setBondDetailId = useBondHoldingsStore.use.setBondDetailId();
  const setBondClaimId = useBondClaimStore.use.setBondClaimId();

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
          .setFunction('lenderClaim', new ContractFunctionParameters().addUint256(Number(bondId)))
          .freezeWithSigner(signer as unknown as Signer);

        const contractExecSign = await contractExecTx?.signWithSigner(signer as unknown as Signer);

        const contractExecSubmit = await contractExecSign
          ?.executeWithSigner(signer as unknown as Signer)
          .catch((e) => console.error(e));

        if (contractExecSubmit?.transactionId) {
          setBondClaimId(String(bondId));
          refetch();
        }
      } catch (error) {
        toast.error(error as string);
      }
    },
    [refetch, setBondClaimId, signer]
  );

  const renderCell = React.useCallback(
    (item: IGetBondHoldingsData, columnKey: string, index: number) => {
      const loanAmount = Number(formatUnits(BigInt(item?.purchasedAmount || 0), Number(TOKEN_UNIT)));
      const interestRate = Number(item?.bondInfo?.interestRate || 0);

      const receiveAmount =
        loanAmount + Number((loanAmount * (interestRate / 100) * Number(item?.bondInfo?.loanTerm)) / 52);

      const isDisableClaim = item?.status === HOLDING_BOND_STATUS_BUTTON.DISABLE_CLAIM;

      const isDisableButton = isDisableClaim || (!isDisableClaim && !!item?.claimedAt);

      switch (columnKey) {
        case 'no':
          return <span>{currentNo(index, paging?.page, paging?.limit)}</span>;
        case 'maturityDate':
          return (
            <span>
              {item?.bondInfo?.maturityDate &&
                format(new Date(Number(item?.bondInfo?.maturityDate) * 1000), DATE_FORMAT.MMM_DD_YYYY)}
            </span>
          );
        case 'name':
          return (
            <span
              className="cursor-pointer hover:underline hover:opacity-60"
              onClick={() => setBondDetailId(String(item?.bondInfo?.bondId))}
            >
              {item?.bondInfo?.name}
            </span>
          );
        case 'purchasedAmount':
          return <span>{`${prettyNumber(loanAmount)} ${getLoanTokenLabel(item?.bondInfo?.loanToken || '')}`}</span>;
        case 'receivedAmount':
          return (
            <span>{`${prettyNumber(roundNumber(receiveAmount))} ${getLoanTokenLabel(item?.bondInfo?.loanToken || '')}`}</span>
          );
        case 'action':
          return (
            <Button
              disabled={isDisableButton}
              onClick={() => handleClaim(Number(item?.bondInfo?.bondId))}
              className={cn('bg-primary-500 text-white w-24', {
                'opacity-50 pointer-events-none': isDisableButton,
              })}
            >
              {item?.claimedAt ? 'Claimed' : 'Claim'}
            </Button>
          );
        default:
          return item[columnKey as keyof IGetBondHoldingsData] as React.ReactNode;
      }
    },
    [getLoanTokenLabel, handleClaim, paging?.limit, paging?.page, setBondDetailId]
  );

  return (
    <>
      <Table removeWrapper aria-label="Example table with dynamic content">
        <TableHeader columns={HEADER_COLUMNS_BOND_HOLDINGS}>
          {(column) => (
            <TableColumn
              key={column.key}
              className={cn({
                'text-center': CENTER_COLUMNS.includes(String(column.key)),
                'text-right': RIGHT_COLUMNS.includes(String(column.key)),
              })}
            >
              {column.label}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody isLoading={isLoading} loadingContent={<Spinner />} items={bonds} emptyContent="No data to display.">
          {bonds?.map((item, index) => (
            <TableRow key={`${item?.bondInfo?.bondId}-${index}`}>
              {(columnKey) => (
                <TableCell
                  className={cn({
                    'text-center': CENTER_COLUMNS.includes(String(columnKey)),
                    'text-right': RIGHT_COLUMNS.includes(String(columnKey)),
                  })}
                >
                  {renderCell(item, String(columnKey), index)}
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {bonds?.map((item, index) => (
        <DetailBondModal bond={item} key={`${item?.bondInfo?.bondId}-${index}`} setTabContainer={setTabContainer} />
      ))}

      {bonds?.map((item, index) => (
        <BondClaimModal
          key={`${item?.bondInfo?.bondId}-${index}`}
          bondId={item?.bondInfo?.bondId}
          duration={item?.bondInfo?.loanTerm}
          interestRate={String(item?.bondInfo?.interestRate)}
          loanAmount={item?.purchasedAmount}
          loanToken={item?.bondInfo?.loanToken}
          refetch={refetch}
        />
      ))}

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

export default BondHoldingsTable;
