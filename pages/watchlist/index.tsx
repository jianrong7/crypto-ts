import type { NextPage } from "next";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import React, { useContext, useEffect } from "react";
import styles from "@/styles/Coin.module.css";
import redis from "lib/redis";
import Chart from "@/components/Coins/Chart";
import Overview from "@/components/Coins/Overview";
import NavBar from "@/components/shared/NavBar";
// import { ListingInterface } from "../types/Home/listing";

const Watchlist: NextPage = ({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <NavBar />
        <section>{data}</section>
      </main>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const ipRes = await fetch("http://ip.jsontest.com/", { mode: "cors" });
  const ipData = await ipRes.json();
  const ip = ipData.ip;
  const data = await redis.smembers(JSON.stringify(ip));
  console.log(data);
  return { props: { data } };
};

export default Watchlist;
