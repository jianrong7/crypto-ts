import type { NextPage } from "next";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "@/styles/Coin.module.css";
import Chart from "@/components/Coins/Chart";
import Overview from "@/components/Coins/Overview";
import NavBar from "@/components/shared/NavBar";
// import { ListingInterface } from "../types/Home/listing";

const Nft: NextPage = () =>
  //   {
  //   data,
  //   chartData,
  // }: InferGetServerSidePropsType<typeof getServerSideProps>
  {
    // console.log(data, chartData);
    return (
      <div className={styles.container}>
        <main className={styles.main}>
          <NavBar />
          <p>hello world</p>
          {/* <Overview data={data} />
        <section className={styles.chartSection}>
          <Chart coinName={data?.name} data={chartData} />
  </section> */}
        </main>
      </div>
    );
  };

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { address, id } = context?.params;

  // const [res, chartRes] = await Promise.all([
  //   fetch(`https://api.coingecko.com/api/v3/coins/${coin}`),
  //   fetch(
  //     `https://api.coingecko.com/api/v3/coins/${coin}/market_chart?vs_currency=sgd&days=90&interval=daily`
  //   ),
  // ]);
  // const [data, chartData] = await Promise.all([res.json(), chartRes.json()]);
  console.log(address, id);
  return { props: { address, id } };
};

export default Nft;
