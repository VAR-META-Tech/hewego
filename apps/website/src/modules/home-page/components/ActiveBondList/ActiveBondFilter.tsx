import React from 'react';
import { Checkbox } from '@nextui-org/react';

import { useGetMetaToken } from '@/hooks/useGetMetaToken';
import { HStack } from '@/components/Utilities';

import { IGetBondsFilterType } from '../../hooks/useGetActiveBonds';
import { LOAN_TERM_DATA } from '../../utils/const';

interface Props {
  filter: IGetBondsFilterType;
  handleSearchChange: (values: IGetBondsFilterType) => void;
}

const ActiveBondFilter: React.FC<Props> = ({ filter, handleSearchChange }) => {
  const { borrowTokenData } = useGetMetaToken();

  const handleClear = React.useCallback(() => {
    handleSearchChange({
      loanTerms: [],
      borrows: [],
      collaterals: [],
    });
  }, [handleSearchChange]);

  const handleLoanTermChange = React.useCallback(
    (value: number) => {
      const isIncludeLoanTerm = filter.loanTerms.includes(String(value));
      const newLoanTerms = isIncludeLoanTerm
        ? filter.loanTerms.filter((loan) => loan !== String(value))
        : [...filter.loanTerms, String(value)];

      handleSearchChange({
        ...filter,
        loanTerms: newLoanTerms,
      });
    },
    [filter, handleSearchChange]
  );

  const handleBorrowChange = React.useCallback(
    (value: string) => {
      const isIncludeBorrow = filter.borrows.includes(String(value));
      const newBorrows = isIncludeBorrow
        ? filter.borrows.filter((loan) => loan !== String(value))
        : [...filter.borrows, String(value)];

      handleSearchChange({
        ...filter,
        borrows: newBorrows,
      });
    },
    [filter, handleSearchChange]
  );

  return (
    <div className="col-span-8 xl:col-span-2 space-y-4 border p-4 rounded-md shadow-sm">
      <HStack pos={'apart'}>
        <span className="text-xl font-bold">Filter</span>

        <button className="text-base text-primary-700 hover:text-primary-300" onClick={handleClear}>
          Clear all
        </button>
      </HStack>

      <hr />

      <div className="w-full space-y-8">
        <div className="space-y-4">
          <label className="font-bold">Loan Term</label>

          <HStack spacing={16}>
            {LOAN_TERM_DATA.map((loan, index) => {
              return (
                <Checkbox
                  color="default"
                  key={index}
                  isSelected={filter.loanTerms.includes(String(loan.value))}
                  onValueChange={() => {
                    handleLoanTermChange(loan.value);
                  }}
                >
                  <span className="text-gray-600">{loan.label}</span>
                </Checkbox>
              );
            })}
          </HStack>
        </div>

        <hr />

        <div className="space-y-4">
          <label className="font-bold">Supply/Borrow</label>

          <HStack spacing={16}>
            {borrowTokenData.map((borrow, index) => {
              return (
                <Checkbox
                  isSelected={filter.borrows.includes(String(borrow.value))}
                  onValueChange={() => handleBorrowChange(borrow.value)}
                  color="default"
                  key={index}
                >
                  <span className="text-gray-600">{borrow.label}</span>
                </Checkbox>
              );
            })}
          </HStack>
        </div>
      </div>
    </div>
  );
};

export default React.memo(ActiveBondFilter);
