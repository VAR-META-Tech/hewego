import React from 'react';
import IssueBondAction from '@/modules/issue-bond-page/components/IssueBondAction';
import { cn } from '@/utils/common';

import PreviewRow from './PreviewRow';
import { HStack, VStack } from './Utilities';

interface Props extends Omit<React.HTMLAttributes<HTMLDivElement>, 'prefix' | 'suffix'> {
  name: string;
  maturityDate: string;
  durationBond: string;
  collateralToken: string;
  loanToken: string;
  volumeBond: string;
  borrowInterestRate: string;
  lenderInterestRate: string;
  totalRepaymentAmount: string;
  issuanceDate: string;
  minimumCollateralAmount: string;
}

const BondCard: React.FC<Props> = ({
  name,
  maturityDate,
  durationBond,
  collateralToken,
  loanToken,
  volumeBond,
  borrowInterestRate,
  lenderInterestRate,
  totalRepaymentAmount,
  issuanceDate,
  minimumCollateralAmount,
  ...props
}) => {
  return (
    <VStack {...props} className={cn('flex-1 w-full', props.className)}>
      <VStack>
        <HStack align={'center'} pos="apart" className="text-xl font-bold">
          <label>{name}</label>
        </HStack>

        <HStack align={'center'} pos="apart" className="text-base font-bold">
          <label>Total Repayment Amount</label>

          <p>{`${totalRepaymentAmount ?? '0.00'} ${loanToken}`}</p>
        </HStack>
      </VStack>

      <hr />

      <VStack>
        <PreviewRow label="Collateral & Type" value={`${minimumCollateralAmount} ${collateralToken}`} />
        <PreviewRow label="Bond Volume" value={volumeBond} />
        <PreviewRow label="Bond Term" value={durationBond} />

        <hr />

        <PreviewRow label="Lender Rate Rate" value={lenderInterestRate ? `${lenderInterestRate}%` : ''} />
        <PreviewRow
          tooltip={
            <div className="text-center">
              <div>On close 90% of the borrow side interest</div>
              <div>is paid to the lender, and 10% is paid to platform</div>
            </div>
          }
          label="Borrow Interest Rate"
          value={borrowInterestRate ? `${borrowInterestRate}%` : ''}
        />

        <hr />

        <PreviewRow
          tooltip={
            <div className="text-center">
              <div>The issuance date will be</div>
              <div>7 days after the creation date</div>
            </div>
          }
          label="Issuance Date"
          value={issuanceDate}
        />
        <PreviewRow
          tooltip={
            <div className="text-center">
              <div>The maturity date of a bond is calculated </div>
              <div>by adding the bond duration to the issuance date</div>
            </div>
          }
          label="Maturity Date"
          value={maturityDate}
        />

        <IssueBondAction />
      </VStack>
    </VStack>
  );
};

export default BondCard;
