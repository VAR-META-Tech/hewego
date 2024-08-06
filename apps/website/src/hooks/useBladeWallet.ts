import React from 'react';
import { useConnectWalletStore } from '@/store/useConnectWalletStore';
import { env, HEDERA_CONFIG } from '@/utils/constants';
import { loadLocalData } from '@/utils/json';
import { BladeSigner, HederaNetwork } from '@bladelabs/blade-web3.js';
import { toast } from 'sonner';

export type BladeAccountId = string;

export const BLADE_WALLET_LOCALSTORAGE_VARIABLE_NAME = HEDERA_CONFIG.name;

const BLADE_SIGNER_PARAMS = {
  network: env.NETWORK_TYPE === 'testnet' ? HederaNetwork.Testnet : HederaNetwork.Mainnet,
  dAppCode: BLADE_WALLET_LOCALSTORAGE_VARIABLE_NAME,
};

const bladeSigner = new BladeSigner();

const useBladeWallet = () => {
  const [bladeAccountId, setBladeAccountId] = React.useState<BladeAccountId>('');
  const onOpenChange = useConnectWalletStore.use.onOpenChange();

  const clearConnectedBladeWalletData = React.useCallback(() => {
    localStorage.removeItem(BLADE_WALLET_LOCALSTORAGE_VARIABLE_NAME);
    setBladeAccountId('');
  }, [setBladeAccountId]);

  const connectBladeWallet = React.useCallback(async () => {
    let loggedId = '';
    try {
      await bladeSigner.createSession(BLADE_SIGNER_PARAMS);
      loggedId = bladeSigner.getAccountId().toString();
    } catch (e) {
      if (typeof e === 'function') {
        const { message } = e();

        toast.error(message);
      } else if (typeof e === 'string') {
        toast.error(e);
      } else if (e instanceof Error) {
        toast.error(e.message);
      }
    } finally {
      if (!loggedId) {
        toast.error('Cannot find connected account id in Blade Wallet!');
      } else {
        if (!loadLocalData(BLADE_WALLET_LOCALSTORAGE_VARIABLE_NAME)) {
          toast.success('Blade Wallet has been connected!');
        }

        setBladeAccountId(loggedId);
        onOpenChange();

        localStorage.setItem(
          BLADE_WALLET_LOCALSTORAGE_VARIABLE_NAME,
          JSON.stringify({
            bladeAccountId: loggedId,
          })
        );
      }
    }
  }, [onOpenChange]);

  const initializeBladeWallet = React.useCallback(async () => {
    const wasConnected = loadLocalData(BLADE_WALLET_LOCALSTORAGE_VARIABLE_NAME);

    if (wasConnected) {
      await connectBladeWallet();
    }
  }, [connectBladeWallet]);

  React.useEffect(() => {
    initializeBladeWallet();
  }, [initializeBladeWallet]);

  React.useEffect(() => {
    bladeSigner.onAccountChanged(() => connectBladeWallet());
  }, [connectBladeWallet]);

  return {
    bladeSigner,
    bladeAccountId,
    connectBladeWallet,
    clearConnectedBladeWalletData,
  };
};

export default useBladeWallet;
