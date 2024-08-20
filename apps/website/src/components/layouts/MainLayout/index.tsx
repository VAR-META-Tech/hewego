import React from 'react';
import dynamic from 'next/dynamic';
import { FCC } from '@/types';

import Footer from './components/Footer';

const Header = dynamic(() => import('./components/Header'));

interface Props {}

const MainLayout: FCC<Props> = ({ children }) => {
  return (
    <div className="relative">
      <Header />

      <main className="min-h-screen bg-white">{children}</main>

      <Footer />
    </div>
  );
};

export default MainLayout;
