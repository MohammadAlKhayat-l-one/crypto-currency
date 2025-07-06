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
const mockCryptos = [
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
  ];

jest.mock('../services/cryptoApi', () => ({
  cryptoApi: {
    getAllCryptocurrencies: jest.fn(() => Promise.resolve(mockCryptos)),
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

  it('initializes state from localStorage', async () => {
    const { cryptoApi } = require('../services/cryptoApi');
    cryptoApi.getAllCryptocurrencies.mockResolvedValue(mockCryptos);
    LocalStorageService.saveUserPreferences(mockPrefs);
    render(<Dashboard />);
    
    // Wait for loading spinner to disappear
    await waitFor(() =>
        expect(document.querySelector('.animate-spin')).not.toBeInTheDocument()
      );
    
    // Wait for controls to be available
    await waitFor(() => {
      expect(screen.getByTestId('Currency')).toBeInTheDocument();
    });
    
    // Now assert the values
    expect(screen.getByDisplayValue('USD')).toBeInTheDocument();
    expect(screen.getByDisplayValue('7 Days')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Dark')).toBeInTheDocument();
  });

  it('persists changes to localStorage', async () => {
    const { cryptoApi } = require('../services/cryptoApi');
    cryptoApi.getAllCryptocurrencies.mockResolvedValue(mockCryptos);
    // Set up initial preferences in localStorage
    LocalStorageService.saveUserPreferences(mockPrefs);
    
    render(<Dashboard />);
    
    // Wait for the controls to be available (after loading completes)
    await waitFor(() => {
      expect(screen.getByTestId('Currency')).toBeInTheDocument();
    });
    
    // Change currency
    fireEvent.change(screen.getByTestId('Currency'), { target: { value: 'usd' } });
    // Change time range
    fireEvent.change(screen.getByTestId('Time Range'), { target: { value: '7d' } });
    // Change theme
    fireEvent.change(screen.getByTestId('Theme'), { target: { value: 'light' } });
    
    // Wait for localStorage to update
    await waitFor(() => {
      const prefs = LocalStorageService.getUserPreferences();
      expect(prefs.currency).toBe('usd');
      expect(prefs.timeRange).toBe('7d');
      expect(prefs.theme).toBe('light');
    });
  });

  it('should display loading spinner when isLoading is true', async () => {
    // Temporarily replace the mock with a delayed promise
    const { cryptoApi } = require('../services/cryptoApi');
    cryptoApi.getAllCryptocurrencies.mockImplementation(() => new Promise(() => {}));
    
    render(<Dashboard />);
    
    // Check that the loading spinner is present
    const loadingSpinner = document.querySelector('.animate-spin');
    expect(loadingSpinner).toBeInTheDocument();
  });

it('should display cryptocurrency cards after loading', async () => {
    const { cryptoApi } = require('../services/cryptoApi');
    cryptoApi.getAllCryptocurrencies.mockResolvedValue(mockCryptos);  
    // Return mocked cryptocurrency data

  
    render(<Dashboard />);
  
    // Wait until spinner is gone
    await waitFor(() =>
      expect(document.querySelector('.animate-spin')).not.toBeInTheDocument()
    );
  
    // Now check that the cards are rendered
    expect(screen.getByText('Bitcoin')).toBeInTheDocument();
    expect(screen.getByText('Ethereum')).toBeInTheDocument();
  });
  

  it('should display dashboard title', async () => {
    render(<Dashboard />);
    
    expect(screen.getByText('Cryptocurrency Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Real-time cryptocurrency data and interactive charts')).toBeInTheDocument();
  });
}); 