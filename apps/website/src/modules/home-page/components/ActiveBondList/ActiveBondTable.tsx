/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { IGetBondActiveData } from '@/api/bonds/type';
import { Icons } from '@/assets/icons';
import { HederaWalletsContext } from '@/context/HederaContext';
import { useConnectWalletStore } from '@/store/useConnectWalletStore';
import { cn } from '@/utils/common';
import { DATE_FORMAT } from '@/utils/constants';
import {
  Button,
  Progress,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from '@nextui-org/react';
import { format } from 'date-fns';

import { HStack } from '@/components/Utilities';

import { useBuyBondStore } from '../../store/useBuyBondStore';
import { HEADER_ACTIVE_BONDS_COLUMNS, HEADER_ACTIVE_BONDS_KEYS } from '../../utils/const';
import BuyBondModal from '../BuyBondModal';

interface Props {
  isLoading: boolean;
  bonds: IGetBondActiveData[];
  refetch: () => void;
}

const ActiveBondTable: React.FC<Props> = ({ bonds, isLoading, refetch }) => {
  const setBondId = useBuyBondStore.use.setBondId();
  const onOpen = useConnectWalletStore.use.onOpen();
  const { isConnected } = React.useContext(HederaWalletsContext);
  const isConnectedRef = React.useRef(isConnected);

  React.useEffect(() => {
    isConnectedRef.current = isConnected;
  });

  const renderCell = React.useCallback(
    (item: IGetBondActiveData, columnKey: string) => {
      switch (columnKey) {
        case HEADER_ACTIVE_BONDS_KEYS.ISSUANCE_DATE:
          return (
            <span className="font-bold text-nowrap">
              {item?.issuanceDate && format(new Date(Number(item?.issuanceDate) * 1000), DATE_FORMAT.MMM_DD_YYYY)}
            </span>
          );
        case HEADER_ACTIVE_BONDS_KEYS.MATURITY_DATE:
          return (
            <span className="font-bold text-nowrap">
              {item?.maturityDate && format(new Date(Number(item?.maturityDate) * 1000), DATE_FORMAT.MMM_DD_YYYY)}
            </span>
          );
        case HEADER_ACTIVE_BONDS_KEYS.LOAN_TERM:
          return (
            <>
              {item?.loanTerm && (
                <HStack noWrap spacing={8} className="py-1 px-2 rounded-lg bg-primary-50 w-fit">
                  <Icons.calendar color="#9B7AF2" size={16} />

                  <span className="text-primary-500 text-sm text-nowrap">{`${item?.loanTerm} weeks`}</span>
                </HStack>
              )}
            </>
          );
        case HEADER_ACTIVE_BONDS_KEYS.INTEREST_RATE:
          return (
            <div className="text-right w-full">{item?.interestRate && `${Number(item?.interestRate).toFixed(2)}%`}</div>
          );
        case HEADER_ACTIVE_BONDS_KEYS.SOLD_AND_VOLUME:
          return (
            <div>
              <Progress
                aria-label="Progress..."
                size="md"
                value={Number(item?.totalSold ?? 0)}
                maxValue={Number(item?.volumeBond ?? 0)}
                color={
                  Number(Number(item?.totalSold ?? 0) / Number(item?.volumeBond ?? 0)) < 0.8 ? 'success' : 'warning'
                }
                showValueLabel={true}
                className="w-32"
                classNames={{
                  label: 'text-xs',
                  value: 'text-xs',
                }}
                label={`${Number(item?.totalSold ?? 0)}/${Number(item?.volumeBond ?? 0)}`}
              />
            </div>
          );
        // return <span>{`${item?.totalSold || 0}/${item?.volumeBond || 0}`}</span>;
        case HEADER_ACTIVE_BONDS_KEYS.ACTION:
          return (
            <Button
              onPress={() => {
                if (!isConnectedRef.current) {
                  onOpen();
                  return;
                }

                setBondId(String(item?.bondId));
              }}
              startContent={<Icons.moveRight />}
              className="bg-primary-700 text-white"
            >
              Supply
            </Button>
          );
        default:
          return item[columnKey as keyof IGetBondActiveData];
      }
    },
    [onOpen, setBondId]
  );

  const renderModal = React.useMemo(() => {
    if (!bonds?.length) return null;

    return bonds?.map((item, index) => (
      <BuyBondModal key={`${item?.bondId}-${index}`} bondId={item?.bondId} refetch={refetch} />
    ));
  }, [bonds, refetch]);

  return (
    <div className="col-span-8 xl:col-span-6 space-y-10">
      <Table className="w-full text-base" removeWrapper>
        <TableHeader columns={HEADER_ACTIVE_BONDS_COLUMNS}>
          {(column) => (
            <TableColumn
              className={cn('text-base !h-14', {
                'text-right': column.key === HEADER_ACTIVE_BONDS_KEYS.INTEREST_RATE,
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
          items={[...bonds]}
          emptyContent="No data to display."
          className="max-h-screen overflow-hidden"
        >
          {(item) => (
            <TableRow key={1}>{(columnKey) => <TableCell>{renderCell(item, String(columnKey))}</TableCell>}</TableRow>
          )}
        </TableBody>
      </Table>

      {bonds?.length > 0 ? renderModal : null}
    </div>
  );
};

export default React.memo(ActiveBondTable);
