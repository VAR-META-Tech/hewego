import React from 'react';
import { HederaWalletsContext } from '@/context/HederaContext';
import { useConnectWalletStore } from '@/store/useConnectWalletStore';
import { useUserStore } from '@/store/UserStore';
import { FCC } from '@/types';

const AuthLayout: FCC = ({ children }) => {
  const { isConnected } = React.useContext(HederaWalletsContext);
  const status = useUserStore.use.status();
  const onOpen = useConnectWalletStore.use.onOpen();
  const setIsAbleClose = useConnectWalletStore.use.setIsAbleClose();

  React.useEffect(() => {
    if (!isConnected && status === 'ready') {
      setIsAbleClose(false);
      onOpen();
    }

    return () => {
      setIsAbleClose(true);
    };
  }, [isConnected, onOpen, setIsAbleClose, status]);

  return children;
};

export default AuthLayout;
