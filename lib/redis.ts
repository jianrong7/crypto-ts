import Redis from "ioredis";

const client = new Redis(process.env.REDIS_KEY as string);

export default client;
