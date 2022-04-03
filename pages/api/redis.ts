// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import redis from "../../lib/redis";

type Data = {
  watchlist: string[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const ipRes = await fetch("http://ip.jsontest.com/", { mode: "cors" });
  const ipData = await ipRes.json();
  const ip = ipData.ip;
  const data = await redis.smembers(JSON.stringify(ip));

  if (req.method === "POST") {
    await redis.sadd(JSON.stringify(ip), req.body);
    const newData = await redis.smembers(JSON.stringify(ip));
    // console.log(newData);
    res.json({ watchlist: newData });
  } else {
    res.json({ watchlist: data });
  }
}
