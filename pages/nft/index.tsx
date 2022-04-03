import type { NextPage } from "next";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import InfiniteScroll from "react-infinite-scroll-component";
import { NftResponseInterface, NftInterface } from "types/Nft/nft";
import styles from "@/styles/Home.module.css";
import { useState } from "react";
import NavBar from "@/components/shared/NavBar";
import NftListing from "@/components/Nft/NftListing";

const NFTPage: NextPage = ({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [nfts, setNfts] = useState<NftInterface[]>(data.result);
  const [cursor, setCursor] = useState(data.cursor);
  const getMoreNfts = async () => {
    const res = await fetch(
      `https://deep-index.moralis.io/api/v2/nft/0xb47e3cd837dDF8e4c57F05d70Ab865de6e193BBB?chain=eth&format=decimal&limit=20&cursor=${cursor}`,
      {
        headers: {
          Accept: "application/json",
          "X-Api-Key":
            "Qi9VteLkYPF0GAwwiKzyy4idvefSdQjGKeFbUVXEtASZ5T73zEKfcdiFAqs6rrKG",
        },
      }
    );
    const newNfts: NftResponseInterface = await res.json();
    setNfts((nfts) => [...nfts, ...newNfts.result]);
    setCursor(newNfts.cursor);
  };

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <NavBar />
        <section>
          <InfiniteScroll
            className={styles.listings}
            dataLength={nfts.length}
            next={getMoreNfts}
            hasMore
            loader={<h3> Loading...</h3>}
          >
            {nfts.map((nft: NftInterface, i) => (
              <NftListing key={`${nft.token_id}_${i}_${nft.name}`} nft={nft} />
            ))}
          </InfiniteScroll>
        </section>
      </main>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const res = await fetch(
    "https://deep-index.moralis.io/api/v2/nft/0xb47e3cd837dDF8e4c57F05d70Ab865de6e193BBB?chain=eth&format=decimal&limit=20",
    {
      headers: {
        Accept: "application/json",
        "X-Api-Key": process.env.NFT_API_KEY as string,
      },
    }
  );
  const data: NftResponseInterface = await res.json();

  return { props: { data } };
};

export default NFTPage;
