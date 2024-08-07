import React from 'react';
import { cn } from '@/utils/common';
import { Select, SelectItem, SelectProps } from '@nextui-org/react';
import { type LucideIcon } from 'lucide-react';
import type { Control, FieldPath, FieldPathValue, FieldValues } from 'react-hook-form';

import { Show } from '@/components/Utilities';

import { FormControl, FormField, FormItem, FormMessage } from '../form';

interface IData {
  label: string | JSX.Element | React.ReactNode;
  value: string;
  image?: string;
  group?: string;
}

interface Props<T extends FieldValues = FieldValues> extends Omit<SelectProps, 'children'> {
  control: Control<T>;
  name: FieldPath<T>;
  defaultValue?: FieldPathValue<T, FieldPath<T>>;
  label?: React.ReactNode;
  placeholder?: string;
  required?: boolean;
  fullWidth?: boolean;
  labelClassName?: string;
  data: IData[];
  iconClassName?: string;
  arrowIcon?: LucideIcon;
  requiredClassName?: string;
  imageContainerClassName?: string;
  imageClassName?: string;
  imageLabelClassName?: string;
}

const SelectField = <T extends FieldValues>({
  name,
  defaultValue,
  control,
  label,
  required,
  data,
  fullWidth,
  labelClassName,
  placeholder = 'Please select',
  requiredClassName,
  ...props
}: Props<T>) => {
  return (
    <FormField
      defaultValue={defaultValue}
      control={control}
      name={name}
      render={({ field }) => {
        return (
          <div className={cn('relative', fullWidth ? 'w-full' : '')}>
            <FormItem>
              <FormControl>
                <div>
                  <Show when={!!label}>
                    <label className={cn('text-lg font-medium', labelClassName)}>
                      {label} {required && <span className={cn('text-red-500', requiredClassName)}>*</span>}
                    </label>
                  </Show>
                  <Select
                    {...props}
                    {...field}
                    placeholder={placeholder}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => field.onChange(e.target.value)}
                    selectedKeys={[field.value]}
                    disabled={props.disabled}
                    className={cn('placeholder:text-red-700', props.className)}
                  >
                    {data?.map((x) => <SelectItem key={x.value}>{x.label}</SelectItem>)}
                  </Select>
                </div>
              </FormControl>

              <FormMessage className="mt-1 text-xs" />
            </FormItem>
          </div>
        );
      }}
    />
  );
};

export { SelectField };
