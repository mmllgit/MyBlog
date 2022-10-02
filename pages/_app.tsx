import type { AppProps } from "next/app";
import Head from "next/head";
import { Layout } from "components";
import "@/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Head>
        <title>邓先阆的博客</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
