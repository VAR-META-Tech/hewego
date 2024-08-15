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
  const router = useRouter();
  const [copied, copy] = useCopy();
  const { accountId, handleDisconnect } = React.useContext(HederaWalletsContext);

  return (
    <HStack noWrap pos={'apart'} className="bg-primary-700 rounded-md pr-1 pl-4">
      <span className="text-white">{accountId}</span>

      <Popover size="lg" isOpen={isOpen} onOpenChange={(open) => setIsOpen(open)}>
        <PopoverTrigger>
          <button className="p-2">
            <Icons.ellipsisVertical color="white" />
          </button>
        </PopoverTrigger>
        <PopoverContent className="p-4">
          <VStack spacing={20}>
            <VStack spacing={8}>
              <Button variant="light" startContent={<Icons.user />} onClick={() => router.push(ROUTE.MY_PORTFOLIO)}>
                <span className="w-32">My Portfolio</span>
              </Button>

              <Button variant="light" disabled={copied} startContent={<Icons.copy />} onClick={() => copy(accountId)}>
                <span className="w-32">Copy Address </span>
              </Button>

              <Button variant="light" startContent={<Icons.link2Off />} onClick={handleDisconnect}>
                <span className="w-32"> Disconnect </span>
              </Button>
            </VStack>
          </VStack>
        </PopoverContent>
      </Popover>
    </HStack>
  );
};

export default WalletPoppover;
