import React from 'react';

import Logo from '@/components/Logo';
import { HStack } from '@/components/Utilities';

import ConnectWallet from './ConnectWallet';
import Navbar from './Navbar';
import SearchInput from './SearchInput';

interface Props {}

const Header: React.FC<Props> = () => {
  return (
    <header className="h-header bg-white fixed top-0 right-0 left-0">
      <HStack align={'center'} pos={'apart'} className="container h-full">
        <Logo />

        <HStack spacing={20} noWrap>
          <SearchInput />

          <Navbar />

          <ConnectWallet />
        </HStack>
      </HStack>
    </header>
  );
};

export default Header;
