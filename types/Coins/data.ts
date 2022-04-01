export interface CoinInterface {
  coingecko_rank: number;
  coingecko_score: number;
  description: { en: string };
  id: string;
  image: { thumb: string; small: string; large: string };
  last_updated: Date;
  market_cap_rank: number;
  market_data: {
    current_price: { sgd: number };
    price_change_percentage_24h: number;
    market_cap: { sgd: number };
    total_volume: { sgd: number };
    circulating_supply: number;
    high_24h: { sgd: number };
    low_24h: { sgd: number };
  };
  name: string;
}
