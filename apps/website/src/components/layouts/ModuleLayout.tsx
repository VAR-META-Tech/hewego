import React from 'react';
import { FCC } from '@/types';
import NextNProgress from 'nextjs-progressbar';

import { TailwindIndicator } from '../TailwindIndicator';

const ModuleLayout: FCC = ({ children }) => {
  return (
    <>
      {children}
      <TailwindIndicator />
      <NextNProgress color="#8259EF" startPosition={0.3} stopDelayMs={200} height={3} showOnShallow={false} />
    </>
  );
};

export default React.memo(ModuleLayout);
