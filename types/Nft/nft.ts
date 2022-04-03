export interface NftResponseInterface {
  cursor: string;
  page: number;
  page_size: number;
  result: NftInterface[];
}

export interface NftInterface {
  amount: string;
  contract_type: string;
  metadata: string;
  name: string;
  symbol: string;
  synced_at: string;
  token_address: string;
  token_id: string;
  token_uri: string;
}
