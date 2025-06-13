import { describe, it, expect } from 'vitest';
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
    };
    const result = await coffeeService.matchCoffee(preferences);
    expect(result.matches.length).toBeGreaterThan(0);
    expect(result.matches[0]).toHaveProperty('name');
    expect(result.matches[0]).toHaveProperty('roaster');
  });
}); 