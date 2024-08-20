import React from 'react';
import { Icons } from '@/assets/icons';
import { cn } from '@/utils/common';
import { Input } from '@nextui-org/react';

interface Props extends React.HTMLAttributes<HTMLDivElement> {}

const SearchInput: React.FC<Props> = ({ className, ...props }) => {
  return (
    <div className={cn('w-full', className)} {...props}>
      <Input
        radius="sm"
        variant="bordered"
        startContent={<Icons.search color="#4E358F" />}
        placeholder="Search borrow request  ..."
        classNames={{
          input: ['placeholder:text-primary-700/80 dark:placeholder:text-white/60'],
          mainWrapper: ['bg-primary-50'],
          inputWrapper: ['border-0'],
        }}
      />
    </div>
  );
};

export default SearchInput;
