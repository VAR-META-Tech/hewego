import React from 'react';

import MyBondHeading from './MyBondHeading';
import MyBondTable from './MyBondTable';

const MyBondsList = () => {
  return (
    <div className="space-y-4">
      <MyBondHeading />

      <MyBondTable />
    </div>
  );
};

export default MyBondsList;
