import React from 'react';
import { useRouter } from 'next/navigation';
import { Icons } from '@/assets/icons';
import { HederaWalletsContext } from '@/context/HederaContext';
import { ROUTE } from '@/types';
import { Button, Popover, PopoverContent, PopoverTrigger } from '@nextui-org/react';

import { useCopy } from '@/hooks/useCopy';
import { HStack, VStack } from '@/components/Utilities';

const WalletPoppover = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  console.log('🚀 ~ WalletPoppover ~ isOpen:', isOpen);
  const router = useRouter();
  const [copied, copy] = useCopy();
  const { accountId, handleDisconnect } = React.useContext(HederaWalletsContext);

  return (
    <HStack noWrap className="bg-primary-900 rounded-md pr-2 pl-4">
      <span className="text-white">{accountId}</span>

      <Popover isOpen={isOpen} onOpenChange={(open) => setIsOpen(open)}>
        <PopoverTrigger>
          <button className="p-2">
            <Icons.ellipsisVertical color="white" />
          </button>
        </PopoverTrigger>
        <PopoverContent className="p-4">
          <VStack spacing={20}>
            <VStack spacing={8}>
              <Button variant="light" startContent={<Icons.user />} onClick={() => router.push(ROUTE.MY_PORTFOLIO)}>
                My Porfolio
              </Button>

              <Button variant="light" disabled={copied} startContent={<Icons.copy />} onClick={() => copy(accountId)}>
                Copy Address
              </Button>

              <Button variant="light" startContent={<Icons.link2Off />} onClick={handleDisconnect}>
                Disconnect
              </Button>
            </VStack>
          </VStack>
        </PopoverContent>
      </Popover>
    </HStack>
  );
};

export default WalletPoppover;
