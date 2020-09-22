import Head from "next/head";
import Link from "next/link";
import Footer from "../components/Footer";
import HeaderApp from "../components/Header";
import ShopMain from "../components/ShopMain";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <>
      <Head>
        <title>Slana-вишивка</title>

        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"
        />
      </Head>
      <div>
        <HeaderApp />
        <ShopMain />
        <Footer />
      </div>
    </>
  );
}
