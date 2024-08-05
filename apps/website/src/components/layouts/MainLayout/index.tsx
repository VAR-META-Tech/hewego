import React from 'react';
import dynamic from 'next/dynamic';
import { FCC } from '@/types';

const Header = dynamic(() => import('./components/Header'));

interface Props {}

const MainLayout: FCC<Props> = ({ children }) => {
  return (
    <>
      <Header />

      <main className="min-h-screen bg-white">{children}</main>
    </>
  );
};

export default MainLayout;
