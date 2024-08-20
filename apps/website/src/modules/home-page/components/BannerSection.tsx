import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ROUTE } from '@/types';
import { Button } from '@nextui-org/react';

import { HStack, VStack } from '@/components/Utilities';

const BannerSection = () => {
  const router = useRouter();
  return (
    <HStack spacing={20} align={'default'} className="container py-10 h-[35rem]">
      <VStack className="flex-1" justify={'center'}>
        <VStack className="text-5xl font-semibold">
          <span className="text-primary-700">Issue and buy </span>
          <span>potential bonds </span>
        </VStack>

        <span>
          Unlock secure, transparent, and innovative investment opportunities through the issuance and purchase of
          potential bonds
        </span>

        <HStack spacing={16}>
          <Button
            onPress={() => router.push(ROUTE.ISSUE_BOND)}
            size="lg"
            radius="full"
            className="text-lg bg-primary-700 text-white"
          >
            Issue bond
          </Button>
          {/* <Button size="lg" radius="sm" className="text-lg bg-primary-300 text-primary-700">
            Buy bond
          </Button> */}
        </HStack>
      </VStack>

      <div className="hidden flex-1 relative w-full lg:block">
        <Image src={'/images/chart-grow-up.png'} alt="banner" fill quality={100} unoptimized priority />
      </div>
    </HStack>
  );
};

export default BannerSection;
