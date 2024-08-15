import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ROUTE } from '@/types';
import { cn } from '@/utils/common';

import { HStack } from '@/components/Utilities';

const LIST_NAVBAR = [
  {
    label: 'Supply',
    route: ROUTE.HOME,
  },
  {
    label: 'Borrow',
    route: ROUTE.ISSUE_BOND,
  },
];

const Navbar = () => {
  const pathname = usePathname();

  return (
    <HStack spacing={48} noWrap>
      {LIST_NAVBAR.map((nav) => {
        const isActive = pathname === nav.route;

        return (
          <Link
            href={nav.route}
            key={nav.label}
            className={cn('hover:opacity-50 text-black font-medium', {
              'text-primary-500': isActive,
            })}
          >
            {nav.label}
          </Link>
        );
      })}
    </HStack>
  );
};

export default Navbar;
