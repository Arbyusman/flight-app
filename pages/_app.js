import "../styles/globals.css";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title> TakeOff - Book Flight</title>
        <link
          rel="shortcut icon"
          type="image/png"
          sizes="128x128"
          href="images/logo.png"
        />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
