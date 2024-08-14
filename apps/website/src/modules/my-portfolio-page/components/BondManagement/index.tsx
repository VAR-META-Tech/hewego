import React from 'react';

import TransitionLayout from '@/components/TransitionLayout';

import { BOND_MANAGEMENT_TAB_DATA, BOND_MANAGEMENT_TAB_VALUE } from '../../utils/const';
import BondHoldings from './BondHoldings';
import BondManagementTab from './BondManagementTab';
import BondRequests from './BondRequests';

interface Props {
  setTab: React.Dispatch<React.SetStateAction<string>>;
}

const BondManagement: React.FC<Props> = ({ setTab: setTabContainer }) => {
  const [tab, setTab] = React.useState(BOND_MANAGEMENT_TAB_VALUE.BOND_HOLDINGS);

  return (
    <div className="space-y-16">
      <div className="w-1/4 mx-auto">
        <BondManagementTab
          layoutId="bond-management-tabs"
          data={BOND_MANAGEMENT_TAB_DATA}
          value={tab}
          onChange={setTab}
        />
      </div>

      {tab === BOND_MANAGEMENT_TAB_VALUE.BOND_HOLDINGS && (
        <TransitionLayout>
          <BondHoldings setTabContainer={setTabContainer} />
        </TransitionLayout>
      )}

      {tab === BOND_MANAGEMENT_TAB_VALUE.BOND_REQUESTS && (
        <TransitionLayout>
          <BondRequests />
        </TransitionLayout>
      )}
    </div>
  );
};

export default BondManagement;
