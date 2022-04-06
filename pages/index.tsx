import type { NextPage } from "next";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Head from "next/head";
import Image from "next/image";
import InfiniteScroll from "react-infinite-scroll-component";
import Listing from "@/components/Home/Listing";
import styles from "@/styles/Home.module.css";
import { ListingInterface } from "../types/Home/listing";
import { useState } from "react";
import NavBar from "@/components/shared/NavBar";

const Home: NextPage = ({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [coins, setExtraData] = useState<ListingInterface[]>(data);
  const [page, setPage] = useState(1);

  const getMoreCoins = async () => {
    const res = await fetch(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=sgd&order=market_cap_desc&per_page=20&page=${
        page + 1
      }&sparkline=false`
    );
    const newCoins = await res.json();
    setExtraData((coins) => [...coins, ...newCoins]);
    setPage((page) => page + 1);
  };

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <NavBar />
        <section>
          <InfiniteScroll
            className={styles.listings}
            dataLength={coins.length}
            next={getMoreCoins}
            hasMore
            loader={<h3> Loading...</h3>}
          >
            {coins.map((listing: ListingInterface) => (
              <Listing key={listing.id} listing={listing} />
            ))}
          </InfiniteScroll>
        </section>
        <div />
      </main>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const res = await fetch(
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=sgd&order=market_cap_desc&per_page=20&page=1&sparkline=false"
  );
  const data = await res.json();

  return { props: { data } };
};

export default Home;
