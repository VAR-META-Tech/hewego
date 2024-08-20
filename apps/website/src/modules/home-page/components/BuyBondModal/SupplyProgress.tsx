import React from 'react';
import { Card, CardBody, CardFooter, Chip, CircularProgress } from '@nextui-org/react';

type Props = {
  progress: number;
  total: number;
};

export const SupplyProgress = ({ progress = 0, total = 0 }: Props) => {
  const progressValue = total ? 100 * (progress / total) : 0;
  return (
    <Card className="w-[240px] h-[240px] border-none bg-[#007BFF]">
      <CardBody className="justify-center items-center pb-0">
        <CircularProgress
          classNames={{
            svg: 'w-36 h-36 drop-shadow-md',
            indicator: 'stroke-white',
            track: 'stroke-white/10',
            value: 'text-3xl font-semibold text-white',
          }}
          value={progressValue}
          strokeWidth={4}
          showValueLabel={true}
        />
      </CardBody>
      <CardFooter className="justify-center items-center pt-0">
        <Chip
          classNames={{
            base: 'border-1 border-white/30',
            content: 'text-white/90 text-small font-semibold',
          }}
          variant="bordered"
        >
          {`${progress}/${total} BONDS`}
        </Chip>
      </CardFooter>
    </Card>
  );
};
