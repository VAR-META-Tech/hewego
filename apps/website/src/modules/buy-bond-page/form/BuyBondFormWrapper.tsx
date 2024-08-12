/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { HederaWalletsContext } from '@/context/HederaContext';
import { useConnectWalletStore } from '@/store/useConnectWalletStore';
import { FCC } from '@/types';
import { convertEvmAddressToHederaAccountId, parseUnits } from '@/utils/common';
import { CONTRACT_ID, env, LOAN_CONTRACT_ID, TOKEN_UNIT } from '@/utils/constants';
import {
  AccountAllowanceApproveTransaction,
  ContractExecuteTransaction,
  ContractFunctionParameters,
  TokenAssociateTransaction,
} from '@hashgraph/sdk';
import { Signer } from '@hashgraph/sdk/lib/Signer';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useForm, type SubmitHandler } from 'react-hook-form';

import { FormWrapper } from '@/components/ui/form';

import { useGetBondDetail } from '../hooks/useGetDetailBond';
import { BuyBondFormType, buyBondSchema } from '../types/schema';

const BuyBondFormWrapper: FCC = ({ children }) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const { hashConnect, accountId, isConnected } = React.useContext(HederaWalletsContext);
  const onOpen = useConnectWalletStore.use.onOpen();
  const provider = hashConnect?.getProvider('testnet', hashConnect?.hcData?.topic ?? '', accountId ?? '');
  const { bond } = useGetBondDetail();

  const signer = React.useMemo(() => {
    if (!provider) return null;

    return hashConnect?.getSigner(provider);
  }, [hashConnect, provider]);

  const form = useForm<BuyBondFormType>({
    resolver: zodResolver(buyBondSchema),
  });

  const [numberOfBond] = form.watch(['numberOfBond']);

  const checkAssociate = React.useCallback(
    async (tokenId: string) => {
      if (!accountId) return;

      try {
        const response = await axios.get(`${env.HEDERA_URL}/api/v1/accounts/${accountId}/tokens`);

        const token = response?.data?.tokens?.find((token: any) => token?.token_id === tokenId);

        if (token) return true;

        return false;
      } catch (error) {
        console.error(error);

        return false;
      }
    },
    [accountId]
  );

  const associateToken = async () => {
    try {
      const transaction = await new TokenAssociateTransaction()
        .setAccountId(accountId)
        .setTokenIds([LOAN_CONTRACT_ID]) // token id of collateral token
        .freezeWithSigner(signer as unknown as Signer);

      const signTx = await transaction.signWithSigner(signer as unknown as Signer);
      const txResponse = await signTx.executeWithSigner(signer as unknown as Signer);
      // const receipt = await txResponse.getReceiptQuery();

      return txResponse?.transactionId;
    } catch (error) {
      console.error(error);

      return null;
    }
  };

  const approveToken = React.useCallback(async () => {
    try {
      if (!provider) return;

      const contractApproveTx = await new AccountAllowanceApproveTransaction()
        .approveTokenAllowance(
          LOAN_CONTRACT_ID,
          accountId,
          CONTRACT_ID,
          Number(parseUnits(Number('99999999999999'), TOKEN_UNIT))
        )
        .freezeWithSigner(signer as unknown as Signer);

      const contractApproveSign = await contractApproveTx?.signWithSigner(signer as unknown as Signer);

      const contractApproveSubmit = await contractApproveSign
        ?.executeWithSigner(signer as unknown as Signer)
        .catch((e) => console.error(e));

      return contractApproveSubmit?.transactionId;
    } catch (error) {
      console.error(error);

      return null;
    }
  }, [accountId, provider, signer]);

  const submitTransaction = React.useCallback(async () => {
    try {
      const contractExecTx = await new ContractExecuteTransaction()
        .setContractId(CONTRACT_ID)
        .setGas(1000000)
        .setFunction(
          'buyBond',
          new ContractFunctionParameters()
            .addUint256(Number(bond?.bondId))
            .addUint256(Number(Number(numberOfBond) * 100))
        )
        .freezeWithSigner(signer as unknown as Signer);

      const contractExecSign = await contractExecTx?.signWithSigner(signer as unknown as Signer);

      const contractExecSubmit = await contractExecSign
        ?.executeWithSigner(signer as unknown as Signer)
        .catch((e) => console.error(e));

      console.log('🚀 ~ submitTransaction ~ contractExecSubmit:', contractExecSubmit);
    } catch (error) {
      console.error(error);
    }
  }, [bond?.bondId, numberOfBond, signer]);

  const handleSubmit: SubmitHandler<BuyBondFormType> = async (data) => {
    if (!bond?.bondId) return;

    try {
      setIsLoading(true);

      const [shard, realm, num] = convertEvmAddressToHederaAccountId(bond?.loanToken);
      const loanTokenId = `${shard.toString()}.${realm.toString()}.${num.toString()}`;
      const isAssociated = await checkAssociate(loanTokenId);

      if (!isAssociated) {
        await associateToken();
      }

      const transactionIdApprove = await approveToken();

      if (transactionIdApprove) {
        await submitTransaction();
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <FormWrapper form={form} onSubmit={handleSubmit} className="flex flex-col gap-3">
      {children}
    </FormWrapper>
  );
};

export default BuyBondFormWrapper;
