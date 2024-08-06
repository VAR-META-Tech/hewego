import type { ValidationArguments, ValidationOptions } from 'class-validator';
import { registerDecorator } from 'class-validator';
import { isAddress } from 'web3-validator';

export function IsAddress(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'IsAddress',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any) {
          return isAddress(value);
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} must be a valid wallet address`;
        },
      },
    });
  };
}
