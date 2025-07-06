import React, { useState, useEffect } from 'react';
import { CryptoCurrency, PriceHistory, UserPreferences } from '../types/crypto';
import { cryptoApi } from '../services/cryptoApi';
import { LocalStorageService } from '../services/localStorage';
import CryptoCard from './CryptoCard';
import PriceChart from './PriceChart';
import Controls from './Controls';

const initialPrefs = LocalStorageService.getUserPreferences();

const Dashboard: React.FC = () => {
  const [cryptocurrencies, setCryptocurrencies] = useState<CryptoCurrency[]>([]);
  const [selectedCoins, setSelectedCoins] = useState<string[]>(initialPrefs.selectedCoins);
  const [selectedCoin, setSelectedCoin] = useState<string>(
    initialPrefs.selectedCoin || initialPrefs.selectedCoins[0] || 'bitcoin'
  );
  const [currency, setCurrency] = useState<string>(initialPrefs.currency);
  const [timeRange, setTimeRange] = useState<string>(initialPrefs.timeRange);
  const [theme, setTheme] = useState<string>(initialPrefs.theme);
  const [priceHistory, setPriceHistory] = useState<PriceHistory | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isChartLoading, setIsChartLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Apply theme
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  // Fetch cryptocurrencies
  useEffect(() => {
    const fetchCryptocurrencies = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await cryptoApi.getAllCryptocurrencies(currency);
        setCryptocurrencies(data);
      } catch (err) {
        setError('Failed to fetch cryptocurrency data');
        console.error('Error fetching cryptocurrencies:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCryptocurrencies();
  }, [currency]);

  // Fetch price history when selected coin or time range changes
  useEffect(() => {
    const fetchPriceHistory = async () => {
      if (!selectedCoin) return;

      try {
        setIsChartLoading(true);
        const days = timeRange === '24h' ? 1 : timeRange === '7d' ? 7 : 30;
        const data = await cryptoApi.getPriceHistory(selectedCoin, currency, days);
        setPriceHistory(data);
      } catch (err) {
        setError('Failed to fetch price history');
        console.error('Error fetching price history:', err);
      } finally {
        setIsChartLoading(false);
      }
    };

    fetchPriceHistory();
  }, [selectedCoin, currency, timeRange]);

  // Save preferences when they change
  useEffect(() => {
    const preferences: UserPreferences = {
      selectedCoins,
      selectedCoin,
      currency: currency as 'usd' | 'eur' | 'gbp',
      timeRange: timeRange as '24h' | '7d' | '30d',
      theme: theme as 'light' | 'dark',
    };
    LocalStorageService.saveUserPreferences(preferences);
  }, [selectedCoins, selectedCoin, currency, timeRange, theme]);

  const handleAddCoin = (coinId: string) => {
    if (!selectedCoins.includes(coinId)) {
      setSelectedCoins([...selectedCoins, coinId]);
    }
  };

  const handleRemoveCoin = (coinId: string) => {
    const updatedCoins = selectedCoins.filter(id => id !== coinId);
    setSelectedCoins(updatedCoins);
    if (selectedCoin === coinId) {
      setSelectedCoin(updatedCoins[0] || 'bitcoin');
    }
  };

  const handleCurrencyChange = (newCurrency: string) => {
    setCurrency(newCurrency);
  };

  const handleTimeRangeChange = (newTimeRange: string) => {
    setTimeRange(newTimeRange);
  };

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme);
  };

  const handleCoinChange = (coinId: string) => {
    setSelectedCoin(coinId);
  };

  const filteredCryptocurrencies = cryptocurrencies.filter(crypto => 
    selectedCoins.includes(crypto.id)
  );

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
        <div className="max-w-7xl mx-auto">
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
            <h2 className="text-lg font-semibold text-red-800 dark:text-red-200 mb-2">
              Error
            </h2>
            <p className="text-red-700 dark:text-red-300">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto p-4">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Cryptocurrency Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Real-time cryptocurrency data and interactive charts
          </p>
        </header>

        {/* Controls */}
        <Controls
          selectedCoin={selectedCoin}
          onCoinChange={handleCoinChange}
          availableCoins={cryptocurrencies}
          currency={currency}
          onCurrencyChange={handleCurrencyChange}
          timeRange={timeRange}
          onTimeRangeChange={handleTimeRangeChange}
          theme={theme}
          onThemeChange={handleThemeChange}
          onAddCoin={handleAddCoin}
          selectedCoins={selectedCoins}
        />

        {/* Loading State */}
        {isLoading && (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        )}

        {/* Main Content */}
        {!isLoading && (
          <>
            {/* Cryptocurrency Cards */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                Top Cryptocurrencies
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCryptocurrencies.map((crypto) => (
                  <CryptoCard
                    key={crypto.id}
                    crypto={crypto}
                    currency={currency}
                    onRemove={handleRemoveCoin}
                    showRemoveButton={selectedCoins.length > 1}
                  />
                ))}
              </div>
            </div>

            {/* Price Chart */}
            {priceHistory && (
              <div className="mb-8">
                <PriceChart
                  data={priceHistory}
                  currency={currency}
                  isLoading={isChartLoading}
                />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard; 