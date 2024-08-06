import React from 'react';
import dynamic from 'next/dynamic';
import { NextPageWithLayout } from '@/types';

const BannerSection = dynamic(() => import('./components/BannerSection'));

const HomePage: NextPageWithLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <BannerSection />
    </div>
  );
};

export default HomePage;
