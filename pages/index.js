import Head from "next/head";
import Footer from "../components/Footer";
import Header from "../components/Header";
import ShopMain from "../components/ShopMain";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <>
      <Head>
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"
        ></link>
      </Head>
      <div className="container">
        <Header />
        <ShopMain />
        <Footer />
      </div>
    </>
  );
}
