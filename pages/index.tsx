import type { NextPage } from "next";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Head from "next/head";
import Image from "next/image";
import Listing from "@/components/Home/Listing";
import styles from "@/styles/Home.module.css";
import { ListingInterface } from "../types/Home/listing";

const Home: NextPage = ({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <section className={styles.listings}>
          {data.map((listing: ListingInterface) => (
            <Listing key={listing.id} listing={listing} />
          ))}
        </section>
      </main>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const res = await fetch(
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=sgd&order=market_cap_desc&per_page=50&page=1&sparkline=false"
  );
  const data = await res.json();

  return { props: { data } };
};

export default Home;
