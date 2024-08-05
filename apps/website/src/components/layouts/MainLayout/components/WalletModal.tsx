import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { HederaWalletsContext } from '@/context/HederaContext';
import { ROUTE } from '@/types';
import { cn } from '@/utils/common';
import { Button, Checkbox, Modal, ModalBody, ModalContent, ModalHeader } from '@nextui-org/react';

import { HStack, VStack } from '@/components/Utilities';

interface Props {
  isOpen: boolean;
  onOpenChange: () => void;
}

const WalletModal: React.FC<Props> = ({ isOpen, onOpenChange }) => {
  const { onConnectHaskPack } = React.useContext(HederaWalletsContext);
  const [isChecked, setIsChecked] = React.useState(false);

  return (
    <Modal size="xl" backdrop={'blur'} isOpen={isOpen} placement={'auto'} onOpenChange={onOpenChange}>
      <ModalContent>
        {() => (
          <>
            <ModalHeader className="flex flex-col gap-1">Connect Wallet</ModalHeader>
            <ModalBody className="pb-10">
              <VStack spacing={20}>
                <HStack spacing={20} noWrap>
                  <Checkbox
                    aria-label="By connecting your wallet, I agree with the Terms of Use & Privacy Policy"
                    isSelected={isChecked}
                    onValueChange={setIsChecked}
                    color="default"
                    classNames={{
                      base: cn('inline-flex'),
                      label: 'w-full',
                    }}
                  />
                  <span>
                    By connecting your wallet, I agree with the{' '}
                    <Link href={ROUTE.HOME} className="text-primary-900 hover:opacity-50">
                      Terms of Use
                    </Link>{' '}
                    &{' '}
                    <Link href={ROUTE.HOME} className="text-primary-900 hover:opacity-50">
                      Privacy Policy
                    </Link>
                  </span>
                </HStack>

                <VStack>
                  {/* HashPack */}
                  <Button
                    disabled={!isChecked}
                    className={cn('py-2 bg-primary-900 text-white', {
                      'bg-[#F3F4F6] text-[#BCC1CA] pointer-events-none': !isChecked,
                    })}
                    startContent={
                      <div
                        className={cn('rounded-full overflow-hidden', {
                          'opacity-30': !isChecked,
                        })}
                      >
                        <Image
                          src="/images/wallet/hashpack.jpeg"
                          alt="hashpack"
                          width={32}
                          height={32}
                          quality={100}
                          unoptimized
                        />
                      </div>
                    }
                    onClick={onConnectHaskPack}
                  >
                    <span className="text-lg">HashPack</span>
                  </Button>

                  {/* BladeWallet */}
                  {/* <Button
                    className="py-2 bg-primary-900 text-white"
                    onClick={onConnectBladeWallet}
                    startContent={
                      <div className="rounded-full overflow-hidden">
                        <Image
                          src="/images/wallet/bladewallet.png"
                          alt="blade-wallet"
                          width={32}
                          height={32}
                          quality={100}
                          unoptimized
                        />
                      </div>
                    }
                  >
                    <span className="text-lg">BladeWallet</span>
                  </Button> */}
                </VStack>
              </VStack>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default WalletModal;
