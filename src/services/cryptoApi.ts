import axios from 'axios';
import { CryptoCurrency, PriceHistory } from '../types/crypto';

const COINGECKO_API_BASE_URL = 'https://api.coingecko.com/api/v3';

export class CryptoApiService {
  private static instance: CryptoApiService;
  private cache: Map<string, { data: any; timestamp: number }> = new Map();
  private readonly CACHE_DURATION = 60000; // 1 minute cache

  private constructor() {}

  public static getInstance(): CryptoApiService {
    if (!CryptoApiService.instance) {
      CryptoApiService.instance = new CryptoApiService();
    }
    return CryptoApiService.instance;
  }

  private isCacheValid(key: string): boolean {
    const cached = this.cache.get(key);
    if (!cached) return false;
    return Date.now() - cached.timestamp < this.CACHE_DURATION;
  }

  private async makeRequest<T>(endpoint: string): Promise<T> {
    const cacheKey = endpoint;
    
    if (this.isCacheValid(cacheKey)) {
      return this.cache.get(cacheKey)!.data;
    }

    try {
      const response = await axios.get<T>(`${COINGECKO_API_BASE_URL}${endpoint}`);
      this.cache.set(cacheKey, { data: response.data, timestamp: Date.now() });
      return response.data;
    } catch (error) {
      console.error('API request failed:', error);
      throw new Error('Failed to fetch cryptocurrency data');
    }
  }

  async getTopCryptocurrencies(limit: number = 5, currency: string = 'usd'): Promise<CryptoCurrency[]> {
    const endpoint = `/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=${limit}&page=1&sparkline=false`;
    return this.makeRequest<CryptoCurrency[]>(endpoint);
  }

  async getPriceHistory(
    coinId: string, 
    currency: string = 'usd', 
    days: number = 7
  ): Promise<PriceHistory> {
    const endpoint = `/coins/${coinId}/market_chart?vs_currency=${currency}&days=${days}`;
    return this.makeRequest<PriceHistory>(endpoint);
  }

  async getAllCryptocurrencies(currency: string = 'usd'): Promise<CryptoCurrency[]> {
    const endpoint = `/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=100&page=1&sparkline=false`;
    return this.makeRequest<CryptoCurrency[]>(endpoint);
  }
}

export const cryptoApi = CryptoApiService.getInstance(); 