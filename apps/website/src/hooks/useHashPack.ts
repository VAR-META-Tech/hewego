import React from 'react';
import { useLoginMutation } from '@/api/auth/mutations';
import { useUserStore } from '@/store/UserStore';
import { getAccountByAddressOrAccountId, onMutateError } from '@/utils/common';
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
  const setUser = useUserStore.use.setUser();
  const setAccessToken = useUserStore.use.setAccessToken();
  const setRefreshToken = useUserStore.use.setRefreshToken();
  const { isIframeParent } = useHashConnectEvents(hashConnect, setHashConnectState);

  const { mutate: login, data: loginData } = useLoginMutation({
    onSuccess: ({ data }) => {
      setUser(data?.user);
      setAccessToken(data?.tokens?.accessToken);
      setRefreshToken(data?.tokens?.refreshToken);
      toast.success('HashPack has been connected!');
    },
    onError: (error) => {
      onMutateError(error);
      disconnectFromHashPack();
    },
  });

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

          login({
            wallet: wallet.evm_address,
            accountId: wallet.account,
          });
        })();
      });
    } catch (e) {
      if (typeof e === 'string') {
        toast.error(e);
      } else if (e instanceof Error) {
        toast.error(e.message);
      }
    }
  }, [hashConnect, hashConnectState.availableExtension, login]);

  return {
    hashConnect,
    hashConnectState,
    connectToHashPack,
    disconnectFromHashPack,
    isIframeParent,
    loginData,
  };
};

export default useHashPack;
