import SiteLayout from "../layouts/SiteLayout";
import type { AppProps } from 'next/app'

import '@/styles/globals.css'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SiteLayout pageProps={pageProps}>
      <Component {...pageProps} />
    </SiteLayout>
  );
}
