import React from 'react';
import { useGetNonceMutation } from '@/api/auth/mutations';
import { getAccountByAddressOrAccountId } from '@/utils/common';
import { env, HASHCONNECT_DEBUG_MODE, HEDERA_CONFIG } from '@/utils/constants';
import { HashConnect, HashConnectTypes, MessageTypes } from 'hashconnect';
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
  const [hashConnect, setHashConnect] = React.useState<HashConnect | null>(null);
  const [hashConnectState, setHashConnectState] = React.useState<Partial<HashConnectState>>({});

  const { isIframeParent } = useHashConnectEvents(hashConnect, setHashConnectState);

  const { mutate: getNonce } = useGetNonceMutation({});

  const initializeHashConnect = React.useCallback(async () => {
    const temp = new HashConnect(HASHCONNECT_DEBUG_MODE);
    await temp.init(HEDERA_CONFIG, env.NETWORK_TYPE);
    setHashConnect(temp);
  }, []);

  React.useEffect(() => {
    initializeHashConnect();
  }, [initializeHashConnect]);

  const disconnectFromHashPack = React.useCallback(async () => {
    if (hashConnectState?.pairingData?.topic) {
      await hashConnect?.disconnect(hashConnectState?.pairingData?.topic);

      setHashConnectState((prev) => ({
        ...prev,
        pairingData: undefined,
      }));

      if (hashConnect?.hcData) {
        hashConnect.hcData.pairingData = [];
      }

      if (isIframeParent) {
        await hashConnect?.clearConnectionsAndData();
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

      await hashConnect.connectToLocalWallet();

      await hashConnect.pairingEvent.once((data: MessageTypes.ApprovePairing) => {
        (async () => {
          const wallet = await getAccountByAddressOrAccountId(data.accountIds[0]);

          getNonce({
            wallet: wallet.account,
          });

          // const message = `Welcome. By signing this message you are verifying your digital identity. This is completely secure and does not cost anything! Nonce: -1`;
          // const encoder = new TextEncoder();
          // const messageBytes = encoder.encode(message);
          // const signature = signer?.sign([messageBytes]);
          // const signature = await hashConnect?.sign(
          //   hashConnectState.topic || '',
          //   hashConnectState.pairingData?.accountIds[0] || '',
          //   message
          // );
        })();
      });
    } catch (e) {
      if (typeof e === 'string') {
        toast.error(e);
      } else if (e instanceof Error) {
        toast.error(e.message);
      }
    }
  }, [
    getNonce,
    hashConnect,
    hashConnectState.availableExtension,
    hashConnectState.pairingData?.accountIds,
    hashConnectState.topic,
  ]);

  return {
    hashConnect,
    hashConnectState,
    connectToHashPack,
    disconnectFromHashPack,
    isIframeParent,
  };
};

export default useHashPack;
