import type { FC, PropsWithChildren, ReactElement, ReactNode } from 'react';
import type { NextPage } from 'next';

export type FCC<P = object> = FC<PropsWithChildren<P>>;

export type NextPageWithLayout<P = object, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

export interface ErrorMutate {
  code: number;
  error_code: string;
  message: string | string[];
  dynamic_data?: object;
}

export { ROUTE } from './routes';

export type ElementProps<ElementType extends React.ElementType, PropsToOmit extends string = never> = Omit<
  React.ComponentPropsWithoutRef<ElementType>,
  PropsToOmit
>;
