import React, { useContext } from 'react';
import Image from 'next/image';
import { HederaWalletsContext } from '@/context/HederaContext';
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/react';

import { HStack } from '@/components/Utilities';

interface Props {
  isOpen: boolean;
  onOpenChange: () => void;
}

const WalletModal: React.FC<Props> = ({ isOpen, onOpenChange }) => {
  const { connectToHashPack, connectBladeWallet, clearConnectedBladeWalletData, disconnectFromHashPack } =
    useContext(HederaWalletsContext);

  const onHaskPack = () => {
    clearConnectedBladeWalletData();
    connectToHashPack();
  };

  const onBladeWallet = () => {
    disconnectFromHashPack();
    clearConnectedBladeWalletData();
    connectBladeWallet();
  };

  return (
    <Modal closeButton={<></>} backdrop={'blur'} isOpen={isOpen} placement={'auto'} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">Connect Wallet</ModalHeader>
            <ModalBody>
              {/* HashPack */}
              <button onClick={onHaskPack}>
                <HStack spacing={12}>
                  <Image
                    src="/images/wallet/hashpack.jpeg"
                    alt="hashpack"
                    width={60}
                    height={60}
                    quality={100}
                    unoptimized
                  />
                  <span className="text-xl font-medium">HashPack</span>
                </HStack>
              </button>

              {/* BladeWallet */}
              <button onClick={onBladeWallet}>
                <HStack spacing={12}>
                  <Image
                    src="/images/wallet/bladewallet.png"
                    alt="blade-wallet"
                    width={60}
                    height={60}
                    quality={100}
                    unoptimized
                  />
                  <span className="text-xl font-medium">BladeWallet</span>
                </HStack>
              </button>
            </ModalBody>

            <ModalFooter>
              <Button color="primary" onPress={onClose}>
                Close
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default WalletModal;
