import type { NextPage } from "next";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import React from "react";
import redis from "lib/redis";
import NavBar from "@/components/shared/NavBar";
import Listing from "@/components/Watchlist/Listing";
import NftListing from "@/components/Nft/NftListing";
import { CoinInterface } from "types/Coins/data";
import { NftInterface } from "types/Nft/nft";
import styles from "@/styles/Watchlist.module.css";

const Watchlist: NextPage = ({
  data,
  coins,
  nfts,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <NavBar />
        <section className={styles.listings}>
          <h2 className={styles.heading}>Coins</h2>
          {coins.map((coin: CoinInterface, i: number) => (
            <Listing listing={coin} key={i} />
          ))}
        </section>
        <section className={styles.listings}>
          <h2 className={styles.heading}>NFTs</h2>
          {nfts.map((nft: NftInterface, i: number) => (
            <NftListing nft={nft} key={i} source="watchlist" />
          ))}
        </section>
        <div />
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
