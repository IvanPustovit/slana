import Head from "next/head";
import { connectToDatabase } from "../util/mongodb";
import Footer from "../components/Footer";
import HeaderApp from "../components/Header";
import ShopMain from "../components/ShopMain";

export default function Home({ cards }) {
  return (
    <>
      <Head></Head>
      <div>
        <HeaderApp />
        <ShopMain cards={cards} />
        <Footer />
      </div>
    </>
  );
}

export async function getServerSideProps() {
  const { db } = await connectToDatabase();
  const cards = await db.collection("itemshops").find({}).toArray();

  return {
    props: {
      cards: JSON.parse(JSON.stringify(cards)),
    },
  };
}
