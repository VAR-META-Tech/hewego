import React from 'react';
import { useRouter } from 'next/navigation';
import { Icons } from '@/assets/icons';
import { ROUTE } from '@/types';
import { cn } from '@/utils/common';

interface Props extends React.HTMLAttributes<HTMLButtonElement> {
  title: string;
}

const Back = React.forwardRef<HTMLButtonElement, Props>(({ title, className, ...props }, ref) => {
  const router = useRouter();

  return (
    <button onClick={() => router.push(ROUTE.HOME)} ref={ref} {...props} className={cn('flex gap-2', className)}>
      <Icons.arrowLeft className="text-primary-700" />

      <span className="text-primary-700 text-xl">{title}</span>
    </button>
  );
});

Back.displayName = 'Back';

export default React.memo(Back);
