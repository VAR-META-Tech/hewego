import React from 'react';
import Link from 'next/link';
import { Icons } from '@/assets/icons';

import { HStack } from '@/components/Utilities';

const Footer = () => {
  return (
    <div className="py-5 border-t border-t-border">
      <div className="grid grid-cols-3 gap-5 container">
        <div className="col-span-1"></div>
        <div className="col-span-1 text-center text-sm opacity-70">Copyright © 2024 Hewego</div>
        <div className="col-span-1">
          <HStack pos={'right'}>
            <Link
              target="_blank"
              href={'https://www.facebook.com/varmeta.techcompany'}
              className="hover:opacity-50 bg-blue-500 rounded-full p-1.5"
            >
              <Icons.facebook color="white" size={16} />
            </Link>

            <Link target="_blank" href={'/#'} className="hover:opacity-50 p-1.5">
              <Icons.send color="#377ff5" />
            </Link>
          </HStack>
        </div>
      </div>
    </div>
  );
};

export default Footer;
