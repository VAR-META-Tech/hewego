import React, { HTMLAttributes } from 'react';
import Link from 'next/link';
import { ROUTE } from '@/types';

interface Props {}

const Logo = React.forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement> & Props>((props, ref) => {
  return (
    <div ref={ref} {...props}>
      <Link href={ROUTE.HOME} className="text-3xl text-black font-semibold">
        Logo
      </Link>
    </div>
  );
});

Logo.displayName = 'Logo';

export default Logo;
