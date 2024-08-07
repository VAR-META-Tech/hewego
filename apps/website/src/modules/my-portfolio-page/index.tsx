import React from 'react';

import Tabs from '@/components/ui/tabs';
import Back from '@/components/Back';
import AuthLayout from '@/components/layouts/AuthLayout';
import TransitionLayout from '@/components/TransitionLayout';

import BorrowRequestList from './components/BorrowRequestList';
import MyBondsList from './components/MyBondsList';
import { TAB_DATA, TAB_VALUE } from './utils/const';

const TabContent = React.memo(({ tab }: { tab: string }) => {
  return (
    <>
      {tab === TAB_VALUE.BORROW_REQUEST && (
        <TransitionLayout>
          <BorrowRequestList />
        </TransitionLayout>
      )}

      {tab === TAB_VALUE.MY_BONDS && (
        <TransitionLayout>
          <MyBondsList />
        </TransitionLayout>
      )}
    </>
  );
});

TabContent.displayName = 'TabContent';

const MyPortfolioPage = () => {
  const [tab, setTab] = React.useState(TAB_VALUE.BORROW_REQUEST);

  const memoizedTabs = React.useMemo(
    () => <Tabs layoutId="my-portfolio-tabs" data={TAB_DATA} value={tab} onChange={setTab} />,
    [tab]
  );

  return (
    <AuthLayout>
      <div className="container py-20 space-y-12">
        <Back title="My Portfolio" />

        <div className="w-full md:w-4/5 mx-auto">{memoizedTabs}</div>

        <TabContent tab={tab} />
      </div>
    </AuthLayout>
  );
};

export default MyPortfolioPage;
