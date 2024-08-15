import React from 'react';
import dynamic from 'next/dynamic';
import { FCC } from '@/types';

const Header = dynamic(() => import('./components/Header'));

interface Props {}

const MainLayout: FCC<Props> = ({ children }) => {
  return (
    <div className="relative">
      <Header />

      <main className="min-h-screen bg-white pt-20">{children}</main>
    </div>
  );
};

export default MainLayout;
