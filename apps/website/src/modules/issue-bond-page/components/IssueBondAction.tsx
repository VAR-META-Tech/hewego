import { Button } from '@nextui-org/react';

import { VStack } from '@/components/Utilities';

const IssueBondAction = () => {
  return (
    <VStack spacing={24}>
      <Button type="submit" size="lg" radius="full" className="h-16 bg-primary-700 text-white text-lg">
        Create Bond
      </Button>
    </VStack>
  );
};

export default IssueBondAction;
