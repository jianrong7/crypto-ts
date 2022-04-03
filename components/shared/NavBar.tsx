import React from "react";
import Link from "next/link";

import styles from "./NavBar.module.css";

const NavBar: React.FC = () => {
  return (
    <header className={styles.container}>
      <Link passHref href="/">
        <h1 className={styles.main}>crypto-ts</h1>
      </Link>
      <nav className={styles.navContainer}>
        <ul className={styles.nav}>
          <Link passHref href="/">
            <li className={styles.link}>Coins</li>
          </Link>
          <Link passHref href="/nft">
            <li className={styles.link}>NFTs</li>
          </Link>
          <Link passHref href="/watchlist">
            <li className={styles.link}>Watchlist</li>
          </Link>
        </ul>
      </nav>
    </header>
  );
};

export default NavBar;
