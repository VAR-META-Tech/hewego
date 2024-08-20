import React from 'react';
import { useRouter } from 'next/navigation';
import { Icons } from '@/assets/icons';
import { HederaWalletsContext } from '@/context/HederaContext';
import { ROUTE } from '@/types';
import { Button, ButtonProps, Popover, PopoverContent, PopoverTrigger } from '@nextui-org/react';

import { useCopy } from '@/hooks/useCopy';
import { HStack, VStack } from '@/components/Utilities';

const WalletPopover = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const router = useRouter();
  const [copied, copy] = useCopy();
  const { accountId, handleDisconnect } = React.useContext(HederaWalletsContext);

  return (
    <HStack noWrap pos={'apart'}>
      <Popover size="lg" isOpen={isOpen} onOpenChange={(open) => setIsOpen(open)} placement="bottom-end">
        <PopoverTrigger>
          <Button
            startContent={<Icons.wallet size={20} />}
            className="inline-flex items-center bg-primary-700 text-white text-base w-44 rounded-full"
          >
            <span className="text-white">{accountId}</span>
          </Button>
        </PopoverTrigger>

        <PopoverContent className="p-4">
          <VStack spacing={20}>
            <VStack spacing={2}>
              <PopoverAction
                icon={<Icons.user />}
                actionName="My Portfolio"
                onClick={() => router.push(ROUTE.MY_PORTFOLIO)}
              />

              <PopoverAction
                disabled={copied}
                icon={<Icons.copy />}
                actionName="Copy Address"
                onClick={() => copy(accountId)}
              />

              <PopoverAction icon={<Icons.link2Off />} actionName="Disconnect" onClick={handleDisconnect} />
            </VStack>
          </VStack>
        </PopoverContent>
      </Popover>
    </HStack>
  );
};

export default WalletPopover;

type PopoverActionProps = ButtonProps & {
  icon: React.ReactNode;
  actionName: string;
};
const PopoverAction = ({ icon, actionName, ...props }: PopoverActionProps) => {
  return (
    <Button variant="light" {...props}>
      <div className="flex w-full gap-4 text-base">
        {icon}
        <span className="">{actionName}</span>
      </div>
    </Button>
  );
};
