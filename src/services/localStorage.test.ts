import { LocalStorageService } from './localStorage';
import { UserPreferences } from '../types/crypto';

describe('LocalStorageService', () => {
  const mockPrefs: UserPreferences = {
    selectedCoins: ['bitcoin', 'ethereum'],
    selectedCoin: 'bitcoin',
    currency: 'usd',
    timeRange: '7d',
    theme: 'dark',
  };

  beforeEach(() => {
    localStorage.clear();
  });

  it('saves and loads user preferences', () => {
    LocalStorageService.saveUserPreferences(mockPrefs);
    const loaded = LocalStorageService.getUserPreferences();
    expect(loaded).toEqual(mockPrefs);
  });

  it('returns default preferences if nothing is stored', () => {
    const loaded = LocalStorageService.getUserPreferences();
    expect(loaded.selectedCoins.length).toBeGreaterThan(0);
    expect(loaded.selectedCoin).toBeDefined();
    expect(loaded.currency).toBeDefined();
    expect(loaded.timeRange).toBeDefined();
    expect(loaded.theme).toBeDefined();
  });

  it('updates user preferences', () => {
    LocalStorageService.saveUserPreferences(mockPrefs);
    const updated = LocalStorageService.updateUserPreferences({ currency: 'eur', theme: 'light' });
    expect(updated.currency).toBe('eur');
    expect(updated.theme).toBe('light');
    const loaded = LocalStorageService.getUserPreferences();
    expect(loaded.currency).toBe('eur');
    expect(loaded.theme).toBe('light');
  });
}); 