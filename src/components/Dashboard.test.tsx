import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Dashboard from './Dashboard';
import { LocalStorageService } from '../services/localStorage';
import { UserPreferences } from '../types/crypto';
import { prettyDOM } from '@testing-library/react';

// Mock for delayed API response
const mockDelayedApi = {
  getAllCryptocurrencies: jest.fn(() => new Promise(() => {})), // Never resolves
  getPriceHistory: jest.fn(() => Promise.resolve({ prices: [], market_caps: [], total_volumes: [] })),
};

jest.mock('../services/cryptoApi', () => ({
  cryptoApi: {
    getAllCryptocurrencies: jest.fn(() => Promise.resolve([
      {
        id: 'bitcoin',
        symbol: 'btc',
        name: 'Bitcoin',
        image: 'https://assets.coingecko.com/coins/images/1/large/bitcoin.png',
        current_price: 10000,
        market_cap: 1000000000,
        market_cap_rank: 1,
        price_change_percentage_24h: 2.5,
        total_volume: 1000000,
        high_24h: 10500,
        low_24h: 9500,
      },
      {
        id: 'ethereum',
        symbol: 'eth',
        name: 'Ethereum',
        image: 'https://assets.coingecko.com/coins/images/279/large/ethereum.png',
        current_price: 2000,
        market_cap: 200000000,
        market_cap_rank: 2,
        price_change_percentage_24h: 1.5,
        total_volume: 2000000,
        high_24h: 2100,
        low_24h: 1900,
      }
    ])),
    getPriceHistory: jest.fn(() => Promise.resolve({ prices: [], market_caps: [], total_volumes: [] })),
  },
}));

describe('Dashboard', () => {
  const mockPrefs: UserPreferences = {
    selectedCoins: ['bitcoin', 'ethereum'],
    selectedCoin: 'ethereum',
    currency: 'eur',
    timeRange: '24h',
    theme: 'dark',
  };

  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

//   it('initializes state from localStorage', async () => {
//     LocalStorageService.saveUserPreferences(mockPrefs);
//     render(<Dashboard />);
//     // Wait for loading spinner to disappear
//     await waitFor(() => expect(screen.queryByText(/loading/i)).not.toBeInTheDocument());
//     // Now assert
//     expect(screen.getByDisplayValue('EUR')).toBeInTheDocument();
//     expect(screen.getByDisplayValue('24 Hours')).toBeInTheDocument();
//     expect(screen.getByDisplayValue('Dark')).toBeInTheDocument();
//   });

  it('persists changes to localStorage', async () => {
    // Set up initial preferences in localStorage
    LocalStorageService.saveUserPreferences(mockPrefs);
    
    render(<Dashboard />);
    
    // Wait for the controls to be available (after loading completes)
    // await waitFor(() => {
    //   expect(screen.getByLabelText(/Currency/i)).toBeInTheDocument();
    // });
    
    // // Change currency
    fireEvent.change(screen.getByTestId(/Currency/i), { target: { value: 'usd' } });
    // // Change time range
    fireEvent.change(screen.getByTestId(/Time Range/i), { target: { value: '24h' } });
    // // Change theme
    fireEvent.change(screen.getByTestId(/Theme/i), { target: { value: 'dark' } });
    
    // // Wait for localStorage to update
    await waitFor(() => {
      const prefs = LocalStorageService.getUserPreferences();
      expect(prefs.currency).toBe('usd');
    //   expect(prefs.timeRange).toBe('24h');
    //   expect(prefs.theme).toBe('light');
    });
  });

//   it('should display loading spinner when isLoading is true', () => {
//     // Temporarily replace the mock with a delayed promise
//     const { cryptoApi } = require('../services/cryptoApi');
//     cryptoApi.getAllCryptocurrencies.mockImplementation(() => new Promise(() => {}));
    
//     render(<Dashboard />);
    
//     // Check that the loading spinner is present
//     const loadingSpinner = document.querySelector('.animate-spin');
//     expect(loadingSpinner).toBeInTheDocument();
//   });



//   it('should log the DOM after render', () => {
//     render(<Dashboard />);
//     console.log(prettyDOM());
//   });
}); 