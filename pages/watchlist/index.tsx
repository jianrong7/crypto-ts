import type { NextPage } from "next";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import React, { useContext, useEffect } from "react";
import styles from "@/styles/Coin.module.css";
import redis from "lib/redis";
import Chart from "@/components/Coins/Chart";
import Overview from "@/components/Coins/Overview";
import NavBar from "@/components/shared/NavBar";
import Listing from "@/components/Home/Listing";
import NftListing from "@/components/Nft/NftListing";
// import { ListingInterface } from "../types/Home/listing";

const Watchlist: NextPage = ({
  data,
  coins,
  nfts,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  console.log(coins, nfts);
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <NavBar />
        <section>
          <h1>Coins</h1>
          {coins.map((coin, i) => (
            <Listing listing={coin} key={i} />
          ))}
        </section>
        <section>
          <h1>NFTs</h1>
          {nfts.map((nft, i) => (
            <NftListing nft={nft} key={i} />
          ))}
        </section>
      </main>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const ipRes = await fetch("http://ip.jsontest.com/", { mode: "cors" });
  const ipData = await ipRes.json();
  const ip = ipData.ip;
  const data = await redis.smembers(JSON.stringify(ip));

  const coinsUrls: string[] = [];
  data.forEach((coin: string) => {
    if (coin.includes("coins")) {
      coinsUrls.push(`https://api.coingecko.com/api/v3${coin}`);
    }
  });

  const nftsUrls: string[] = [];
  data.forEach((nft: string) => {
    if (nft.includes("nft")) {
      nftsUrls.push(
        `https://deep-index.moralis.io/api/v2${nft}?chain=eth&format=decimal`
      );
    }
  });

  const coins = await Promise.all(
    coinsUrls.map(async (url) => {
      const resp = await fetch(url);
      return resp.json();
    })
  );

  const nfts = await Promise.all(
    nftsUrls.map(async (url) => {
      const resp = await fetch(url, {
        headers: {
          Accept: "application/json",
          "X-Api-Key": process.env.NFT_API_KEY as string,
        },
      });
      return resp.json();
    })
  );

  return { props: { data, coins, nfts } };
};

export default Watchlist;
