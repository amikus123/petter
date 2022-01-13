import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import ScopedCssBaseline from '@mui/material/ScopedCssBaseline';
import { RecoilRoot } from "recoil";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
    <ScopedCssBaseline>
    <SessionProvider session={pageProps?.session}>
      <Component {...pageProps} />
    </SessionProvider>
    </ScopedCssBaseline>
    </RecoilRoot>
  );
}

export default MyApp;
