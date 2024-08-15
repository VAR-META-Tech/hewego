import React from 'react';

import Logo from '@/components/Logo';
import { HStack } from '@/components/Utilities';

import ConnectWallet from './ConnectWallet';
import Navbar from './Navbar';
import SearchInput from './SearchInput';

interface Props {}

const Header: React.FC<Props> = () => {
  return (
    <header className="h-header bg-white fixed top-0 right-0 left-0 z-50">
      <HStack align={'center'} pos={'apart'} spacing={40} className="container h-full">
        <HStack className="flex-1" spacing={20} noWrap>
          <Logo />

          <SearchInput />
        </HStack>
        <HStack spacing={20} pos={'apart'} noWrap className="flex-1">
          <Navbar />

          <ConnectWallet />
        </HStack>
      </HStack>
    </header>
  );
};

export default Header;
