import type { AppProps } from "next/app";
import { AppStyle } from "../styled";

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <AppStyle />
      <Component {...pageProps} />
    </>
  );
}
export default App;
