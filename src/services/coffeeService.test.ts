import { describe, it, expect, vi } from 'vitest';
import { coffeeService } from './coffeeService';
import { UserPreferences } from '@/types/coffee-api';

describe('coffeeService.matchCoffee', () => {
  it('returns matches for valid preferences', async () => {
    const preferences: UserPreferences = {
      flavorNotes: ['Fruity', 'Chocolatey'],
      drinkingStyle: 'black',
      budgetRange: { min: 10, max: 30 },
      roastPreference: 'medium',
      brewMethods: ['V60', 'Espresso'],
      roasterContinent: 'North America',
      roasterCountry: 'United States',
    };
    const result = await coffeeService.matchCoffee(preferences);
    expect(result.matches.length).toBeGreaterThan(0);
    expect(result.matches[0]).toHaveProperty('name');
    expect(result.matches[0]).toHaveProperty('roaster');
  });

  it('handles preferences with only proximity fields', async () => {
    const preferences: UserPreferences = {
      flavorNotes: [],
      drinkingStyle: 'black',
      budgetRange: { min: 10, max: 30 },
      roasterContinent: 'Europe',
      roasterCountry: 'Italy',
    };
    const result = await coffeeService.matchCoffee(preferences);
    expect(result.matches).toBeDefined();
  });

  it('throws error on API error response', async () => {
    // Only run this test if using the real API, not the mock
    if (coffeeService.matchCoffee.name === 'mockMatchCoffee') {
      return;
    }
    vi.stubGlobal('fetch', vi.fn(() => Promise.resolve({
      ok: false,
      status: 400,
      json: () => Promise.resolve({ error: 'bad request' }),
    })));
    const preferences: UserPreferences = {
      flavorNotes: ['Fruity'],
      drinkingStyle: 'black',
      budgetRange: { min: 10, max: 30 },
      roastPreference: 'medium',
      brewMethods: ['V60'],
      roasterContinent: 'Africa',
      roasterCountry: 'Ethiopia',
    };
    await expect(coffeeService.matchCoffee(preferences)).rejects.toThrow('bad request');
  });
}); 