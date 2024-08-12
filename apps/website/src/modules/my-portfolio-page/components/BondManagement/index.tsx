import React from 'react';

import { BOND_MANAGEMENT_TAB_DATA, BOND_MANAGEMENT_TAB_VALUE } from '../../utils/const';
import BondManagementTab from './BondManagementTab';
import BondRequests from './BondRequests';

const BondManagement = () => {
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

      {tab === BOND_MANAGEMENT_TAB_VALUE.BOND_REQUESTS && <BondRequests />}
    </div>
  );
};

export default BondManagement;
