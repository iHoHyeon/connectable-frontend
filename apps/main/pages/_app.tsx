import type { AppProps } from 'next/app';
import Head from 'next/head';

import Layout from '@components/Layout';

import '@styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Connectable - 디지털 티켓의 새로운 패러다임</title>
        <meta property="og:title" content="Connectable - 디지털 티켓의 새로운 패러다임" />
        <meta property="og:image" content="" />
        <meta name="description" content="" />
        <meta property="og:description" content="" />
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}
