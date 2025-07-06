import React from 'react';
import { CryptoCurrency } from '../types/crypto';

interface CryptoCardProps {
  crypto: CryptoCurrency;
  currency: string;
  onRemove?: (id: string) => void;
  showRemoveButton?: boolean;
}

const CryptoCard: React.FC<CryptoCardProps> = ({ 
  crypto, 
  currency, 
  onRemove, 
  showRemoveButton = false 
}) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency.toUpperCase(),
      minimumFractionDigits: 2,
      maximumFractionDigits: 6,
    }).format(price);
  };

  const formatMarketCap = (marketCap: number) => {
    if (marketCap >= 1e12) {
      return `$${(marketCap / 1e12).toFixed(2)}T`;
    } else if (marketCap >= 1e9) {
      return `$${(marketCap / 1e9).toFixed(2)}B`;
    } else if (marketCap >= 1e6) {
      return `$${(marketCap / 1e6).toFixed(2)}M`;
    } else {
      return formatPrice(marketCap);
    }
  };

  const formatPercentage = (percentage: number) => {
    return `${percentage >= 0 ? '+' : ''}${percentage.toFixed(2)}%`;
  };

  return (
    <div className="crypto-card relative">
      {showRemoveButton && onRemove && (
        <button
          onClick={() => onRemove(crypto.id)}
          className="absolute top-2 right-2 text-gray-400 hover:text-red-500 transition-colors"
          aria-label="Remove cryptocurrency"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
      
      <div className="flex items-center space-x-4">
        <img 
          src={crypto.image} 
          alt={crypto.name}
          className="w-12 h-12 rounded-full"
        />
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {crypto.name}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 uppercase">
                {crypto.symbol}
              </p>
            </div>
            <div className="text-right">
              <p className="text-lg font-bold text-gray-900 dark:text-white">
                {formatPrice(crypto.current_price)}
              </p>
              <p className={`text-sm font-medium ${
                crypto.price_change_percentage_24h >= 0 
                  ? 'crypto-price-positive' 
                  : 'crypto-price-negative'
              }`}>
                {formatPercentage(crypto.price_change_percentage_24h)}
              </p>
            </div>
          </div>
          
          <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500 dark:text-gray-400">Market Cap</span>
              <span className="text-gray-900 dark:text-white font-medium">
                {formatMarketCap(crypto.market_cap)}
              </span>
            </div>
            <div className="flex justify-between text-sm mt-1">
              <span className="text-gray-500 dark:text-gray-400">Rank</span>
              <span className="text-gray-900 dark:text-white font-medium">
                #{crypto.market_cap_rank}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CryptoCard; 