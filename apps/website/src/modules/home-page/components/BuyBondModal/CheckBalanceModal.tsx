import React from 'react';
import { Icons } from '@/assets/icons';
import { HederaWalletsContext } from '@/context/HederaContext';
import { cn, convertEvmAddressToAccountId, getBalance } from '@/utils/common';
import { Button, CircularProgress, Modal, ModalBody, ModalContent } from '@nextui-org/react';
import { useFormContext } from 'react-hook-form';

import { useGetMetaToken } from '@/hooks/useGetMetaToken';
import { HStack, VStack } from '@/components/Utilities';

import { useGetBondDetail } from '../../hooks/useGetDetailBond';
import { useBuyBondStore } from '../../store/useBuyBondStore';
import { BuyBondFormType } from '../../types/schema';

interface Props {
  bondId: number;
}

const CheckBalanceModal: React.FC<Props> = ({ bondId }) => {
  const [balance, setBalance] = React.useState<number>(0);
  const { watch } = useFormContext<BuyBondFormType>();
  const { accountId } = React.useContext(HederaWalletsContext);
  const { bond } = useGetBondDetail(bondId);
  const { getLoanTokenLabel } = useGetMetaToken();

  const isLoadingCheckBalance = useBuyBondStore.use.isLoadingCheckBalance();
  const isEnoughBalance = useBuyBondStore.use.isEnoughBalance();
  const setIsEnoughBalance = useBuyBondStore.use.setIsEnoughBalance();

  const [numberOfBond] = watch(['numberOfBond']);
  const handleClear = React.useCallback(() => {
    setIsEnoughBalance(true);
  }, [setIsEnoughBalance]);

  const loanTokenLabel = React.useMemo(
    () => (bond ? getLoanTokenLabel(bond.loanToken) : ''),
    [bond, getLoanTokenLabel]
  );

  const loanTokenId = React.useMemo(
    () => (bond?.loanToken ? convertEvmAddressToAccountId(bond.loanToken) : ''),
    [bond?.loanToken]
  );

  const fetchBalance = React.useCallback(async () => {
    if (!accountId || !loanTokenId) return;

    const balance = await getBalance(loanTokenId, accountId);
    setBalance(Number(balance));
  }, [accountId, loanTokenId]);

  React.useEffect(() => {
    fetchBalance();
  }, [fetchBalance]);

  const renderBody = React.useMemo(() => {
    if (isLoadingCheckBalance) {
      return (
        <VStack className="p-4" align={'center'} justify="center" spacing={24}>
          <div className="text-center">
            <CircularProgress label="We are counting your token, hang on!" />
          </div>
        </VStack>
      );
    }

    return (
      <VStack className="px-8" spacing={24}>
        <HStack pos="center" align="center">
          <HStack pos="center" align="center" className="rounded-full bg-red-500 p-4 w-fit">
            <Icons.x color="white" />
          </HStack>
        </HStack>

        <span className="text-center font-bold text-2xl">Buy Bond Failed</span>
        <span className="text-gray-700">Your account does not have enough balance to complete the bond purchase.</span>

        <VStack spacing={2}>
          <span className="text-gray-700">
            Required Amount: {Number(numberOfBond) * 100} {loanTokenLabel}
          </span>
          <span className="text-gray-700">
            Current Balance: {balance} {loanTokenLabel}
          </span>
        </VStack>

        <span className="text-gray-700">
          Please ensure you have sufficient funds in your account or adjust the bond quantity.
        </span>

        <HStack pos="center">
          <Button onClick={handleClear} variant="bordered" className="border-primary-500 text-primary-500">
            CLOSE
          </Button>
        </HStack>
      </VStack>
    );
  }, [balance, handleClear, isLoadingCheckBalance, loanTokenLabel, numberOfBond]);

  return (
    <>
      <Modal
        className="z-50"
        size={'md'}
        closeButton={!isEnoughBalance ? undefined : <></>}
        isOpen={isLoadingCheckBalance || !isEnoughBalance}
        onOpenChange={!isEnoughBalance ? handleClear : () => {}}
      >
        <ModalContent className="py-5">
          <ModalBody
            className={cn({
              '': isLoadingCheckBalance,
            })}
          >
            {renderBody}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CheckBalanceModal;
