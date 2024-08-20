import React from 'react';
import { FCC } from '@/types';

import Footer from './components/Footer';
import Header from './components/Header';

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
