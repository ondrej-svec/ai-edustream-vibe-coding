import { UserPreferences, MatchResponse, ErrorResponse } from '@/types/coffee-api';

const API_URL = import.meta.env.VITE_API_URL || '';

/**
 * Fetches a list of available coffee types from the API.
 * Accepts proximity filter fields (roaster_continent, roaster_country) in preferences.
 * @returns A promise resolving to an array of coffee type objects.
 */
export async function matchCoffee(preferences: UserPreferences): Promise<MatchResponse> {
  const fullUrl = `${API_URL}/match`;
  console.log("🌐 Making API request to:", fullUrl);
  console.log("📤 Request payload:", preferences);
  
  const response = await fetch(fullUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(preferences),
  });
  
  console.log("📥 Response status:", response.status, response.statusText);
  
  if (!response.ok) {
    const error: ErrorResponse = await response.json();
    console.log("❌ API Error response:", error);
    throw new Error(error.error || 'Unknown error');
  }
  
  const data = await response.json();
  console.log("📦 Response data:", data);
  return data;
}

// Mock implementation for local development
/**
 * Mock implementation of matchCoffee for local development.
 * Accepts proximity filter fields (roaster_continent, roaster_country) in preferences.
 */
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