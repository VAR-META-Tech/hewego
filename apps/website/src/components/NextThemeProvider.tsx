import * as React from 'react';
import { useRouter } from 'next/navigation';
import { NextUIProvider } from '@nextui-org/system';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { type ThemeProviderProps } from 'next-themes/dist/types';

export interface NextThemeProviderProps {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
}

export function NextThemeProvider({ children, themeProps }: NextThemeProviderProps) {
  const router = useRouter();

  return (
    <NextUIProvider navigate={router.push}>
      <NextThemesProvider {...themeProps}>{children}</NextThemesProvider>
    </NextUIProvider>
  );
}
