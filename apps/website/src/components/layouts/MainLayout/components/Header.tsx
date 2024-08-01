import React from 'react';

import Logo from '@/components/Logo';
import { HStack } from '@/components/Utilities';

import ConnectWallet from './ConnectWallet';

interface Props {}

const Header: React.FC<Props> = () => {
  return (
    <header className="h-header bg-primary-800">
      <HStack align={'center'} pos={'apart'} className="container h-full">
        <Logo />

        <ConnectWallet />
      </HStack>
    </header>
  );
};

export default Header;
