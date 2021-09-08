import React from "react";
import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap"
          />
          <meta name="twitter:card" content="summary" />
          <meta name="twitter:creator" content="@glauber_holanda" />
          <meta
            property="og:url"
            content="https://elo-rating-brasil.vercel.app/"
          />
          <meta property="og:title" content="Elo Rating Brasil" />
          <meta
            property="og:description"
            content="Classificação dos times que jogaram a Série A do Brasileiro, desde 2018, com base no sistema Elo."
          />
          <meta
            property="og:image"
            content="https://elo-rating-brasil.vercel.app/images/BR.png"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
