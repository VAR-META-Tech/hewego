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
          <span className="text-primary-900">Issue and buy </span>
          <span>potential bonds </span>
        </VStack>

        <span>Occaecat est ipsum reprehenderit reprehenderit veniam anim laborum est esse duis occaecat </span>

        <HStack spacing={16}>
          <Button
            onPress={() => router.push(ROUTE.ISSUE_BOND)}
            size="lg"
            radius="sm"
            className="text-lg bg-primary-900 text-white"
          >
            Issue Bond
          </Button>
          <Button size="lg" radius="sm" className="text-lg bg-primary-300 text-[#006D7C]">
            Buy Bond
          </Button>
        </HStack>
      </VStack>

      <div className="hidden flex-1 relative w-full lg:block">
        <Image src={'/images/banner.webp'} alt="banner" fill quality={100} unoptimized priority />
      </div>
    </HStack>
  );
};

export default BannerSection;
