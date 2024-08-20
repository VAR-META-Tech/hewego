/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { useConnectWalletStore } from '@/store/useConnectWalletStore';
import { HashConnect, HashConnectTypes, MessageTypes } from 'hashconnect';

import { HashConnectState } from './useHashPack';

export default function useHashConnectEvents(
  hashConnect: HashConnect | null,
  setHashConnectState: React.Dispatch<React.SetStateAction<Partial<HashConnectState>>>
) {
  const [isIframeParent, setIsIFrameParent] = React.useState(false);
  const onOpenChange = useConnectWalletStore.use.onOpenChange();

  const updatePairingData = React.useCallback(
    (data: any) => {
      setHashConnectState((prev) => ({
        ...prev,
        pairingData: {
          ...prev.pairingData,
          ...data,
        },
      }));
      onOpenChange();
    },
    [onOpenChange, setHashConnectState]
  );

  const foundExtensionEventHandler = React.useCallback(
    (data: HashConnectTypes.WalletMetadata) => {
      setHashConnectState((prev) => ({
        ...prev,
        availableExtension: data,
      }));
    },
    [setHashConnectState]
  );

  const pairingEventHandler = React.useCallback(
    (data: MessageTypes.ApprovePairing) => {
      updatePairingData(data);
    },
    [updatePairingData]
  );

  const foundIframeEventHandler = React.useCallback(
    (data: HashConnectTypes.WalletMetadata) => {
      updatePairingData(data);

      setIsIFrameParent(true);
    },
    [updatePairingData]
  );

  const mountEvents = React.useCallback(() => {
    if (hashConnect) {
      hashConnect.foundExtensionEvent.on(foundExtensionEventHandler);
      hashConnect.pairingEvent.on(pairingEventHandler);
      hashConnect.foundIframeEvent.on(foundIframeEventHandler);
    }
  }, [foundExtensionEventHandler, hashConnect, pairingEventHandler, foundIframeEventHandler]);

  const unMountEvents = React.useCallback(() => {
    if (hashConnect) {
      hashConnect.foundExtensionEvent.off(foundExtensionEventHandler);
      hashConnect.pairingEvent.off(pairingEventHandler);
      hashConnect.foundIframeEvent.off(foundIframeEventHandler);
    }
  }, [foundExtensionEventHandler, hashConnect, pairingEventHandler, foundIframeEventHandler]);

  React.useEffect(() => {
    mountEvents();

    return unMountEvents;
  }, [mountEvents, unMountEvents]);

  return {
    isIframeParent,
  };
}
