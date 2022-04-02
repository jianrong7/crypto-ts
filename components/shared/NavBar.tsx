import React from "react";
import Link from "next/link";

import styles from "./NavBar.module.css";

const NavBar: React.FC = () => {
  return (
    <header className={styles.container}>
      <h1>
        <Link href="/">crypto-ts</Link>
      </h1>
      <nav>
        <ul className={styles.nav}>
          <li>
            <Link href="/">Coins</Link>
          </li>
          <li>
            <Link href="/nft">NFTs</Link>
          </li>
          <li>
            <Link href="/watchlist">Watchlist</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default NavBar;
