import 'styles/globals.css';
import 'styles/common.css';

import type { AppProps } from 'next/app';
import Head from 'next/head';
import InitialWrap from 'partial/initialWrap';
import { wrapper } from 'data/store';
import { StatelessPage } from 'data/interface/common';


const App: StatelessPage<AppProps> = ({ Component, pageProps }: AppProps) => {

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover"
        />
        <meta httpEquiv="Cache-control" content="no-cache" />
        <title>Next template</title>
      </Head>
      <InitialWrap>
        <Component {...pageProps} />
      </InitialWrap>
    </>
  );
}

App.getInitialProps = async ({ Component, ctx }) => {
  const pageProps = {
    ...(Component.getInitialProps ? await Component.getInitialProps(ctx) : {}),
  };

  /** 
   * pageProps 組成
   * 若有使用 wrapper.getInitialPageProps 會多兩個欄位
   *  - initialProps (getInitialProps 回傳的值會變成包在裡面，必須把他提出來)
   *  - initialState (後端資料有值的話必須傳過去做 client 同步) 
   */
  return {
    pageProps: {
      ...pageProps,
      ...(pageProps?.initialProps || {}),
    },
  };
}

export default wrapper.withRedux(App);
