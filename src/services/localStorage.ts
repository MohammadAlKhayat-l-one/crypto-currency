import { UserPreferences } from '../types/crypto';

const STORAGE_KEYS = {
  USER_PREFERENCES: 'crypto_dashboard_preferences',
} as const;

export class LocalStorageService {
  static saveUserPreferences(preferences: UserPreferences): void {
    try {
      localStorage.setItem(STORAGE_KEYS.USER_PREFERENCES, JSON.stringify(preferences));
    } catch (error) {
      console.error('Failed to save user preferences:', error);
    }
  }

  static getUserPreferences(): UserPreferences {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.USER_PREFERENCES);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (error) {
      console.error('Failed to load user preferences:', error);
    }

    // Return default preferences
    return {
      selectedCoins: ['bitcoin', 'ethereum', 'binancecoin', 'cardano', 'solana'],
      selectedCoin: 'bitcoin',
      currency: 'usd',
      timeRange: '7d',
      theme: 'dark',
    };
  }

  static updateUserPreferences(updates: Partial<UserPreferences>): UserPreferences {
    const current = this.getUserPreferences();
    const updated = { ...current, ...updates };
    this.saveUserPreferences(updated);
    return updated;
  }
} 