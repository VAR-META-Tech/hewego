/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { Icons } from '@/assets/icons';
import { HederaWalletsContext } from '@/context/HederaContext';
import { Button, Popover, PopoverContent, PopoverTrigger } from '@nextui-org/react';

import { useCopy } from '@/hooks/useCopy';
import { HStack, VStack } from '@/components/Utilities';

const WalletPoppover = () => {
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

          <HStack>
            <Button startContent={<Icons.copy />} className="bg-primary-900 text-white" onClick={() => copy(accountId)}>
              Copy Address
            </Button>
            <Button startContent={<Icons.x />} className="bg-primary-900 text-white" onClick={handleDisconnect}>
              Disconnect
            </Button>
          </HStack>
        </VStack>
      </PopoverContent>
    </Popover>
  );
};

export default WalletPoppover;
