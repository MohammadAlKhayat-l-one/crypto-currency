import React from 'react';
import { CryptoCurrency } from '../types/crypto';

interface ControlsProps {
  selectedCoin: string;
  onCoinChange: (coinId: string) => void;
  availableCoins: CryptoCurrency[];
  currency: string;
  onCurrencyChange: (currency: string) => void;
  timeRange: string;
  onTimeRangeChange: (timeRange: string) => void;
  theme: string;
  onThemeChange: (theme: string) => void;
  onAddCoin: (coinId: string) => void;
  selectedCoins: string[];
}

const Controls: React.FC<ControlsProps> = ({
  selectedCoin,
  onCoinChange,
  availableCoins,
  currency,
  onCurrencyChange,
  timeRange,
  onTimeRangeChange,
  theme,
  onThemeChange,
  onAddCoin,
  selectedCoins,
}) => {
  const currencies = [
    { value: 'usd', label: 'USD' },
    { value: 'eur', label: 'EUR' },
    { value: 'gbp', label: 'GBP' },
  ];

  const timeRanges = [
    { value: '24h', label: '24 Hours' },
    { value: '7d', label: '7 Days' },
    { value: '30d', label: '30 Days' },
  ];

  const themes = [
    { value: 'light', label: 'Light' },
    { value: 'dark', label: 'Dark' },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
        Dashboard Controls
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Chart Coin Selector */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Chart Cryptocurrency
          </label>
          <select
            value={selectedCoin}
            onChange={(e) => onCoinChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            {availableCoins.map((coin) => (
              <option key={coin.id} value={coin.id}>
                {coin.name} ({coin.symbol.toUpperCase()})
              </option>
            ))}
          </select>
        </div>

        {/* Currency Selector */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Currency
          </label>
          <select
            data-testid="Currency"
            value={currency}
            onChange={(e) => onCurrencyChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            {currencies.map((curr) => (
              <option key={curr.value} value={curr.value}>
                {curr.label}
              </option>
            ))}
          </select>
        </div>

        {/* Time Range Selector */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Time Range
          </label>
          <select
            data-testid="Time Range"
            value={timeRange}
            onChange={(e) => onTimeRangeChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            {timeRanges.map((range) => (
              <option key={range.value} value={range.value}>
                {range.label}
              </option>
            ))}
          </select>
        </div>

        {/* Theme Selector */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Theme
          </label>
          <select
            data-testid="Theme"
            value={theme}
            onChange={(e) => onThemeChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            {themes.map((themeOption) => (
              <option key={themeOption.value} value={themeOption.value}>
                {themeOption.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Add Coin Section */}
      <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
          Add Cryptocurrency to Dashboard
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
          {availableCoins
            .filter((coin) => !selectedCoins.includes(coin.id))
            .slice(0, 6)
            .map((coin) => (
              <button
                key={coin.id}
                onClick={() => onAddCoin(coin.id)}
                className="flex items-center space-x-2 px-3 py-2 text-sm bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded-md hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
              >
                <img src={coin.image} alt={coin.name} className="w-4 h-4 rounded-full" />
                <span>{coin.symbol.toUpperCase()}</span>
              </button>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Controls; 