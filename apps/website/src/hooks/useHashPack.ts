/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { getAccountByAddressOrAccountId } from '@/utils/common';
import { HASHCONNECT_DEBUG_MODE, HEDERA_CONFIG, NETWORK_TYPE } from '@/utils/constants';
import { HashConnect, HashConnectTypes } from 'hashconnect';
import { HashConnectConnectionState } from 'hashconnect/dist/types';
import { toast } from 'sonner';

import useHashConnectEvents from './useHashConnectEvents';

export interface HashConnectState {
  availableExtension: HashConnectTypes.WalletMetadata;
  state: HashConnectConnectionState;
  topic: string;
  pairingString: string;
  pairingData: HashConnectTypes.SavedPairingData | null;
}

const useHashPack = () => {
  const [hashConnect, setHashConnect] = React.useState<any>(null);
  const [hashConnectState, setHashConnectState] = React.useState<Partial<HashConnectState>>({});

  const { isIframeParent } = useHashConnectEvents(hashConnect, setHashConnectState);

  const initializeHashConnect = React.useCallback(async () => {
    const temp = new HashConnect(HASHCONNECT_DEBUG_MODE);
    await temp.init(HEDERA_CONFIG, NETWORK_TYPE);
    setHashConnect(temp);
  }, []);

  React.useEffect(() => {
    initializeHashConnect();
  }, [initializeHashConnect]);

  const disconnectFromHashPack = React.useCallback(async () => {
    if (hashConnectState?.pairingData?.topic) {
      await hashConnect.disconnect(hashConnectState?.pairingData?.topic);

      setHashConnectState((prev) => ({
        ...prev,
        pairingData: undefined,
      }));
      hashConnect.hcData.pairingData = [];

      if (isIframeParent) {
        await hashConnect.clearConnectionsAndData();
      }
    }
  }, [hashConnect, hashConnectState?.pairingData?.topic, isIframeParent]);

  const connectToHashPack = React.useCallback(async () => {
    try {
      if (!hashConnectState.availableExtension || !hashConnect) {
        throw new Error('Hashpack wallet is not installed!');
      }

      if (typeof hashConnect?.hcData?.pairingString === 'undefined' || hashConnect?.hcData?.pairingString === '') {
        throw new Error('No pairing key generated! Initialize HashConnect first!');
      }

      hashConnect.connectToLocalWallet();

      hashConnect.pairingEvent.once((data: any) => {
        (async () => {
          const wallet = await getAccountByAddressOrAccountId(data.accountIds[0]);
          console.log(wallet);
        })();
      });
    } catch (e) {
      if (typeof e === 'string') {
        toast.error(e);
      } else if (e instanceof Error) {
        toast.error(e.message);
      }
    }
  }, [hashConnect, hashConnectState.availableExtension]);

  return {
    hashConnect,
    hashConnectState,
    connectToHashPack,
    disconnectFromHashPack,
    isIframeParent,
  };
};

export default useHashPack;
