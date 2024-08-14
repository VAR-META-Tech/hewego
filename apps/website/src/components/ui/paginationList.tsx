import React from 'react';
import { cn } from '@/utils/common';
import { Button } from '@nextui-org/react';

import { DOTS, usePagination } from '@/hooks/usePagination';

import {
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from './pagination';

type Props = {
  onPageChange: (pageNumber: number) => void;
  totalCount: number;
  siblingCount: number;
  currentPage: number;
  pageSize: number;
  className?: string;
};

const PaginationList = (props: Props) => {
  const { onPageChange, totalCount, siblingCount = 1, currentPage, pageSize } = props;

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  // if (currentPage === 0 || paginationRange?.length < 2) {
  //   return null;
  // }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  const lastPage = paginationRange[paginationRange.length - 1];

  const disablePrev = currentPage === 1;
  const disabledNext = !lastPage || currentPage === lastPage;

  return (
    <PaginationContent>
      <PaginationContent>
        <PaginationPrevious onClick={disablePrev ? undefined : onPrevious} disabled={disablePrev} />

        {paginationRange.map((pageNumber, i) => {
          if (pageNumber === DOTS) {
            return (
              <PaginationItem key={pageNumber + i}>
                <PaginationEllipsis />
              </PaginationItem>
            );
          }

          return (
            <Button
              variant={pageNumber === currentPage ? 'bordered' : 'light'}
              onClick={() => onPageChange(Number(pageNumber))}
              key={pageNumber}
              size="md"
              className={cn('min-w-10 h-10 rounded-full p-0', {
                'border-primary-500 text-primary-500': pageNumber === currentPage,
              })}
            >
              {pageNumber}
            </Button>
          );
        })}

        <PaginationNext onClick={disabledNext ? undefined : onNext} disabled={disabledNext} />
      </PaginationContent>
    </PaginationContent>
  );
};

export default PaginationList;
