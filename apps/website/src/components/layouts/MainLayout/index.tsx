import React from 'react';
import { FCC } from '@/types';

import Header from './components/Header';

interface Props {}

const MainLayout: FCC<Props> = ({ children }) => {
  return (
    <div>
      <Header />

      <main className="min-h-screen">{children}</main>
    </div>
  );
};

export default MainLayout;
