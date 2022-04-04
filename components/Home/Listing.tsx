import React, { useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import cx from "classnames";
import { ListingInterface } from "../../types/Home/listing";

import styles from "./Listing.module.css";
import RangeIndicator from "../shared/RangeIndicator";

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
    id,
  } = listing;

  const handleAddToWatchlist = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    const res = await fetch(`/api/redis`, {
      method: "POST",
      body: `/coins/${encodeURIComponent(id)}`,
    });
    const data = await res.json();
  };

  return (
    <Link href={`/coins/${encodeURIComponent(id)}`} passHref>
      <div className={styles.container}>
        <span className={styles.mcRank}>
          #{market_cap_rank}
          <button onClick={(e) => handleAddToWatchlist(e)}>+</button>
        </span>
        <span
          className={cx(styles.pxChange, {
            [styles.negative]: price_change_percentage_24h < 0,
            [styles.positive]: price_change_percentage_24h > 0,
          })}
        >
          {(Math.round(price_change_percentage_24h * 100) / 100).toFixed(2)}%
        </span>
        <Image src={image?.large || image} alt={name} width={48} height={48} />
        <h2 className={styles.name}>{name}</h2>
        <p className={styles.currentPrice}>S${current_price}</p>
        <RangeIndicator current={current_price} low={low_24h} high={high_24h} />
      </div>
    </Link>
  );
};

export default Listing;
