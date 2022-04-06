import React from "react";
import Image from "next/image";
import Link from "next/link";
import cx from "classnames";
import { CoinInterface } from "types/Coins/data";

import styles from "./Listing.module.css";
import RangeIndicator from "../shared/RangeIndicator";

interface ListingProps {
  listing: CoinInterface;
}
const Listing: React.FC<ListingProps> = ({ listing }) => {
  const { image, market_cap_rank, name, market_data, id } = listing;
  const { high_24h, low_24h, price_change_percentage_24h, current_price } =
    market_data;

  return (
    <Link href={`/coins/${encodeURIComponent(id)}`} passHref>
      <div className={styles.container}>
        <span className={styles.mcRank}>#{market_cap_rank}</span>
        <span
          className={cx(styles.pxChange, {
            [styles.negative]: price_change_percentage_24h < 0,
            [styles.positive]: price_change_percentage_24h > 0,
          })}
        >
          {(Math.round(price_change_percentage_24h * 100) / 100).toFixed(2)}%
        </span>
        <Image src={image?.large} alt={name} width={48} height={48} />
        <h2 className={styles.name}>{name}</h2>
        <p className={styles.currentPrice}>S${current_price.sgd}</p>
        <RangeIndicator
          current={current_price.sgd}
          low={low_24h.sgd}
          high={high_24h.sgd}
        />
      </div>
    </Link>
  );
};

export default Listing;
