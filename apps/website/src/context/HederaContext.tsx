import React, { createContext } from 'react';
import { FCC } from '@/types';
import { BladeSigner } from '@bladelabs/blade-web3.js';
import { HashConnect } from 'hashconnect';

import useBladeWallet, { BladeAccountId } from '@/hooks/useBladeWallet';
import useHashPack, { HashConnectState } from '@/hooks/useHashPack';

interface HederaWalletsContextType {
  hashConnect?: HashConnect;
  hashConnectState: Partial<HashConnectState>;
  connectToHashPack: () => void;
  disconnectFromHashPack: () => void;
  isIframeParent: boolean;
  bladeSigner?: BladeSigner;
  bladeAccountId: BladeAccountId;
  connectBladeWallet: () => void;
  clearConnectedBladeWalletData: () => void;
  isConnected: boolean;
  address: string;
}

const HEDERA_CONTEXT: HederaWalletsContextType = {
  hashConnect: undefined,
  hashConnectState: {},
  disconnectFromHashPack: () => undefined,
  connectToHashPack: () => undefined,
  isIframeParent: false,
  bladeSigner: undefined,
  bladeAccountId: '',
  connectBladeWallet: () => undefined,
  clearConnectedBladeWalletData: () => undefined,
  isConnected: false,
  address: '',
};

export const HederaWalletsContext = createContext(HEDERA_CONTEXT);

export const HederaWalletProvider: FCC = ({ children }) => {
  const { bladeSigner, bladeAccountId, connectBladeWallet, clearConnectedBladeWalletData } = useBladeWallet();

  const { hashConnect, hashConnectState, connectToHashPack, disconnectFromHashPack, isIframeParent } = useHashPack();

  const address = React.useMemo(() => {
    if (hashConnectState?.pairingData?.accountIds?.length) {
      return hashConnectState?.pairingData?.accountIds[0];
    }

    if (bladeAccountId) {
      return bladeAccountId;
    }

    return '';
  }, [bladeAccountId, hashConnectState?.pairingData?.accountIds]);

  const isConnected = React.useMemo(() => {
    if (address) {
      return true;
    }

    return false;
  }, [address]);

  return (
    <HederaWalletsContext.Provider
      value={{
        bladeSigner,
        bladeAccountId,
        connectBladeWallet,
        clearConnectedBladeWalletData,
        hashConnect,
        hashConnectState,
        disconnectFromHashPack,
        connectToHashPack,
        isIframeParent,
        isConnected,
        address,
      }}
    >
      {children}
    </HederaWalletsContext.Provider>
  );
};

export default HederaWalletProvider;
