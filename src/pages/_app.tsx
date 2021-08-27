import type { AppProps } from "next/app";
import Head from "next/head";

import "../styles/app.scss";
import { Header, Menu } from "../components";

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Elo Rating Brasil</title>
        <meta name="description" content="Elo Rating Brasil" />
        <link rel="icon" href="/images/BR.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Header />
      <Menu />
      <Component {...pageProps} />
    </>
  );
}
export default App;
