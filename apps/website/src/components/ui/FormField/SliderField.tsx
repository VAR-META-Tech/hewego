import { cn } from '@/utils/common';
import { Input, Slider, SliderProps } from '@nextui-org/react';
import type { Control, FieldPath, FieldPathValue, FieldValues } from 'react-hook-form';

import { Show } from '@/components/Utilities';

import { FormControl, FormField, FormItem, FormMessage } from '../form';

export interface ISliderProps<T extends FieldValues = FieldValues> extends SliderProps {
  control: Control<T>;
  name: FieldPath<T>;
  defaultValue?: FieldPathValue<T, FieldPath<T>>;
  label?: string;
  labelClassName?: string;
  required?: boolean;
  containerClassName?: string;
  requiredClassName?: string;
}

const SliderField = <T extends FieldValues>({
  className,
  labelClassName,
  control,
  defaultValue,
  label,
  required,
  containerClassName,
  requiredClassName,
  size = 'lg',
  ...props
}: ISliderProps<T>) => {
  return (
    <FormField
      defaultValue={defaultValue}
      control={control}
      name={props.name}
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <div className={cn(containerClassName)}>
              <Show when={!!label}>
                <label className={cn('text-lg font-medium', labelClassName)}>
                  {label} {required && <span className={cn('text-red-500', requiredClassName)}>*</span>}
                </label>
              </Show>
              <div className="space-y-2">
                <Input
                  disabled
                  value={`${field.value ?? 0}%`}
                  size={size}
                  classNames={{
                    input: 'text-lg font-medium',
                    inputWrapper: 'bg-white h-16 shadow-md',
                  }}
                />
                <Slider
                  {...field}
                  {...props}
                  className={className}
                  classNames={{
                    thumb: 'bg-primary-700',
                    filler: 'bg-primary-700',
                    track: 'border-s-primary-700',
                  }}
                  color="primary"
                  size={size}
                />
              </div>
              <FormMessage className="mt-1 text-xs" />
            </div>
          </FormControl>
        </FormItem>
      )}
    />
  );
};

export { SliderField };
