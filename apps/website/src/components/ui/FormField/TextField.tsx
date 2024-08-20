import React from 'react';
import { cn } from '@/utils/common';
import { Input, InputProps } from '@nextui-org/react';
import type { Control, FieldPath, FieldPathValue, FieldValues } from 'react-hook-form';

import { Show } from '@/components/Utilities';

import { FormControl, FormField, FormItem, FormMessage } from '../form';

export interface TextFieldProps<T extends FieldValues = FieldValues> extends InputProps {
  control: Control<T>;
  name: FieldPath<T>;
  defaultValue?: FieldPathValue<T, FieldPath<T>>;
  label?: string;
  inputLabel?: string;
  labelClassName?: string;
  required?: boolean;
  containerClassName?: string;
  requiredClassName?: string;
}

const TextField = <T extends FieldValues>({
  className,
  labelClassName,
  control,
  defaultValue,
  label,
  inputLabel,
  required,
  containerClassName,
  requiredClassName,
  ...props
}: TextFieldProps<T>) => {
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
              <Input {...field} {...props} className={className} label={inputLabel} />
              <FormMessage className="mt-1 text-xs" />
            </div>
          </FormControl>
        </FormItem>
      )}
    />
  );
};

export { TextField };
