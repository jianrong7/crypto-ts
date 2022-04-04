import React from "react";
import Image from "next/image";
import Link from "next/link";
import { NftInterface } from "types/Nft/nft";

import styles from "./NftListing.module.css";

interface NftListingProps {
  nft: NftInterface;
}
const NftListing: React.FC<NftListingProps> = ({ nft }) => {
  const { metadata, name, token_id, token_address } = nft;
  const parsedMetadata = JSON.parse(metadata);

  const handleAddToWatchlist = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    const res = await fetch(`/api/redis`, {
      method: "POST",
      body: `/nft/${encodeURIComponent(token_address)}/${encodeURIComponent(
        token_id
      )}`,
    });
    const data = await res.json();
  };

  return (
    <Link
      href={`/nft/${encodeURIComponent(token_address)}/${encodeURIComponent(
        token_id
      )}`}
      passHref
    >
      <div className={styles.container}>
        <span className={styles.mcRank}>
          #{token_id}
          <button onClick={(e) => handleAddToWatchlist(e)}>+</button>
        </span>
        <span className={styles.pxChange}>{parsedMetadata.description}</span>
        <Image src={parsedMetadata?.image} alt={name} width={60} height={60} />
        <h2 className={styles.name}>{name}</h2>
        {parsedMetadata?.attributes.map((attr: string) => (
          <p key={`${token_id}_${attr}`}>{attr}</p>
        ))}
      </div>
    </Link>
  );
};

export default NftListing;
