import React from 'react';
import { HederaWalletsContext } from '@/context/HederaContext';
import { useConnectWalletStore } from '@/store/useConnectWalletStore';
import { Button } from '@nextui-org/react';

import { HStack } from '@/components/Utilities';

import WalletModal from './WalletModal';
import WalletPopover from './WalletPopover';

const ConnectWallet = () => {
  const isOpen = useConnectWalletStore.use.isOpen();
  const onOpen = useConnectWalletStore.use.onOpen();
  const onOpenChange = useConnectWalletStore.use.onOpenChange();

  const { isConnected } = React.useContext(HederaWalletsContext);

  const renderWallet = React.useMemo(() => {
    if (!isConnected) {
      return (
        <Button onPress={onOpen} radius="full" className="bg-primary-700 text-white text-base w-44">
          Connect Wallet
        </Button>
      );
    }

    return <WalletPopover />;
  }, [isConnected, onOpen]);

  return (
    <HStack>
      {renderWallet}

      <WalletModal isOpen={isOpen} onOpenChange={onOpenChange} />
    </HStack>
  );
};

export default ConnectWallet;
