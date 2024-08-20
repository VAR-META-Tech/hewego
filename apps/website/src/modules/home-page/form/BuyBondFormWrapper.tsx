/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { HederaWalletsContext } from '@/context/HederaContext';
import { FCC } from '@/types';
import {
  approveToken,
  associateToken,
  checkAssociate,
  convertEvmAddressToHederaAccountId,
  getTokensAssociated,
} from '@/utils/common';
import { CONTRACT_ID, env, TOKEN_UNIT } from '@/utils/constants';
import { ContractExecuteTransaction, ContractFunctionParameters } from '@hashgraph/sdk';
import { Signer } from '@hashgraph/sdk/lib/Signer';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { toast } from 'sonner';
import { formatUnits } from 'viem';

import { FormWrapper } from '@/components/ui/form';

import { useGetBondDetail } from '../hooks/useGetDetailBond';
import { useBuyBondStore } from '../store/useBuyBondStore';
import { BuyBondFormType, buyBondSchema } from '../types/schema';

interface Props {
  onOpen: () => void;
  refetch: () => void;
}

const BuyBondFormWrapper: FCC<Props> = ({ children, onOpen, refetch }) => {
  const bondId = useBuyBondStore.use.bondId();
  const setIsLoadingCheckBalance = useBuyBondStore.use.setIsLoadingCheckBalance();
  const setIsLoadingTransaction = useBuyBondStore.use.setIsLoadingTransaction();
  const setIsEnoughBalance = useBuyBondStore.use.setIsEnoughBalance();
  const { hashConnect, accountId } = React.useContext(HederaWalletsContext);
  const provider = hashConnect?.getProvider(env.NETWORK_TYPE, hashConnect?.hcData?.topic ?? '', accountId ?? '');
  const { bond, volumeLeft } = useGetBondDetail(Number(bondId));

  const signer = React.useMemo(() => {
    if (!provider) return null;

    return hashConnect?.getSigner(provider);
  }, [hashConnect, provider]);

  const form = useForm<BuyBondFormType>({
    resolver: zodResolver(buyBondSchema(volumeLeft)),
  });

  const [numberOfBond] = form.watch(['numberOfBond']);

  const submitTransaction = React.useCallback(async () => {
    try {
      const contractExecTx = await new ContractExecuteTransaction()
        .setContractId(CONTRACT_ID)
        .setGas(1000000)
        .setFunction(
          'buyBond',
          new ContractFunctionParameters().addUint256(Number(bond?.bondId)).addUint256(Number(numberOfBond))
        )
        .freezeWithSigner(signer as unknown as Signer);

      const contractExecSign = await contractExecTx?.signWithSigner(signer as unknown as Signer);

      const contractExecSubmit = await contractExecSign
        ?.executeWithSigner(signer as unknown as Signer)
        .catch((e) => toast.error(e));

      if ((contractExecSubmit as any)?.transactionId) {
        setIsLoadingTransaction(false);
        onOpen();
        refetch();
      }
    } catch (error) {
      setIsLoadingTransaction(false);
      throw new Error(error as string);
    } finally {
      setIsLoadingCheckBalance(false);
      setIsLoadingTransaction(false);
    }
  }, [bond?.bondId, numberOfBond, onOpen, refetch, setIsLoadingCheckBalance, setIsLoadingTransaction, signer]);

  const checkBalance = React.useCallback(
    async (tokenId: string) => {
      const isAssociated = await checkAssociate(tokenId, accountId);

      if (!bond?.bondId || !isAssociated) return false;

      const tokens = await getTokensAssociated(accountId);

      if (tokens?.length) {
        const balance = formatUnits(
          tokens?.find((token: any) => token?.token_id === tokenId)?.balance,
          Number(TOKEN_UNIT)
        );

        if (Number(balance) < Number(numberOfBond) * 100) {
          setIsEnoughBalance(false);
          setIsLoadingCheckBalance(false);
          setIsLoadingTransaction(false);
          return false;
        }

        setIsEnoughBalance(true);
        setIsLoadingCheckBalance(false);
        return true;
      }

      return false;
    },
    [accountId, bond?.bondId, numberOfBond, setIsEnoughBalance, setIsLoadingCheckBalance, setIsLoadingTransaction]
  );

  const handleSubmit: SubmitHandler<BuyBondFormType> = async () => {
    if (!bond?.bondId) return;

    try {
      setIsLoadingCheckBalance(true);
      setIsLoadingTransaction(true);

      const [shard, realm, num] = convertEvmAddressToHederaAccountId(bond?.loanToken);
      const loanTokenId = `${shard.toString()}.${realm.toString()}.${num.toString()}`;
      const isAssociated = await checkAssociate(loanTokenId, accountId);

      if (!isAssociated) {
        await associateToken(loanTokenId, accountId, signer as unknown as Signer);
      }

      const isEnoughBalance = await checkBalance(loanTokenId);

      if (!isEnoughBalance) {
        return;
      }

      const transactionIdApprove = await approveToken({
        provider,
        signer: signer as unknown as Signer,
        accountId,
        tokenId: loanTokenId,
        contractId: CONTRACT_ID,
        tokenUnit: Number(TOKEN_UNIT),
      });

      if (transactionIdApprove) {
        await submitTransaction();
      }
    } catch (error) {
      setIsLoadingTransaction(false);
      throw new Error(error as string);
    } finally {
      setIsLoadingCheckBalance(false);
      setIsLoadingTransaction(false);
    }
  };

  return (
    <FormWrapper form={form} onSubmit={handleSubmit} className="flex flex-col gap-3">
      {children}
    </FormWrapper>
  );
};

export default BuyBondFormWrapper;
