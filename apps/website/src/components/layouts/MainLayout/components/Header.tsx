import React from 'react';

import Logo from '@/components/Logo';
import { HStack } from '@/components/Utilities';

import ConnectWallet from './ConnectWallet';
import Navbar from './Navbar';

// import SearchInput from './SearchInput';

interface Props {}

const Header: React.FC<Props> = () => {
  return (
    <header className="min-h-header sticky py-2 top-0 right-0 left-0 z-50 bg-white/50 backdrop-blur-lg">
      <HStack align={'center'} pos={'apart'} spacing={40} className="container h-full">
        <Logo />

        <Navbar />

        <ConnectWallet />
      </HStack>
    </header>
  );
};

export default Header;
