import React from 'react';
import { HederaWalletsContext } from '@/context/HederaContext';
import { useConnectWalletStore } from '@/store/useConnectWalletStore';
import { FCC } from '@/types';

import { useIsomorphicLayout } from '@/hooks/useIsomorphicLayout';

const AuthLayout: FCC = ({ children }) => {
  const { isConnected } = React.useContext(HederaWalletsContext);
  const onOpen = useConnectWalletStore.use.onOpen();
  const setIsAbleClose = useConnectWalletStore.use.setIsAbleClose();

  useIsomorphicLayout(() => {
    if (!isConnected) {
      setIsAbleClose(false);
      onOpen();
    }

    return () => {
      setIsAbleClose(true);
    };
  }, [isConnected, onOpen, setIsAbleClose]);

  return children;
};

export default AuthLayout;
