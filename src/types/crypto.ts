export interface CryptoCurrency {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  price_change_percentage_24h: number;
  total_volume: number;
  high_24h: number;
  low_24h: number;
}

export interface PriceHistory {
  prices: [number, number][];
  market_caps: [number, number][];
  total_volumes: [number, number][];
}

export interface UserPreferences {
  selectedCoins: string[];
  selectedCoin: string;
  currency: 'usd' | 'eur' | 'gbp';
  timeRange: '24h' | '7d' | '30d';
  theme: 'light' | 'dark';
}

export interface ChartDataPoint {
  date: string;
  price: number;
} 