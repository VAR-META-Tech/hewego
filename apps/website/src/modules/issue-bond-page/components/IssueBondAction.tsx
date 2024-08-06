import React from 'react';
import { Button } from '@nextui-org/button';

import Note from '@/components/Note';
import { VStack } from '@/components/Utilities';

const IssueBondAction = () => {
  return (
    <VStack spacing={24}>
      <Note
        note="An issued bond cannot be cancelled for 7 days."
        className="bg-[#565E6C] text-white rounded-full py-4"
      />

      <Button type="submit" size="lg" className="bg-primary-900 text-white text-lg">
        Create Bond
      </Button>
    </VStack>
  );
};

export default IssueBondAction;
