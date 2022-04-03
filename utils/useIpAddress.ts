import { useState, useEffect } from "react";

const useIpAddress = () => {
  const [ip, setIp] = useState(null);

  const fetchFromApi = async () => {
    const res = await fetch("http://ip.jsontest.com/", { mode: "cors" });
    const data = await res.json();
    setIp(data?.ip);
  };
  useEffect(() => {
    fetchFromApi();
  }, []);

  return ip;
};

export default useIpAddress;
