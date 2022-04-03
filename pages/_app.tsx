import "../styles/globals.css";
import type { AppProps } from "next/app";
import useIpAddress from "utils/useIpAddress";
import IpContext from "@/components/IpContext";
import React from "react";

function MyApp({ Component, pageProps }: AppProps) {
  const ip = useIpAddress();

  return (
    <IpContext.Provider value={ip}>
      <Component {...pageProps} />
    </IpContext.Provider>
  );
}

export default MyApp;
