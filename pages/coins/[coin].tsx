import type { NextPage } from "next";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "@/styles/Coin.module.css";
import Chart from "@/components/Coins/Chart";
import Overview from "@/components/Coins/Overview";
// import { ListingInterface } from "../types/Home/listing";

const Coin: NextPage = ({
  data,
  chartData,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  // console.log(data, chartData);
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <Overview data={data} />
        <section>
          <Chart coinName={data?.name} data={chartData} />
        </section>
      </main>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { coin } = context?.params as { coin: string };

  const [res, chartRes] = await Promise.all([
    fetch(`https://api.coingecko.com/api/v3/coins/${coin}`),
    fetch(
      `https://api.coingecko.com/api/v3/coins/${coin}/market_chart?vs_currency=sgd&days=90&interval=daily`
    ),
  ]);
  const [data, chartData] = await Promise.all([res.json(), chartRes.json()]);

  return { props: { data, chartData } };
};

export default Coin;