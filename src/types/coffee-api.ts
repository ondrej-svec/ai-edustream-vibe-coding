// Types generated from BrewMatch API OpenAPI contract

export interface UserPreferences {
  flavorNotes: string[];
  drinkingStyle: 'black' | 'milk' | 'plant' | 'cream' | 'sweetened' | 'mixed';
  budgetRange: {
    min: number;
    max: number;
  };
  roastPreference?: 'light' | 'medium' | 'dark';
  brewMethods?: string[];
  // Proximity filter fields (roaster location)
  roasterContinent?: import('./coffee').RoasterContinent;
  roasterCountry?: import('./coffee').RoasterCountry;
}

export interface CoffeeMatch {
  name: string;
  roaster: string;
  flavorNotes: string[];
  price: number;
  brewMethodFit: string[];
  roastLevel: 'light' | 'medium' | 'dark';
  purchaseLink: string;
}

export interface MatchResponse {
  matches: CoffeeMatch[];
}

export interface ErrorResponse {
  error: string;
  code: number;
} 