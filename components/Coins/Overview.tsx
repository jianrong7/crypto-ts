import React from "react";
import Image from "next/image";
import cx from "classnames";
import { CoinInterface } from "types/Coins/data";

import RangeIndicator from "../shared/RangeIndicator";

import styles from "./Overview.module.css";

interface OverviewProps {
  data: CoinInterface;
}

const Overview: React.FC<OverviewProps> = ({ data }) => {
  console.log(data);
  const {
    id,
    image,
    name,
    coingecko_rank,
    coingecko_score,
    description,
    market_cap_rank,
    market_data,
  } = data;
  const {
    current_price,
    price_change_percentage_24h,
    market_cap,
    total_volume,
    circulating_supply,
    high_24h,
    low_24h,
  } = market_data;
  return (
    <section className={styles.container}>
      <div>
        <div className={styles.ranking}>
          <p>Rank: #{market_cap_rank}</p>
          <p className={styles.gecko}>CoinGecko Rank: #{coingecko_rank}</p>
          <p className={styles.gecko}>CoinGecko Score: {coingecko_score}</p>
        </div>
        <div className={styles.header}>
          <Image src={image.large} alt={name} height={72} width={72} />
          <h1>{name}</h1>
          <p className={styles.price}>S${current_price?.sgd}</p>
          <span
            className={cx({
              [styles.negative]: price_change_percentage_24h < 0,
              [styles.positive]: price_change_percentage_24h > 0,
            })}
          >
            {(Math.round(price_change_percentage_24h * 100) / 100).toFixed(2)}%
          </span>
        </div>
        <RangeIndicator
          current={current_price?.sgd}
          low={low_24h?.sgd}
          high={high_24h?.sgd}
        />
        <div className={styles.stats}>
          <p>Market Cap: {market_cap.sgd}</p>
          <p>Circulating Supply: {circulating_supply}</p>
          <p>Total Volume: {total_volume.sgd}</p>
        </div>
      </div>
      <div>
        <p
          className={styles.description}
          dangerouslySetInnerHTML={{ __html: description.en }}
        />
      </div>
    </section>
  );
};

export default Overview;
