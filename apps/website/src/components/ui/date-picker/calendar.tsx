import { type ComponentProps } from 'react';
import { cn } from '@/utils/common';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { DayPicker } from 'react-day-picker';

import { isPastDate } from './date-utils';

export type CalendarProps = ComponentProps<typeof DayPicker> & {
  disablePast?: boolean;
  unstyled?: boolean;
};

function Calendar({
  className,
  unstyled = false,
  classNames,
  showOutsideDays = true,
  disablePast,
  mode = 'single',
  components,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn(
        {
          'text-black border-dark-stroke w-fit rounded-xl border px-6 py-5 shadow-xl': !unstyled,
        },
        className
      )}
      classNames={{
        months: cn('flex flex-col sm:flex-row space-y-4 sm:space-y-0', {
          'divide-x divide-dark-stroke': mode === 'range',
        }),
        month: cn('space-y-4', {
          'py-5 px-6': mode === 'range',
        }),
        caption: 'flex justify-center pt-1 relative items-center text-black',
        caption_label: 'text-md font-semibold',
        nav: 'space-x-1 flex items-center',
        nav_button: cn('h-9 w-9 bg-transparent p-0 aspect-square'),
        // nav_button: cn(buttonVariants({ variant: 'tertiary-gray' }), 'h-9 w-9 bg-transparent p-0 aspect-square'),
        nav_button_previous: 'absolute left-0',
        nav_button_next: 'absolute right-0',
        table: 'w-full border-collapse space-y-1 bg-background',
        head_row: 'flex',
        head_cell: 'h-10 w-10 p-0 text-center rounded-full font-medium text-sm flex items-center justify-center',
        row: 'flex w-full mt-1 rounded-full overflow-hidden',
        cell: cn(
          'text-center rounded-full text-sm p-0 relative focus-within:relative focus-within:z-20 ',
          '[&:has([aria-selected])]:bg-gray-50 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md'
        ),
        day: cn('h-10 w-10 p-0 rounded-full font-normal aria-selected:opacity-100 text-black hover:bg-primary-800'),
        day_selected:
          'bg-primary-800 text-white rounded-full hover:bg-primary-800 focus:bg-primary-800 hover:text-white',
        day_today: cn('bg-dark-gray rounded-full ', {
          'aria-selected:bg-primary-800': mode !== 'range',
        }),
        day_outside: 'text-gray-500 opacity-40',
        day_disabled: 'text-gray-500 opacity-40',
        day_range_middle: 'aria-selected:bg-primary-800 rounded-none aria-selected:text-white ',
        day_hidden: 'invisible',
        day_range_end: '!bg-primary-800',
        day_range_start: '!bg-primary-800',
        ...classNames,
      }}
      disabled={disablePast ? isPastDate : props.disabled}
      components={{
        IconLeft: () => <ChevronLeftIcon className="h-5 w-5" />,
        IconRight: () => <ChevronRightIcon className="h-5 w-5" />,
        ...components,
      }}
      mode={'single'}
      // {...props}
    />
  );
}
Calendar.displayName = 'Calendar';

export { Calendar };
