/* eslint-disable @typescript-eslint/no-explicit-any */
import { forwardRef, useState, type ElementRef } from 'react';
import { cn } from '@/utils/common';
import { Button } from '@nextui-org/react';

import { Calendar, type CalendarProps } from './calendar';
import { DateInput } from './date-input';

type DateValue = Date | undefined;

export interface DatePickerProps {
  calendarProps?: CalendarProps;
  className?: string;
  onChange?: (value: DateValue) => void;
  value?: DateValue;
  onCancel?: () => void;
}

const DatePicker = forwardRef<ElementRef<'div'>, DatePickerProps>((props, ref) => {
  const { value, onChange, calendarProps, className, onCancel, ...etc } = props;
  const [date, setDate] = useState<DateValue>(value ? new Date(new Date(value).setHours(0, 0, 0, 0)) : undefined);

  const handleApply = () => {
    onChange?.(date);
  };

  const resetValue = () => {
    setDate(typeof value === 'string' ? new Date(value) : value);
  };

  const handleCancel = () => {
    onCancel?.();
    resetValue();
  };

  const handleSetToday = () => {
    const preset = new Date();
    preset.setHours(0, 0, 0, 0);
    setDate(preset);
  };

  return (
    <div
      className={cn('bg-base-white relative flex w-fit flex-col rounded-xl text-gray-700 shadow-xl', className)}
      ref={ref}
      {...etc}
    >
      <div className="absolute left-0 top-16 w-full px-6">
        <div className="flex w-full gap-3">
          <DateInput single value={date} onChange={setDate} />
          <Button onClick={handleSetToday} className="min-w-[70px]" size="sm">
            Today
          </Button>
        </div>
      </div>

      <Calendar
        mode="single"
        selected={date as any}
        onSelect={((d: DateValue) => setDate(d)) as any}
        unstyled
        {...calendarProps}
        className={cn('px-6 py-5', calendarProps?.className)}
      />
      <div className="flex w-full gap-3 border-t border-gray-200 p-4">
        <Button fullWidth onClick={handleCancel}>
          Cancel
        </Button>
        <Button fullWidth onClick={handleApply}>
          Apply
        </Button>
      </div>
    </div>
  );
});

DatePicker.displayName = 'DatePicker';

export { DatePicker };
