import React from 'react';
import { Icons } from '@/assets/icons';
import { cn } from '@/utils/common';
import { Input } from '@nextui-org/react';

interface Props extends React.HTMLAttributes<HTMLDivElement> {}

const SearchInput: React.FC<Props> = ({ className, ...props }) => {
  return (
    <div className={cn('w-full', className)} {...props}>
      <Input
        startContent={<Icons.search />}
        placeholder="Search bonds ..."
        classNames={{
          input: ['placeholder:text-default-700/50 dark:placeholder:text-white/60'],
        }}
      />
    </div>
  );
};

export default SearchInput;
