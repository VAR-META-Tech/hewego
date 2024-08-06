/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { useRouter } from 'next/navigation';
import { Icons } from '@/assets/icons';
import { HederaWalletsContext } from '@/context/HederaContext';
import { ROUTE } from '@/types';
import { Button, Popover, PopoverContent, PopoverTrigger } from '@nextui-org/react';

import { useCopy } from '@/hooks/useCopy';
import { HStack, VStack } from '@/components/Utilities';

const WalletPoppover = () => {
  const router = useRouter();
  const [copied, copy] = useCopy();
  const { accountId, handleDisconnect } = React.useContext(HederaWalletsContext);

  return (
    <Popover>
      <PopoverTrigger>
        <Button className="bg-primary-900 text-white text-base" startContent={<Icons.link />}>
          {accountId}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-4">
        <VStack spacing={20}>
          <HStack spacing={16}>
            <Icons.wallet />
            <span className="text-lg font-medium text-primary-900">{accountId}</span>
          </HStack>

          <VStack spacing={8}>
            <HStack spacing={8}>
              <Button
                startContent={<Icons.copy />}
                className="bg-primary-900 text-white"
                onClick={() => copy(accountId)}
              >
                Copy Address
              </Button>
              <Button startContent={<Icons.x />} className="bg-primary-900 text-white" onClick={handleDisconnect}>
                Disconnect
              </Button>
            </HStack>

            <Button
              startContent={<Icons.user />}
              className="bg-primary-900 text-white"
              onClick={() => router.push(ROUTE.MY_PORTFOLIO)}
            >
              My Porfolio
            </Button>
          </VStack>
        </VStack>
      </PopoverContent>
    </Popover>
  );
};

export default WalletPoppover;
