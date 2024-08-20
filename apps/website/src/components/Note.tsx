import React from 'react';
import { Icons } from '@/assets/icons';
import { cn } from '@/utils/common';

import { HStack } from './Utilities';

interface NoteProps extends React.HTMLAttributes<HTMLDivElement> {
  note?: React.ReactNode | string;
  noteClassName?: string;
}

const Note = React.forwardRef<HTMLDivElement, NoteProps>(({ className = '', note, noteClassName, ...props }, ref) => {
  const renderNote = React.useMemo(() => {
    if (typeof note === 'string') {
      return (
        <HStack ref={ref} spacing={8} className={cn('bg-primary-50 rounded-md px-4 py-1', className)} {...props}>
          <Icons.circleAlert size={12} color="#8259EF" />

          <p className={cn('flex-1 text-sm text-primary-500 text-justify', noteClassName)}>{note}</p>
        </HStack>
      );
    }

    return note;
  }, [className, note, noteClassName, props, ref]);

  return renderNote;
});

Note.displayName = 'Note';

export default React.memo(Note);
