import React from 'react';
import { Accordion, AccordionItem, Checkbox } from '@nextui-org/react';

import { useGetMetaToken } from '@/hooks/useGetMetaToken';
import { HStack, VStack } from '@/components/Utilities';

import { IGetBondsFilterType } from '../../hooks/useGetActiveBonds';
import { LOAN_TERM_DATA } from '../../utils/const';

interface Props {
  filter: IGetBondsFilterType;
  handleSearchChange: (values: IGetBondsFilterType) => void;
}

const itemClasses = {
  base: 'py-0 w-full',
  title: 'font-normal text-medium',
  trigger: 'px-2 py-0 data-[hover=true]:bg-default-100 rounded-md h-14 flex items-center border border-primary-500',
  indicator: 'text-medium',
  content: 'text-small px-2',
};

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
    <div className="col-span-5 xl:col-span-1 space-y-10">
      <HStack pos={'apart'}>
        <span className="text-xl font-bold">Filter</span>

        <button className="text-base text-primary-700 hover:text-primary-300" onClick={handleClear}>
          Clear all
        </button>
      </HStack>

      <HStack className="xl:flex-col gap-5" noWrap align={'start'}>
        <Accordion defaultSelectedKeys={['Loan Term']} itemClasses={itemClasses}>
          <AccordionItem key="Loan Term" aria-label="Loan Term" title="Loan Term">
            <VStack className="p-4 rounded-md shadow-[0_6px_16px_rgb(0,0,0,0.2)]">
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
                    {loan.label}
                  </Checkbox>
                );
              })}
            </VStack>
          </AccordionItem>
        </Accordion>

        <Accordion defaultSelectedKeys={['Supply/Borrow']} itemClasses={itemClasses}>
          <AccordionItem key="Supply/Borrow" aria-label="Supply/Borrow" title="Supply/Borrow">
            <VStack className="p-4 rounded-md shadow-[0_6px_16px_rgb(0,0,0,0.2)]">
              {borrowTokenData.map((borrow, index) => {
                return (
                  <Checkbox
                    isSelected={filter.borrows.includes(String(borrow.value))}
                    onValueChange={() => handleBorrowChange(borrow.value)}
                    color="default"
                    key={index}
                  >
                    {borrow.label}
                  </Checkbox>
                );
              })}
            </VStack>
          </AccordionItem>
        </Accordion>
      </HStack>
    </div>
  );
};

export default React.memo(ActiveBondFilter);
