import Head from "next/head";
import { MyContextProvider } from "../helpers/context";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Slana-вишивка</title>

        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css"
        />
      </Head>
      <MyContextProvider>
        <div className="root">
          <Component {...pageProps} />
        </div>
      </MyContextProvider>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>
    </>
  );
}

export default MyApp;
