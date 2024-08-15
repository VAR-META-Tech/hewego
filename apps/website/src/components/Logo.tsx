import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ROUTE } from '@/types';

interface Props {}

const Logo = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & Props>((props, ref) => {
  return (
    <div ref={ref} {...props}>
      <Link href={ROUTE.HOME} className="text-3xl text-black font-semibold">
        <Image src="/images/logo.webp" alt="logo" width={100} height={100} />
      </Link>
    </div>
  );
});

Logo.displayName = 'Logo';

export default Logo;
