import React, { useContext } from 'react';
import { HederaWalletsContext } from '@/context/HederaContext';
import { useConnectWallet } from '@/store/useConnectWallet';
import { Button } from '@nextui-org/button';
import { toast } from 'sonner';

import { HStack } from '@/components/Utilities';

import WalletModal from './WalletModal';

const ConnectWallet = () => {
  const isOpen = useConnectWallet.use.isOpen();
  const onOpen = useConnectWallet.use.onOpen();
  const onOpenChange = useConnectWallet.use.onOpenChange();

  const { isConnected, address, disconnectFromHashPack, clearConnectedBladeWalletData } =
    useContext(HederaWalletsContext);

  const handleDisconnect = React.useCallback(() => {
    disconnectFromHashPack();
    clearConnectedBladeWalletData();
    toast.success('Disconnected!');
  }, [clearConnectedBladeWalletData, disconnectFromHashPack]);

  const renderWallet = React.useMemo(() => {
    if (!isConnected) {
      return (
        <Button onPress={onOpen} color="secondary" className="text-lg font-medium">
          Connect Wallet
        </Button>
      );
    }

    return (
      <HStack spacing={20} className="border border-border bg-black/50 rounded-lg p-2">
        <span className="text-white">{address}</span>

        <Button color="secondary" onPress={handleDisconnect}>
          Disconnect
        </Button>
      </HStack>
    );
  }, [address, handleDisconnect, isConnected, onOpen]);

  return (
    <HStack>
      {renderWallet}

      <WalletModal isOpen={isOpen} onOpenChange={onOpenChange} />
    </HStack>
  );
};

export default ConnectWallet;
