import React from 'react';

import { NextPageWithLayout } from '../../types';

const HomePage: NextPageWithLayout = () => {
  return (
    <div className="flex flex-col gap-4 flex-1 items-center justify-center min-h-screen">
      <span className="text-3xl font-semibold">Home Page</span>
    </div>
  );
};

export default HomePage;
