import { Windmill } from '@windmill/react-ui';
import { AppProps } from 'next/app';

import '@/styles/globals.css';

import { useInitDisplayPref } from '@/hooks/useDarkMode';
import { Provider } from 'react-redux';
import { store } from '@/store';

function MyApp({ Component, pageProps }: AppProps) {
  useInitDisplayPref();
  return (
    <Provider store={store}>
      <Windmill>
        <Component {...pageProps} />
      </Windmill>
    </Provider>
  );
}

export default MyApp;
