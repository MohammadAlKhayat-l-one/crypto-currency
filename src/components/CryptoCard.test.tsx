import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CryptoCard from './CryptoCard';
import { CryptoCurrency } from '../types/crypto';

describe('CryptoCard', () => {
  const mockCrypto: CryptoCurrency = {
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
  };

  it('renders crypto data correctly', () => {
    render(<CryptoCard crypto={mockCrypto} currency="usd" />);
    expect(screen.getByText('Bitcoin')).toBeInTheDocument();
    expect(screen.getByText('btc')).toBeInTheDocument();
    expect(screen.getByText(/Market Cap/)).toBeInTheDocument();
    expect(screen.getByText(/Rank/)).toBeInTheDocument();
  });

  it('calls onRemove when remove button is clicked', () => {
    const onRemove = jest.fn();
    render(
      <CryptoCard
        crypto={mockCrypto}
        currency="usd"
        onRemove={onRemove}
        showRemoveButton={true}
      />
    );
    const removeBtn = screen.getByLabelText('Remove cryptocurrency');
    fireEvent.click(removeBtn);
    expect(onRemove).toHaveBeenCalledWith('bitcoin');
  });
}); 