import React from 'react';
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
  handleDisconnect: () => void;
  onConnectHaskPack: () => void;
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
  handleDisconnect: () => undefined,
  onConnectHaskPack: () => undefined,
  onConnectBladeWallet: () => undefined,
};

export const HederaWalletsContext = React.createContext(HEDERA_CONTEXT);

export const HederaWalletProvider: FCC = ({ children }) => {
  // const { bladeSigner, bladeAccountId, connectBladeWallet, clearConnectedBladeWalletData } = useBladeWallet();

  const { hashConnect, hashConnectState, connectToHashPack, disconnectFromHashPack, isIframeParent } = useHashPack();

  const accountId = React.useMemo(() => {
    if (hashConnectState?.pairingData?.accountIds?.length) {
      return hashConnectState?.pairingData?.accountIds[0];
    }

    // if (bladeAccountId) {
    //   return bladeAccountId;
    // }

    return '';
  }, [hashConnectState?.pairingData?.accountIds]);

  const isConnected = React.useMemo(() => {
    if (accountId) {
      return true;
    }

    return false;
  }, [accountId]);

  // Disconnect
  const handleDisconnect = React.useCallback(
    (isShowToast = true) => {
      disconnectFromHashPack();

      // clearConnectedBladeWalletData();

      if (isShowToast) {
        toast.success('Disconnected!');
      }
    },
    [disconnectFromHashPack]
  );

  // Connect to HashPack
  const onConnectHaskPack = React.useCallback(() => {
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
        onConnectHaskPack,
        onConnectBladeWallet,
      }}
    >
      {children}
    </HederaWalletsContext.Provider>
  );
};

export default HederaWalletProvider;
