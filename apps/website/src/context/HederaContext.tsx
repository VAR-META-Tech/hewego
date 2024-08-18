import React from 'react';
import { ILoginResponse } from '@/api/auth/type';
import { useUserStore } from '@/store/UserStore';
import { FCC } from '@/types';
import { HashConnect } from 'hashconnect';
import { toast } from 'sonner';

import useHashPack, { HashConnectState } from '@/hooks/useHashPack';

interface HederaWalletsContextType {
  hashConnect?: HashConnect | null;
  hashConnectState: Partial<HashConnectState>;
  connectToHashPack: () => void;
  disconnectFromHashPack: () => void;
  isIframeParent: boolean;
  // bladeSigner?: BladeSigner;
  // bladeAccountId: BladeAccountId;
  // connectBladeWallet: () => void;
  // clearConnectedBladeWalletData: () => void;
  isConnected: boolean;
  accountId: string;
  loginData: ILoginResponse | undefined;
  handleDisconnect: () => void;
  onConnectHashPack: () => void;
  onConnectBladeWallet: () => void;
}

const HEDERA_CONTEXT: HederaWalletsContextType = {
  hashConnect: undefined,
  hashConnectState: {},
  disconnectFromHashPack: () => undefined,
  connectToHashPack: () => undefined,
  isIframeParent: false,
  // bladeSigner: undefined,
  // bladeAccountId: '',
  // connectBladeWallet: () => undefined,
  // clearConnectedBladeWalletData: () => undefined,
  isConnected: false,
  accountId: '',
  loginData: undefined,
  handleDisconnect: () => undefined,
  onConnectHashPack: () => undefined,
  onConnectBladeWallet: () => undefined,
};

export const HederaWalletsContext = React.createContext(HEDERA_CONTEXT);

export const HederaWalletProvider: FCC = ({ children }) => {
  // const { bladeSigner, bladeAccountId, connectBladeWallet, clearConnectedBladeWalletData } = useBladeWallet();
  const user = useUserStore.use.user();
  const status = useUserStore.use.status();
  const logout = useUserStore.use.logout();
  const { hashConnect, hashConnectState, connectToHashPack, disconnectFromHashPack, isIframeParent, loginData } =
    useHashPack();

  const accountId = React.useMemo(() => {
    if (user?.accountId) {
      return user?.accountId;
    }

    // if (bladeAccountId) {
    //   return bladeAccountId;
    // }

    return '';
  }, [user?.accountId]);

  const isConnected = React.useMemo(() => {
    if (user?.accountId && status === 'ready') {
      return true;
    }

    return false;
  }, [status, user?.accountId]);

  // Disconnect
  const handleDisconnect = React.useCallback(
    (isShowToast = true) => {
      disconnectFromHashPack();

      // clearConnectedBladeWalletData();
      logout();

      if (isShowToast) {
        toast.success('Disconnected!');
      }
    },
    [disconnectFromHashPack, logout]
  );

  // Connect to HashPack
  const onConnectHashPack = React.useCallback(() => {
    handleDisconnect(false);

    connectToHashPack();
  }, [connectToHashPack, handleDisconnect]);

  // Connect to BladeWallet
  const onConnectBladeWallet = React.useCallback(() => {
    handleDisconnect(false);

    // connectBladeWallet();
  }, [handleDisconnect]);

  return (
    <HederaWalletsContext.Provider
      value={{
        // bladeSigner,
        // bladeAccountId,
        // connectBladeWallet,
        // clearConnectedBladeWalletData,
        hashConnect,
        hashConnectState,
        disconnectFromHashPack,
        connectToHashPack,
        isIframeParent,
        isConnected,
        accountId,
        handleDisconnect,
        onConnectHashPack,
        onConnectBladeWallet,
        loginData,
      }}
    >
      {children}
    </HederaWalletsContext.Provider>
  );
};

export default HederaWalletProvider;
