import type { AppProps } from "next/app";

import "../styles/app.scss";
import { Header, Menu, PageTitleDesc } from "../components";
import Head from "next/head";

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <PageTitleDesc
        title="Elo Rating Brasil"
        description="Os times que jogaram a Série A de 2018 até hoje, classificados pelo sistema Elo."
      />
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Header />
      <Menu />
      <Component {...pageProps} />
    </>
  );
}
export default App;
