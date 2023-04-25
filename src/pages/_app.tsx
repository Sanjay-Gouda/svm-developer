import { Windmill } from '@windmill/react-ui';
import { AppProps } from 'next/app';

import '@/styles/globals.css';

import { useInitDisplayPref } from '@/hooks/useDarkMode';

function MyApp({ Component, pageProps }: AppProps) {
  useInitDisplayPref();
  return (
    <Windmill>
      <Component {...pageProps} />
    </Windmill>
  );
}

export default MyApp;
