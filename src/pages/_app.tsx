import { Windmill } from '@windmill/react-ui';
import { AppProps } from 'next/app';
import Router from 'next/router';
import NProgress from 'nprogress';
import { useState } from 'react';
// import NextNprogress from 'nextjs-progressbar';
import { Provider } from 'react-redux';

import '@/styles/globals.css';
import 'nprogress/nprogress.css';

import { useInitDisplayPref } from '@/hooks/useDarkMode';

import { store } from '@/store';

import Loading from '@/pages/loading';

function MyApp({ Component, pageProps }: AppProps) {
  useInitDisplayPref();
  const [loader, setLoader] = useState(false);

  Router.events.on('routeChangeStart', (url) => {
    console.log(`Loading: ${url}`);
    setLoader(true);
    NProgress.start();
  });

  Router.events.on('routeChangeComplete', () => {
    NProgress.done();
    setLoader(false);
  });
  Router.events.on('routeChangeError', () => NProgress.done());

  return (
    <Provider store={store}>
      <Windmill>{loader ? <Loading /> : <Component {...pageProps} />}</Windmill>
    </Provider>
  );
}

export default MyApp;
