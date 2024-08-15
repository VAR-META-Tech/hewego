import React from 'react';
import { Button } from '@nextui-org/react';

import Note from '@/components/Note';
import { VStack } from '@/components/Utilities';

const IssueBondAction = () => {
  return (
    <VStack spacing={24}>
      <Note note="An issued bond can be canceled at any time" className="rounded-full py-4" />

      <Button type="submit" size="lg" radius="md" className="bg-primary-700 text-white text-lg">
        Create Bond
      </Button>
    </VStack>
  );
};

export default IssueBondAction;
