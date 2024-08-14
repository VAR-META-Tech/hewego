import React from 'react';

import Tabs from '@/components/ui/tabs';
import Back from '@/components/Back';
import AuthLayout from '@/components/layouts/AuthLayout';
import TransitionLayout from '@/components/TransitionLayout';

import BondManagement from './components/BondManagement';
import TransactionHistory from './components/TransactionHistory';
import { TAB_DATA, TAB_VALUE } from './utils/const';

const TabContent = React.memo(
  ({ tab, setTab }: { tab: string; setTab: React.Dispatch<React.SetStateAction<string>> }) => {
    return (
      <>
        {tab === TAB_VALUE.BOND_MANAGEMENT && (
          <TransitionLayout>
            <BondManagement setTab={setTab} />
          </TransitionLayout>
        )}

        {tab === TAB_VALUE.HISTORY && (
          <TransitionLayout>
            <TransactionHistory />
          </TransitionLayout>
        )}
      </>
    );
  }
);

TabContent.displayName = 'TabContent';

const MyPortfolioPage = () => {
  const [tab, setTab] = React.useState(TAB_VALUE.BOND_MANAGEMENT);

  const memoizedTabs = React.useMemo(
    () => <Tabs layoutId="my-portfolio-tabs" data={TAB_DATA} value={tab} onChange={setTab} />,
    [tab]
  );

  return (
    <AuthLayout>
      <div className="py-20 space-y-12 overflow-hidden">
        <div className="container">
          <Back title="My Portfolio" />

          <div className="w-full md:w-3/5 mx-auto">{memoizedTabs}</div>
        </div>

        <TabContent tab={tab} setTab={setTab} />
      </div>
    </AuthLayout>
  );
};

export default MyPortfolioPage;
