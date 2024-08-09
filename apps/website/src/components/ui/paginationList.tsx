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

const Pagination = (props: Props) => {
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
        <PaginationItem onClick={disablePrev ? undefined : onPrevious}>
          <PaginationPrevious disabled={disablePrev} />
        </PaginationItem>

        {paginationRange.map((pageNumber, i) => {
          if (pageNumber === DOTS) {
            return (
              <PaginationItem key={pageNumber + i}>
                <PaginationEllipsis />
              </PaginationItem>
            );
          }

          return (
            <PaginationItem onClick={() => onPageChange(pageNumber as number)} key={pageNumber}>
              <Button size="md" className={cn('aspect-square h-10 rounded-md p-0')}>
                {pageNumber}
              </Button>
            </PaginationItem>
          );
        })}

        <PaginationItem onClick={disabledNext ? undefined : onNext}>
          <PaginationNext disabled={disabledNext} />
        </PaginationItem>
      </PaginationContent>
    </PaginationContent>
  );
};

export default Pagination;
