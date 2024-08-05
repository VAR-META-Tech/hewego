import React from 'react';
import { Icons } from '@/assets/icons';
import { HederaWalletsContext } from '@/context/HederaContext';
import { useConnectWallet } from '@/store/useConnectWallet';
import { Button } from '@nextui-org/button';

import { HStack } from '@/components/Utilities';

import WalletModal from './WalletModal';
import WalletPoppover from './WalletPoppover';

const ConnectWallet = () => {
  const isOpen = useConnectWallet.use.isOpen();
  const onOpen = useConnectWallet.use.onOpen();
  const onOpenChange = useConnectWallet.use.onOpenChange();

  const { isConnected } = React.useContext(HederaWalletsContext);

  const renderWallet = React.useMemo(() => {
    if (!isConnected) {
      return (
        <Button onPress={onOpen} startContent={<Icons.wallet />} className="bg-primary-900 text-white text-base">
          Connect Wallet
        </Button>
      );
    }

    return <WalletPoppover />;
  }, [isConnected, onOpen]);

  return (
    <HStack>
      {renderWallet}

      <WalletModal isOpen={isOpen} onOpenChange={onOpenChange} />
    </HStack>
  );
};

export default ConnectWallet;
