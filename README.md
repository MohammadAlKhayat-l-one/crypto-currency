# Cryptocurrency Dashboard

A modern, interactive cryptocurrency dashboard built with React, TypeScript, and Tailwind CSS. This application provides real-time cryptocurrency data, interactive charts, and user customization features.

## Features

### Core Features
- **Real-time Cryptocurrency Data**: Fetches top cryptocurrencies from CoinGecko API
- **Interactive Price Charts**: Line charts showing price history with customizable time ranges
- **Responsive Design**: Modern UI that works on desktop and mobile devices
- **Dark/Light Mode**: Toggle between themes for better user experience

### Advanced Features
- **User Customization**: Add/remove cryptocurrencies from the dashboard
- **Persistent Preferences**: User selections are saved using localStorage
- **Multiple Currencies**: Support for USD, EUR, and GBP
- **Time Range Selection**: View price history for 24h, 7d, or 30d periods
- **Real-time Updates**: Data refreshes automatically with caching

## Technology Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS with custom components
- **Charts**: Recharts for interactive data visualization
- **HTTP Client**: Axios for API requests
- **State Management**: React Hooks with localStorage persistence
- **API**: CoinGecko API for cryptocurrency data

## Project Structure

```
src/
├── components/
│   ├── Dashboard.tsx          # Main dashboard component
│   ├── CryptoCard.tsx         # Individual crypto card
│   ├── PriceChart.tsx         # Interactive price chart
│   └── Controls.tsx           # User controls and settings
├── services/
│   ├── cryptoApi.ts           # CoinGecko API service
│   └── localStorage.ts        # Local storage management
├── types/
│   └── crypto.ts              # TypeScript interfaces
├── App.tsx                    # Main app component
└── index.css                  # Tailwind CSS styles
```

## Setup Instructions

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd cryptocurrency-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000` to view the application

### Build for Production

```bash
npm run build
```

The build files will be created in the `build` folder.

## Key Implementation Notes

### API Integration
- Uses CoinGecko API for real-time cryptocurrency data
- Implements caching to reduce API calls and improve performance
- Handles API rate limits gracefully with error handling

### State Management
- Uses React hooks for local state management
- Implements localStorage for persistent user preferences
- Maintains separate loading states for different data fetching operations

### Component Architecture
- **Dashboard**: Main orchestrator component managing all state and data flow
- **CryptoCard**: Reusable component for displaying individual cryptocurrency data
- **PriceChart**: Interactive chart component using Recharts library
- **Controls**: User interface for customization options

### Styling Approach
- Tailwind CSS for utility-first styling
- Custom CSS classes for component-specific styles
- Dark mode support with CSS custom properties
- Responsive design using Tailwind's responsive utilities

### Performance Optimizations
- API response caching (1-minute cache duration)
- Debounced API calls to prevent excessive requests
- Lazy loading of chart components
- Optimized re-renders using React.memo where appropriate

## API Endpoints Used

- `GET /coins/markets` - Fetch cryptocurrency market data
- `GET /coins/{id}/market_chart` - Fetch price history data

## Customization Options

### Adding New Cryptocurrencies
1. Use the "Add Cryptocurrency" section in the controls
2. Select from available cryptocurrencies
3. New coins will be added to your dashboard

### Changing Display Options
- **Currency**: Switch between USD, EUR, and GBP
- **Time Range**: Select 24h, 7d, or 30d for price charts
- **Theme**: Toggle between light and dark modes

### Removing Cryptocurrencies
- Click the "X" button on any cryptocurrency card
- At least one cryptocurrency must remain on the dashboard

## Error Handling

The application includes comprehensive error handling:
- Network request failures
- API rate limiting
- Invalid data responses
- Local storage access issues

## Browser Compatibility

- Chrome (recommended)
- Firefox
- Safari
- Edge

## Future Enhancements

- Real-time WebSocket updates
- Portfolio tracking features
- Price alerts and notifications
- Advanced chart indicators
- Export functionality for data

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Acknowledgments

- [CoinGecko API](https://www.coingecko.com/en/api) for cryptocurrency data
- [Recharts](https://recharts.org/) for chart components
- [Tailwind CSS](https://tailwindcss.com/) for styling utilities
