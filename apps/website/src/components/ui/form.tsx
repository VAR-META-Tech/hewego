/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import { FCC } from '@/types';
import { cn } from '@/utils/common';
import type { ControllerProps, FieldPath, FieldValues, SubmitHandler, UseFormReturn } from 'react-hook-form';
import { Controller, FormProvider, useFormContext } from 'react-hook-form';

export interface FormWrapperProps<T extends FieldValues> {
  form: UseFormReturn<T, any>;
  onSubmit: SubmitHandler<T>;
  children?: React.ReactNode;
  formId?: string;
  className?: string;
}

const FormWrapper = <TFormValue extends FieldValues>({
  form,
  onSubmit,
  children,
  formId = 'form-submit-wrapper',
  className,
}: FormWrapperProps<TFormValue>) => {
  return (
    <FormProvider {...form}>
      <form
        noValidate
        className={className}
        id={formId}
        onSubmit={form.handleSubmit(onSubmit as SubmitHandler<TFormValue>)}
      >
        {children}
      </form>
    </FormProvider>
  );
};

type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  name: TName;
};

const FormFieldContext = React.createContext<FormFieldContextValue>({} as FormFieldContextValue);

const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  ...props
}: ControllerProps<TFieldValues, TName>) => {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  );
};

const useFormField = () => {
  const fieldContext = React.useContext(FormFieldContext);
  const itemContext = React.useContext(FormItemContext);
  const { getFieldState, formState } = useFormContext();

  const fieldState = getFieldState(fieldContext.name, formState);

  if (!fieldContext) {
    throw new Error('useFormField should be used within <FormField>');
  }

  const { id } = itemContext;

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  };
};

type FormItemContextValue = {
  id: string;
};

const FormItemContext = React.createContext<FormItemContextValue>({} as FormItemContextValue);

const FormItem: FCC = ({ children }) => {
  const id = React.useId();

  return <FormItemContext.Provider value={{ id }}>{children}</FormItemContext.Provider>;
};
FormItem.displayName = 'FormItem';

const FormControl = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ ...props }, ref) => {
  const { error, formItemId, formDescriptionId, formMessageId } = useFormField();

  return (
    <div
      ref={ref}
      id={formItemId}
      aria-describedby={!error ? `${formDescriptionId}` : `${formDescriptionId} ${formMessageId}`}
      aria-invalid={!!error}
      {...props}
    />
  );
});
FormControl.displayName = 'FormControl';

const FormDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => {
    const { formDescriptionId } = useFormField();

    return <p ref={ref} id={formDescriptionId} className={cn('text-sm text-muted-foreground', className)} {...props} />;
  }
);
FormDescription.displayName = 'FormDescription';

const FormMessage = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, children, ...props }, ref) => {
    const { error, formMessageId } = useFormField();
    const body = error ? String(error?.message) : children;

    if (!body) {
      return null;
    }

    return (
      <p ref={ref} id={formMessageId} className={cn('text-sm font-medium text-destructive', className)} {...props}>
        {body}
      </p>
    );
  }
);
FormMessage.displayName = 'FormMessage';

export { FormControl, FormDescription, FormField, FormItem, FormMessage, FormWrapper, useFormField };
