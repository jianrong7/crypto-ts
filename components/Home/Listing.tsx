import React from "react";
import Image from "next/image";
import cx from "classnames";
import { ListingInterface } from "../../types/Home/listing";

import styles from "./Listing.module.css";

interface ListingProps {
  listing: ListingInterface;
}
const Listing: React.FC<ListingProps> = ({ listing }) => {
  const {
    high_24h,
    image,
    market_cap_rank,
    price_change_percentage_24h,
    name,
    current_price,
    low_24h,
  } = listing;

  return (
    <div className={styles.container}>
      <span className={styles.mcRank}>
        #{market_cap_rank}
        <p>+</p>
      </span>
      <span
        className={cx(styles.pxChange, {
          [styles.negative]: price_change_percentage_24h < 0,
          [styles.positive]: price_change_percentage_24h > 0,
        })}
      >
        {(Math.round(price_change_percentage_24h * 100) / 100).toFixed(2)}%
      </span>
      <Image src={image} alt={name} width={48} height={48} />
      <h2 className={styles.name}>{name}</h2>
      <p className={styles.currentPrice}>S${current_price}</p>

      <div className={styles.dayRangeBar}>
        <div
          className={styles.indicator}
          style={{
            marginLeft: `${
              ((current_price - low_24h) / (high_24h - low_24h)) * 100
            }%`,
          }}
        ></div>
      </div>
      <div className={styles.dayRange}>
        <span>{low_24h}</span>
        <p>24h Range</p>
        <span>{high_24h}</span>
      </div>
    </div>
  );
};

export default Listing;
