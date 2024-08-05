import Head from 'next/head';

import '@shop/design-system/style.css';
import '../styles/globals.css';

import { Session } from 'inspector';
import React from 'react';
import type { AppProps } from 'next/app';
import { fontSans, fontSerif } from '@/assets/fonts';
import HederaWalletProvider from '@/context/HederaContext';
import { NextPageWithLayout } from '@/types';

import { siteConfig } from '@/config/site';
import MainLayout from '@/components/layouts/MainLayout';
import ModuleLayout from '@/components/layouts/ModuleLayout';
import { NextThemeProvider } from '@/components/NextThemeProvider';
import Provider from '@/components/Provider';

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
  session: Session;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page: React.ReactNode) => <MainLayout>{page}</MainLayout>);

  return (
    <>
      <Head>
        <title>{siteConfig.name}</title>
        <meta property="og:description" content={siteConfig.description} />
        <meta property="og:url" content={siteConfig.url} />
        <meta property="og:site_name" content={siteConfig.name} />
        <meta property="og:locale" content="en_US" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={`${siteConfig.ogImage}`} />
        <meta property="og:image:width" content="1024" />
        <meta property="og:image:height" content="576" />

        <meta name="twitter:site" content={`@${siteConfig.name}`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:creator" content="@fanchain" />
        <meta name="twitter:title" content={siteConfig.name} />
        <meta name="twitter:description" content={siteConfig.description} />
        <meta name="twitter:image" content={`${siteConfig.ogImage}`} />
        {/* <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" /> */}
      </Head>

      <style jsx global>{`
        html {
          --font-sans: ${fontSans.style.fontFamily};
          --font-serif: ${fontSerif.style.fontFamily};
        }
      `}</style>

      <div>
        <NextThemeProvider themeProps={{ attribute: 'class', forcedTheme: 'light', children: <></> }}>
          <ModuleLayout>
            <HederaWalletProvider>
              <Provider>{getLayout(<Component {...pageProps} />)}</Provider>
            </HederaWalletProvider>
          </ModuleLayout>
        </NextThemeProvider>
      </div>
    </>
  );
}
