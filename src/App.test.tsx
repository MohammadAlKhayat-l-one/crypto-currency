import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

// Mock the cryptoApi service to avoid axios ES module issues
jest.mock('./services/cryptoApi', () => ({
  cryptoApi: {
    getAllCryptocurrencies: jest.fn().mockResolvedValue([
      {
        id: 'bitcoin',
        symbol: 'btc',
        name: 'Bitcoin',
        image: 'https://example.com/bitcoin.png',
        current_price: 50000,
        market_cap: 1000000000000,
        market_cap_rank: 1,
        price_change_percentage_24h: 2.5,
        total_volume: 50000000000,
        high_24h: 51000,
        low_24h: 49000,
      }
    ]),
    getPriceHistory: jest.fn().mockResolvedValue({
      prices: [[Date.now(), 50000]],
      market_caps: [[Date.now(), 1000000000000]],
      total_volumes: [[Date.now(), 50000000000]],
    }),
  },
}));

test('renders Cryptocurrency Dashboard title', () => {
  render(<App />);
  expect(screen.getByText(/Cryptocurrency Dashboard/i)).toBeInTheDocument();
});
