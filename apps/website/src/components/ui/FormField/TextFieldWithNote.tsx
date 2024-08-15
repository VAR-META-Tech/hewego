/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Icons } from '@/assets/icons';
import { cn } from '@/utils/common';

import { HStack, Show, VStack } from '@/components/Utilities';

import { TextField, TextFieldProps } from './TextField';

interface TextFieldWithNoteProps extends TextFieldProps<any> {
  note?: React.ReactNode | string;
  noteClassName?: string;
}

const TextFieldWithNote: React.FC<TextFieldWithNoteProps> = ({ note, noteClassName, ...props }) => {
  const renderNote = React.useMemo(() => {
    if (typeof note === 'string') {
      return (
        <HStack spacing={8} className="bg-primary-50 rounded-md px-4 py-1">
          <Icons.circleAlert size={12} color="#8259EF" />

          <p className={cn('flex-1 text-sm text-primary-500 text-justify', noteClassName)}>{note}</p>
        </HStack>
      );
    }

    return note;
  }, [note, noteClassName]);

  return (
    <VStack spacing={4}>
      <TextField {...props} />

      <Show when={!!note}>{renderNote}</Show>
    </VStack>
  );
};

export default TextFieldWithNote;
