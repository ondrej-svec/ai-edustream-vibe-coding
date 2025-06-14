import { UserPreferences, MatchResponse, ErrorResponse } from '@/types/coffee-api';

const API_URL = import.meta.env.VITE_API_URL || '';

/**
 * Fetches a list of available coffee types from the API.
 * @returns A promise resolving to an array of coffee type objects.
 */
export async function matchCoffee(preferences: UserPreferences): Promise<MatchResponse> {
  const response = await fetch(`${API_URL}/api/match`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(preferences),
  });
  if (!response.ok) {
    const error: ErrorResponse = await response.json();
    throw new Error(error.error || 'Unknown error');
  }
  return response.json();
}

// Mock implementation for local development
export async function mockMatchCoffee(preferences: UserPreferences): Promise<MatchResponse> {
  // Simulate network delay
  await new Promise((res) => setTimeout(res, 500));
  return {
    matches: [
      {
        name: 'Ethiopia Guji Natural',
        roaster: 'Gardelli',
        flavorNotes: ['Berry-like', 'Floral', 'Bright'],
        price: 22,
        brewMethodFit: ['V60', 'Aeropress'],
        roastLevel: 'light',
        purchaseLink: 'https://example.com/ethiopia-guji',
      },
      {
        name: 'Colombia La Palma',
        roaster: 'La Palma y El Tucan',
        flavorNotes: ['Chocolatey', 'Nutty', 'Sweet'],
        price: 18,
        brewMethodFit: ['Espresso', 'French Press'],
        roastLevel: 'medium',
        purchaseLink: 'https://example.com/colombia-la-palma',
      },
    ],
  };
}

/**
 * Submits a coffee taste quiz and returns the best match from the API.
 * @param quizData - The user's quiz answers.
 * @returns A promise resolving to the matched coffee result.
 */
// Export the real or mock service based on env
export const coffeeService =
  API_URL && !API_URL.includes('mock') ? { matchCoffee } : { matchCoffee: mockMatchCoffee }; 