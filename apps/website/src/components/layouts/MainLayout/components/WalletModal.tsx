import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { HederaWalletsContext } from '@/context/HederaContext';
import { useConnectWalletStore } from '@/store/useConnectWalletStore';
import { ROUTE } from '@/types';
import { cn } from '@/utils/common';
import { Button, Checkbox, Modal, ModalBody, ModalContent, ModalHeader } from '@nextui-org/react';

import { HStack, VStack } from '@/components/Utilities';

interface Props {
  isOpen: boolean;
  onOpenChange: () => void;
}

const WalletModal: React.FC<Props> = ({ isOpen, onOpenChange }) => {
  const isAbleClose = useConnectWalletStore.use.isAbleClose();

  const { onConnectHashPack } = React.useContext(HederaWalletsContext);
  const [isChecked, setIsChecked] = React.useState(false);

  React.useEffect(() => {
    setIsChecked(false);
  }, [isOpen]);

  return (
    <Modal
      closeButton={isAbleClose ? undefined : <></>}
      size="xl"
      backdrop={'blur'}
      isOpen={isOpen}
      placement={'auto'}
      onOpenChange={isAbleClose ? onOpenChange : () => {}}
    >
      <ModalContent>
        {() => (
          <>
            <ModalHeader className="flex text-center flex-col gap-1">Connect Wallet</ModalHeader>
            <ModalBody className="pb-10">
              <VStack spacing={20} className="max-w-sm mx-auto">
                <HStack spacing={20} noWrap>
                  <AgreeTermAndPolicy isChecked={isChecked} setIsChecked={setIsChecked} />
                </HStack>

                <VStack>
                  {/* HashPack */}
                  <ConnectAction
                    connectorName="HashPack"
                    iconHref="/images/wallet/hashpack.jpeg"
                    disabled={!isChecked}
                    onClick={onConnectHashPack}
                  />

                  {/* BladeWallet */}
                  {/* <Button
                    className="py-2 bg-primary-700 text-white"
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

type AgreeTermAndPolicyProps = {
  isChecked?: boolean;
  setIsChecked?: (isSelected: boolean) => void;
};
const AgreeTermAndPolicy = ({ isChecked, setIsChecked }: AgreeTermAndPolicyProps) => {
  return (
    <Checkbox
      aria-label="By connecting your wallet, I agree with the Terms of Use & Privacy Policy"
      isSelected={isChecked}
      onValueChange={setIsChecked}
      color="default"
      classNames={{
        base: cn('inline-flex'),
        label: 'w-full',
      }}
    >
      <span className="text-sm">
        By connecting your wallet, I agree with the{' '}
        <Link target="_blank" href={ROUTE.HOME} className="text-primary-700 hover:opacity-50">
          Terms of Use
        </Link>{' '}
        &{' '}
        <Link target="_blank" href={ROUTE.HOME} className="text-primary-700 hover:opacity-50">
          Privacy Policy
        </Link>
      </span>
    </Checkbox>
  );
};

type ConnectActionProps = {
  disabled?: boolean;
  onClick: () => void;
  iconHref: string;
  connectorName: string;
};
const ConnectAction = ({ disabled, onClick, connectorName, iconHref }: ConnectActionProps) => {
  return (
    <Button
      disabled={disabled}
      className={cn('py-2 h-16 max-w-sm w-full mx-auto bg-primary-700 text-white', {
        'bg-[#F3F4F6] text-[#BCC1CA] pointer-events-none': disabled,
      })}
      onClick={onClick}
    >
      <div className="flex w-full items-center justify-between">
        <span className="text-lg">{connectorName}</span>
        <div
          className={cn('rounded-full overflow-hidden', {
            'opacity-30': disabled,
          })}
        >
          <Image src={iconHref} alt="hashpack" width={32} height={32} quality={100} unoptimized />
        </div>
      </div>
    </Button>
  );
};
