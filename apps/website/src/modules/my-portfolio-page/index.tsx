import React from 'react';

import Tabs from '@/components/ui/tabs';
import Back from '@/components/Back';
import TransitionLayout from '@/components/TransitionLayout';

import ListBond from './components/ListBond';
import { TAB_DATA, TAB_VALUE } from './utils/const';

const MyPortfolioPage = () => {
  const [tab, setTab] = React.useState(TAB_VALUE.BORROW_REQUEST);

  const renderContent = React.useMemo(() => {
    switch (tab) {
      case TAB_VALUE.BORROW_REQUEST:
        return (
          <TransitionLayout>
            <ListBond />
          </TransitionLayout>
        );
      case TAB_VALUE.MY_BONDS:
        return '';
      case TAB_VALUE.HISTORY:
        return '';
      default:
        return '';
    }
  }, [tab]);

  return (
    <div className="container py-20 space-y-8">
      <Back title="My Portfolio" />

      <div className="w-full md:w-4/5 mx-auto">
        <Tabs layoutId="my-portfolio-tabs" data={TAB_DATA} value={tab} onChange={setTab} />
      </div>

      {renderContent}
    </div>
  );
};

export default MyPortfolioPage;
